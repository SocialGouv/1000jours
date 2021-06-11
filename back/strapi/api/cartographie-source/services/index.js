"use strict";

const path = require("path");

const FileService = require("../../file/services");
const ParseService = require("../../parse/services");

const { fetchUnprocessedSource } = require("./fetch");
const { formatPoiFromData } = require("./format");

const knex = (...args) => strapi.connections.default(...args);

const processData = (source, data, fileType) => {
  const entity = ParseService.parseLine(data, source.regles, fileType);

  if (!entity || !entity.type || !entity.references) return null;

  return formatPoiFromData(source, entity, data);
};

const transferTempTableToPois = async () => {
  const knex = strapi.connections.default;

  const sql = `
 (
   type,
   nom,
   telephone,
   courriel,
   site_internet,
   identifiant,
   cartographie_adresses_json,
   cartographie_references_json
 )
 SELECT
   type,
   nom,
   telephone,
   courriel,
   site_internet,
   identifiant,
   array_to_json(array_agg(cartographie_adresses_json)) AS cartographie_adresses_json,
   array_to_json(array_agg(cartographie_references_json)) AS cartographie_references_json
 FROM import_pois
 GROUP BY identifiant, type, nom, telephone, courriel, site_internet
`;

  await knex("cartographie_pois")
    .insert(knex.raw(sql))
    .onConflict("identifiant")
    .ignore()
    .debug();
};

const BUFFER_BATCH_SIZE = 1000;

const importToTempTable = async (source) => {
  let linesCount = 0;
  let insertCount = 0;

  const updateCounts = async (source) => {
    console.log(
      `[cartographie-source] file process "${source.nom}" processed ${linesCount} lines, inserted ${insertCount} item(s)`
    );

    await knex("cartographie_sources")
      .update({ lignes_insertion: insertCount, lignes_total: linesCount })
      .where("id", source.id);
  };

  const filePath = path.join("public", source.fichier.url);

  await FileService.process(filePath, {
    batchSize: BUFFER_BATCH_SIZE,
    bufferProcessor: async (buffer) => {
      await knex("import_pois").insert(buffer);

      insertCount += buffer.length;

      await updateCounts(source);
    },
    lineProcessor: async (data, fileType) => {
      linesCount += 1;

      const result = processData(source, data, fileType);

      return result;
    },
  });

  if (linesCount) {
    await updateCounts(source);
  }
};

const cleanTempTable = async () => {
  const knex = strapi.connections.default;

  await knex.schema.dropTableIfExists("import_pois");
};

const initTempTable = async () => {
  const knex = strapi.connections.default;

  await knex.transaction(async (transaction) => {
    await transaction.schema.dropTableIfExists("import_pois");
    await transaction.raw(
      `create table import_pois as table cartographie_pois WITH NO DATA`
    );
  });
};

const processSource = async (source) => {
  if (!source.fichier || !source.regles) return false;

  await knex("cartographie_sources")
    .update({ traitement: "en_cours" })
    .where("id", source.id);

  try {
    await initTempTable();
    await importToTempTable(source);
    await transferTempTableToPois();
    await cleanTempTable();

    await knex("cartographie_sources")
      .update({ pret_a_traiter: false, traitement: "fait" })
      .where("id", source.id);

    return true;
  } catch (e) {
    console.error(e);
  }

  return false;
};

const processUnprocessedSources = async () => {
  const source = await fetchUnprocessedSource();
  if (!source) return 0;

  console.log(`[carto-source] traitement de "${source.nom}"`);

  const processed = await processSource(source);

  return +processed;
};

module.exports = {
  processUnprocessedSources,
};
