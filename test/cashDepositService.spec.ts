import { PaparaClient } from "../src";
import { uuidv4 } from "../src/helpers";
import { config } from "./config";

const client = new PaparaClient(config.ApiKey, config.Env);

test("cashDeposit createWithPhoneNumber", async () => {
  const result = await client.cashDepositService.createWithPhoneNumber({
    phoneNumber: config.PersonalPhoneNumber,
    amount: 10,
    merchantReference: uuidv4()
  });

  expect(result.succeeded).toBe(true);

  const checkResult = await client.cashDepositService.getCashDeposit({
    id: result.data.id
  });

  expect(checkResult.succeeded).toBe(true);
});

test("cashDeposit createWithAccountNumber", async () => {
  const result = await client.cashDepositService.createWithAccountNumber({
    accountNumber: config.PersonalAccountNumber,
    amount: 10,
    merchantReference: uuidv4()
  });

  expect(result.succeeded).toBe(true);

  const checkResult = await client.cashDepositService.getCashDeposit({
    id: result.data.id
  });

  expect(checkResult.succeeded).toBe(true);
});

test("cashDeposit createWithTckn", async () => {
  const result = await client.cashDepositService.createWithTckn({
    tckn: config.TCKN,
    amount: 10,
    merchantReference: uuidv4()
  });

  expect(result.succeeded).toBe(true);

  const checkResult = await client.cashDepositService.getCashDeposit({
    id: result.data.id
  });

  expect(checkResult.succeeded).toBe(true);
});

test("cashDeposit createProvisionWithTcknControl", async () => {
  const result = await client.cashDepositService.createProvisionWithTcknControl(
    {
      amount: 10,
      merchantReference: uuidv4(),
      phoneNumber: config.PersonalPhoneNumber,
      tckn: config.TCKN
    }
  );

  expect(result.succeeded).toBe(true);

  // complete provision
  var completionResult = await client.cashDepositService.completeProvision({
    id: result.data.id,
    transactionDate: result.data.createdAt
  });

  expect(completionResult.succeeded).toBe(true);
});

test("cashDeposit createProvisionWithPhoneNumber", async () => {
  const result = await client.cashDepositService.createProvisionWithPhoneNumber(
    {
      amount: 10,
      merchantReference: uuidv4(),
      phoneNumber: config.PersonalPhoneNumber
    }
  );

  expect(result.succeeded).toBe(true);

  // complete provision
  var compilationResult = await client.cashDepositService.completeProvision({
    id: result.data.id,
    transactionDate: result.data.createdAt
  });

  expect(compilationResult.succeeded).toBe(true);
});

test("cashDeposit createProvisionWithAccountNumber", async () => {
  const result = await client.cashDepositService.createProvisionWithAccountNumber(
    {
      amount: 10,
      merchantReference: uuidv4(),
      accountNumber: config.PersonalAccountNumber
    }
  );

  expect(result.succeeded).toBe(true);

  // complete provision
  var compilationResult = await client.cashDepositService.completeProvision({
    id: result.data.id,
    transactionDate: result.data.createdAt
  });

  expect(compilationResult.succeeded).toBe(true);
});

test("cashDeposit createProvisionWithTckn", async () => {
  const result = await client.cashDepositService.createProvisionWithTckn({
    amount: 10,
    merchantReference: uuidv4(),
    tckn: config.TCKN
  });

  expect(result.succeeded).toBe(true);

  // complete provision
  var compilationResult = await client.cashDepositService.completeProvision({
    id: result.data.id,
    transactionDate: result.data.createdAt
  });

  expect(compilationResult.succeeded).toBe(true);
});

test("cashDeposit provisionByReferenceControl", async () => {
  const result = await client.cashDepositService.createProvisionWithTckn({
    amount: 10,
    merchantReference: uuidv4(),
    tckn: config.TCKN
  });

  expect(result.succeeded).toBe(true);

  // complete provision
  var completionResult = await client.cashDepositService.provisionByReferenceControl(
    {
      amount: 10,
      referenceCode: result.data.merchantReference
    }
  );

  expect(completionResult.succeeded).toBe(true);
});

test("cashDeposit provisionByReferenceComplete", async () => {
  const result = await client.cashDepositService.createProvisionWithTckn({
    amount: 10,
    merchantReference: uuidv4(),
    tckn: config.TCKN
  });

  expect(result.succeeded).toBe(true);

  // complete provision
  var completionResult = await client.cashDepositService.provisionByReferenceComplete(
    {
      amount: 10,
      referenceCode: result.data.merchantReference
    }
  );

  expect(completionResult.succeeded).toBe(true);
});

test("cashDeposit getCashDepositByReference", async () => {
  var result = await client.cashDepositService.getCashDepositByReference({
    reference: "78cadfb9-71d1-42dd-9793-84e90af53b07"
  });

  expect(result.succeeded).toBe(true);
});

test("cashDeposit getCashDepositByDate", async () => {
  var result = await client.cashDepositService.getCashDepositByDate({
    startDate: new Date(2020, 1, 1).toISOString(),
    endDate: new Date().toISOString(),
    pageIndex: 1,
    pageItemCount: 20
  });

  expect(result.succeeded).toBe(true);
});

test("cashDeposit provisionSettlements", async () => {
  var result = await client.cashDepositService.provisionSettlements({
    startDate: new Date(2020, 1, 1).toISOString(),
    endDate: new Date().toISOString()
  });

  expect(result.succeeded).toBe(true);
});

test("cashDeposit settlements", async () => {
  var result = await client.cashDepositService.settlements({
    startDate: new Date(2020, 1, 1).toISOString(),
    endDate: new Date().toISOString()
  });

  expect(result.succeeded).toBe(true);
});