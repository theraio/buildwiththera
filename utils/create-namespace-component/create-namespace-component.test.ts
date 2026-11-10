import { describe, expect, it } from "vitest";

import { createNamespaceComponent } from "./create-namespace-component";

describe("createNamespaceComponent", () => {
  it("mutates and returns the same root reference", () => {
    function root() {}
    const namespaced = createNamespaceComponent(root, { part: () => {} });

    expect(namespaced).toBe(root);
  });

  it("attaches every key from the parts object onto the root", () => {
    function root() {}
    const part = () => "part";
    const namespaced = createNamespaceComponent(root, { part });

    expect(namespaced.part).toBe(part);
  });

  it("attaches more than one part at once", () => {
    function root() {}
    const first = () => "first";
    const second = () => "second";
    const namespaced = createNamespaceComponent(root, { first, second });

    expect(namespaced.first).toBe(first);
    expect(namespaced.second).toBe(second);
  });

  it("works with a plain object root, not just functions", () => {
    const root = { label: "root" };
    const namespaced = createNamespaceComponent(root, { extra: 42 });

    expect(namespaced.label).toBe("root");
    expect(namespaced.extra).toBe(42);
  });

  it("overwrites an existing property on the root when the part name collides", () => {
    const root = Object.assign(function root() {}, { part: "original" });
    const replacement = () => "replacement";
    const namespaced = createNamespaceComponent(root, { part: replacement });

    expect(namespaced.part).toBe(replacement);
  });
});
