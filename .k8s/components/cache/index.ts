import fs from "fs";
import path from "path";
import { ok } from "assert";
import { createAutoscale } from "@socialgouv/kosko-charts/components/autoscale";
import env from "@kosko/env";
import { create } from "@socialgouv/kosko-charts/components/app";
import { azureProjectVolume } from "@socialgouv/kosko-charts/components/azure-storage/azureProjectVolume";
import { getDeployment } from "@socialgouv/kosko-charts/utils/getDeployment";
import { IIoK8sApiCoreV1HTTPGetAction, Volume } from "kubernetes-models/v1";
import { ConfigMap } from "kubernetes-models/v1/ConfigMap";
import { Ingress } from "kubernetes-models/api/networking/v1";
import ci from "@socialgouv/kosko-charts/environments";

const httpGet: IIoK8sApiCoreV1HTTPGetAction = {
  path: "/_health",
  port: "http",
};
const envParams = ci(process.env);
const strapiParams = env.component("strapi");

// renovate: datasource=docker depName=nginx versioning=1.19.6
const NGINX_DOCKER_VERSION = "1.19.6";
const CACHE_VOLUME_NAME = "strapi-cache";

// create a front nginx container that will handle cache
//
// users-->nginx ingress-->nginx cache-->api
//
const asyncManifests = create("strapi-cache", {
  env,
  config: {
    image: `nginx:${NGINX_DOCKER_VERSION}`,
    subDomainPrefix: "backoffice-",
    containerPort: 80,
    container: {
      env: [
        {
          name: "UPSTREAM",
          value: "http://strapi", // refers a kubernetes service name
        },
        {
          name: "MAX_SIZE",
          value: "1024m",
        },
      ],
      livenessProbe: {
        httpGet,
        initialDelaySeconds: 15,
        timeoutSeconds: 15,
      },
      readinessProbe: {
        httpGet,
        initialDelaySeconds: 5,
        timeoutSeconds: 3,
      },
      startupProbe: {
        httpGet,
        initialDelaySeconds: 0,
        timeoutSeconds: 15,
      },
      resources: {
        requests: {
          cpu: "5m",
          memory: "256Mi",
        },
        // cpu=1000, memory=3Gi offers 17req/s
        limits: {
          cpu: "1",
          memory: "1Gi",
        },
      },
      volumeMounts: [
        {
          mountPath: "/var/cache/nginx",
          name: CACHE_VOLUME_NAME,
        },
        {
          mountPath: "/etc/nginx/nginx.conf",
          subPath: "nginx.conf",
          name: "config",
        },
      ],
    },
  },
});

export default async () => {
  const manifests = await asyncManifests;
  // add the config map that holds nginx.conf
  const configMap = new ConfigMap({
    metadata: {
      name: "strapi-cache",
      labels: envParams.metadata.labels,
      annotations: envParams.metadata.annotations,
      namespace: envParams.metadata.namespace.name,
    },
    data: {
      "nginx.conf": fs
        .readFileSync(path.join(__dirname, "nginx.conf"))
        .toString(),
    },
  });

  // add nginx annotation for nginx upload limit
  const ingress = manifests.find((m) => m.kind === "Ingress") as Ingress;
  if (ingress && ingress.metadata?.annotations) {
    ingress.metadata.annotations = {
      ...ingress.metadata.annotations,
      "nginx.ingress.kubernetes.io/proxy-body-size": "1g",
      "nginx.ingress.kubernetes.io/limit-rps": "20",
      "nginx.ingress.kubernetes.io/limit-rpm": "300",
    };
  }

  manifests.push(configMap);

  const emptyDir = new Volume({ name: CACHE_VOLUME_NAME, emptyDir: {} });

  const deploy = getDeployment(manifests);
  ok(deploy.spec);
  ok(deploy.spec.template);
  ok(deploy.spec.template.spec);
  deploy.spec.template.spec.volumes = [
    emptyDir,
    {
      name: "config",
      configMap: {
        name: configMap.metadata!.name,
      },
    },
  ];

  const hpa = createAutoscale(deploy, { minReplicas: 2, maxReplicas: 5 });
  return manifests.concat(strapiParams.useEmptyDirAsVolume ? [] : [hpa]);
};
