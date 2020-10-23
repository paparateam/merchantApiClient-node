/**
 * Account interface is used by account service to match returning account value from API.
 */
export interface Account {
  /**
   *Gets or sets merchant's company title.
   */
  legalName: string;

  /**
   *Gets or sets brand name.
   */
  brandName: string;

  /**
   *Gets or sets allowed payment types.
   */
  allowedPaymentTypes: any;

  /**
   * Gets or sets balances.
   */
  balances: any;
}
