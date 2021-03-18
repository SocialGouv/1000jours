import env from "@kosko/env";

import { create } from "@socialgouv/kosko-charts/components/hasura";
import { getHarborImagePath } from "@socialgouv/kosko-charts/utils/getHarborImagePath";

const manifests = create({
  env,
  config: {
    ingress: true,
  },
  deployment: {
    image: getHarborImagePath({ name: "les1000jours-hasura" }),
    container: {
      livenessProbe: {
        failureThreshold: 10,
        initialDelaySeconds: 60,
        periodSeconds: 20,
      },
      readinessProbe: {
        failureThreshold: 10,
        initialDelaySeconds: 60,
        periodSeconds: 20,
      },
      startupProbe: {
        failureThreshold: 10,
        initialDelaySeconds: 120,
      },
    },
  },
});

export default manifests;
