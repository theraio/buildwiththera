export interface FetcherOptions extends RequestInit {
  /**
   * When `true` (default) and a token exists in `lib/local-storage`,
   * attaches `Authorization: Bearer <token>`. Set to `false` to omit the
   * header regardless of whether a token exists — e.g. for calls to a
   * public endpoint.
   */
  withAuth?: boolean;
}
