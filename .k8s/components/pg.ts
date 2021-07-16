import env from "@kosko/env";
import { SealedSecret } from "@kubernetes-models/sealed-secrets/bitnami.com/v1alpha1/SealedSecret";

import { loadYaml } from "@socialgouv/kosko-charts/utils/getEnvironmentComponent";
import { updateMetadata } from "@socialgouv/kosko-charts/utils/updateMetadata";
import ci from "@socialgouv/kosko-charts/environments";

import { create } from "@socialgouv/kosko-charts/components/azure-pg";

export default async () => {
  if (env.env === "dev") {
    return create({
      env,
    });
  }

  // in prod/preprod, we try to add a fixed sealed-secret
  const secret = await loadYaml<SealedSecret>(
    env,
    `pg-user.sealed-secret.yaml`
  );
  if (!secret) {
    return [];
  }

  const envParams = ci(process.env);
  // add gitlab annotations
  updateMetadata(secret, {
    annotations: envParams.metadata.annotations || {},
    labels: envParams.metadata.labels || {},
    namespace: envParams.metadata.namespace,
  });
  return [secret];
};
