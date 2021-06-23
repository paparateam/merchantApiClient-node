/**
 * MassPayment interface is used by mass payment service to match returning mass payment values from API.
 */
export interface MassPayment {
  /**
   * Gets or sets mass payment ID.
   */
  massPaymentId: string;

  /**
   * Gets or sets ID which is created after payment is done.
   */
  id: number;

  /**
   * Gets or sets created date.
   */
  createdAt: Date;

  /**
   * Gets or sets amount of payment.
   */
  amount: number;

  /**
   * Gets or sets currency.Values are “0” (TRY), “1” (USD), “2” (EUR), “3” (GBP).
   */
  currency: number;

  /**
   * Gets or sets fee.
   */
  fee: number;

  /**
   * Gets or sets resulting balance.
   */
  resultingBalance: number;

  /**
   * Gets or sets description.
   */
  description: string;
}
