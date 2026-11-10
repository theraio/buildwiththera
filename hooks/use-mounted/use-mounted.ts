import { useSyncExternalStore } from "react";

const subscribeNever = () => () => {};

// The server can't know the stored/system theme, so the active option
// only renders once hydrated on the client — this returns `false` for the
// server render and the first client render (matching output, no
// mismatch), then `true` after.
function useMounted() {
  return useSyncExternalStore(
    subscribeNever,
    () => true,
    () => false,
  );
}

export { useMounted };
