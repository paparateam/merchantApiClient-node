import { RequestOptions } from "../client/requestOptions";
import { PaparaHttpClient } from "../client/httpClient";
import { PaparaSingleResult } from "../common/paparaSingleResult";
import { PaparaListResult } from "../common/paparaListResult";
import { HttpMethod } from "../client/httpMethod";
import { Account, AccountLedger, Settlement } from "../entities";
import { ListLedgerOptions, SettlementGetOptions } from "../options";

/**
 * Account service will be used for obtaining account information, settlements and ledgers.
 */
export class AccountService {
  private requestOptions: RequestOptions;

  /**
   *  Initializes a new instance of Account Service.
   * @param apiKey merchant api key
   * @param env environment selection
   */
  constructor(apiKey: string, env: string) {
    this.requestOptions = { apiKey, env };
  }

  /**
   * Returns account information and current balance for authorized merchant.
   *
   * @returns PaparaSingleResult<Account> Account information
   */
  getAccount = async (): Promise<PaparaSingleResult<Account>> => {
    const client = new PaparaHttpClient<PaparaSingleResult<Account>>();

    const result = await client.request(
      HttpMethod.GET,
      "/account",
      null,
      this.requestOptions
    );

    return result;
  };

  /**
   * Returns list of ledgers for authorized merchant.
   *
   * @param ListLedgerOptions Ledger List Options
   * @returns PaparaSingleResult<AccountLedger> Account Ledgers
   */
  listLedgers = async (
    options: ListLedgerOptions
  ): Promise<PaparaListResult<AccountLedger>> => {
    const client = new PaparaHttpClient<PaparaListResult<AccountLedger>>();

    const result = await client.request(
      HttpMethod.POST,
      "/account/ledgers",
      options,
      this.requestOptions
    );

    return result;
  };

  /**
   * Returns settlement for authorized merchant.
   *
   * @param SettlementGetOptions Settlement Get Options
   * @returns PaparaSingleResult<Settlement> Settlement
   */
  getSettlement = async (
    options: SettlementGetOptions
  ): Promise<PaparaSingleResult<Settlement>> => {
    const client = new PaparaHttpClient<PaparaSingleResult<Settlement>>();

    const result = await client.request(
      HttpMethod.POST,
      "/account/settlement",
      options,
      this.requestOptions
    );

    return result;
  };
}
