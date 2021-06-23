import env from "@kosko/env";
import { create } from "@socialgouv/kosko-charts/components/app";

import { updateMetadata } from "@socialgouv/kosko-charts/utils/updateMetadata";
import { addEnvs } from "@socialgouv/kosko-charts/utils/addEnvs";
import gitlab from "@socialgouv/kosko-charts/environments/gitlab";
import { getIngressHost } from "@socialgouv/kosko-charts/utils/getIngressHost";
import { getDeployment } from "@socialgouv/kosko-charts/utils/getDeployment";
import { getHarborImagePath } from "@socialgouv/kosko-charts/utils/getHarborImagePath";
import { PersistentVolume } from "kubernetes-models/v1";
import { PersistentVolumeClaim } from "kubernetes-models/v1";
import {
  VolumeMount,
  Probe,
  ResourceRequirements,
  Volume,
} from "kubernetes-models/v1";

const globalEnv = gitlab(process.env);

const metadata = {
  name: "uploads",
};
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

function azureProjectVolume(name: string, { storage }: { storage: string }) {
  const globalEnv = gitlab(process.env);
  const application = globalEnv.labels!.application;
  const metadata = {
    annotations: globalEnv.annotations || {},
    labels: globalEnv.labels || {},
    namespace: globalEnv.namespace,
  };
  const pv = `${application}-${name}`;

  const persistentVolumeClaim = new PersistentVolumeClaim({
    metadata: {
      name,
    },
    spec: {
      accessModes: ["ReadWriteMany"],
      resources: {
        requests: {
          storage,
        },
      },
      storageClassName: "",
      selector: {
        matchLabels: {
          usage: pv,
        },
      },
    },
  });

  const persistentVolume = new PersistentVolume({
    metadata: {
      name: pv,
      labels: {
        usage: pv,
      },
    },
    spec: {
      storageClassName: "",
      accessModes: ["ReadWriteMany"],
      azureFile: {
        secretName: `azure-${globalEnv.labels!.team}-volume`,
        secretNamespace: globalEnv.namespace.name,
        shareName: name,
      },
      capacity: {
        storage,
      },
      persistentVolumeReclaimPolicy: "Delete",
    },
  });

  updateMetadata(persistentVolumeClaim, metadata);
  updateMetadata(persistentVolume, metadata);
  return [persistentVolumeClaim, persistentVolume];
}
