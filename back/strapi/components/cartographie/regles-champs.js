const CartographiePoi = require("../../api/cartographie-poi/models/cartographie-poi.settings");

const champs = Object.keys(CartographiePoi.attributes).filter(
  (champ) => !champ.match(/^cartographie_/)
);

module.exports = {
  collectionName: "components_cartographie_regles_champs",
  info: {
    name: "regles champs",
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
        component: "cartographie.regle-champ",
      },
    ])
  ),
};
