import { RequestOptions } from "../client/requestOptions";
import { PaparaHttpClient } from "../client/httpClient";
import { PaparaSingleResult } from "../common/paparaSingleResult";
import { HttpMethod } from "../client/httpMethod";
import { MassPayment } from "../entities";
import {
  MassPaymentByReferenceOptions,
  MassPaymentGetOptions,
  MassPaymentToEmailOptions,
  MassPaymentToPaparaNumberOptions,
  MassPaymentToPhoneNumberOptions
} from "../options";

/**
 * Mass payment service will be used for getting mass payment info and sending payments to account number, mail address and phone number.
 */
export class MassPaymentService {
  private requestOptions: RequestOptions;

  /**
   * Initializes a new instance of the <see cref="MassPaymentService"/> class.
   * @param apiKey merchant api key
   * @param env environment selection
   */
  constructor(apiKey: string, env: string) {
    this.requestOptions = { apiKey, env };
  }

  /**
   * Returns mass payment information for authorized merchant.
   *
   * @param MassPaymentGetOptions mass payment get options
   * @returns PaparaSingleResult<MassPayment> Mass Payment Information
   */
  getMassPayment = async (
    options: MassPaymentGetOptions
  ): Promise<PaparaSingleResult<MassPayment>> => {
    const client = new PaparaHttpClient<PaparaSingleResult<MassPayment>>();

    const result = await client.request(
      HttpMethod.GET,
      "/masspayment",
      options,
      this.requestOptions
    );

    return result;
  };

  /**
   * Creates a mass payment to given account number for authorized merchant.
   *
   * @param MassPaymentToPaparaNumberOptions mass payment to papara number options
   * @returns PaparaSingleResult<MassPayment> Mass Payment Information
   */
  createMassPaymentWithAccountNumber = async (
    options: MassPaymentToPaparaNumberOptions
  ): Promise<PaparaSingleResult<MassPayment>> => {
    const client = new PaparaHttpClient<PaparaSingleResult<MassPayment>>();

    const result = await client.request(
      HttpMethod.POST,
      "/masspayment",
      options,
      this.requestOptions
    );

    return result;
  };

  /**
   * Creates a mass payment to given e-mail address for authorized merchant.
   *
   * @param MassPaymentToEmailOptions mass payment to e-mail address options
   * @returns PaparaSingleResult<MassPayment> Mass Payment Information
   */
  createMassPaymentWithEmail = async (
    options: MassPaymentToEmailOptions
  ): Promise<PaparaSingleResult<MassPayment>> => {
    const client = new PaparaHttpClient<PaparaSingleResult<MassPayment>>();

    const result = await client.request(
      HttpMethod.POST,
      "/masspayment/email",
      options,
      this.requestOptions
    );

    return result;
  };

  /**
   * Creates a mass payment to given phone number for authorized merchant.
   *
   * @param MassPaymentToPhoneNumberOptions mass payment to phone number options
   * @returns PaparaSingleResult<MassPayment> Mass Payment Information
   */
  createMassPaymentWithPhoneNumber = async (
    options: MassPaymentToPhoneNumberOptions
  ): Promise<PaparaSingleResult<MassPayment>> => {
    const client = new PaparaHttpClient<PaparaSingleResult<MassPayment>>();

    const result = await client.request(
      HttpMethod.POST,
      "/masspayment/phone",
      options,
      this.requestOptions
    );

    return result;
  };

  /**
   * Returns mass payment information for authorized merchant.
   *
   * @param MassPaymentGetOptions mass payment get options
   * @returns PaparaSingleResult<MassPayment> Mass Payment Information
   */
  getMassPaymentByReference = async (
    options: MassPaymentByReferenceOptions
  ): Promise<PaparaSingleResult<MassPayment>> => {
    const client = new PaparaHttpClient<PaparaSingleResult<MassPayment>>();

    const result = await client.request(
      HttpMethod.GET,
      "/masspayment/byreference",
      options,
      this.requestOptions
    );

    return result;
  };
}
