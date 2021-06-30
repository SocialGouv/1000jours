import fs from "fs";
import path from "path";
import { ok } from "assert";
import env from "@kosko/env";
import { create } from "@socialgouv/kosko-charts/components/app";
import { fileSharePersistentVolumeClaim } from "@socialgouv/kosko-charts/components/azure-storage/fileshare.pvc";
import { getDeployment } from "@socialgouv/kosko-charts/utils/getDeployment";
import { IIoK8sApiCoreV1HTTPGetAction } from "kubernetes-models/v1";
import { ConfigMap } from "kubernetes-models/v1/ConfigMap";
import { PersistentVolumeClaim } from "kubernetes-models/v1/PersistentVolumeClaim";
import { Ingress } from "kubernetes-models/api/networking/v1";
import gitlab from "@socialgouv/kosko-charts/environments/gitlab";

const httpGet: IIoK8sApiCoreV1HTTPGetAction = {
  path: "/_health",
  port: "http",
};
const envParams = gitlab(process.env);

// renovate: datasource=docker depName=nginx versioning=1.19.6
const NGINX_DOCKER_VERSION = "1.19.6";

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
          cpu: "100m",
          memory: "0.5Gi",
        },
        // cpu=1000, memory=3Gi offers 17req/s
        limits: {
          cpu: "1000m",
          memory: "1Gi",
        },
      },
      volumeMounts: [
        {
          mountPath: "/var/cache/nginx",
          name: "cache",
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
      name: "nginx-config",
      labels: envParams.labels,
      annotations: envParams.annotations,
      namespace: envParams.namespace.name,
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
    };
  }

  manifests.push(configMap);

  const pvcName = `strapi-cache-${process.env.CI_COMMIT_SHORT_SHA}`;

  const deploy = getDeployment(manifests);
  ok(deploy.spec);
  ok(deploy.spec.template);
  ok(deploy.spec.template.spec);
  deploy.spec.template.spec.volumes = [
    {
      persistentVolumeClaim: {
        claimName: pvcName,
      },
      name: "cache",
    },
    {
      name: "config",
      configMap: {
        name: "nginx-config",
      },
    },
  ];

  const pvc = fileSharePersistentVolumeClaim({
    metadata: {
      name: pvcName,
    },
    resources: {
      requests: {
        storage: "2Gi",
      },
    },
  });

  manifests.push(pvc);

  return manifests;
};
