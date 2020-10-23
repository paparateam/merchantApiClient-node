import { RequestOptions } from "../client/requestOptions";
import { PaparaHttpClient } from "../client/httpClient";
import { PaparaSingleResult } from "../common/paparaSingleResult";
import { PaparaArrayResult } from "../common/paparaArrayResult";
import { HttpMethod } from "../client/httpMethod";
import { BankAccount } from "../entities";
import { BankingWithdrawalOptions } from "../options";

/**
 * Banking service will be used for listing merchant's bank accounts and making withdrawal operations.
 */
export class BankingService {
  private requestOptions: RequestOptions;

  /**
   * Initializes a new instance of the Banking Service
   * @param apiKey merchant api key
   * @param env environment selection
   */
  constructor(apiKey: string, env: string) {
    this.requestOptions = { apiKey, env };
  }

  /**
   * Returns bank accounts for authorized merchant.
   *
   * @returns PaparaListResult<BankAccount> Bank Account Information
   */
  getBankAccounts = async (): Promise<PaparaArrayResult<BankAccount>> => {
    const client = new PaparaHttpClient<PaparaArrayResult<BankAccount>>();

    const result = await client.request(
      HttpMethod.GET,
      "/banking/bankaccounts",
      null,
      this.requestOptions
    );

    return result;
  };

  /**
   * Creates a withdrawal request from given bank account for authorized merchant.
   *
   * @returns PaparaSingleResult withdrawal request status
   *
   * Error codes:
   * 105 - Insufficient funds.
   * 115 - Requested amount is lower then minimum limit.
   * 120 - Bank account not found.
   * 247 - Merchant's account is not active.
   */
  withdrawal = async (
    options: BankingWithdrawalOptions
  ): Promise<PaparaSingleResult<any>> => {
    const client = new PaparaHttpClient<PaparaSingleResult<any>>();

    const result = await client.request(
      HttpMethod.POST,
      "/banking/withdrawal",
      options,
      this.requestOptions
    );

    return result;
  };
}
