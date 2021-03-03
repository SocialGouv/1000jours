import env from "@kosko/env";

import { create } from "@socialgouv/kosko-charts/components/app";
import { getHarborImagePath } from "@socialgouv/kosko-charts/utils/getHarborImagePath";
import { Service } from "kubernetes-models/api/core/v1/Service";

const probes = {
  livenessProbe: {
    httpGet: {
      path: "/",
      port: "http",
    },
  },
  readinessProbe: {
    httpGet: {
      path: "/",
      port: "http",
    },
  },
  // increase startup delay
  startupProbe: {
    initialDelaySeconds: 60,
    httpGet: {
      path: "/",
      port: "http",
    },
  },
};

const resources = {
  requests: {
    cpu: "500m",
    memory: "256Mi",
  },
  limits: {
    cpu: "1000m",
    memory: "512Mi",
  },
};

const container = {
  // override probes path
  ...probes,
  resources,
};

const manifests1 = create("expo", {
  env,
  config: {
    // 19000: packager
    // 19002: web ui
    containerPort: 19000,
  },
  deployment: {
    image: getHarborImagePath({ name: "les1000jours-front" }),
    container,
  },
});

const manifests2 = create("expo-metro", {
  env,
  config: {
    // 19000: packager
    // 19002: web ui
    containerPort: 19002,
    subDomainPrefix: "expo-metro-",
  },
  deployment: {
    image: getHarborImagePath({ name: "les1000jours-front" }),
    container,
  },
});

export default [...manifests1, ...manifests2];
