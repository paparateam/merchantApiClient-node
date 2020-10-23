/**
 * Papara Service Error Result type. Handles error responses returning from API.
 */
export interface PaparaError {
  // Gets or sets error messages.
  message: string;

  // Gets or sets error codes.
  code: number;
}
