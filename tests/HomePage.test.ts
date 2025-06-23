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
test.describe("Verify homepage items display in different screensizes", () => {
  const screenSizes1 = [{ ...screenSizes[0], ...screenSizes[1] }];
  screenSizes1.forEach(({ width, height }) => {
    test(`All homepage items display in ${width} x ${height}`, async ({
      page,
    }) => {
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
    });
    test("Homepage items display in 768 x 1024", async ({ page }) => {
      await homePage.setScreenSizes(768, 1024);
      await expect(homePage.logo).toBeVisible();
      await expect(homePage.userIcon).toBeVisible();
      await expect(homePage.shoppingCartIcon).toBeVisible();
      await expect(homePage.inForIcon).toBeVisible();
    });
    test("Homepage items display in 375 x 812", async ({ page }) => {
      await homePage.setScreenSizes(375, 812);
      await expect(homePage.logo).toBeVisible();
    });
  });
});

test.describe("Display the text Shop Now when hover every category", () => {
  test("hover speakers", async ({ page }) => {
    await page.locator("#speakersImg").hover();
    await expect(page.locator("#speakersLink")).toHaveText("Shop Now");
  });
  test("hover tablets", async ({ page }) => {
    await page.locator("#tabletsTxt").hover();
    await expect(page.locator("#tabletsLink")).toHaveText("Shop Now");
  });
  test("hover headphones", async ({ page }) => {
    await page.locator("#headphonesTxt").hover();
    await expect(page.locator("#headphonesLink")).toHaveText("Shop Now");
  });
  test("hover laptops", async ({ page }) => {
    await page.locator("#laptopsTxt").hover();
    await expect(page.locator("#laptopsLink")).toHaveText("Shop Now");
  });
  test("hover mice", async ({ page }) => {
    await page.locator("#miceTxt").hover();
    await expect(page.locator("#miceLink")).toHaveText("Shop Now");
  });
});

test.describe("display product list when click on a category", () => {
  test("click on speakers", async ({ page }) => {
    await page.locator("#speakersImg").click();
    await expect(page.getByText("BUY NOW")).toBeVisible({ timeout: 10000 });
  });
  test("click on tablets", async ({ page }) => {
    await page.locator("#tabletsImg").click();
    await expect(page.getByText("BUY NOW")).toBeVisible({ timeout: 10000 });
  });
});

test.describe("display product list when click on View details on popular items", () => {
  test("click on View Details of the first item", async ({ page }) => {});
});
