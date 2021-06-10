import gitlab from "@socialgouv/kosko-charts/environments/gitlab";
import { getHarborImagePath } from "@socialgouv/kosko-charts/utils/getHarborImagePath";
import { PersistentVolume } from "kubernetes-models/v1/PersistentVolume";
import { PersistentVolumeClaim } from "kubernetes-models/v1/PersistentVolumeClaim";
import { StatefulSet } from "kubernetes-models/api/apps/v1/StatefulSet";

const gitlabEnv = gitlab(process.env);

const manifests = [];

const metadata = {
  name: "strapi"
}
const labels = {
  app: "strapi",
  application: "les1000jours",
  "kapp.k14s.io/association": "v1.0ca971a8780eb9d97118810a6b8e657a",
  owner: "les1000jours",
  team: "les1000jours"
}
const annotations = {
  "app.gitlab.com/app": "socialgouv-1000jours-les1000jours",
  "app.gitlab.com/env": "prod2",
  "app.gitlab.com/env.name": "prod2",
  "kapp.k14s.io/disable-default-label-scoping-rules": "",
  "kapp.k14s.io/disable-default-ownership-label-rules": ""
}
const pvc = new PersistentVolumeClaim({
  metadata: {
    name: "uploads",
    annotations: {},
  },
  spec: {
    accessModes: ["ReadWriteMany"],
    resources: {
      requests: {
        storage: "10Gi",
      },
    },
    storageClassName: "les1000jours"
  },
});

const statefulSet = new StatefulSet({
  metadata,
  spec: {
    serviceName: "strapi",
    replicas: 1,
    selector: {
      matchLabels: {
        app: "strapi"
      }
    },
    template: {
      metadata: {
        annotations,
        labels
      },
      spec: {
        containers: [
          {
            name: "strapi",
            image: getHarborImagePath({ name: "les1000jours-strapi" }),
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
                cpu: "5m",
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
            env: [
              {
                name: "BACKOFFICE_URL",
                value: "https://backoffice-" + gitlabEnv.subdomain + "." + gitlabEnv.domain,
              },
              {
                name: "DATABASE_CLIENT",
                value: "postgres",
              },
              {
                name: "DATABASE_NAME",
                value: "$(PGDATABASE)",
              },
              {
                name: "DATABASE_HOST",
                value: "$(PGHOST)",
              },
              {
                name: "DATABASE_PORT",
                value: "$(PGPORT)",
              },
              {
                name: "DATABASE_USERNAME",
                value: "$(PGUSER)",
              },
              {
                name: "DATABASE_PASSWORD",
                value: "$(PGPASSWORD)",
              },
              {
                name: "DATABASE_SSL",
                value: "true",
              },
            ],
          },
        ],
        initContainers: [
          {
            name: "wait-for-postgres",
            image: "ghcr.io/socialgouv/docker/wait-for-postgres:6.0.1",
            imagePullPolicy: "Always",
            resources: {
              requests: {
                cpu: "5m",
                memory: "16Mi",
              },
              limits: {
                cpu: "20m",
                memory: "32Mi",
              },
            },
            terminationMessagePath: "/dev/termination-log",
            terminationMessagePolicy: "File",
            env: [
              {
                name: "WAIT_FOR_RETRIES",
                value: "24"
              }
            ],
            envFrom: [
              {
                secretRef: {
                  name: "azure-pg-user"
                }
              }
            ]
          }
        ]
      }
    },
    volumeClaimTemplates: [pvc]
  }
})

const persistentVolume = new PersistentVolume({
  metadata: {
    name: "les1000jours-pv",
    labels: {
      usage: "les1000jours-pv"
    }
  },
  spec: {
    capacity: {
      storage: "10Gi"
    },
    accessModes: ["ReadWriteMany"],
    storageClassName: "les1000jours",
    persistentVolumeReclaimPolicy: "Retain",
    azureFile: {
      secretName: "azure-les1000joursprod-volume",
      secretNamespace: "les1000jours-secret",
      shareName: "uploads"
    }
  }
})

manifests.push(persistentVolume);
manifests.push(statefulSet);

export default manifests;
