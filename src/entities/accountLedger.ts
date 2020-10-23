import { CurrencyInfo } from "./currencyInfo";

/**
 * AccountLedger interface is used by account service to match returning ledger values from API.
 */
export interface AccountLedger {
  /**
   * Gets or sets merchant ID.
   */
  id: number;

  /**
   * Gets or sets created date of a ledger.
   */
  createdAt: Date;

  /**
   * Gets or sets entry type.
   * BankTransfer = 1
   * CorporateCardTransaction = 2,
   * LoadingMoneyFromPhysicalPoint = 6,
   * MerchantPayment = 8,
   * PaymentDistribution = 9,
   * EduPos = 11.
   */
  entryType: number;

  /**
   * Gets or sets entry type name.
   */
  entryTypeName: string;

  /**
   * Gets or sets amount.
   */
  amount: number;

  /**
   * Gets or sets fee.
   */
  fee: number;

  /**
   * Gets or sets currency.
   */
  currency: number;

  /**
   * Gets or sets currency information.
   */
  currencyInfo: CurrencyInfo;

  /**
   * Gets or sets resulting balance.
   */
  resultingBalance: number;

  /**
   * Gets or sets description.
   */
  description: string;

  /**
   * Gets or sets mass payment Id. It is the unique value sent by the merchant to prevent duplicate repetition in payment transactions. It is displayed in transaction records of masspayment type in account transactions to ensure control of the transaction.It will be null in other payment types.
   */
  massPaymentId: string;

  /**
   * Gets or sets checkout payment ID. It is the ID field in the data object in the payment record transaction. It is the unique identifier of the payment transaction. It is displayed in transaction records of checkout type in account transactions. It will be null in other payment types.
   */
  checkoutPaymentId: string;

  /**
   * Gets or sets checkout reference ID. This is the referenceId field sent when creating the payment transaction record. It is the reference information of the payment transaction in the merchant system. It is displayed in transaction records of checkout type in account transactions. It will be null in other payment types.
   */
  checkoutReferenceId: string;
}
