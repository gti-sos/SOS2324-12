const { test, expect, beforeAll, afterAll, beforeEach } = require('@playwright/test');

let page;

beforeAll(async ({ browser }) => {
  page = await browser.newPage();
});

afterAll(async () => {
  await page.close();
});

beforeEach(async () => {
  await page.goto('http://localhost:10000/world-consumption-of-drinking-water-data');
  await page.waitForLoadState('load');
  await page.click('#deleteAllButton');
  await page.waitForTimeout(1000);
  await page.click('#deleteAllButtonConfirm');
  await page.waitForTimeout(5000);
  await page.goto('http://localhost:10000/api/v2/world-consumption-of-drinking-water-data/loadInitialData');
  await page.waitForLoadState('load');
  await page.goto('http://localhost:10000/world-consumption-of-drinking-water-data');
  await page.waitForLoadState('load');
});

test('has title SOS2324-12 Project', async () => {
  await expect(page).toHaveTitle(/SOS2324-12 Project/);
});

test('load and list water data', async () => {
  test.setTimeout(60000);

  const tarjetasDatos = await page.locator('.tarjetas-datos').count();
  await expect(tarjetasDatos).toBeGreaterThan(5);
});

test('delete resource', async () => {
  test.setTimeout(60000);

  let resourceTitleBeforeDelete = await page.textContent('.tarjeta:first-child .card-title');
  await page.click('#deleteResourceButton');
  await page.waitForTimeout(500);
  let resourceTitleAfterDelete = await page.textContent('.tarjeta:first-child .card-title');
  expect(resourceTitleAfterDelete).not.toEqual(resourceTitleBeforeDelete);
});

test('delete all resources', async () => {
  test.setTimeout(60000);

  await page.click('#deleteAllButton');
  await page.waitForTimeout(500);
  await page.click('#deleteAllButtonConfirm');
  await page.waitForTimeout(5000);
  let updatedCardElements = await page.locator('.tarjetas-datos').count();
  expect(updatedCardElements).toBe(0);
});

test('create resource', async () => {
  test.setTimeout(60000);

  await page.click('text="Crear Nuevo Dato"');
  await page.waitForSelector('text="Rellenar con datos de prueba"');
  await page.click('text="Rellenar con datos de prueba"');
  await page.click('text="Crear"');
});

test('edit resource', async () => {
  test.setTimeout(60000);

  await page.goto('http://localhost:10000/world-consumption-of-drinking-water-data/1/CHL/2015');
  await page.waitForLoadState('load');
  await page.fill('#urban_improved_other', '33');
  await page.click('button:text("Actualizar")');
  let successMessage = await page.$('text=El dato con iso_code CHL y year 2015 se ha actuallizado correctamente');
  expect(successMessage).not.toBeNull();
});

test('pagination works', async () => {
  test.setTimeout(60000);

  let resourceTitleFirstPage = await page.textContent('.tarjeta:first-child .card-title');
  await page.click('button:has-text("Siguiente")');
  await page.waitForTimeout(500);
  let resourceTitleSecondPage = await page.textContent('.tarjeta:first-child .card-title');
  expect(resourceTitleSecondPage).not.toEqual(resourceTitleFirstPage);
});
