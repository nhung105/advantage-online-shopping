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

test.describe('Field limit', () => {
    test('fill username > 15 chars', async ({ page }) => {
        const randomUsername = Math.random().toString(36).padEnd(20, 'xx').substring(2, 18);
        await registerPage.usernameField.fill(randomUsername);
        await page.locator('body').click();
        await expect(page.locator('[name="usernameRegisterPage"] + label')).toContainText('Use maximum 15 character')
    })

})




test.describe("Handle account popup", () => {
    test("click account question", async ({ page }) => {
        await registerPage.accountquestion.click();
        await expect(registerPage.signinpopup).toBeVisible();
    });

    test("click X button on signin popup", async ({ page }) => {
        await registerPage.accountquestion.click();
        await registerPage.closepopupbutton.click();
        await expect(registerPage.signinpopup).toBeHidden();
    });
    test('click Create new account on signin popup ', async ({ page }) => {
        await registerPage.accountquestion.click();
        await registerPage.createnewaccount.click();
        await expect(registerPage.accountTitle).toBeVisible();
    })

});

test.describe('footer social media icons', () => {
    test('click f icon', async ({ page, context }) => {
        // await registerPage.facebookicon.click();
        // const newPage = await context.waitForEvent('page');
        const [newPage] = await Promise.all([
            context.waitForEvent('page'),
            registerPage.facebookicon.click()
        ]);
        await expect(newPage).toHaveURL('https://www.facebook.com/MicroFocus/');
    })

    test('click twitter icon', async ({ page, context }) => {
        const [newPage] = await Promise.all([
            context.waitForEvent('page'),
            registerPage.twittericon.click()
        ])
        await expect(newPage).toHaveURL('https://x.com/MicroFocus');
    })
    test('click linkedin icon', async ({ page, context }) => {
        const [newPage] = await Promise.all([
            context.waitForEvent('page'),
            registerPage.linkedinicon.click()
        ])
        await expect(newPage).toHaveTitle(' LinkedIn Login, Sign in | LinkedIn ');
    })
});