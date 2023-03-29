"use strict";

const CartographieGeocodeBatchService = require("../../api/cartographie-geocode/services/batch");
const CartographieSourceService = require("../../api/cartographie-source/services");

let isGeoProcessing = false;
const getIdActivationChat = async () => {
  const res = await strapi.query("activation-chat").find();
  return res[0].id;
};

module.exports = {
  // every 20 seconds
  "*/20 * * * * *": async () => {
    if (isGeoProcessing) return;

    try {
      const processedSource =
        await CartographieSourceService.processUnprocessedSources();

      console.log("[cron] carto-source processed:", processedSource, "item");
    } catch (e) {
      console.error(`[cron] carto-source error: ${e.message}`);
      console.error(e.stack);
    }

    isGeoProcessing = true;

    try {
      const processedGeocodes =
        await CartographieGeocodeBatchService.processMissingGeocodes();

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
      const processedReverseGeocodes =
        await CartographieGeocodeBatchService.processMissingAdresses();

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

  "0 12 * * 1-5": async () => {
    await strapi
      .query("activation-chat")
      .update({ id: await getIdActivationChat() }, { activation_chat: false });
    console.log("[cron]: activation_chat -> false: Pause déjeuner");
  },
  "0 9,13 * * 1-5": async () => {
    await strapi
      .query("activation-chat")
      .update({ id: await getIdActivationChat() }, { activation_chat: true });
    console.log(
      "[cron]: activation_chat -> true: Début de journée || Fin de pause déjeuner"
    );
  },

  "30 17 * * 1-5": async () => {
    await strapi
      .query("activation-chat")
      .update({ id: await getIdActivationChat() }, { activation_chat: false });
    console.log("[cron]: activation_chat -> false: Fin de journée");
  },
};
