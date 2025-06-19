import { Page, Locator, expect } from "@playwright/test";
import { faker } from "@faker-js/faker";
import { RegisterFormData } from "../test-data/register-form-data";
// import { genPassword } from "../test-data/genpassword";

class RegisterPage {
    readonly page: Page;
    readonly accountTitle: Locator;
    readonly personalTitle: Locator;
    readonly addressTitle: Locator;
    readonly usernameField: Locator;
    readonly emailField: Locator;
    readonly passwordField: Locator;
    readonly firstNameField: Locator;
    readonly lastNameField: Locator;
    readonly phoneNumberField: Locator;
    readonly cityField: Locator;
    readonly addressField: Locator;
    readonly stateField: Locator;
    readonly postalCodeField: Locator;
    readonly confirmPasswordField: Locator;
    readonly countryDropdown: Locator;
    readonly agreeCheckbox: Locator;
    readonly registerButton: Locator;
    readonly selectedCountry: Locator;
    readonly wrongUsernameError: Locator;
    readonly wrongEmailError: Locator;
    readonly wrongPasswordError: Locator;
    readonly wrongConfirmPasswordError: Locator;
    readonly wrongFirstNameError: Locator;
    readonly wrongLastNameError: Locator;
    readonly wrongPhoneNumberError: Locator;
    readonly wrongCityError: Locator;
    readonly wrongAddressError: Locator;
    readonly wrongStateError: Locator;
    readonly wrongPostalCodeError: Locator;
    readonly accountquestion: Locator;
    readonly signinpopup: Locator;
    readonly closepopupbutton: Locator;
    readonly createnewaccount: Locator;
    readonly facebookicon: Locator;
    readonly twittericon: Locator;
    readonly linkedinicon: Locator;
    readonly existingUserError: Locator;
    readonly copyrightInfor: Locator;

    constructor(page: Page) {
        this.page = page;
        this.accountTitle = page.locator('[translate ="ACCOUNT_DETAILS"]');
        this.personalTitle = page.locator('[translate="PERSONAL_DETAILS"]');
        this.addressTitle = page.locator('[translate="ADDRESS"]');
        this.usernameField = page.locator('[name="usernameRegisterPage"]');
        this.emailField = page.locator('[name="emailRegisterPage"]');
        this.passwordField = page.locator('[name="passwordRegisterPage"]');
        this.confirmPasswordField = page.locator(
            '[name="confirm_passwordRegisterPage"]'
        );
        this.firstNameField = page.locator('[name="first_nameRegisterPage"]');
        this.lastNameField = page.locator('[name="last_nameRegisterPage"]');
        this.phoneNumberField = page.locator('[name="phone_numberRegisterPage"]');
        this.cityField = page.locator('[name="cityRegisterPage"]');
        this.addressField = page.locator('[name="addressRegisterPage"]');
        this.stateField = page.locator(
            '[name="state_/_province_/_regionRegisterPage"]'
        );
        this.postalCodeField = page.locator('[name="postal_codeRegisterPage"]');

        this.wrongUsernameError = page.locator(
            '[name="usernameRegisterPage"] + label'
        );
        this.wrongEmailError = page.locator('[name="emailRegisterPage"] + label');
        this.wrongPasswordError = page.locator(
            '[name="passwordRegisterPage"] + label'
        );
        this.wrongConfirmPasswordError = page.locator(
            '[name="confirm_passwordRegisterPage"] + label'
        );
        this.wrongFirstNameError = page.locator(
            '[name="first_nameRegisterPage"] + label'
        );
        this.wrongLastNameError = page.locator(
            '[name="last_nameRegisterPage"] + label'
        );
        this.wrongPhoneNumberError = page.locator(
            '[name="phone_numberRegisterPage"] + label'
        );
        this.wrongCityError = page.locator('[name="cityRegisterPage"] + label');
        this.wrongAddressError = page.locator(
            '[name="addressRegisterPage"] + label'
        );
        this.wrongStateError = page.locator(
            '[name="state_/_province_/_regionRegisterPage"] + label'
        );
        this.wrongPostalCodeError = page.locator(
            '[name="postal_codeRegisterPage"] + label'
        );

        this.copyrightInfor = page.locator("#follow + label");
        this.confirmPasswordField = page.locator(
            '[name="confirm_passwordRegisterPage"]'
        );
        this.countryDropdown = page.locator('[name="countryListboxRegisterPage"]');
        this.selectedCountry = page.locator(
            '[name="countryListboxRegisterPage"] option:checked'
        );
        this.agreeCheckbox = page.locator('[name="i_agree"]');
        this.registerButton = page.locator("#register_btn");
        this.accountquestion = page.getByText("ALREADY HAVE AN ACCOUNT?");
        this.signinpopup = page.getByText("SIGN IN WITH FACEBOOK OR");
        this.closepopupbutton = page.locator(".closeBtn");
        this.createnewaccount = page.getByText("CREATE NEW ACCOUNT");
        this.facebookicon = page.locator('img[name="follow_facebook"]');
        this.twittericon = page.locator('img[name="follow_twitter"]');
        this.linkedinicon = page.locator('img[name="follow_linkedin"]');
        this.existingUserError = page.getByText("User name already exists");
    }
    async navigateHomePage() {
        await this.page.goto('https://advantageonlineshopping.com')
    };

