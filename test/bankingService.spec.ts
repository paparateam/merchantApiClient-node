import { PaparaClient } from "../src";
import { config } from "./config";

const client = new PaparaClient(config.ApiKey, config.Env);

test("banking getBankAccounts", async () => {
  var result = await client.bankingService.getBankAccounts();
  expect(result.succeeded).toBe(true);
});

test("banking withdrawal", async () => {
  var bankAccountResult = await client.bankingService.getBankAccounts();

  expect(bankAccountResult.succeeded).toBe(true);

  if (bankAccountResult.data.length > 0) {
    var bankAccount = bankAccountResult.data[0];

    var result = await client.bankingService.withdrawal({
      amount: 10,
      bankAccountId: bankAccount.bankAccountId
    });

    expect(result.succeeded).toBe(true);
  }
});
