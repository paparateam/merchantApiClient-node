/**
 * CashDepositControlOptions is used by cash deposit service for providing request parameters.
 */
export interface CashDepositControlOptions {
  /**
   * Gets or sets reference number of cash deposit request.
   */
  referenceCode: string;

  /**
   * Gets or sets cash deposit amount.
   */
  amount: number;
}