    async navigateRegisterPage() {
        await this.navigateHomePage();
        await this.page.locator('#menuUser').click();
        await this.page.getByText('CREATE NEW ACCOUNT').click();
    }
    async navigateLoginPage() {
        await this.navigateHomePage();
        await this.page.locator('#menuUser').click();
    }

    async getTitleText(element) {
        return await element.textContent();
    }

    async getBlankError(fieldSelector) {
        await this.page.locator(fieldSelector).click();
        await this.page.locator("body").click();
        return this.page.locator(`${fieldSelector} + label`).textContent();
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
        await this.page.locator("body").click();
        return await this.wrongEmailError.textContent();
    }

    async getPlaceHolder(fieldSelector) {
        return await this.page.locator(`${fieldSelector} + label`).textContent();
    }
    async genValue(number) {
        return new Array(number).fill("x").join("");
    }

    async clickOut() {
        await this.page.locator("body").click();
    }
    async setViewportSize(width, height) {
        await this.page.setViewportSize({ width, height });
    }
    async fillrequiredFields({
        username,
        email,
        password,
        confirmPassword,
        agreeToTerm,
    }: RegisterFormData) {
        await this.usernameField.fill(username);
        await this.emailField.fill(email);
        await this.passwordField.fill(password);
        await this.confirmPasswordField.fill(confirmPassword);
        if (agreeToTerm) {
            await this.agreeCheckbox.check();
        }
        else {
            await this.agreeCheckbox.uncheck();
        }
    }

    async fillAllFields({
        username,
        email,
        password,
        confirmPassword,
        firstName,
        lastName,
        phoneNumber,
        country,
        city,
        address,
        state,
        postalCode,
        agreeToTerm,
    }: RegisterFormData) {
        await this.usernameField.fill(username);
        await this.emailField.fill(email);
        await this.passwordField.fill(password);
        await this.confirmPasswordField.fill(confirmPassword);
        if (firstName) await this.firstNameField.fill(firstName);
        if (lastName) await this.lastNameField.fill(lastName);
        if (phoneNumber) await this.phoneNumberField.fill(phoneNumber.toString());
        if (country) await this.countryDropdown.selectOption({ index: 1 });
        if (city) await this.cityField.fill(city);
        if (address) await this.addressField.fill(address);
        if (state) await this.stateField.fill(state);
        if (postalCode) await this.postalCodeField.fill(postalCode);

        if (agreeToTerm) {
            await this.agreeCheckbox.check();
        }
        else if (!agreeToTerm) {
            await this.agreeCheckbox.uncheck();
        }
    }
    async generateData(Optional = false) {
        const password = "Aaa1";
        const base: RegisterFormData = {
            username: faker.internet.username().slice(0, 15),
            email: faker.internet.email(),
            password,
            confirmPassword: password,
            agreeToTerm: true,
        };

        if (!Optional) return base;

        return {
            ...base,
            firstName: faker.person.firstName().slice(0, 30),
            lastName: faker.person.lastName().slice(0, 30),
            phoneNumber: faker.phone.number().slice(0, 20),
            city: faker.location.city().slice(0, 25),
            address: faker.location.streetAddress().slice(0, 25),
            state: faker.location.state().slice(0, 10),
            postalCode: faker.location.zipCode().slice(0, 10),
        };
    }
}

export default RegisterPage;