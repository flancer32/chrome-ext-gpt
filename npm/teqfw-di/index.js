export class Container {
  constructor() {
    this.factories = new Map();
    this.instances = new Map();
  }
  async register(name, deps = [], factory) {
    this.factories.set(name, { deps, factory });
  }
  async get(name) {
    if (this.instances.has(name)) return this.instances.get(name);
    const entry = this.factories.get(name);
    if (!entry) throw new Error(`Service not found: ${name}`);
    const { deps, factory } = entry;
    const resolved = [];
    for (const dep of deps) resolved.push(await this.get(dep));
    const instance = await factory(...resolved);
    this.instances.set(name, instance);
    return instance;
  }
}
