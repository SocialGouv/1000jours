import env from "@kosko/env";
import { create } from "@socialgouv/kosko-charts/components/nginx";
import { getHarborImagePath } from "@socialgouv/kosko-charts/utils/getHarborImagePath";

const manifests = create("expo", {
  env,
  deployment: {
    image: getHarborImagePath({ name: "les1000jours-expo" }),
  },
});

export default manifests;
