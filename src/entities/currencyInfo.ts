/**
 * CurrencyInfo interface is used by account ledger model to get or set returning currency values from API.
 */
export interface CurrencyInfo {
  /**
   * Gets or sets currency type.
   */
  currencyEnum: number;

  /**
   * Gets or sets currency symbol.
   */
  symbol: string;

  /**
   * Gets or sets currency code.
   */
  code: string;

  /**
   * Gets or sets currency's prefferred display code.
   */
  prefferedDisplayCode: string;

  /**
   * Gets or sets currency name.
   */
  name: string;

  /**
   * Gets or sets if it is a cryptocurrency or not.
   */
  isCryptocurrency: boolean;

  /**
   * Gets or sets currency precision.
   */
  precision: number;

  /**
   * Gets or sets currency icon URL.
   */
  iconUrl: string;
}
