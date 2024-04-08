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
  await page.click('#deleteAllButton');
  await page.waitForTimeout(1000);
  await page.click('#deleteAllButtonConfirm');
  await page.waitForTimeout(5000);
  await page.goto('http://localhost:10000/api/v2/global-food-prices/loadInitialData');
  await page.waitForLoadState('load');
  await page.goto('http://localhost:10000/global-food-prices');
  await page.waitForLoadState('load');
});

afterEach(async () => {
  // Limpieza después de cada prueba si es necesario
});

test('has title SOS2324-12 Project', async () => {
  await expect(page).toHaveTitle(/SOS2324-12 Project/);
});

test('load and list', async () => {
  const tarjetasDatos = await page.locator('.tarjetas-datos').count();
  await expect(tarjetasDatos).toBeGreaterThan(5);
});

test('delete resource', async () => {
  const resourceTitleBeforeDelete = await page.textContent('.tarjeta:first-child .card-title');
  await page.click('#deleteResourceButton');
  await page.waitForTimeout(1000);
  const resourceTitleAfterDelete = await page.textContent('.tarjeta:first-child .card-title');
  expect(resourceTitleAfterDelete).not.toEqual(resourceTitleBeforeDelete);
});
test('delete all resources', async () => {
  await page.click('#deleteAllButton');
  await page.waitForTimeout(1000);
  await page.click('#deleteAllButtonConfirm');
  await page.waitForTimeout(5000);
  const updatedCardElements = await page.locator('.tarjetas-datos').count();
  expect(updatedCardElements).toBe(0);
});


test('edit resource', async () => {
  await page.goto('http://localhost:10000/global-food-prices/1/275/267/145/87/15/5/10/2008');
  await page.waitForLoadState('load');
  await page.waitForTimeout(500);
  await page.fill('#mp_price', '10000');
  await page.click('button:text("Actualizar")');
  await page.waitForTimeout(500);
  let successMessage = await page.$('text=El dato se ha actualizado correctamente');
  expect(successMessage).not.toBeNull();
});


