import { beforeEach } from "node:test";
import LoginPage from "../pages/login";
import { test, expect } from '@playwright/test';
import screenSizes from '../test-data/screen_sizes';
import { ECDH } from "crypto";
import { exec } from "child_process";
import RegisterPage from "../pages/Register";
import { RegisterFormData } from "../test-data/register-form-data";

let loginPage: LoginPage;
let registerPage: RegisterPage;
test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.navigateLoginPage();
})

test('login screen contains enough elements in different browsers', async ({ page }) => {
    await expect(loginPage.username).toBeVisible();
    await expect(loginPage.password).toBeVisible();
    await expect(loginPage.rememberMeCheckbox).toBeVisible();
    await expect(loginPage.SignInButton).toBeVisible();
    await expect(loginPage.createNewAccount).toBeVisible();
    await expect(loginPage.closeButton).toBeVisible();
})

test.describe('Verify all log in elements on different screen sizes', () => {
    screenSizes.forEach(({ width, height }) => {
        test(`Login elements are visible on ${width} x ${height}`, async ({ page }) => {
            await page.setViewportSize({ width, height });
            await expect(loginPage.username).toBeVisible();
            await expect(loginPage.password).toBeVisible();
            await expect(loginPage.rememberMeCheckbox).toBeVisible();
            await expect(loginPage.SignInButton).toBeVisible();
            await expect(loginPage.createNewAccount).toBeVisible();
            await expect(loginPage.closeButton).toBeVisible();
        })
    })
})
test('Verify password display after input', async ({ page }) => {
    await expect(loginPage.password).toHaveAttribute('type', 'password')
})

test.describe('Valida popup closes', () => {
    test('Login popup closes via backdrop click', async ({ page }) => {
        await page.mouse.click(20, 20)
        // await page.locator('.overlay').click()  //overlay??
        await expect(loginPage.popup).toBeHidden();
    })

    test('Login popup closes via X button', async ({ page }) => {
        await loginPage.closeButton.click();
        await expect(loginPage.popup).toBeHidden();
    })
    test('Tab Enter after filling incorrect username & password', async ({ page }) => {
        await loginPage.username.fill('sadasdad');
        await loginPage.password.fill('sadasdad');
        await page.keyboard.press('Enter');     //delay??
        await expect(loginPage.loginError).toHaveText('Incorrect user name or password.')
    })
    test('log in with a blank Username', async ({ page }) => {
        await loginPage.username.click();
        await loginPage.password.click();
        await loginPage.rememberMeCheckbox.click()
        expect(await loginPage.getUsernameError()).toBe('Username field is required');
        expect(await loginPage.getPasswordError()).toBe('Password field is required');
    })
})
test('login with an invalid Username and invalid Password', async ({ page }) => {
    await loginPage.username.fill('nnnsdand');
    await loginPage.password.fill('nnnsdand');
    await loginPage.SignInButton.click();
    await expect(loginPage.loginError).toHaveText('Incorrect user name or password.');
})
test('login with an valid Username and invalid Password', async ({ page }) => {
    await loginPage.username.fill('test123');
    await loginPage.password.fill('nnnsdand');
    await loginPage.SignInButton.click();
    await expect(loginPage.loginError).toHaveText('Incorrect user name or password.');
})
test('login with an invalid Username and valid Password', async ({ page }) => {
    await loginPage.username.fill('test123sadasd');
    await loginPage.password.fill('Aaa!');
    await loginPage.SignInButton.click();
    await expect(loginPage.loginError).toHaveText('Incorrect user name or password.');
})

test.describe('login successfully', () => {
    let user: RegisterFormData;
    test.beforeEach(async ({ page }) => {
        registerPage = new RegisterPage(page);
        user = await registerPage.generateData(false);
        await registerPage.fillrequiredFields(user);
    })

})

test('login with an valid Username and valid Password', async ({ page }) => {
    await loginPage.username.fill('test123');
    await loginPage.password.fill('Aaa!');
    await loginPage.SignInButton.click();
    await expect(loginPage.loginError).toHaveText('Incorrect user name or password.');
})








