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

test('create resource', async () => {
  test.setTimeout(60000);
  await page.goto('http://localhost:10000/api/v1/global-food-prices/loadInitialData');
  await page.goto('http://localhost:10000/global-food-prices');
  await page.waitForLoadState('load');
  await page.click('text="Crear Nuevo Dato"');
  await page.waitForSelector('text="Crear dato"');
  await page.fill('#adm0_id', '1');
  await page.fill('#adm0_name', 'Ejemplo');
  await page.fill('#adm1_id', '1');
  await page.selectOption('#adm1_name', 'Ejemplo');
  await page.fill('#mkt_id', '100');
  await page.fill('#mkt_name', 'Ejemplo');
  await page.fill('#cm_id', '1');
  await page.fill('#cm_name', 'Ejemplo');
  await page.fill('#cur_id', '1');
  await page.fill('#cur_name', 'Ejemplo');
  await page.fill('#pt_id', '1');
  await page.fill('#pt_name', 'Ejemplo');
  await page.fill('#um_id', '1');
  await page.fill('#um_name', 'Ejemplo');
  await page.fill('#mp_month', '1');
  await page.fill('#mp_year', '2000');
  await page.fill('#mp_price', '1');
  await page.fill('#mp_commoditysource', 'Ejemplo');
  await page.click('text="Crear"');
  let successMessage = await page.$('text=Se ha creado correctamente el dato');
  expect(successMessage).not.toBeNull();
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


test('pagination works', async () => {
  test.setTimeout(60000);
  await page.goto('http://localhost:10000/api/v1/global-food-prices/loadInitialData');
  await page.goto('http://localhost:10000/global-food-prices');
  await page.waitForLoadState('load');
  await page.waitForTimeout(1000);
  let resourceTitleFirstPage = await page.textContent('.tarjeta:first-child .card-title');
  await page.click('button:has-text("Siguiente")');
  await page.waitForTimeout(1000);
  let resourceTitleSecondPage = await page.textContent('.tarjeta:first-child .card-title');
  expect(resourceTitleSecondPage).not.toEqual(resourceTitleFirstPage);
});
