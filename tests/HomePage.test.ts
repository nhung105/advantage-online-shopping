import HomePage from "../pages/HomePage";
import { test, expect } from "@playwright/test";
import Base from "../pages/Base";
import screenSizes from "../test-data/screen_sizes";
import { he } from "@faker-js/faker";
import { time } from "console";
import { TIMEOUT } from "dns";
import { Laptops, productMap } from "../test-data/products";
import { Headphones } from "../test-data/products";
import { Tablets } from "../test-data/products";
import { Speakers } from "../test-data/products";
import { Mice } from "../test-data/products";
import { categories } from "../test-data/categories";
let homePage: HomePage;

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
        await homePage.speakersCategory.hover();
        await expect(page.locator("#speakersLink")).toHaveText("Shop Now");
    });
    test("hover tablets", async ({ page }) => {
        await homePage.tabletsCategory.hover();
        await expect(page.locator("#tabletsLink")).toHaveText("Shop Now");
    });
    test("hover headphones", async ({ page }) => {
        await homePage.headPhonesCategory.hover();
        await expect(page.locator("#headphonesLink")).toHaveText("Shop Now");
    });
    test("hover laptops", async ({ page }) => {
        await homePage.laptopsCategory.hover();
        await expect(page.locator("#laptopsLink")).toHaveText("Shop Now");
    });
    test("hover mice", async ({ page }) => {
        await homePage.miceCategory.hover();
        await expect(page.locator("#miceLink")).toHaveText("Shop Now");
    });
});

test.describe("display product list when click on a category", () => {
    test("click on speakers", async ({ page }) => {
        await homePage.speakersCategory.click();
        await expect(page.getByText("BUY NOW")).toBeVisible({ timeout: 10000 });
    });
    test("click on tablets", async ({ page }) => {
        await homePage.tabletsCategory.click();
        await expect(page.getByText("BUY NOW")).toBeVisible({ timeout: 10000 });
    });
});

test.describe("display product list when click on View details on popular items", () => {
    test("click on View Details of the first item", async ({ page }) => {
        await page.locator('#details_16').click();
        await expect(page.locator('[name="save_to_cart"]')).toBeVisible({ timeout: 10000 })
    });
    test("click on View Details of the second item", async ({ page }) => {
        await page.locator('#details_10').click();
        await expect(page.locator('[name="save_to_cart"]')).toBeVisible({ timeout: 15000 })
    });
    test("click on View Details of the third item", async ({ page }) => {
        await page.locator('#details_21').click();
        await expect(page.locator('[name="save_to_cart"]')).toBeVisible({ timeout: 15000 })
    });
});
test('Popup appear when click Chat with us', async ({ page }) => {
    await page.locator('[name="chat_with_us"]').click();
    const page1 = await page.waitForEvent('popup')
    await expect(page1.locator('#chat')).toBeVisible();
})
test('Button Send disable when not fill all required information in Contact us', async ({ page }) => {
    await expect(page.locator('#send_btn')).toBeDisabled();
})
test('Verify error message when leave Email blank', async ({ page }) => {
    await page.locator('[name="emailContactUs"]').click();
    await page.locator('body').click()
    await expect(page.locator('[name="emailContactUs"] + label')).toContainText('Email field is required');
})
test('Verify error message when leave Subject blank', async ({ page }) => {
    await page.locator('[name="subjectTextareaContactUs"]').click();
    await page.locator('body').click()
    await expect(page.locator('[name="subjectTextareaContactUs"] + label')).toContainText('Email field is required');
})
test('Verify default selection in dropdowns of Select Category', async ({ page }) => {
    await expect(page.locator('[name="categoryListboxContactUs"]')).toContainText('Select Category')
})
test('Verify default selection in dropdowns of Select Product', async ({ page }) => {
    await expect(page.locator('[name="productListboxContactUs"]')).toContainText('Select Product')
})

test.describe('Verify dropdown options in Select Product after selecting a category', () => {
    const products = [Laptops, Headphones, Tablets, Speakers, Mice]
    categories.forEach((categories) => {
        test(`Category ${categories}`, async ({ page }) => {
            await page.locator('[name="categoryListboxContactUs"]').selectOption(categories);
            await page.waitForSelector('select[name="productListboxContactUs"]')
            await page.waitForFunction(() => {
                const select = document.querySelector('select[name="productListboxContactUs"]') as HTMLSelectElement;
                return select && select.options.length > 1;
            });
            const options = await page.locator('select[name="productListboxContactUs"]>option').allTextContents();
            expect(options).toEqual(productMap[categories])
        })
    })
})


test('Check values in dropdown list in Select Product after selecting a category ', async ({ page }) => {

});
test('Click Send after filling Email and Subject', async ({ page }) => {
    await page.locator('[name="emailContactUs"]').fill('abc@gmail.com')
    await page.locator('[name="subjectTextareaContactUs"]').fill('test')
    await expect(page.locator('#send_btn')).toBeEnabled()
})
test('Click Send after filling all 4 fields', async ({ page }) => {
    await page.locator('[name="categoryListboxContactUs"]').selectOption('Laptops');
    await page.locator('[name="productListboxContactUs"]').selectOption({ index: 2 })

    await page.locator('[name="emailContactUs"]').fill('abc@gmail.com')
    await page.locator('[name="subjectTextareaContactUs"]').fill('test')
    await page.locator('#send_btn').click()
    await expect(page.locator('.roboto-regular.successMessage')).toContainText('Thank you for contacting Advantage support.');
})

