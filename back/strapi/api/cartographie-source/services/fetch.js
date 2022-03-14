const fetchUnprocessedSource = async () => {
  const sourceTraitementEncours = await strapi
    .query("cartographie-source")
    .findOne({ traitement: "en_cours" });

  // TODO: permettre de reprendre un import si le serveur s'arrête
  // idées :
  // - ajouter un champ "still_alive" que remplit le processSource à chaque 1000 items
  // - enregistrer le process.pid de Node pour le comparer => si diff alors le serveur a redémarré
  // - enregistrer le numero de ligne du fichier
  if (sourceTraitementEncours) {
    console.log("[carto-source] import en cours, aucun traitement");
    return null;
  }

  return strapi
    .query("cartographie-source")
    .findOne({ pret_a_traiter: true });
};

module.exports = {
  fetchUnprocessedSource,
};
