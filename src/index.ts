import {
  AccountService,
  BankingService,
  CashDepositService,
  MassPaymentService,
  PaymentService,
  ValidationService
} from "./services";

class PaparaClient {
  // services
  public accountService: AccountService;
  public bankingService: BankingService;
  public cashDepositService: CashDepositService;
  public massPaymentService: MassPaymentService;
  public paymentService: PaymentService;
  public validationService: ValidationService;

  constructor(apiKey: string, env = "LIVE") {
    this.accountService = new AccountService(apiKey, env);
    this.bankingService = new BankingService(apiKey, env);
    this.cashDepositService = new CashDepositService(apiKey, env);
    this.massPaymentService = new MassPaymentService(apiKey, env);
    this.paymentService = new PaymentService(apiKey, env);
    this.validationService = new ValidationService(apiKey, env);
  }
}

export { PaparaClient };
