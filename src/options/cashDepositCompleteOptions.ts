/**
 * CashDepositCompleteOptions is used by cash deposit service for providing request parameters.
 */
export interface CashDepositCompleteOptions {
  /**
   * Gets or sets ID of cash deposit request.
   */
  id: number;

  /**
   * Gets or sets date of cash deposit transaction.
   */
  transactionDate: string;
}
