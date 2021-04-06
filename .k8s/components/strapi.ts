import env from "@kosko/env";

import { create } from "@socialgouv/kosko-charts/components/app";
import { getHarborImagePath } from "@socialgouv/kosko-charts/utils/getHarborImagePath";
import { addEnv } from "@socialgouv/kosko-charts/utils/addEnv";
import { getManifestByKind } from "@socialgouv/kosko-charts/utils/getManifestByKind";
import { Deployment } from "kubernetes-models/api/apps/v1/Deployment";
import { EnvVar } from "kubernetes-models/api/core/v1/EnvVar";

import { PersistentVolume } from "kubernetes-models/v1/PersistentVolume";
import { PersistentVolumeClaim } from "kubernetes-models/v1/PersistentVolumeClaim";

type AnyObject = {
  [any: string]: any;
};

interface AddEnvsParams {
  deployment: Deployment;
  data: AnyObject;
  containerIndex?: number;
}

const addEnvs = ({ deployment, data, containerIndex = 0 }: AddEnvsParams) => {
  Object.keys(data).forEach((key) => {
    addEnv({
      deployment,
      data: new EnvVar({ name: key, value: data[key] }),
      containerIndex,
    });
  });
};

const manifests = [];

const strapiManifests = create("strapi", {
  env,
  config: {
    containerPort: 1337,
    withPostgres: true,
    subDomainPrefix: "backoffice-",
  },
  deployment: {
    image: getHarborImagePath({ name: "les1000jours-strapi" }),
    container: {
      // override probes path
      livenessProbe: {
        httpGet: {
          path: "/_health",
          port: "http",
        },
      },
      readinessProbe: {
        httpGet: {
          path: "/_health",
          port: "http",
        },
      },
      // increase startup delay
      startupProbe: {
        httpGet: {
          path: "/_health",
          port: "http",
        },
      },
      resources: {
        requests: {
          cpu: "100m",
          memory: "128Mi",
        },
        limits: {
          cpu: "500m",
          memory: "256Mi",
        },
      },
      volumeMounts: [
        {
          mountPath: "/app/public/uploads",
          name: "uploads",
        },
      ],
    },
  },
});

//@ts-expect-error
const deployment = getManifestByKind(strapiManifests, Deployment) as Deployment;

// due to azureFile volumes regressions
if (deployment && deployment.spec) {
  deployment.spec.strategy = { type: 'Recreate' }
}

const namespace = deployment?.metadata?.namespace;

if (deployment && deployment?.spec?.template.spec) {
  deployment.spec.template.spec.volumes = [
    {
      persistentVolumeClaim: {
        claimName: "strapi-file-uploads",
      },
      name: "uploads",
    },
  ];
}

const pv = new PersistentVolume({
  metadata: {
    name: "strapi-file-uploads-volume",
    labels:{
      usage: "strapi-file-uploads-volume"
    }
  },
  spec: {
    capacity: {
      storage: "10Gi"
    },
    accessModes: ["ReadWriteMany"],
    persistentVolumeReclaimPolicy: "retain",
    azureFile: {
      secretName: "strapi-sealed-secret",
      shareName: "uploads",
      secretNamespace: deployment?.metadata?.namespace
    }
  },
});

const pvc = new PersistentVolumeClaim({
  metadata: {
    name: "strapi-file-uploads",
    annotations:{
      "volume.beta.kubernetes.io/storage-class": ""
    }
  },
  spec: {
    accessModes: ["ReadWriteMany"],
    resources: {
      requests: {
        storage: "10Gi",
      },
    },
  },
});

manifests.push(strapiManifests);
manifests.push(pv);
manifests.push(pvc);

addEnvs({
  deployment,
  data: {
    DATABASE_CLIENT: "postgres",
    DATABASE_NAME: "$(PGDATABASE)",
    DATABASE_HOST: "$(PGHOST)",
    DATABASE_PORT: "$(PGPORT)",
    DATABASE_USERNAME: "$(PGUSER)",
    DATABASE_PASSWORD: "$(PGPASSWORD)",
    DATABASE_SSL: "true",
  },
});

export default manifests;
