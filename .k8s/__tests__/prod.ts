//

import { getEnvManifests } from "@socialgouv/kosko-charts/testing";
import { project } from "@socialgouv/kosko-charts/testing/fake/gitlab-ci.env";

jest.setTimeout(1000 * 60);
test("kosko generate --prod", async () => {
  process.env.HARBOR_PROJECT = "1000jours";
  expect(
    await getEnvManifests("prod", "'!(_*)'", project("1000jours").prod)
  ).toMatchSnapshot();
});
