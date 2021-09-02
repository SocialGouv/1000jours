/**
 * Copy preprod database to current environnement database
 *
 * needs : azure-pg-user-preprod.sealed-secret.yaml
 *
 * */

import env from "@kosko/env";
import { EnvVar } from "kubernetes-models/v1";
import ci from "@socialgouv/kosko-charts/environments";
import { getDevDatabaseParameters } from "@socialgouv/kosko-charts/components/azure-pg/params";
import { getPgServerHostname } from "@socialgouv/kosko-charts/utils/getPgServerHostname";
import { copyDatabaseJob } from "../../../utils/copy-database.job";
import { createSecret } from "@socialgouv/kosko-charts/components/pg-secret";
import { getDefaultPgParams } from "@socialgouv/kosko-charts/components/azure-pg";
import { updateMetadata } from "@socialgouv/kosko-charts/utils/updateMetadata";

const getAzUserPgParams = (branch: string) => {
  const ciEnv = ci(process.env);
  const suffix = branch;
  const projectName = ciEnv.projectName;
  return {
    ...getDevDatabaseParameters({ suffix }),
    host: getPgServerHostname(projectName, "dev"),
    name: `azure-pg-user-${suffix}`,
  };
};
export default async () => {
  // extract appropriate secrets for the copy script
  const manifests = [];

  // only restore Dbs in dev
  if (env.env !== "dev") {
    return [];
  }

  const envParams = ci(process.env);
  const developDb = getAzUserPgParams("develop");
  const currentDb = getDefaultPgParams();

  const namespace = envParams.metadata.namespace.name;

  const job = copyDatabaseJob({
    namespace,
    env: [
      // the source database connection string
      new EnvVar({
        name: "FROM_DATABASE",
        valueFrom: {
          secretKeyRef: {
            name: developDb.name,
            key: "DATABASE_URL",
          },
        },
      }),
      // the destination database connection string
      new EnvVar({
        name: "TO_DATABASE",
        valueFrom: {
          secretKeyRef: {
            name: currentDb.name, // holds the env secret name
            key: "DATABASE_URL",
          },
        },
      }),
    ],
  });

  const developSecret = createSecret(developDb);
  updateMetadata(developSecret, {
    annotations: envParams.metadata.annotations,
    labels: envParams.metadata.labels,
    name: developDb.name,
    namespace: envParams.metadata.namespace,
  });

  return [job, developSecret];
};
