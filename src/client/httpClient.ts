import fetch from "node-fetch";
import { RequestOptions } from "./requestOptions";
import { PaparaRequest } from "./paparaRequest";
import { HttpMethod } from "./httpMethod";
/**
 * Base HTTP Client for PaparaClient.
 * @param <T> Generic service type.
 *
 * @returns service request as json
 */
export class PaparaHttpClient<T> {
  request = async (
    method: HttpMethod,
    path: string,
    baseOptions: any,
    requestOptions: RequestOptions
  ): Promise<T> => {
    const headers = {
      ApiKey: requestOptions.apiKey,
      Accept: "application/json",
      "Content-Type": "application/json"
    };

    /**
     * Initialize request
     */
    const request = new PaparaRequest(
      method,
      path,
      baseOptions,
      requestOptions
    );

    // Initialize fetch options
    try {
      const fetchOptions = {
        method: method.toString(),
        headers
      } as any;

      // If request method is post, convert base options to json and assign to fetch body
      if (request.method == HttpMethod.POST) {
        fetchOptions.body = JSON.stringify(baseOptions);
      }

      // fetch response
      const response = await fetch(request.uri, fetchOptions);

      // if request succeeds, convert response to json
      if (response.status == 200) {
        const json = await response.json();
        return json;
      } else {
        throw new Error(response.statusText);
      }
    } catch (err) {
      throw new Error(err);
    }
  };
}
