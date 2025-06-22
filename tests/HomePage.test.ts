import HomePage from "../pages/HomePage";
import { test, expect } from "@playwright/test";
import Base from "../pages/Base";
import screenSizes from "../test-data/screen_sizes";
let homePage: HomePage;

test.beforeEach(async ({ page }) => {
  homePage = new HomePage(page);
  await homePage.navigateHomePage();
});{

const a ={...screenSizes[0], ...screenSizes[1]};
test("all homepage items display in 1920 x 1080", async ({ page }) => {
  await homePage.setScreenSizes(1920, 1080);
  await expect(homePage.logo).toBeVisible();
  await expect(homePage.ourProductsMenu).toBeVisible();
  await expect(homePage.specialOfferMenu).toBeVisible();
  await expect(homePage.popularItemsMenu).toBeVisible();
  await expect(homePage.contactUsMenu).toBeVisible();
  await expect(homePage.searchItem).toBeVisible();
  await expect(homePage.userIcon).toBeVisible();
  await expect(homePage.shoppingCartIcon).toBeVisible();
  await expect(homePage.inForIcon).toBeVisible();
});
test("", async ({ page }) => {});
