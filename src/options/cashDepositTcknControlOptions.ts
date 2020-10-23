/**
 * CashDepositTcknControlOptions is used by cash deposit service for providing request parameters.
 */
export interface CashDepositTcknControlOptions {
  /**
   * Gets or sets user's phone number. The phone number of the user to be sent money, including the country code and "+".
   */
  phoneNumber: string;

  /**
   * Gets or sets national identity number which is linked to user's Papara account.
   */
  tckn: number;

  /**
   * Gets or sets amount. The amount of the cash deposit. This amount will be transferred to the account of the user who received the payment. The amount to be deducted from the merchant account will be exactly this number.
   */
  amount: number;

  /**
   * Gets or sets merchant reference. The unique value sent by the merchant to prevent false repetitions in cash loading transactions. If a previously submitted and successful merchantReference is resubmitted with a new request, the request will fail. MerchantReference sent with failed requests can be resubmitted.
   */
  merchantReference: string;
}
