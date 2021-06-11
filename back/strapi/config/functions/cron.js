"use strict";

const CartographieGeocodeBatchService = require("../../api/cartographie-geocode/services/batch");
const CartographieSourceService = require("../../api/cartographie-source/services");

let isGeoProcessing = false;

module.exports = {
  // every 20 seconds
  "*/20 * * * * *": async () => {
    if (isGeoProcessing) return;

    try {
      const processedSource = await CartographieSourceService.processUnprocessedSources();

      console.log("[cron] carto-source processed:", processedSource, "item");
    } catch (e) {
      console.error(`[cron] carto-source error: ${e.message}`);
      console.error(e.stack);
    }

    isGeoProcessing = true;

    try {
      const processedGeocodes = await CartographieGeocodeBatchService.processMissingGeocodes();

      console.log(
        "[cron] carto-geocode processed:",
        processedGeocodes,
        "item(s)"
      );
    } catch (e) {
      console.error(`[cron] carto-geocode error: ${e.message}`);
      console.error(e.stack);
    }

    try {
      const processedReverseGeocodes = await CartographieGeocodeBatchService.processMissingAdresses();

      console.log(
        "[cron] carto-reverse-geocode processed:",
        processedReverseGeocodes,
        "item(s)"
      );
    } catch (e) {
      console.error(`[cron] carto-reverse-geocode error: ${e.message}`);
      console.error(e.stack);
    }

    isGeoProcessing = false;
  },
};
