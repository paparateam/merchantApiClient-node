import { PaparaClient } from "../src";
import { config } from "./config";
import { uuidv4 } from "../src/helpers";

const client = new PaparaClient(config.ApiKey, config.Env);

test("payment getPayment", async () => {
  var paymentListResult = await client.paymentService.list({
    pageIndex: 1,
    pageItemCount: 20
  });

  expect(paymentListResult.succeeded).toBe(true);

  if (paymentListResult.data.items.length > 0) {
    var payment = paymentListResult.data.items[0];

    var paymentResult = await client.paymentService.getPayment({
      id: payment.id
    });

    expect(paymentResult.succeeded).toBe(true);
  }
});

test("payment createPayment", async () => {
  var referenceId = uuidv4();

  var result = await client.paymentService.createPayment({
    amount: 1,
    notificationUrl: "https://testmerchant.com/notification",
    orderDescription: "Payment Unit Test",
    redirectUrl: "https://testmerchant.com/userredirect",
    referenceId: referenceId,
    turkishNationalId: config.TCKN
  });

  expect(result.succeeded).toBe(true);
  expect(referenceId).toEqual(result.data.referenceId);
});

test("payment refund", async () => {
  var paymentListResult = await client.paymentService.list({
    pageIndex: 1,
    pageItemCount: 20
  });

  expect(paymentListResult.succeeded).toBe(true);

  if (paymentListResult.data.items.length > 0) {
    var payment = paymentListResult.data.items[0];

    var result = await client.paymentService.refund({
      id: payment.id
    });

    expect(result.succeeded).toBe(true);
  }
});

test("payment List", async () => {
  var paymentListResult = await client.paymentService.list({
    pageIndex: 1,
    pageItemCount: 20
  });

  expect(paymentListResult.succeeded).toBe(true);
});

test("payment GetByReference", async () => {
  var referenceId = uuidv4();

  var result = await client.paymentService.createPayment({
    amount: 1,
    notificationUrl: "https://testmerchant.com/notification",
    orderDescription: "Payment Unit Test",
    redirectUrl: "https://testmerchant.com/userredirect",
    referenceId: referenceId,
    turkishNationalId: config.TCKN
  });

  expect(result.succeeded).toBe(true);
  expect(referenceId).toEqual(result.data.referenceId);

  var payment = await client.paymentService.getByReference({
    referenceId: referenceId
  });

  expect(payment.succeeded).toBe(true);
});
