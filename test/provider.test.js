import test from "node:test";
import assert from "node:assert/strict";
import container from "../src/js/container.js";
import openaiMock from "./openai.mock.js";

container.enableTestMode();

const repoFactory = (settings) => ({
  async load() {
    return settings;
  },
});

const getTester = async (settings) => {
  container.register("openai_index", openaiMock);
  container.register("GptExt_Store_SettingsRepo$", repoFactory(settings));
  return await container.get("GptExt_Provider_TestOpenAI$$");
};

test("returns text on success", async () => {
  const tester = await getTester({ baseUrl: "x", model: "m", apiKey: "ok" });
  const res = await tester.run();
  assert.equal(res, "mock-response");
});

test("maps 401 to friendly message", async () => {
  const tester = await getTester({ baseUrl: "x", model: "m", apiKey: "401" });
  const res = await tester.run();
  assert.equal(res, "Unauthorized / Forbidden. Check API key or org settings.");
});

test("maps 429 to rate limit", async () => {
  const tester = await getTester({ baseUrl: "x", model: "m", apiKey: "429" });
  const res = await tester.run();
  assert.equal(res, "Rate limit.");
});

test("maps aborted request to timeout", async () => {
  const tester = await getTester({ baseUrl: "x", model: "m", apiKey: "timeout" });
  const res = await tester.run();
  assert.equal(res, "Network/timeout.");
});
