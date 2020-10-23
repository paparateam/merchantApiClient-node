import { Account } from "./account";

/**
 * Payment interface is used by payment service to match returning payment values from API.
 */
export interface Payment {
  /**
   * Gets or sets merhcant.
   */
  merchant: Account;

  /**
   * Gets or sets ID.
   */
  id: string;

  /**
   * Gets or sets created date.
   */
  createdAt: Date;

  /**
   * Gets or sets merchant ID.
   */
  merchantId: string;

  /**
   * Gets or sets user ID.
   */
  userId: string;

  /**
   * Gets or sets payment Method. 
   * 0 - User completed transaction with existing Papara balance 
   * 1 - User completed the transaction with a debit / credit card that was previously defined. 
   * 2 - User completed transaction via mobile payment.
   */
  paymentMethod: number;

  /**
   * Gets or sets payment method description.
   */
  paymentMethodDescription: string;

  /**
   * Gets or sets referance ID.
   */
  referenceId: string;

  /**
   * Gets or sets order description.
   */
  orderDescription: string;

  /**
   * Gets or sets status.
   * 0 - Awaiting, payment is not done yet.
   * 1 - Payment is done, transaction is completed.
   * 2 - Transactions is refunded by merchant.
   */
  status: number;

  /**
   * Gets or sets status description.
   */
  statusDescription: string;

  /**
   * Gets or sets amount.
   */
  amount: number;

  /**
   * Gets or sets fee.
   */
  fee: number;

  /**
   * Gets or sets currency. Values are “0”, “1”, “2”, “3”.
   */
  currency: number;

  /**
   * Gets or sets notification URL.
   */
  notificationUrl: string;

  /**
   * Gets or sets if notification was made.
   */
  notificationDone: boolean;

  /**
   * Gets or sets redirect URL.
   */
  redirectUrl: string;

  /**
   * Gets or sets payment URL.
   */
  paymentUrl: string;

  /**
   * Gets or sets merchant secret key.
   */
  merchantSecretKey: string;

  /**
   * Gets or sets returning Redirect URL.
   */
  returningRedirectUrl: string;

  /**
   * Gets or sets national identity number.
   */
  turkishNationalId: number;
}
