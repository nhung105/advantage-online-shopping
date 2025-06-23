import HomePage from "../pages/HomePage";
import { test, expect } from "@playwright/test";
import Base from "../pages/Base";
import screenSizes from "../test-data/screen_sizes";
import { he } from "@faker-js/faker";
let homePage: HomePage;
// const speakersCategory = page.locator('#speakersImg');

test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    await homePage.navigateHomePage();
});
test.describe('Verify homepage items display in different screensizes', () => {
    const screenSizes1 = [{ ...screenSizes[0], ...screenSizes[1] }];
    screenSizes1.forEach(({ width, height }) => {
        test(`All homepage items display in ${width} x ${height}`, async ({ page }) => {
            await homePage.setScreenSizes(width, height);
            await expect(homePage.logo).toBeVisible();
            await expect(homePage.ourProductsMenu).toBeVisible();
            await expect(homePage.specialOfferMenu).toBeVisible();
            await expect(homePage.popularItemsMenu).toBeVisible();
            await expect(homePage.contactUsMenu).toBeVisible();
            await expect(homePage.searchItem).toBeVisible();
            await expect(homePage.userIcon).toBeVisible();
            await expect(homePage.shoppingCartIcon).toBeVisible();
            await expect(homePage.inForIcon).toBeVisible();
        })
        test('Homepage items display in 768 x 1024', async ({ page }) => {
            await homePage.setScreenSizes(768, 1024)
            await expect(homePage.logo).toBeVisible();
            await expect(homePage.userIcon).toBeVisible();
            await expect(homePage.shoppingCartIcon).toBeVisible();
            await expect(homePage.inForIcon).toBeVisible();
        })
        test('Homepage items display in 375 x 812', async ({ page }) => {
            await homePage.setScreenSizes(375, 812)
            await expect(homePage.logo).toBeVisible();
        })
    })
});

test.describe('Check hover every category', () => {
    test('Check hover speakers', async ({ page }) => {
        await page.locator('#speakersImg').hover();
        await expect(page.locator('#speakersLink')).toHaveText('Shop Now');
    })

})
