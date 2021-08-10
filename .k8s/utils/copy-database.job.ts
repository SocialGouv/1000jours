/**
 * Copy a full database from another database with pg_dump/pg_restore
 *
 * needs : $FROM_DATABASE and $TO_DATABASE as PG connection strings
 *
 * */

import environments from "@socialgouv/kosko-charts/environments";
import type { IObjectMeta } from "kubernetes-models/apimachinery/pkg/apis/meta/v1";
import { Job } from "kubernetes-models/batch/v1";
import type { EnvVar } from "kubernetes-models/v1";
import { EnvFromSource } from "kubernetes-models/v1";

interface CopyDatabaseJobArgs {
  namespace: string;
  env?: EnvVar[];
  envFrom?: EnvFromSource[];
}

// renovate: datasource=docker depName=postgres versioning=11
const POSTGRES_DOCKER_VERSION = "11";

const copyScript = `
[ ! -z $FROM_DATABASE ] || (echo "No FROM_DATABASE"; exit 1)
[ ! -z $TO_DATABASE ] || (echo "No TO_DATABASE"; exit 1)

OUTFILE="/tmp/out.sql"

echo "dumping to \${OUTFILE} from \${FROM_DATABASE##*@}"
pg_dump --clean --verbose --no-owner --no-acl -U postgres -f \${OUTFILE} --dbname \${FROM_DATABASE}

echo "restoring from \${OUTFILE} to \${TO_DATABASE##*@}"
cat \${OUTFILE} | psql \${TO_DATABASE}

echo "Finished"

exit 0
`;

export const copyDatabaseJob = ({
  namespace,
  env = [],
  envFrom = [],
}: CopyDatabaseJobArgs): { metadata?: IObjectMeta; kind: string }[] => {
  const ciEnv = environments(process.env);

  const manifests = [];

  const jobSpec = {
    containers: [
      {
        command: ["sh", "-c", copyScript],
        env,
        envFrom,
        image: `postgres:${POSTGRES_DOCKER_VERSION}`,
        imagePullPolicy: "IfNotPresent",
        name: "copy-db",
        resources: {
          limits: {
            cpu: "300m",
            memory: "512Mi",
          },
          requests: {
            cpu: "100m",
            memory: "64Mi",
          },
        },
        volumeMounts: [],
      },
    ],
    restartPolicy: "OnFailure",
    volumes: [],
  };

  const job = new Job({
    metadata: {
      name: `copy-db-${ciEnv.shortSha}`,
      namespace,
    },
    spec: {
      backoffLimit: 0,
      template: {
        metadata: {},
        spec: jobSpec,
      },
      ttlSecondsAfterFinished: 86400,
    },
  });

  manifests.push(job);

  return manifests;
};
