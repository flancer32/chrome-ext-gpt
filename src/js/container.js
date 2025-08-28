// Comments in code must be in English
// Works in: Chrome extension (MV3), plain browser (http/https), and Node.js (ESM)
import Container from "../../node_modules/@teqfw/di/src/Container.js";

// FUNCS
/**
 * Resolve relative directory URL against a base URL.
 * @param {URL} fromUrl
 * @param {string} rel
 * @returns
 */
function relDir(fromUrl, rel) {
  return new URL(rel, fromUrl).href;
}

// MAIN

/** @type {TeqFw_Di_Container} */
const container = new Container();
const resolver = container.getResolver();

// Namespace roots MUST always be built via new URL(..., import.meta.url).
// Absolute paths ("/home/…", "file://…") are forbidden, because they break in Chrome Extension (MV3).
// Valid examples:
//   const appRoot = new URL("./di/", import.meta.url).href;
//   const openaiRoot = new URL("../../node_modules/openai/", import.meta.url).href;
const here = new URL(import.meta.url);
// App DI root (your own modules)
const appRoot = relDir(here, "./di/");
// Vendor root(s) from node_modules (ESM only)
const openaiRoot = relDir(here, "../../node_modules/openai/");

// Register namespace roots. Example depIds:
//  - "GptExt_Store_SettingsRepo$" -> src/js/di/Store/SettingsRepo.js
//  - "openai_index"               -> node_modules/openai/index.js
resolver.addNamespaceRoot("GptExt_", appRoot);
resolver.addNamespaceRoot("openai_", openaiRoot, "mjs");

export default container;
