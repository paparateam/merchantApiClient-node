import { RequestOptions } from "./requestOptions";
import { HttpMethod } from "./httpMethod";
import { encode } from "querystring";

/**
 * PaparaRequest class is used by PaparaClient and PaparaHttpClient to create http requests to Papara API..
 * @param <T> Generic service type.
 *
 * @returns service request as json
 */
export class PaparaRequest {
  // Gets or sets a value indicating whether target environment selection. Default value is true.
  env: string;

  // Gets http method selection.
  method: HttpMethod;

  // Gets URI.
  uri: string;

  // Gets base Options.
  options: any;

  // Gets request options. Contains API Key, Target Environment and Base URL.
  requestOptions: RequestOptions;

  // Production environment URL.
  url_live = "https://merchant-api.papara.com";

  // Test environment URL.
  url_test = "https://merchant-api.test.papara.com";

  /**
   * Creates an instance of papara request.
   * @param method http method
   * @param path service url
   * @param options base options
   * @param requestOptions request options
   */
  constructor(
    method: HttpMethod,
    path: string,
    options: any,
    requestOptions: RequestOptions
  ) {
    this.method = method;
    this.options = options;
    this.requestOptions = requestOptions;
    this.env = this.requestOptions.env;

    this.uri = this.generateUri(path);
  }

  /**
   * Generate uri for papara request
   */
  generateUri = (path: string): string => {
    const url = this.env == "TEST" ? this.url_test : this.url_live;
    let uri = url + path;

    if (this.method == HttpMethod.GET || this.method == HttpMethod.PUT) {
      const qs = encode(this.options);
      uri += "?" + qs;
    }

    return uri;
  };
}
