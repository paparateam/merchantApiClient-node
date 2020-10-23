import { RequestOptions } from "../client/requestOptions";
import { PaparaHttpClient } from "../client/httpClient";
import { PaparaSingleResult } from "../common/paparaSingleResult";
import { CashDeposit } from "../entities/cashDeposit";
import { HttpMethod } from "../client/httpMethod";
import {
  CashDepositByDateOptions,
  CashDepositByReferenceOptions,
  CashDepositCompleteOptions,
  CashDepositControlOptions,
  CashDepositGetOptions,
  CashDepositSettlementOptions,
  CashDepositTcknControlOptions,
  CashDepositToAccountNumberOptions,
  CashDepositToPhoneOptions,
  CashDepositToTcknOptions
} from "../options";
import { CashDepositProvision, CashDepositSettlement } from "../entities";
import { PaparaListResult } from "../common/paparaListResult";
import { PaparaArrayResult } from "../common/paparaArrayResult";

/**
 * Cash deposit service will be used for deposit operations for an end user.
 */
export class CashDepositService {
  private requestOptions: RequestOptions;

  /**
   * Initializes a new instance of the <see cref="CashDepositService"/> class.
   * @param apiKey merchant api key
   * @param env environment selection
   */
  constructor(apiKey: string, env: string) {
    this.requestOptions = { apiKey, env };
  }

  /**
   * Returns a cash deposit information.
   *
   * @returns PaparaSingleResult<CashDeposit> Cash Deposit Information
   */
  getCashDeposit = async (
    options: CashDepositGetOptions
  ): Promise<PaparaSingleResult<CashDeposit>> => {
    const client = new PaparaHttpClient<PaparaSingleResult<CashDeposit>>();

    const result = await client.request(
      HttpMethod.GET,
      "/cashdeposit",
      options,
      this.requestOptions
    );

    return result;
  };

  /**
   * Returns a cash deposit information by cash deposit reference number.
   *
   * @returns PaparaSingleResult<CashDeposit> Cash Deposit Information
   */
  getCashDepositByReference = async (
    options: CashDepositByReferenceOptions
  ): Promise<PaparaSingleResult<CashDeposit>> => {
    const client = new PaparaHttpClient<PaparaSingleResult<CashDeposit>>();

    const result = await client.request(
      HttpMethod.GET,
      "/cashdeposit/byreference",
      options,
      this.requestOptions
    );

    return result;
  };

  /**
   * Creates a cash deposit request using end users's phone number.
   *
   * @param CashDepositToPhoneOptions cash deposit to phone number options
   * @returns PaparaSingleResult<CashDeposit> Cash Deposit Information
   */
  createWithPhoneNumber = async (
    options: any
  ): Promise<PaparaSingleResult<CashDeposit>> => {
    const client = new PaparaHttpClient<PaparaSingleResult<CashDeposit>>();

    const result = await client.request(
      HttpMethod.POST,
      "/cashdeposit",
      options,
      this.requestOptions
    );

    return result;
  };

  /**
   * Creates a cash deposit request using end user's account number.
   *
   * @param CashDepositToAccountNumberOptions cash deposit to account number options
   * @returns PaparaSingleResult<CashDeposit> Cash Deposit Information
   */
  createWithAccountNumber = async (
    options: CashDepositToAccountNumberOptions
  ): Promise<PaparaSingleResult<CashDeposit>> => {
    const client = new PaparaHttpClient<PaparaSingleResult<CashDeposit>>();

    const result = await client.request(
      HttpMethod.POST,
      "/cashdeposit/accountNumber",
      options,
      this.requestOptions
    );

    return result;
  };

  /**
   * Creates a cash deposit request using end users's national identity number.
   *
   * @param CashDepositToTcknOptions cash deposit to national identity number options
   * @returns PaparaSingleResult<CashDeposit> Cash Deposit Information
   */
  createWithTckn = async (
    options: CashDepositToTcknOptions
  ): Promise<PaparaSingleResult<CashDeposit>> => {
    const client = new PaparaHttpClient<PaparaSingleResult<CashDeposit>>();

    const result = await client.request(
      HttpMethod.POST,
      "/cashdeposit/tckn",
      options,
      this.requestOptions
    );

    return result;
  };

  /**
   * Creates a cash deposit request without upfront payment using end user's national identity number.
   *
   * @param CashDepositTcknControlOptions create provisiton with tckn options
   * @returns PaparaSingleResult<CashDepositProvision> Cash Deposit Provision Information
   */
  createProvisionWithTcknControl = async (
    options: CashDepositTcknControlOptions
  ): Promise<PaparaSingleResult<CashDepositProvision>> => {
    // prettier-ignore
    const client = new PaparaHttpClient<PaparaSingleResult<CashDepositProvision>>();

    const result = await client.request(
      HttpMethod.POST,
      "/cashdeposit/provision/withtckncontrol",
      options,
      this.requestOptions
    );

    return result;
  };

  /**
   * Creates a cash deposit request without upfront payment using end user's phone number.
   *
   * @param CashDepositToPhoneOptions create provisiton with phone number options
   * @returns PaparaSingleResult<CashDepositProvision> Cash Deposit Provision Information
   */
  createProvisionWithPhoneNumber = async (
    options: CashDepositToPhoneOptions
  ): Promise<PaparaSingleResult<CashDepositProvision>> => {
    // prettier-ignore
    const client = new PaparaHttpClient<PaparaSingleResult<CashDepositProvision>>();

    const result = await client.request(
      HttpMethod.POST,
      "/cashdeposit/provision/phonenumber",
      options,
      this.requestOptions
    );

    return result;
  };

