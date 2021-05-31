const CartographieCategories = require("../models/cartographie-categories.settings");

const getCategorie = (type) =>
  Object.keys(CartographieCategories.attributes).find(
    (categorie) =>
      CartographieCategories.attributes[categorie].enum.indexOf(type) !== -1
  );

module.exports = { getCategorie };
