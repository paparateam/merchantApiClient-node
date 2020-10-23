/**
 * CashDeposit interface is used by cash deposit service to match returning cash deposit values from API.
 */
export interface CashDeposit {
  /**
   * Gets or sets merchant reference code.
   */
  merchantReference: string;

  /**
   * Gets or sets cash deposit ID.
   */
  id: number;

  /**
   * Gets or sets created date of cash deposit.
   */
  createdAt?: Date;

  /**
   * Gets or sets amount of cash deposit.
   */
  amount?: number;

  /**
   * Gets or sets currency of cash deposit.
   */
  currency?: number;

  /**
   * Gets or sets fee of cash deposit.
   */
  fee?: number;

  /**
   * Gets or sets resulting balance in merchant's account.
   */
  resultingBalance?: number;

  /**
   * Gets or sets description.
   */
  description?: string;
}
