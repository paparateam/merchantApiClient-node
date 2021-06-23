/**
 * RecurringMassPaymentToPhoneNumberOptions is used by mass payment service for providing request parameters.
 */
export interface RecurringMassPaymentToPhoneNumberOptions {
  /**
   * Gets or sets Papara phone number.
   */
  phoneNumber: string;

  /**
   * Gets or sets amount. The amount of the payment transaction. This amount will be transferred to the account of the user who received the payment. This figure plus transaction fee will be charged to the merchant account.
   */
  amount: number;

  /**
   * Gets or sets national identity number.It provides the control of the identity information sent by the user who will receive the payment, in the Papara system. In case of a conflict of credentials, the transaction will not take place.
   */
  turkishNationalId?: number;

  /**
   * Gets or sets payment currency. Values are “0”, “1”, “2”, “3”.
   */
  currency?: number;

  /**
   * Gets or sets period. Values are "0" (Monthly), "1" (Weekly), "2" (Daily).
   */
  period: number;

  /**
   * Gets or sets execution day. (It's default 0 if period is daily)
   */
  executionDay: number;

  /**
   * Gets or sets description. Description of the transaction provided by the merchant. It is not a required field. If sent, the customer sees in the transaction descriptions.
   */
  description: string;
}
