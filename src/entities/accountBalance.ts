/**
 * AccountBalance interface is used by account service to match returning account balance value from API.
 */
export interface AccountBalance {
  /**
   * Gets or sets currency.
   */
  currency: number;

  /**
   * Gets or sets total balance.
   */
  totalBalance: number;

  /**
   * Gets or sets total balance.
   */
  lockedBalance: number;

  /**
   * Gets or sets available balance.
   */
  availableBalance: number;
}
