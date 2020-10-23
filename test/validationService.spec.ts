import { PaparaClient } from "../src";
import { config } from "./config";

const client = new PaparaClient(config.ApiKey, config.Env);

test("validation validateById", async () => {
  const result = await client.validationService.validateById({
    userId: config.PersonalAccountId
  });

  expect(result.succeeded).toBe(true);
});

test("validation validateByAccountNumber", async () => {
  const result = await client.validationService.validateByAccountNumber({
    accountNumber: config.PersonalAccountNumber
  });

  expect(result.succeeded).toBe(true);
});

test("validation validateByPhoneNumber", async () => {
  const result = await client.validationService.validateByPhoneNumber({
    phoneNumber: config.PersonalPhoneNumber
  });

  expect(result.succeeded).toBe(true);
});

test("validation validateByEmail", async () => {
  const result = await client.validationService.validateByEmail({
    email: config.PersonalEmail
  });

  expect(result.succeeded).toBe(true);
});

test("validation validateByTckn", async () => {
  const result = await client.validationService.validateByTckn({
    tckn: config.TCKN
  });

  expect(result.succeeded).toBe(true);
});
