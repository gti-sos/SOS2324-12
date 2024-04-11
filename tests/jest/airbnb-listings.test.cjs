const { chromium } = require('playwright');

let browser;
let page;

beforeAll(async () => {
  browser = await chromium.launch();
});

beforeEach(async () => {
  page = await browser.newPage();
  await page.goto('http://localhost:10000/airbnb-listings');
  await page.waitForLoadState('load');

  // Eliminar todos los recursos antes de cada test
  await page.click('#deleteAllButton');
  await page.waitForTimeout(1000);
  await page.click('#deleteAllButtonConfirm');
  await page.waitForTimeout(5000);

  // Cargar datos iniciales antes de cada test
  await page.goto('http://localhost:10000/api/v2/airbnb-listings/loadInitialData');
  await page.waitForLoadState('load');
  await page.goto('http://localhost:10000/airbnb-listings');
  await page.waitForLoadState('load');
});

afterEach(async () => {
  await page.close();
});

afterAll(async () => {
  await browser.close();
});

test('has title SOS2324-12 Project', async () => {
  const title = await page.title();
  expect(title).toMatch(/SOS2324-12 Project/);
});

test('load and list airbnb rentals', async () => {
  const tarjetasDatos = await page.locator('.tarjetas-datos').count();
  expect(tarjetasDatos).toBeGreaterThan(5);
});

test('delete resource', async () => {
  const resourceTitleBeforeDelete = await page.textContent('.tarjeta:first-child .card-title');
  await page.click('#deleteResourceButton');
  await page.waitForTimeout(500);
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

test('create resource', async () => {
  await page.click('text="Añadir"');
  await page.waitForSelector('text="Crear dato"');
  await page.click('text="Rellenar con datos de prueba"');
  await page.click('text="Crear"');
  await page.waitForTimeout(1000);
  const successMessage = await page.$('text=Se ha creado correctamente el alquiler de nombre Ejemplo');
  expect(successMessage).not.toBeNull();
});

test('edit resource', async () => {
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
  const resourceTitleFirstPage = await page.textContent('.tarjeta:first-child .card-title');
  await page.click('button:has-text("Siguiente")');
  await page.waitForTimeout(500);
  const resourceTitleSecondPage = await page.textContent('.tarjeta:first-child .card-title');
  expect(resourceTitleSecondPage).not.toEqual(resourceTitleFirstPage);
});
