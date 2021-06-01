const CartographiePoi = require("../../api/cartographie-poi/models/cartographie-poi.settings");
const Adresse = require("./adresse.json");

const champs = [
  ...Object.keys(CartographiePoi.attributes),
  ...Object.keys(Adresse.attributes),
].filter((champ) => !champ.match(/^cartographie|geocode/));

const components = {
  type: "cartographie.regle-type",
};

module.exports = {
  collectionName: "components_cartographie_regles_champs",
  info: {
    name: "Source Regles",
    icon: "cogs",
    description: "",
  },
  options: {},
  attributes: Object.fromEntries(
    champs.map((champ) => [
      champ,
      {
        type: "component",
        repeatable: true,
        component: components[champ] || "cartographie.regle-champ",
      },
    ])
  ),
};
