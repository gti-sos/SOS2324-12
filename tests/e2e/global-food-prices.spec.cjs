const { test, expect, beforeAll, afterAll, beforeEach, afterEach } = require('@playwright/test');

let page;

beforeAll(async ({ browser }) => {
  page = await browser.newPage();
});

afterAll(async () => {
  await page.close();
});

beforeEach(async () => {
  await page.goto('http://localhost:10000/global-food-prices');
  await page.waitForLoadState('load');
  await page.waitForTimeout(1000);
  await page.click('#deleteAllButton');
  await page.waitForTimeout(500);
  await page.click('#deleteAllButtonConfirm');
  await page.waitForTimeout(10000);
});

afterEach(async () => {
  // Limpieza después de cada prueba si es necesario
});

test('has title SOS2324-12 Project', async () => {
  test.setTimeout(60000);
  await page.goto('http://localhost:10000');
  await expect(page).toHaveTitle(/SOS2324-12 Project/);
});

test('load and list airbnb rentals', async () => {
  test.setTimeout(60000);
  await page.goto('http://localhost:10000/api/v1/global-food-prices/loadInitialData');
  await page.goto('http://localhost:10000/global-food-prices');
  await page.waitForLoadState('load');
  await page.waitForTimeout(1000);
  await expect((await page.locator('.tarjetas-datos').all()).length).toBeGreaterThan(5);
});

test('delete resource', async () => {
  test.setTimeout(60000);
  await page.goto('http://localhost:10000/api/v1/global-food-prices/loadInitialData');
  await page.waitForTimeout(1000);
  await page.goto('http://localhost:10000/global-food-prices');
  await page.waitForLoadState('load');
  await page.waitForTimeout(1000);
  let resourceTitleBeforeDelete = await page.textContent('.tarjeta:first-child .card-title');
  await page.click('#deleteResourceButton');
  await page.waitForTimeout(1000);
  let resourceTitleAfterDelete = await page.textContent('.tarjeta:first-child .card-title');
  expect(resourceTitleAfterDelete).not.toEqual(resourceTitleBeforeDelete);
});
test('delete all resources', async () => {
  test.setTimeout(90000);
  await page.goto('http://localhost:10000/api/v1/global-food-prices/loadInitialData');
  await page.waitForTimeout(1000);
  await page.goto('http://localhost:10000/global-food-prices');
  await page.waitForLoadState('load');
  await page.waitForTimeout(1000);
  let cardElements = await page.locator('.tarjetas-datos').count();
  expect(cardElements).toBeGreaterThan(5);
  await page.click('#deleteAllButton');
  await page.waitForTimeout(500);
  await page.click('#deleteAllButtonConfirm');
  await page.waitForTimeout(10000);
  let updatedCardElements = await page.locator('.tarjetas-datos').count();
  expect(updatedCardElements).toBe(0);
});


test('edit resource', async () => {
  test.setTimeout(60000);
  await page.goto('http://localhost:10000/api/v1/global-food-prices/loadInitialData');
  await page.goto('http://localhost:10000/global-food-prices/1/275/267/145/87/15/5/10/2008');
  await page.waitForLoadState('load');
  await page.waitForTimeout(1000);
  await page.fill('#mp_price', '10000');
  await page.click('button:text("Actualizar")');
  await page.waitForTimeout(1000);
  let successMessage = await page.$('text=El dato se ha actualizado correctamente');
  expect(successMessage).not.toBeNull();
});


