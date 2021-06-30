import env from "@kosko/env";
import { create } from "@socialgouv/kosko-charts/components/app";
import { createAutoscale } from "@socialgouv/kosko-charts/components/autoscale";
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

const component = "strapi";
const params = env.component(component);
const prob = new Probe({
  httpGet: {
    path: "/_health",
    port: "http",
  },
  initialDelaySeconds: 30,
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
  const emptyDir = new Volume({ name, emptyDir: {} });

  const uploadsVolumeMount = new VolumeMount({
    mountPath: "/app/public/uploads",
    name,
  });

  // generate basic strapi manifests
  const manifests = await create(component, {
    env,
    config: {
      ingress: false,
      withPostgres: true,
      containerPort: 1337,
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
      volumes: [params.useEmptyDirAsVolume ? emptyDir : uploadsVolume],
    },
  });
  const deployment = getDeployment(manifests);

  const deploymentUrl =
    "https://" +
    getIngressHost(
      await create(component, {
        env,
        config: {
          subDomainPrefix: "backoffice-",
        },
      })
    );

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

  const hpa = createAutoscale(deployment);

  return manifests.concat(
    params.useEmptyDirAsVolume
      ? [hpa]
      : [hpa, persistentVolumeClaim, persistentVolume]
  );
};
