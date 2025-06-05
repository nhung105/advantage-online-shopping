import { test, expect } from '@playwright/test';
import RegisterPage from '../pages/Register';
import dataTest from '../fixtures/register-form-data';
import { registerHooks } from 'module';
import { execArgv } from 'process';

// import testData from '../test-data/register-form.json' assert { type: "json"};
let registerPage: RegisterPage;

test.beforeEach(async ({ page }) => {
    registerPage = new RegisterPage(page);
    await registerPage.navigate();
});

test.describe('Happy cases', () => {
    dataTest.forEach(({ name, username, email, password, confirmPassword, agreeToTerm }) => {
        test((`${name}`), async () => {
            await registerPage.fillRegisterForm({ username, email, password, confirmPassword, agreeToTerm });
            await registerPage.submitForm();
        })
    })
});

test.describe('Check Validation Field', () => {
    const testcases1 = [
        { field: 'username', fieldSelector: '[name="usernameRegisterPage"]', expectedError: 'Username field is required', placeHolder: 'Username' },
        { field: 'Email', fieldSelector: '[name="emailRegisterPage"]', expectedError: 'Email field is required', placeHolder: 'Email' },
        { field: 'Password', fieldSelector: '[name="passwordRegisterPage"]', expectedError: 'Password field is required', placeHolder: 'Password' },
        { field: 'Confirm password', fieldSelector: '[name="confirm_passwordRegisterPage"]', expectedError: 'Confirm password field is required', placeHolder: 'Confirm password' },
    ];

    testcases1.forEach(({ field, fieldSelector, expectedError }) => {
        test(`Leave ${field} blank`, async () => {
            const actual = await registerPage.getBlankError(fieldSelector);
            expect(actual).toBe(expectedError);

        });
    });

    testcases1.forEach(({ field, fieldSelector, placeHolder }) => {
        test(`Check ${field}'s placeholder`, async () => {
            const actualPlaceHolder = await registerPage.getPlaceHolder(fieldSelector)
            expect(actualPlaceHolder).toBe(placeHolder);
        })
    })
    const testcases2 = [
        { field: 'firstname', fieldSelector: '[name="first_nameRegisterPage"]', placeHolder: 'First Name' },
        { field: 'lastname', fieldSelector: '[name="last_nameRegisterPage"]', placeHolder: 'Last Name' },
        { field: 'phonenumber', fieldSelector: '[name="phone_numberRegisterPage"]', placeHolder: 'Phone Number' },
        { field: 'city', fieldSelector: '[name="cityRegisterPage"]', placeHolder: 'City' },
        { field: 'address', fieldSelector: '[name="addressRegisterPage"]', placeHolder: 'Address' },
        { field: 'state/province/region', fieldSelector: '[name="state_/_province_/_regionRegisterPage"]', placeHolder: 'State / Province / Region' },
        { field: 'postalcode', fieldSelector: '[name="postal_codeRegisterPage"]', placeHolder: 'Postal Code' },
    ]
    testcases2.forEach(({ field, fieldSelector, placeHolder }) => {
        test(`Check ${field}'s placeholder`, async () => {
            const actual = await registerPage.getPlaceHolder(fieldSelector);
            await expect(actual).toBe(placeHolder);
        })
    })
    test('input wrong email address format', async () => {
        const actualError = await registerPage.getWrongEmailError('annen');
        await expect(actualError).toBe("Your email address isn't formatted correctly")
    })

});

test.describe('Check UI', () => {
    test('All title fields are present', async () => {
        expect(await registerPage.getTitleText(registerPage.accountTitle)).toBe('ACCOUNT DETAILS');
        expect(await registerPage.getTitleText(registerPage.personalTitle)).toBe('PERSONAL DETAILS');
        expect(await registerPage.getTitleText(registerPage.addressTitle)).toBe('ADDRESS');
    });

    test('Password displaying as dots', async () => {
        await expect(registerPage.passwordField).toHaveAttribute('type', 'password');
    });

    test('Check country value selected', async () => {
        await registerPage.selectCountry('Afganistan');
        const countrySelected = await registerPage.getCountrySelected();
        await expect(countrySelected).toBe('Afganistan');
    });
})