/**
 * CashDepositSettlementOptions is used by cash deposit service for providing request parameters.
 */
export interface CashDepositSettlementOptions {
  /**
   * Gets or sets start date for settlement.
   */
  startDate: string;

  /**
   * Gets or sets end date for settlement.
   */
  endDate: string;

  /**
   * Gets or sets entry type for settlement. 
   * Entry types:
   * 1: Bank Transfer(Deposits/Withdrawals) 
   * 6: Cash Deposit 8: Received Payment(Checkout) 
   * 9: Sent Payment (MassPayment) = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17'].
   */
  entryType?: number;
}
