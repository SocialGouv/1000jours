module.exports = async (manifests) => {
  const deploy = manifests.find((manifest) => manifest.kind === "Deployment");
  // force readinessProbe.initialDelaySeconds
  deploy.spec.template.spec.containers =
    deploy.spec.template.spec.containers.map((container) => ({
      ...container,
      readinessProbe: {
        ...container.readinessProbe,
        initialDelaySeconds: 10,
      },
    }));
  return manifests;
};