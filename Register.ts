import { Page, Locator, expect } from '@playwright/test';

class RegisterPage {
    readonly page: Page;
    readonly accountTitle: Locator;
    readonly personalTitle: Locator;
    readonly addressTitle: Locator;
    readonly usernameField: Locator;
    readonly emailField: Locator;
    readonly passwordField: Locator;
    readonly confirmPasswordField: Locator;
    readonly countryDropdown: Locator;
    readonly agreeCheckbox: Locator;
    readonly registerButton: Locator;


    constructor(page: Page) {
        this.page = page;
        this.accountTitle = page.locator('[translate ="ACCOUNT_DETAILS"]');
        this.personalTitle = page.locator('[translate="PERSONAL_DETAILS"]');
        this.addressTitle = page.locator('[translate="ADDRESS"]');

        // Form Fields
        this.usernameField = page.locator('[name="usernameRegisterPage"]');
        this.emailField = page.locator('[name="emailRegisterPage"]');
        this.passwordField = page.locator('[name="passwordRegisterPage"]');
        this.confirmPasswordField = page.locator('[name="confirm_passwordRegisterPage"]');

        // Country Dropdown
        this.countryDropdown = page.locator('[name="countryListboxRegisterPage"]');
        this.agreeCheckbox = page.locator('[name="i_agree"]');
        this.registerButton = page.locator('#register_btn');
    }
    async navigate() {
        this.page.goto('https://advantageonlineshopping.com/#/register');
    }

    async getTitleText(element) {
        return await element.textContent();
    }

    async validateFieldError(fieldLocator, expectedError) {
        await fieldLocator.click();
        await this.page.locator('body').click();
        await expect(fieldLocator.locator('+ label')).toContainText(expectedError);
    }
    async submitForm() {
        await this.registerButton.click();
    }

    async selectCountry(countryLabel) {
        await this.countryDropdown.selectOption({ label: countryLabel });
        return await this.page.locator('[name="countryListboxRegisterPage"] option:checked').textContent();
    }
    async fillRegisterForm({ username, email, password, confirmPassword, agreeToTerm }) {
        await this.usernameField.fill(username);
        await this.emailField.fill(email);
        await this.passwordField.fill(password);
        await this.confirmPasswordField.fill(confirmPassword);
        if (agreeToTerm) {
            await this.agreeCheckbox.check();
        }
    }
}
export default RegisterPage;