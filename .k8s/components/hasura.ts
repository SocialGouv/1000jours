import env from "@kosko/env";

import { create } from "@socialgouv/kosko-charts/components/hasura";
import {
  getHarborImagePath,
  getDeployment,
  addWaitForService,
} from "@socialgouv/kosko-charts/utils";

const manifests = create({
  env,
  config: {
    ingress: true,
    subDomainPrefix: "api-",
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
        failureThreshold: 20,
        initialDelaySeconds: 90,
      },
    },
  },
});

//@ts-expect-error
const deploy = getDeployment(manifests);
addWaitForService(deploy, "strapi");

export default manifests;
