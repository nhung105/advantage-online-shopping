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
    readonly selectedCountry: Locator;
    readonly wrongEmailError: Locator;
    readonly accountquestion: Locator;
    readonly signinpopup: Locator;
    readonly closepopupbutton: Locator;
    readonly createnewaccount: Locator;
    readonly facebookicon: Locator;
    readonly twittericon: Locator;
    readonly linkedinicon: Locator;


    constructor(page: Page) {
        this.page = page;
        this.accountTitle = page.locator('[translate ="ACCOUNT_DETAILS"]');
        this.personalTitle = page.locator('[translate="PERSONAL_DETAILS"]');
        this.addressTitle = page.locator('[translate="ADDRESS"]');
        this.usernameField = page.locator('[name="usernameRegisterPage"]');
        this.emailField = page.locator('[name="emailRegisterPage"]');
        this.wrongEmailError = page.locator('[name="emailRegisterPage"] + label')
        this.passwordField = page.locator('[name="passwordRegisterPage"]');
        this.confirmPasswordField = page.locator('[name="confirm_passwordRegisterPage"]');
        this.countryDropdown = page.locator('[name="countryListboxRegisterPage"]');
        this.selectedCountry = page.locator('[name="countryListboxRegisterPage"] option:checked');
        this.agreeCheckbox = page.locator('[name="i_agree"]');
        this.registerButton = page.locator('#register_btn');
        this.accountquestion = page.getByText("ALREADY HAVE AN ACCOUNT?");
        this.signinpopup = page.getByText("SIGN IN WITH FACEBOOK OR");
        this.closepopupbutton = page.locator(".closeBtn");
        this.createnewaccount = page.getByText('CREATE NEW ACCOUNT');
        this.facebookicon = page.locator('img[name="follow_facebook"]');
        this.twittericon = page.locator('img[name="follow_twitter"]');
        this.linkedinicon = page.locator('img[name="follow_linkedin"]');


    }
    async navigate() {
        await this.page.goto('https://advantageonlineshopping.com/#/register');
    }

    async getTitleText(element) {
        return await element.textContent();
    }

    async getBlankError(fieldSelector) {
        await this.page.locator(fieldSelector).click();
        await this.page.locator('body').click();
        return this.page.locator(`${fieldSelector} + label`).textContent()
    }
    async submitForm() {
        await this.registerButton.click();
    }

    async selectCountry(countryLabel) {
        await this.countryDropdown.selectOption({ label: countryLabel });
    }
    async getCountrySelected() {
        return await this.selectedCountry.textContent();
    }
    async getWrongEmailError(wrongemail) {
        await this.emailField.fill(wrongemail);
        await this.page.locator('body').click();
        return await this.wrongEmailError.textContent();
    }

    async getPlaceHolder(fieldSelector) {
        return await this.page.locator(`${fieldSelector} + label`).textContent();
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