  /**
   * Creates a cash deposit request without upfront payment using end user's account number.
   *
   * @param CashDepositToAccountNumberOptions create provisiton with account number options
   * @returns PaparaSingleResult<CashDepositProvision> Cash Deposit Provision Information
   */
  createProvisionWithAccountNumber = async (
    options: CashDepositToAccountNumberOptions
  ): Promise<PaparaSingleResult<CashDepositProvision>> => {
    // prettier-ignore
    const client = new PaparaHttpClient<PaparaSingleResult<CashDepositProvision>>();

    const result = await client.request(
      HttpMethod.POST,
      "/cashdeposit/provision/accountnumber",
      options,
      this.requestOptions
    );

    return result;
  };

  /**
   * Creates a cash deposit request without upfront payment using end user's tckn.
   *
   * @param CashDepositToTcknOptions create provisiton with account number options
   * @returns PaparaSingleResult<CashDepositProvision> Cash Deposit Provision Information
   */
  createProvisionWithTckn = async (
    options: CashDepositToTcknOptions
  ): Promise<PaparaSingleResult<CashDepositProvision>> => {
    // prettier-ignore
    const client = new PaparaHttpClient<PaparaSingleResult<CashDepositProvision>>();

    const result = await client.request(
      HttpMethod.POST,
      "/cashdeposit/provision/Tckn",
      options,
      this.requestOptions
    );

    return result;
  };

  /**
   * Makes a cash deposit ready to be complete.
   *
   * @param CashDepositControlOptions cash deposit control options
   * @returns PaparaSingleResult<Any> Cash Deposit Status Information
   */
  provisionByReferenceControl = async (
    options: CashDepositControlOptions
  ): Promise<PaparaSingleResult<any>> => {
    const client = new PaparaHttpClient<PaparaSingleResult<any>>();

    const result = await client.request(
      HttpMethod.POST,
      "/cashdeposit/provisionbyreference/control",
      options,
      this.requestOptions
    );

    return result;
  };

  /**
   * Completes a cash deposit.
   *
   * @param CashDepositControlOptions cash deposit control options
   * @returns PaparaSingleResult<Any> Cash Deposit Status Information
   */
  provisionByReferenceComplete = async (
    options: CashDepositControlOptions
  ): Promise<PaparaSingleResult<any>> => {
    const client = new PaparaHttpClient<PaparaSingleResult<any>>();

    const result = await client.request(
      HttpMethod.POST,
      "/cashdeposit/provisionbyreference/complete",
      options,
      this.requestOptions
    );

    return result;
  };

  /**
   * Completes a cash deposit request without upfront payment.
   *
   * @param CashDepositCompleteOptions cash deposit complete options
   * @returns PaparaSingleResult<CashDeposit> Cash Deposit Status Information
   */
  completeProvision = async (
    options: CashDepositCompleteOptions
  ): Promise<PaparaSingleResult<CashDeposit>> => {
    const client = new PaparaHttpClient<PaparaSingleResult<CashDeposit>>();

    const result = await client.request(
      HttpMethod.POST,
      "/cashdeposit/provision/complete",
      options,
      this.requestOptions
    );

    return result;
  };

  /**
   * Returns a cash deposit information by given date.
   *
   * @param CashDepositByDateOptions cash deposit by date options
   * @returns PaparaSingleResult<CashDeposit> Cash Deposit Information
   */
  getCashDepositByDate = async (
    options: CashDepositByDateOptions
  ): Promise<PaparaArrayResult<CashDeposit>> => {
    const client = new PaparaHttpClient<PaparaArrayResult<CashDeposit>>();

    const result = await client.request(
      HttpMethod.GET,
      "/cashdeposit/bydate",
      options,
      this.requestOptions
    );

    return result;
  };

  /**
   * Returns total transaction volume and count between given dates. Start and end dates are included.
   *
   * @param CashDepositSettlementOptions cash deposit by date options
   * @returns PaparaSingleResult<CashDepositSettlement> Cash Deposit Settlement Information
   */
  settlements = async (
    options: CashDepositSettlementOptions
  ): Promise<PaparaSingleResult<CashDepositSettlement>> => {
    const client = new PaparaHttpClient<
      PaparaSingleResult<CashDepositSettlement>
    >();

    const result = await client.request(
      HttpMethod.POST,
      "/cashdeposit/settlement",
      options,
      this.requestOptions
    );

    return result;
  };

  /**
   * Returns total transaction volume and count between given dates. Start and end dates are included.
   *
   * @param CashDepositSettlementOptions cash deposit by date options
   * @returns PaparaSingleResult<CashDepositSettlement> Cash Deposit Settlement Information
   */
  provisionSettlements = async (
    options: CashDepositSettlementOptions
  ): Promise<PaparaSingleResult<CashDepositSettlement>> => {
    const client = new PaparaHttpClient<
      PaparaSingleResult<CashDepositSettlement>
    >();

    const result = await client.request(
      HttpMethod.POST,
      "/cashdeposit/provision/settlement",
      options,
      this.requestOptions
    );

    return result;
  };
}
