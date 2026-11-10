/**
 * Attaches sub-components onto a root component as static properties, so a
 * single import exposes composition via dot-notation (e.g. `Card.Header`,
 * `ComboboxCore.Trigger`) — the namespace pattern compound components in
 * `components/ui/` use instead of exporting every part separately.
 *
 * @param root - The root component (or any object) to attach parts onto.
 * @param parts - A map of sub-component name to sub-component.
 * @returns The same `root` reference, typed as `TRoot & TParts`.
 */
export function createNamespaceComponent<
  TRoot extends object,
  TParts extends Record<string, unknown>,
>(root: TRoot, parts: TParts): TRoot & TParts {
  return Object.assign(root, parts);
}
