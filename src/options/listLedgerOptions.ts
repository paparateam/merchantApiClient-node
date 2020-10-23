/**
 * ListLedgerOptions is used by account service for providing request parameters.
 */
export interface ListLedgerOptions {
  /**
   * Gets or sets start date for transactions.
   */
  startDate: string;

  /**
   * Gets or sets end date for transactions.
   */
  endDate: string;

  /**
   * Gets or sets entry types.
   * BankTransfer = 1,
   * CorporateCardTransaction = 2,
   * LoadingMoneyFromPhysicalPoint = 6,
   * MerchantPayment = 8,
   * PaymentDistribution = 9,
   * EduPos = 11.
   */
  entryType?: number;

  /**
   * Gets or sets merchant account number.
   */
  accountNumber?: number;

  /**
   * Gets or sets the requested page number. If the requested date has more than 1 page of results for the requested PageSize, use this to iterate through pages.
   */
  page: number;

  /**
   * Gets or sets number of elements you want to receive per request page. Min=1, Max=50.
   */
  pageSize: number;
}
