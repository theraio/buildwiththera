import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merges Tailwind class names, resolving conflicting utility classes (via
 * `tailwind-merge`) after combining conditional class values (via `clsx`).
 *
 * @param inputs - Class values: strings, conditionals, arrays, etc.
 * @returns The merged, conflict-resolved class string.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
