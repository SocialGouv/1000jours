//

import { getEnvManifests } from "@socialgouv/kosko-charts/testing";
import { project } from "@socialgouv/kosko-charts/testing/fake/gitlab-ci.env";

jest.setTimeout(1000 * 60);
test("kosko generate --preprod", async () => {
  process.env.HARBOR_PROJECT = "1000jours";
  expect(
    await getEnvManifests("preprod", "", {
      ...project("1000jours").preprod,
      RANCHER_PROJECT_ID: "c-bd7z2:p-7ms8p",
    })
  ).toMatchSnapshot();
});
