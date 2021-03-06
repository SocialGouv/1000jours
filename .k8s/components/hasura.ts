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
  },
});

export default manifests;
