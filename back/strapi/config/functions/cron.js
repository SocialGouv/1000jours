"use strict";

/**
 * Cron config that gives you an opportunity
 * to run scheduled jobs.
 *
 * The cron format consists of:
 * [SECOND (optional)] [MINUTE] [HOUR] [DAY OF MONTH] [MONTH OF YEAR] [DAY OF WEEK]
 *
 * See more details here: https://strapi.io/documentation/developer-docs/latest/concepts/configurations.html#cron-tasks
 */

const CartographieGeocodesService = require("../../api/cartographie-geocode/services");
const CartographieSourcesService = require("../../api/cartographie-source/services");

module.exports = {
  // every 10 secondes
  "*/20 * * * * *": async () => {
    try {
      const processedGeocodes = await CartographieGeocodesService.processMissingGeocodes();

      console.log("[cron] geocode processed:", processedGeocodes, "item(s)");
    } catch (e) {
      console.error(`[cron] geocode error: ${e.message}`);
      console.error(e.stack)
    }

    try {
      const processedReverseGeocodes = await CartographieGeocodesService.processMissingAdresses();

      console.log("[cron] reverse geocode processed:", processedReverseGeocodes, "item(s)");
    } catch (e) {
      console.error(`[cron] reverse geocode error: ${e.message}`);
      console.error(e.stack)
    }

    //  },
    //  // every minute
    //  "*/10 * * * * *": async () => {

    try {
      const processedSource = await CartographieSourcesService.processUnprocessedSources();

      console.log("[cron] carto-source processed:", processedSource, "item");
    } catch (e) {
      console.error(`[cron] geocode error: ${e.message}`);
      console.error(e.stack)
    }
  },
};
