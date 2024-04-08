const { test, expect, beforeAll, afterAll, beforeEach, afterEach } = require('@playwright/test');

let page;

beforeAll(async ({ browser }) => {
  page = await browser.newPage();
});

afterAll(async () => {
  await page.close();
});

beforeEach(async () => {
  await page.goto('http://localhost:10000/airbnb-listings');
  await page.waitForLoadState('load');
  await page.click('#deleteAllButton');
  await page.waitForTimeout(1000);
  await page.click('#deleteAllButtonConfirm');
  await page.waitForTimeout(5000);
  await page.goto('http://localhost:10000/api/v2/airbnb-listings/loadInitialData');
  await page.waitForLoadState('load');
  await page.goto('http://localhost:10000/airbnb-listings');
  await page.waitForLoadState('load');

});

test('has title SOS2324-12 Project', async () => {
  await expect(page).toHaveTitle(/SOS2324-12 Project/);
});

test('load and list airbnb rentals', async () => {
  test.setTimeout(60000);
  const tarjetasDatos = await page.locator('.tarjetas-datos').count();
  await expect(tarjetasDatos).toBeGreaterThan(5);
});

test('delete resource', async () => {
  test.setTimeout(60000);

  const resourceTitleBeforeDelete = await page.textContent('.tarjeta:first-child .card-title');
  await page.click('#deleteResourceButton');
  await page.waitForTimeout(500);
  const resourceTitleAfterDelete = await page.textContent('.tarjeta:first-child .card-title');
  expect(resourceTitleAfterDelete).not.toEqual(resourceTitleBeforeDelete);
});

test('delete all resources', async () => {
  test.setTimeout(60000);

  await page.click('#deleteAllButton');
  await page.waitForTimeout(1000);
  await page.click('#deleteAllButtonConfirm');
  await page.waitForTimeout(5000);
  const updatedCardElements = await page.locator('.tarjetas-datos').count();
  expect(updatedCardElements).toBe(0);
});

test('create resource', async () => {
  test.setTimeout(60000);

  await page.click('text="Añadir"');
  await page.waitForSelector('text="Crear dato"');
  await page.click('text="Rellenar con datos de prueba"');
  await page.click('text="Crear"');
  await page.waitForTimeout(1000);
  const successMessage = await page.$('text=Se ha creado correctamente el alquiler de nombre Ejemplo');
  expect(successMessage).not.toBeNull();
});

test('edit resource', async () => {
  test.setTimeout(60000);
  await page.goto('http://localhost:10000/airbnb-listings/40.75563/-73.96418');
  await page.waitForLoadState('load');
  await page.waitForTimeout(1000);
  await page.selectOption('#respuestaTiempo', 'a few days or more');
  await page.click('button:text("Actualizar")');
  await page.waitForTimeout(1000);
  let successMessage = await page.$('text=El dato con latitud 40.75563 y longitud -73.96418 se ha actualizado correctamente');
  expect(successMessage).not.toBeNull();
});

test('pagination works', async () => {
  test.setTimeout(60000);

  const resourceTitleFirstPage = await page.textContent('.tarjeta:first-child .card-title');
  await page.click('button:has-text("Siguiente")');
  await page.waitForTimeout(500);
  const resourceTitleSecondPage = await page.textContent('.tarjeta:first-child .card-title');
  expect(resourceTitleSecondPage).not.toEqual(resourceTitleFirstPage);
});
