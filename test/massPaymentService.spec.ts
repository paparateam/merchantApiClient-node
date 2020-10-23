import { PaparaClient } from "../src";
import { uuidv4 } from "../src/helpers";
import { config } from "./config";

const client = new PaparaClient(config.ApiKey, config.Env);

test("massPayment createMassPaymentWithAccountNumber", async () => {
  var result = await client.massPaymentService.createMassPaymentWithAccountNumber(
    {
      accountNumber: config.PersonalAccountNumber.toString(),
      amount: 1,
      description: "Unit Test nodejs: MassPaymentToPaparaNumber",
      massPaymentId: uuidv4(),
      parseAccountNumber: 1,
      turkishNationalId: config.TCKN
    }
  );

  expect(result.succeeded).toBe(true);

  var getmasspayment = await client.massPaymentService.getMassPayment({
    id: result.data.id
  });

  expect(getmasspayment.succeeded).toBe(true);
});

test("massPayment createMassPaymentWithEmail", async () => {
  var result = await client.massPaymentService.createMassPaymentWithEmail({
    amount: 1,
    description: "Unit Test nodejs: MassPaymentToEmail",
    massPaymentId: uuidv4(),
    email: config.PersonalEmail,
    turkishNationalId: config.TCKN
  });

  expect(result.succeeded).toBe(true);

  var getmasspayment = await client.massPaymentService.getMassPayment({
    id: result.data.id
  });

  expect(getmasspayment.succeeded).toBe(true);
});

test("massPayment createMassPaymentWithPhoneNumber", async () => {
  var result = await client.massPaymentService.createMassPaymentWithPhoneNumber(
    {
      amount: 1,
      description: "Unit Test nodejs: MassPaymentToPhoneNumber",
      massPaymentId: uuidv4(),
      phoneNumber: config.PersonalPhoneNumber,
      turkishNationalId: config.TCKN
    }
  );

  expect(result.succeeded).toBe(true);

  var getmasspayment = await client.massPaymentService.getMassPayment({
    id: result.data.id
  });

  expect(getmasspayment.succeeded).toBe(true);
});

test("massPayment getMassPaymentByReference", async () => {
  var result = await client.massPaymentService.createMassPaymentWithPhoneNumber(
    {
      amount: 1,
      description: "Unit Test nodejs: MassPaymentToPhoneNumber",
      massPaymentId: uuidv4(),
      phoneNumber: config.PersonalPhoneNumber,
      turkishNationalId: config.TCKN
    }
  );

  expect(result.succeeded).toBe(true);

  var getmasspayment = await client.massPaymentService.getMassPaymentByReference(
    {
      reference: result.data.massPaymentId
    }
  );

  expect(getmasspayment.succeeded).toBe(true);
});
