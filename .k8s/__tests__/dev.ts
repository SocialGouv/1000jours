//

import { getEnvManifests } from "@socialgouv/kosko-charts/testing";
import { project } from "@socialgouv/kosko-charts/testing/fake/gitlab-ci.env";

jest.setTimeout(1000 * 60);
test("kosko generate --dev", async () => {
  process.env.HARBOR_PROJECT = "1000jours";
  expect(
    await getEnvManifests("dev", "", {
      ...project("1000jours").dev,
      RANCHER_PROJECT_ID: "c-bd7z2:p-7ms8p",
    })
  ).toMatchSnapshot();
});
