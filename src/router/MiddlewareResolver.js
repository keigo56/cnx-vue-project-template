import middlewareList from "@/middleware/index.js";

export default class MiddlewareResolver {
  constructor(to, from) {
    this.to = to;
    this.from = from;
    this.middlewares = [];
  }

  static withContext(to, from) {
    return new MiddlewareResolver(to, from);
  }

  withEntries(entries) {
    this.middlewares = entries;

    return this;
  }

  async resolve() {
    for (const entry of this.middlewares) {
      if (typeof entry !== "string")
        throw new Error(`Invalid middleware entry: ${entry}`);

      let [middlewareName, arg] = entry.split(":");

      if (!(middlewareName in middlewareList))
        throw new Error(`Middleware "${middlewareName}" not found`);

      const middlewareFn = middlewareList[middlewareName];
      const result = await middlewareFn({ to: this.to, from: this.from }, arg);

      // If the result is an object, exit the loop and return the result
      if (result && typeof result === "object" && !Array.isArray(result)) {
        return result; // redirect object
      }

      // If the result is a boolean
      if (typeof result === "boolean") {
        if (!result) return false; // false means to stop the navigation
        continue; // true means to continue to the next middleware
      }

      // If not one of the valid types
      throw new Error(
        `Invalid return type from middleware "${middlewareName}": expected true, false, or redirect object`,
      );
    }

    return true;
  }
}
