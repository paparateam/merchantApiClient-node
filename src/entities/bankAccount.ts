/**
 * BankAccount interface is used by banking service to match returning bank accounts from API.
 */
export interface BankAccount {
  /**
   * Gets or sets merchant's bank account ID.
   */
  bankAccountId: number;

  /**
   * Gets or sets merchant bank name.
   */
  bankName: string;

  /**
   * Gets or sets merchant branch code.
   */
  branchCode: string;

  /**
   * Gets or sets IBAN Number.
   */
  iban: string;

  /**
   * Gets or sets merchant account Code.
   */
  accountCode: string;

  /**
   * Gets or sets description.
   */
  description: string;

  /**
   * Gets or sets currency.
   */
  currency: string;
}
