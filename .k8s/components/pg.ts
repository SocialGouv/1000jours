import env from "@kosko/env";
import { create } from "@socialgouv/kosko-charts/components/azure-pg";

export default create("pg-user", {
  env,
  config: {
    pgHost: "les1000joursdevserver.postgres.database.azure.com"
  }
});
