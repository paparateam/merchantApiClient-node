/**
 * BankingWithdrawalOptions is used by banking service for providing request parameters.
 */
export interface BankingWithdrawalOptions {
  
  /**
   * Gets or sets target bank account id which money will be transferred to when withdrawal is completed.It will be obtained as a result of the request to list bank accounts.
   */
  bankAccountId?: number;

  /**
   * Gets or sets withdrawal amount.
   */
  amount: number;
}
