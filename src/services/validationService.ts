import { RequestOptions } from "../client/requestOptions";
import { PaparaHttpClient } from "../client/httpClient";
import { PaparaSingleResult } from "../common/paparaSingleResult";
import { PaparaListResult } from "../common/paparaListResult";
import { HttpMethod } from "../client/httpMethod";
import { Validation } from "../entities";
import {
  ValidationByAccountNumberOptions,
  ValidationByEmailOptions,
  ValidationByIdOptions,
  ValidationByPhoneNumberOptions,
  ValidationByTcknOptions
} from "../options";

/**
 * Validation service will be used for validating an end user. Validation can be performed by account number, e-mail address, phone number, national identity number.
 */
export class ValidationService {
  private requestOptions: RequestOptions;

  /**
   * Initializes a new instance of the Validation Service
   * @param apiKey merchant api key
   * @param env environment selection
   */
  constructor(apiKey: string, env: string) {
    this.requestOptions = { apiKey, env };
  }

  /**
   * Returns end user information for validation by given user ID
   *
   * @param ValidationByIdOptions Validate by ID Options
   * @returns PaparaSingleResult<Validation> Validation Information
   */
  validateById = async (
    options: ValidationByIdOptions
  ): Promise<PaparaSingleResult<Validation>> => {
    const client = new PaparaHttpClient<PaparaSingleResult<Validation>>();

    const result = await client.request(
      HttpMethod.GET,
      "/validation/id",
      options,
      this.requestOptions
    );

    return result;
  };

  /**
   * Returns end user information for validation by given user's account number.
   *
   * @param ValidationByAccountNumberOptions Validate by Account Number Options
   * @returns PaparaSingleResult<Validation> Validation Information
   */
  validateByAccountNumber = async (
    options: ValidationByAccountNumberOptions
  ): Promise<PaparaSingleResult<Validation>> => {
    const client = new PaparaHttpClient<PaparaSingleResult<Validation>>();

    const result = await client.request(
      HttpMethod.GET,
      "/validation/accountNumber",
      options,
      this.requestOptions
    );

    return result;
  };

  /**
   * Returns end user information for validation by given user's phone number.
   *
   * @param ValidationByPhoneNumberOptions Validate by Phone Number Options
   * @returns PaparaSingleResult<Validation> Validation Information
   */
  validateByPhoneNumber = async (
    options: ValidationByPhoneNumberOptions
  ): Promise<PaparaSingleResult<Validation>> => {
    const client = new PaparaHttpClient<PaparaSingleResult<Validation>>();

    const result = await client.request(
      HttpMethod.GET,
      "/validation/phoneNumber",
      options,
      this.requestOptions
    );

    return result;
  };

  /**
   * Returns end user information for validation by given user's e-mail address
   *
   * @param ValidationByEmailOptions Validate by E-mail Options
   * @returns PaparaSingleResult<Validation> Validation Information
   */
  validateByEmail = async (
    options: ValidationByEmailOptions
  ): Promise<PaparaSingleResult<Validation>> => {
    const client = new PaparaHttpClient<PaparaSingleResult<Validation>>();

    const result = await client.request(
      HttpMethod.GET,
      "/validation/email",
      options,
      this.requestOptions
    );

    return result;
  };

  /**
   * Returns end user information for validation by given user's national identity number
   *
   * @param ValidationByTcknOptions Validate by national identity number Options
   * @returns PaparaSingleResult<Validation> Validation Information
   */
  validateByTckn = async (
    options: ValidationByTcknOptions
  ): Promise<PaparaSingleResult<Validation>> => {
    const client = new PaparaHttpClient<PaparaSingleResult<Validation>>();

    const result = await client.request(
      HttpMethod.GET,
      "/validation/tckn",
      options,
      this.requestOptions
    );

    return result;
  };
}
