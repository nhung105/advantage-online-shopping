import { test, expect } from '@playwright/test';
import RegisterPage from '../pages/Register';
import testData from '../test-data/register-form.json' assert { type: "json"};  

test.beforeEach(async ({ page }) => {
    const registerPage = new RegisterPage(page)
    await registerPage.navigate();
});

testData.forEach(({ username, email, password, confirmPassword, agreeToTerm }) => {
    test(`testing with ${username}`, async ({ page }) => {
        const registerPage = new RegisterPage(page)
        await registerPage.fillRegisterForm({ username, email, password, confirmPassword, agreeToTerm })
        await registerPage.submitForm();
    })
})

test('All title fields are present', async ({ page }) => {
    const registerPage = new RegisterPage(page);
    expect(await registerPage.getTitleText(registerPage.accountTitle)).toBe('ACCOUNT DETAILS');
    expect(await registerPage.getTitleText(registerPage.personalTitle)).toBe('PERSONAL DETAILS');
    expect(await registerPage.getTitleText(registerPage.addressTitle)).toBe('ADDRESS');
});

test.describe('Field Validation', () => {
    const testcases = [
        { fieldSelector: '[name="usernameRegisterPage"]', expectedError: 'Username field is required' },
        { fieldSelector: '[name="emailRegisterPage"]', expectedError: 'Email field is required' },
        { fieldSelector: '[name="passwordRegisterPage"]', expectedError: 'Password field is required' },
        { fieldSelector: '[name="confirm_passwordRegisterPage"]', expectedError: 'Confirm password field is required' },
    ];

    testcases.forEach(({ fieldSelector, expectedError }) => {
        test(`Leave ${fieldSelector} blank`, async ({ page }) => {
            const registerPage = new RegisterPage(page);
            const fieldLocator = page.locator(fieldSelector);
            await registerPage.validateFieldError(fieldLocator, expectedError);
        });
    });
});

test('Password displaying as dots', async ({ page }) => {
    const registerPage = new RegisterPage(page);
    await expect(registerPage.passwordField).toHaveAttribute('type', 'password');
});

test('Check country value selected', async ({ page }) => {
    const registerPage = new RegisterPage(page);
    const selectedValue = await registerPage.selectCountry('Afghanistan');
    expect(selectedValue).toBe('Afghanistan');
});




// test.beforeEach(async ({ page }) => {
//     await page.goto('https://advantageonlineshopping.com/#/register');
// })

// test('All title fields are present', async ({ page }) => {
//     const accountTitle = await page.locator('[translate="ACCOUNT_DETAILS"]').textContent();
//     await expect(accountTitle).toBe('ACCOUNT DETAILS')
//     const personalTitle = await page.locator('[translate="PERSONAL_DETAILS"]').textContent();
//     await expect(personalTitle).toBe('PERSONAL DETAILS')
//     const addressTitle = await page.locator('[translate="ADDRESS"]').textContent();
//     await expect(addressTitle).toBe('ADDRESS')
// });

// test.describe('Field Validation', () => {
//     const testcases = [
//         { field: 'usernameRegisterPage', expectedError: 'Username field is required' },
//         { field: 'emailRegisterPage', expectedError: 'Email field is required' },
//         { field: 'passwordRegisterPage', expectedError: 'Password field is required' },
//         { field: 'confirm_passwordRegisterPage', expectedError: 'Confirm password field is required' },

//     ];
//     testcases.forEach(({ field, expectedError }) => {
//         test(`Leave ${field} blank`, async ({ page }) => {
//             await page.locator(`[name="${field}"]`).click()
//             await page.locator('body').click()
//             await expect(page.locator(`[name='${field}'] + label`)).toContainText(expectedError)
//         })
//     })
// });

// test('Password displaying as dots', async ({ page }) => {
//     await expect(page.locator('[name="passwordRegisterPage"]')).toHaveAttribute('type', 'password')
// })

// test('Check country value selected', async ({ page }) => {
//     await page.locator('[name="countryListboxRegisterPage"]').selectOption({ label: 'Afganistan' })
//     const selectedValue = await page.locator('[name="countryListboxRegisterPage"] option:checked').textContent()
//     expect(selectedValue).toBe('Afganistan')
// })