test.describe('Search module', () => {
    test('Search with invalid input values', async ({ page }) => {
        await homePage.searchItem.click();
        await homePage.searchField.fill('abc');
        await page.keyboard.press("Enter")
        await expect(page.locator('.noProducts.roboto-bold')).toContainText('No results for "abc"')
    })
    test('Search using special characters', async ({ page }) => {
        await homePage.searchItem.click();
        await homePage.searchField.fill('!@#$%');
        await page.keyboard.press("Enter")
        await expect(page.locator('.noProducts.roboto-bold')).toContainText('No results for "!@#$%"')
    })
    test.describe('Search with Case sensitivity', () => {
        const category = ["Speaker", "Tablet", "Headphone", "Mouse", "Laptop"]
        category.forEach((category) => {
            test(`Search with category ${category}`, async ({ page }) => {
                await homePage.searchItem.click();

                await homePage.searchField.fill(category.toUpperCase());

                await page.keyboard.press("Enter");
                await page.waitForSelector('.categoryRight li .productName');
                const products = await page.locator('.categoryRight li .productName').allTextContents();
                products.forEach((product) => {
                    expect(product).toContain(category)
                })

            })
        })
    })

    test('Search using an extremely long input string', async ({ page }) => {
        await homePage.searchItem.click();
        await homePage.searchField.fill('Navigation should be available for multi-page results.');
        await page.keyboard.press("Enter")
        await expect(page.locator('.noProducts.roboto-bold')).toContainText('No results for "Navigation should be available for multi-page results."')
    })
    test('Clear search field by clicking the "X" icon', async ({ page }) => {
        await homePage.searchItem.click();
        await homePage.searchField.fill('abc');
        await page.locator('.autoCompleteCover img').click()
        await page.locator('.autoCompleteCover img').isHidden()

    })
    test('Display search field when clicking the search icon', async ({ page }) => {
        await homePage.searchItem.click();
        await expect(page.locator('#autoComplete')).toBeVisible()
    })

    test.describe('Search for a fully matching category', () => {
        const category = ["Speaker", "Tablet", "Headphone", "Laptop", "Mouse"]
        category.forEach((category) => {
            test(`Check category ${category} `, async ({ page }) => {
                await homePage.searchItem.click();
                await homePage.searchField.fill(category);
                await page.keyboard.press('Enter');
                await page.waitForSelector('.categoryRight li .productName')
                const products = await page.locator('.categoryRight li .productName').allTextContents();
                for (let i = 0; i < products.length; i++) {
                    expect(products[i]).toContain(category);
                }
            })
        })
    })
    test.describe('Search for a partially matching category', () => {
        const category = ["Speaker", "Tablet", "Headphone", "Laptop", "Mouse"]
        const partial = category.map((category) => category.slice(0, 3))
        category.forEach((category) => {
            test(`Check category ${category} `, async ({ page }) => {
                await homePage.searchItem.click();
                for (let i = 0; i < partial.length; i++) {
                    await homePage.searchField.fill(partial[i]);
                    await page.keyboard.press('Enter');
                    await page.waitForSelector('.categoryRight li .productName')
                    const products = await page.locator('.categoryRight li .productName').allTextContents();
                    for (let j = 0; j < products.length; j++) {
                        expect(products[j]).toContain(partial[i]);
                    }
                }
            })
        })
    })
    test('Click "View All" after searching for a valid category', async ({ page }) => {
        await homePage.searchItem.click()
        await homePage.searchField.fill('Tab')
        await page.keyboard.press('Enter');
        await page.getByRole('link', { name: "View All" }).click();
        const result = await page.locator('.categoryRight li .productName').allTextContents();
        result.forEach((product) => {
            expect(product).toContain('Tablet')
        })
    })

    test('Click on a product after searching for a valid category', async ({ page }) => {
        await homePage.searchItem.click()
        await homePage.searchField.fill('Tab')
        await page.keyboard.press('Enter');
        await page.waitForSelector('.categoryRight li .productName');
        await page.locator('.autoCompleteCover img').click();
        const result = await page.locator('.categoryRight li .productName').allTextContents();
        await page.locator('.categoryRight li .productName').filter({ hasText: result[0] }).click();
        await expect(page.getByRole('heading', { name: result[0] })).toBeVisible({ timeout: 50000 });
    })
    test('Search for a fully matching product', async ({ page }) => {
        await homePage.searchItem.click()
        await homePage.searchField.fill('HP ENVY - 17t Touch Laptop')
        await page.keyboard.press('Enter');
        await page.waitForSelector('.categoryRight li .productName');
        await page.locator('.autoCompleteCover img').click();
        const productName = await page.locator('.categoryRight li .productName').textContent();
        expect(productName).toBe('HP ENVY - 17t Touch Laptop');
    })
    test('Search for a partially matching product', async ({ page }) => {
        await homePage.searchItem.click()
        await homePage.searchField.fill('17t Touch Laptop')
        await page.keyboard.press('Enter');
        await page.waitForSelector('.categoryRight li .productName');
        await page.locator('.autoCompleteCover img').click();
        const productName = await page.locator('.categoryRight li .productName').textContent();
        expect(productName).toBe('HP ENVY - 17t Touch Laptop');
    })
})
test.describe('Shopping Cart', () => {
    test('Check shopping cart when no item is added', async ({ page }) => {
        await homePage.shoppingCartIcon.click();
        await expect(page.getByText('Your shopping cart is empty')).toBeVisible()
    })
    test('Hover shopping cart when no item is added', async ({ page }) => {
        // await homePage.shoppingCartIcon.hover();
        const [popup] = await Promise.all([await page.waitForEvent('popup'), await homePage.shoppingCartIcon.hover()])
        await expect(page.getByText('Your shopping cart is empty')).toBeVisible()
    })
})
