"use strict";

const path = require("path");

const FileService = require("../../file/services");
const ParseService = require("../../parse/services");

const { fetchUnprocessedSource } = require("./fetch");
const { formatPoiFromData } = require("./format");
const { upsertPoiData } = require("./update");

const knex = (...args) => strapi.connections.default(...args);

const processData = (source, data, fileType) => {
  const entity = ParseService.parseLine(data, source.regles, fileType);

  if (!entity || !entity.type || !entity.references) return null;

  formatPoiFromData(source, entity);

  return { data, entity };
};

const BUFFER_BATCH_SIZE = 1000;

const updateCounts = async (source, linesCount, insertCount) => {
  console.log(
    `[cartographie-source] file process "${source.nom}" processed ${linesCount} lines, inserted ${insertCount} item(s)`
  );

  await knex("cartographie_sources")
    .update({ lignes_total: linesCount, lignes_insertion: insertCount })
    .where("id", source.id);
};

const processSource = async (source) => {
  if (!source.fichier || !source.regles) return false;

  await knex("cartographie_sources")
    .update({ traitement: "en_cours" })
    .where("id", source.id);

  try {
    let linesCount = 0;
    let insertCount = 0;

    const filePath = path.join("public", source.fichier.url);

    await FileService.process(filePath, {
      batchSize: BUFFER_BATCH_SIZE,
      lineProcessor: async (data, fileType) => {
        linesCount += 1;

        const result = processData(source, data, fileType);
        if (result) insertCount += await upsertPoiData(source, result);

        if (linesCount % BUFFER_BATCH_SIZE === 0)
          await updateCounts(source, linesCount, insertCount);
      },
    });

    if (linesCount) {
      await updateCounts(source, linesCount, insertCount);
    }

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
