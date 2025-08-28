// use relative path to allow running in browser and in Node.js
import Container from "../../node_modules/@teqfw/di/src/Container.js";

// In Chrome extension context (ESM)
const url = new URL(import.meta.url);
const appDir = new URL("./di", url).href;
const openAiDir = new URL("../../node_modules/openai", url).href;

/** @type {TeqFw_Di_Container} */
const container = new Container();
// Get the resolver from the container
const resolver = container.getResolver();

// Define the namespace root for dependencies, allowing the container to resolve identifiers like 'App_*'
resolver.addNamespaceRoot("GptExt_", appDir);
resolver.addNamespaceRoot("openai_", openAiDir);

export default container;
