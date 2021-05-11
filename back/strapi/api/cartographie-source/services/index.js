"use strict";

const path = require("path");

const StreamService = require("../../stream/services/Stream");
const StringService = require("../../string/services");
const ParseService = require("../../parse/services");
const CartographieCategoriesService = require("../../cartographie-categories/services");
const CartographieGeocodesService = require("../../cartographie-geocode/services");

const upsertSourceData = async (source, line, poiId, reference) => {
  const knex = strapi.connections.default;

  const sourceData = {
    identifiant: StringService.slugLower(source.identifiant, reference),
    data: line,
    cartographie_source: source.id,
    cartographie_poi: poiId,
  };

  await knex("cartographie_data")
    .insert(sourceData)
    .onConflict("identifiant")
    // TODO: merge quand le merge des entites est fait
    // .merge();
    .ignore();
};

const upsertPoi = async (source, entity, geocodeId) => {
  const knex = strapi.connections.default;

  entity.cartographie_categorie = CartographieCategoriesService.getCategorie(entity.type);
  entity.cartographie_geocode = geocodeId;

  const reference = entity.references
  entity.references = JSON.stringify([
    {
      source: source.identifiant,
      reference,
    },
  ]);

  const poi = await knex("cartographie_pois")
    .select("id")
    .whereRaw(`?? @> ?`, ["references", entity.references])
    .first();

  if (poi) {
    // poi is already in database, skip
    // TODO: merge
    return poi.id;
  }

  const result = await knex("cartographie_pois")
    .insert(entity)
    .returning("id");

  return result[0];
};

const upsertPois = async (source, dataBuffer, geocodesIds) => {
  const knex = strapi.connections.default;

  console.log(
    "[insert pois]",
    dataBuffer.length,
    "item(s), ex:",
    dataBuffer[0].entity
  );

  let index = 0;

  for (const { entity, line } of dataBuffer) {
    const reference = entity.references;

    const poiId = await upsertPoi(source, entity, geocodesIds[index]);

    await upsertSourceData(source, line, poiId, reference);

    index += 1;
  }
};

const insertPoisBuffer = async (source, dataBuffer) => {
  try {
    const geocodesIds = await CartographieGeocodesService.upsertAdresses(
      dataBuffer
    );

    await upsertPois(source, dataBuffer, geocodesIds);
  } catch (e) {
    console.error("[cartographie-source] insert error:", e);
  }
};

const formatPoiData = (source, entity) => {
  if (entity.code_postal && entity.code_postal.length < 5) {
    entity.code_postal = entity.code_postal.padStart(5, "0");
  }

  for (const key of ["position_longitude", "position_latitude"]) {
    // TODO: transform based on pois actual types
    if (entity[key]) {
      const n = parseFloat(entity[key]);

      entity[key] = !isNaN(n) ? n : null;
    }
  }
};

const processLine = (source, line, fileType) => {
  const entity = ParseService.parseLine(source.regles, line, fileType);
  if (!entity || !entity.type || !entity.references) return null;

  formatPoiData(source, entity);

  return { line, entity };
};

const BUFFER_BATCH_SIZE = 1000;

const processSource = async (source) => {
  if (!source.fichier || !source.regles) return;

  const knex = strapi.connections.default;

  await knex("cartographie_sources")
    .update({ traitement: "en_cours" })
    .where("id", source.id);

  try {
    let linesCount = 0;

    const filePath = path.join("public", source.fichier.url);

    await StreamService.processFile(filePath, {
      batchSize: BUFFER_BATCH_SIZE,
      lineProcessor: (line, fileType) => processLine(source, line, fileType),
      bufferProcessor: async (dataBuffer) => {
        await insertPoisBuffer(source, dataBuffer);

        linesCount += dataBuffer.length;

        console.log(
          `[cartographie-source] file process "${source.nom}" inserted ${linesCount} item(s)`
        );
      },
    });

    if (linesCount) {
      await knex("cartographie_sources")
        .update({ lignes: linesCount })
        .where("id", source.id);
    }

    await knex("cartographie_sources")
      .update({
        pret_a_traiter: false,
        traitement: "fait",
      })
      .where("id", source.id);

    return true;
  } catch (e) {
    console.error(e);
  }

  return false;
};

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

  return await strapi
    .query("cartographie-source")
    .findOne({ pret_a_traiter: true });
};

const processUnprocessedSources = async () => {
  const source = await fetchUnprocessedSource();
  if (!source) return 0;

  console.log(`[carto-source] traitement de "${source.nom}"`);

  const processed = await processSource(source);

  return +processed;
};

module.exports = { processUnprocessedSources };
