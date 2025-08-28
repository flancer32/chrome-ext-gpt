// src/js/container.js
// Works in: Chrome extension (MV3), plain browser (http/https), and Node.js (ESM)

import Container from "../../node_modules/@teqfw/di/src/Container.js";

// -- helpers
// Comments in code must be in English
function relDir(fromUrl, rel) {
 return new URL(rel, fromUrl).href;
}

// -- roots
const here = new URL(import.meta.url);

// App DI root (your own modules)
const appRoot = relDir(here, "./di/");

// Vendor root(s) from node_modules (ESM only)
const openaiRoot = relDir(here, "../../node_modules/openai/");

// -- container
/** @type {TeqFw_Di_Container} */
const container = new Container();
const resolver = container.getResolver();

// Register namespace roots. Example depIds:
//  - "GptExt_Store_SettingsRepo$" -> src/js/di/Store/SettingsRepo.js
//  - "openai_index"               -> node_modules/openai/index.js
resolver.addNamespaceRoot("GptExt_", appRoot);
resolver.addNamespaceRoot("openai_", openaiRoot, "mjs");

export default container;
