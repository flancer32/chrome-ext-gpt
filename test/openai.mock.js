// Simple mock for OpenAI package
export class OpenAI {
  constructor(opts = {}) {
    this.apiKey = opts.apiKey;
  }

  models = {
    async list() {
      return { data: [{ id: "mock-model" }] };
    },
  };

  chat = {
    completions: {
      create: async () => {
        if (this.apiKey === "401") throw new Error("401 Unauthorized");
        if (this.apiKey === "429") throw new Error("429 Too Many Requests");
        if (this.apiKey === "timeout") throw new Error("aborted");
        return { choices: [{ message: { content: "mock-response" } }] };
      },
    },
  };
}

export default { OpenAI };
