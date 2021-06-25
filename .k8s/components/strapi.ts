import env from "@kosko/env";
import { create } from "@socialgouv/kosko-charts/components/app";
import { azureProjectVolume } from "@socialgouv/kosko-charts/components/azure-storage/azureProjectVolume";
import { addEnvs } from "@socialgouv/kosko-charts/utils/addEnvs";
import { getIngressHost } from "@socialgouv/kosko-charts/utils/getIngressHost";
import { getDeployment } from "@socialgouv/kosko-charts/utils/getDeployment";
import { getHarborImagePath } from "@socialgouv/kosko-charts/utils/getHarborImagePath";
import {
  VolumeMount,
  Probe,
  ResourceRequirements,
  Volume,
} from "kubernetes-models/v1";
import { Ingress } from "kubernetes-models/api/networking/v1";

const prob = new Probe({
  httpGet: {
    path: "/_health",
    port: "http",
  },
});

const resources = new ResourceRequirements({
  requests: {
    cpu: "50m",
    memory: "256Mi",
  },
  limits: {
    cpu: "500m",
    memory: "1Gi",
  },
});

export default async () => {
  const name = "uploads";
  const [persistentVolumeClaim, persistentVolume] = azureProjectVolume(name, {
    storage: "5Gi",
  });
  const uploadsVolume = new Volume({
    persistentVolumeClaim: { claimName: persistentVolumeClaim.metadata!.name! },
    name,
  });

  const uploadsVolumeMount = new VolumeMount({
    mountPath: "/app/public/uploads",
    name,
  });

  // generate basic strapi manifests
  const manifests = await create("strapi", {
    env,
    config: {
      withPostgres: true,
      containerPort: 1337,
      subDomainPrefix: "backoffice-",
      image: getHarborImagePath({ name: "les1000jours-strapi" }),
    },
    deployment: {
      container: {
        livenessProbe: prob,
        readinessProbe: prob,
        startupProbe: prob,
        resources,
        volumeMounts: [uploadsVolumeMount],
      },
      volumes: [uploadsVolume],
    },
  });
  const deployment = getDeployment(manifests);

  // add nginx annotation for nginx upload limit
  const ingress = manifests.find((m) => m.kind === "Ingress") as Ingress;
  if (ingress && ingress.metadata?.annotations) {
    ingress.metadata.annotations = {
      ...ingress.metadata.annotations,
      "nginx.ingress.kubernetes.io/proxy-body-size": "1g",
    };
  }
  const deploymentUrl = "https://" + getIngressHost(manifests);

  addEnvs({
    deployment,
    data: {
      BACKOFFICE_URL: deploymentUrl,
      DATABASE_CLIENT: "postgres",
      DATABASE_NAME: "$(PGDATABASE)",
      DATABASE_HOST: "$(PGHOST)",
      DATABASE_PORT: "$(PGPORT)",
      DATABASE_USERNAME: "$(PGUSER)",
      DATABASE_PASSWORD: "$(PGPASSWORD)",
      DATABASE_SSL: "true",
    },
  });

  return manifests.concat([persistentVolumeClaim, persistentVolume]);
};
