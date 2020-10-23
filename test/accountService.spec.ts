import { PaparaClient } from "../src";
import { config } from "./config";

const client = new PaparaClient(config.ApiKey, config.Env);

test("account getAccount", async () => {
  const result = await client.accountService.getAccount();

  expect(result.succeeded).toBe(true);
  expect(result.data.brandName).toBe("Crosstech");
});

test("account listLegers", async () => {
  const result = await client.accountService.listLedgers({
    startDate: new Date(2020, 1, 1).toISOString(),
    endDate: new Date().toISOString(),
    page: 1,
    pageSize: 20
  });

  expect(result.succeeded).toBe(true);
});

test("account getSettlement", async () => {
  const result = await client.accountService.getSettlement({
    startDate: new Date(2020, 1, 1).toISOString(),
    endDate: new Date().toISOString()
  });

  expect(result.succeeded).toBe(true);
});
