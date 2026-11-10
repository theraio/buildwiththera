import "@testing-library/jest-dom/vitest";

// jsdom doesn't implement ResizeObserver, but cmdk's CommandList (used by
// the Combobox component) observes its own size on mount.
class ResizeObserverStub {
  observe() {}
  unobserve() {}
  disconnect() {}
}

if (typeof globalThis.ResizeObserver === "undefined") {
  globalThis.ResizeObserver =
    ResizeObserverStub as unknown as typeof ResizeObserver;
}

// jsdom also doesn't implement scrollIntoView, which cmdk calls to keep the
// highlighted item in view.
if (typeof Element.prototype.scrollIntoView === "undefined") {
  Element.prototype.scrollIntoView = () => {};
}

// jsdom doesn't implement the Pointer Capture API, which Radix Select calls
// directly on the event target during its pointerdown handling.
if (typeof Element.prototype.hasPointerCapture === "undefined") {
  Element.prototype.hasPointerCapture = () => false;
}
if (typeof Element.prototype.setPointerCapture === "undefined") {
  Element.prototype.setPointerCapture = () => {};
}
if (typeof Element.prototype.releasePointerCapture === "undefined") {
  Element.prototype.releasePointerCapture = () => {};
}
