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
  const knexInstance = strapi.connections.default;

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

  await knexInstance("cartographie_pois")
    .insert(knexInstance.raw(sql))
    .onConflict("identifiant")
    .ignore();
};

const BUFFER_BATCH_SIZE = 1000;

const importToTempTable = async (source) => {
  let linesCount = 0;
  let insertCount = 0;

  const updateCounts = async (someSource) => {
    console.log(
      `[cartographie-source] file process "${someSource.nom}" processed ${linesCount} lines, inserted ${insertCount} item(s)`
    );

    await knex("cartographie_sources")
      .update({ lignes_insertion: insertCount, lignes_total: linesCount })
      .where("id", someSource.id);
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

      return processData(source, data, fileType);
    },
  });

  if (linesCount) {
    await updateCounts(source);
  }
};

const cleanTempTable = async () => {
  const knexInstance = strapi.connections.default;

  await knexInstance.schema.dropTableIfExists("import_pois");
};

const initTempTable = async () => {
  const knexInstance = strapi.connections.default;

  await knexInstance.transaction(async (transaction) => {
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
