/**
 * CashDepositProvision interface is used by cash deposit service to match returning cash deposit provision values from API.
 */
export interface CashDepositProvision {
  /**
   * Gets or sets cash deposit ID.
   */
  id: number;

  /**
   * Gets or sets created date of cash deposit.
   */
  createdAt: string;

  /**
   * Gets or sets amount of cash deposit.
   */
  amount: number;

  /**
   * Gets or sets currency of cash deposit.
   */
  currency: number;

  /**
   * Gets or sets merchant reference code.
   */
  merchantReference: string;

  /**
   * Gets or sets end user's full name.
   */
  userFullName: string;
}
