/**
 * While sending a request to API, request options help configurating the request.
 */
export interface RequestOptions {
  // Gets or sets API KEY for merchant.
  apiKey: string;

  // Gets or sets a value indicating whether target environment is test or production.
  env: string;
}
