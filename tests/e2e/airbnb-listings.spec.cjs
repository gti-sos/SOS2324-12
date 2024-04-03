// @ts-check
const { test, expect } = require('@playwright/test');

test('has title SOS2324-12 Project', async ({ page }) => {
  await page.goto('http://localhost:10000');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/SOS2324-12 Project/);
});

test('load and list airbnb rentals', async ({ page }) => {
  await page.goto('http://localhost:10000/api/v2/airbnb-listings/loadInitialData');

  await page.goto('http://localhost:10000/airbnb-listings');

  await page.waitForLoadState('load');

  await page.waitForTimeout(1000);

  await expect((await page.locator('.tarjetas-datos').all()).length).toBeGreaterThan(5);
});
