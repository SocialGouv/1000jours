//

import { getEnvManifests } from "@socialgouv/kosko-charts/testing";
import { project } from "@socialgouv/kosko-charts/testing/fake/github-actions.env";

jest.setTimeout(1000 * 60);
test("kosko generate --prod", async () => {
  process.env.SOCIALGOUV_PRODUCTION_NAMESPACE = "les1000jours";
  expect(
    await getEnvManifests("prod", "", project("1000jours").prod)
  ).toMatchSnapshot();
});
