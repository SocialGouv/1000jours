const CartographiePoi = require("../../api/cartographie-poi/models/cartographie-poi.settings");
const Adresse = require("./adresse.json");

const champs = [
  ...Object.keys(CartographiePoi.attributes),
  ...Object.keys(Adresse.attributes),
].filter((champ) => !champ.match(/^(?:cartographie|geocode|identifiant)/));

const components = {
  type: "cartographie.regle-type",
};

module.exports = {
  attributes: Object.fromEntries(
    champs.map((champ) => [
      champ,
      {
        component: components[champ] || "cartographie.regle-champ",
        repeatable: true,
        type: "component",
      },
    ])
  ),
  collectionName: "components_cartographie_regles_champs",
  info: {
    description: "",
    icon: "cogs",
    name: "Source Regles",
  },
  options: {},
};
