/**
 * Reads and JSON-parses a value from `localStorage`.
 *
 * @param key - The storage key to read.
 * @param fallback - Returned when running on the server, the key is absent,
 * or the stored value can't be parsed as JSON.
 * @returns The parsed value, or `fallback`.
 */
export function getStorageItem<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;

  try {
    const raw = window.localStorage.getItem(key);
    return raw === null ? fallback : (JSON.parse(raw) as T);
  } catch {
    return fallback;
  }
}

/**
 * Writes a JSON-serialized value to `localStorage`. No-ops on the server
 * and swallows quota-exceeded/serialization errors rather than throwing —
 * a storage failure shouldn't crash the caller.
 *
 * @param key - The storage key to write.
 * @param value - The value to serialize and store.
 * @returns void
 */
export function setStorageItem<T>(key: string, value: T): void {
  if (typeof window === "undefined") return;

  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.warn(`Failed to write localStorage key "${key}":`, error);
  }
}

/**
 * Removes a key from `localStorage`. No-ops on the server.
 *
 * @param key - The storage key to remove.
 * @returns void
 */
export function removeStorageItem(key: string): void {
  if (typeof window === "undefined") return;

  window.localStorage.removeItem(key);
}
