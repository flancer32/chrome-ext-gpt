import Container from "../../node_modules/@teqfw/di/src/Container.js";

// In Chrome extension context (ESM)
const url = new URL(import.meta.url);
// url.href -> full URL to this module
const currentDir = url.href.substring(0, url.href.lastIndexOf("/") + 1);

/** @type {TeqFw_Di_Container} */
const container = new Container();
// Get the resolver from the container
const resolver = container.getResolver();

// Define the namespace root for dependencies, allowing the container to resolve identifiers like 'App_*'
resolver.addNamespaceRoot("GptExt_", currentDir + "di");

export default container;
