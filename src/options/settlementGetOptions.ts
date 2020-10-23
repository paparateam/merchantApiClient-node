/**
 * SettlementGetOptions is used by account service for providing settlement request parameters.
 */
export interface SettlementGetOptions {
  /**
   * Gets or sets start date filter for transactions.
   */
  startDate: string;

  /**
   * Gets or sets end date filter for transactions.
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
}
