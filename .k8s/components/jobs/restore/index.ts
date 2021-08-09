/**
 * Copy preprod database to current environnement database
 *
 * needs : azure-pg-user-preprod.sealed-secret.yaml
 *
 * */

import env from "@kosko/env";
import path from "path";
import { getDefaultPgParams } from "@socialgouv/kosko-charts/components/azure-pg";
import { EnvVar } from "kubernetes-models/v1";
const { loadFile } = require("@kosko/yaml");
import ci from "@socialgouv/kosko-charts/environments";

import { copyDatabaseJob } from "../../../utils/copy-database.job";
import { SealedSecret } from "@kubernetes-models/sealed-secrets/bitnami.com/v1alpha1/SealedSecret";

export default async () => {
  // extract appropriate secrets for the copy script
  const manifests = [];

  // only restore Dbs in dev
  if (env.env !== "dev") {
    return [];
  }

  const envParams = ci(process.env);

  const currentDb = getDefaultPgParams();

  const namespace = envParams.metadata.namespace.name;

  manifests.push(
    copyDatabaseJob({
      namespace,
      env: [
        // the source database connection string
        new EnvVar({
          name: "FROM_DATABASE",
          valueFrom: {
            secretKeyRef: {
              name: "azure-pg-user-preprod",
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
    })
  );

  // embed preprodSecret in correct namespace
  const preprodSecret = loadFile(
    path.join(__dirname, "azure-pg-user-preprod.sealed-secret.yaml"),
    {
      transform(preprodSecret: SealedSecret) {
        if (preprodSecret && preprodSecret.metadata) {
          preprodSecret.metadata.namespace = namespace;
        }
        return preprodSecret;
      },
    }
  );

  manifests.push(preprodSecret);

  return manifests;
};
