import env from "@kosko/env";
import { create } from "@socialgouv/kosko-charts/components/app";
import { addEnvs } from "@socialgouv/kosko-charts/utils/addEnvs";
import { getHarborImagePath } from "@socialgouv/kosko-charts/utils/getHarborImagePath";
import { getIngressHost } from "@socialgouv/kosko-charts/utils/getIngressHost";
import { getManifestByKind } from "@socialgouv/kosko-charts/utils/getManifestByKind";
import { Deployment } from "kubernetes-models/apps/v1";
import { PersistentVolumeClaim } from "kubernetes-models/v1";

type configKey = "pvcName" | string;

type StrapiOptions = {
  config?: Record<configKey, any>;
  deployment?: Record<string, any>;
};

const createStrapiComponent = async (
  name: string,
  options: StrapiOptions
): Promise<{ kind: string }[]> => {
  const manifests = [];

  const config = {
    containerPort: 1337,
    withPostgres: true,
    subDomainPrefix: "strapi-",
    pvcName: "strapi-uploads",
    ...(options.config || {}),
  };

  const deploymentConfig = {
    ...(options.deployment || {}),
    container: {
      ...((options.deployment && options.deployment.container) || {}),
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
          cpu: "50m",
          memory: "256Mi",
        },
        limits: {
          cpu: "500m",
          memory: "1Gi",
        },
      },
      volumeMounts: [
        {
          mountPath: "/app/public/uploads",
          name: "uploads",
        },
      ],
    },
  };

  const strapiManifests = await create("strapi", {
    env,
    config,
    deployment: deploymentConfig,
  });

  const deployment = getManifestByKind(
    strapiManifests,
    //@ts-expect-error
    Deployment
  ) as Deployment;

  const projectName = process.env.CI_PROJECT_NAME;
  const pvcName = config.pvcName || `${projectName}-strapi-uploads`;

  if (deployment && deployment?.spec?.template.spec) {
    deployment.spec.template.spec.volumes = [
      {
        persistentVolumeClaim: {
          claimName: pvcName,
        },
        name: "uploads",
      },
    ];
  }

  const deploymentUrl = "https://" + getIngressHost(strapiManifests)

  const pvc = new PersistentVolumeClaim({
    metadata: {
      name: pvcName,
      annotations: {},
    },
    spec: {
      accessModes: ["ReadWriteOnce"],
      resources: {
        requests: {
          storage: "5Gi",
        },
      },
      volumeMode: "Filesystem",
    },
  });

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

  manifests.push(...strapiManifests);
  manifests.push(pvc);

  return await manifests;
};

export default async () => {
  // generate basic strapi manifests
  const manifests = await createStrapiComponent("strapi", {
    config: {
      subDomainPrefix: "backoffice-",
      image: getHarborImagePath({ name: "les1000jours-strapi" }),
      pvcName: "1000jours-strapi-uploads" // persistant storage name
    },
  });

  // add a nodeSelector to improve volume/deploy performance  // TODO
  const deployment = manifests.find(m=>m.kind==="Deployment") as Deployment;
  if (deployment && deployment?.spec?.template.spec) {
    deployment.spec.template.spec.nodeSelector = {
      workload: "les1000jours-strapi",
    };
  }
  return manifests;
};
