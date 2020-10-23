import { RequestOptions } from "../client/requestOptions";
import { PaparaHttpClient } from "../client/httpClient";
import { PaparaSingleResult } from "../common/paparaSingleResult";
import { PaparaListResult } from "../common/paparaListResult";
import { HttpMethod } from "../client/httpMethod";
import { Payment, PaymentListItem } from "../entities";
import {
  PaymentCreateOptions,
  PaymentGetByReferenceOptions,
  PaymentGetOptions,
  PaymentListOptions,
  PaymentRefundOptions
} from "../options";

/**
 * Payment service will be used for getting, creating or listing payments and refunding.
 */
export class PaymentService {
  private requestOptions: RequestOptions;

  /**
   * Initializes a new instance of the Payment Service
   * @param apiKey merchant api key
   * @param env environment selection
   */
  constructor(apiKey: string, env: string) {
    this.requestOptions = { apiKey, env };
  }

  /**
   * Returns payment and balance information for authorized merchant.
   *
   * @param PaymentGetOptions payment get options
   * @returns PaparaSingleResult<Payment> Payment Information
   */
  getPayment = async (
    options: PaymentGetOptions
  ): Promise<PaparaSingleResult<Payment>> => {
    const client = new PaparaHttpClient<PaparaSingleResult<Payment>>();

    const result = await client.request(
      HttpMethod.GET,
      "/payments",
      options,
      this.requestOptions
    );

    return result;
  };

  /**
   * Creates a payment for authorized merchant.
   *
   * @param PaymentCreateOptions payment create options
   * @returns PaparaSingleResult<Payment> Payment Information
   */
  createPayment = async (
    options: PaymentCreateOptions
  ): Promise<PaparaSingleResult<Payment>> => {
    const client = new PaparaHttpClient<PaparaSingleResult<Payment>>();

    const result = await client.request(
      HttpMethod.POST,
      "/payments",
      options,
      this.requestOptions
    );

    return result;
  };

  /**
   * Creates a refund for a completed payment for authorized merchant.
   *
   * @param PaymentRefundOptions payment refund options
   * @returns PaparaSingleResult<any> Payment Refund Status Information
   */
  refund = async (
    options: PaymentRefundOptions
  ): Promise<PaparaSingleResult<any>> => {
    const client = new PaparaHttpClient<PaparaSingleResult<any>>();

    const result = await client.request(
      HttpMethod.PUT,
      "/payments",
      options,
      this.requestOptions
    );

    return result;
  };

  /**
   * Returns a list of completed payments sorted by newest to oldest for authorized merchant.
   *
   * @param PaymentListOptions payment list options
   * @returns PaparaListResult<PaymentListItem> Payment List
   */
  list = async (
    options: PaymentListOptions
  ): Promise<PaparaListResult<PaymentListItem>> => {
    const client = new PaparaHttpClient<PaparaListResult<PaymentListItem>>();

    const result = await client.request(
      HttpMethod.GET,
      "/payments/list",
      options,
      this.requestOptions
    );

    return result;
  };

  /**
   * Returns payment and balance information for authorized merchant.
   *
   * @param PaymentGetByReferenceOptions payment get by reference options
   * @returns PaparaSingleResult<Payment> Payment Information
   */
  getByReference = async (
    options: PaymentGetByReferenceOptions
  ): Promise<PaparaSingleResult<Payment>> => {
    const client = new PaparaHttpClient<PaparaSingleResult<Payment>>();

    const result = await client.request(
      HttpMethod.GET,
      "/payments/reference",
      options,
      this.requestOptions
    );

    return result;
  };
}
