import { Page, Locator, expect } from "@playwright/test";
import Base from '../pages/Base';
import { base } from "@faker-js/faker";
class LoginPage extends Base {
    readonly username: Locator;
    readonly password: Locator;
    readonly rememberMeCheckbox: Locator;
    readonly createNewAccount: Locator;
    readonly SignInButton: Locator;
    readonly closeButton: Locator;
    readonly popup: Locator;
    readonly loginError: Locator;


    constructor(page: Page) {
        super(page);
        this.username = page.locator('[name="username"]');
        this.password = page.locator('[name="password"]');
        this.rememberMeCheckbox = page.getByText("REMEMBER ME");
        this.createNewAccount = page.getByText("CREATE NEW ACCOUNT");
        this.SignInButton = page.getByRole('button', { name: "SIGN IN" });
        this.closeButton = page.locator('.closeBtn.loginPopUpCloseBtn');
        this.popup = page.locator('.PopUp');
        this.loginError = page.locator('#signInResultMessage');
    }
    async navigateLoginPage() {
        await this.navigateHomePage();
        await this.clickUserIcon();
    }
    async getUsernameError() {
        return await this.page.locator('[name="username"] + label').textContent();
    }
    async getPasswordError() {
        return await this.page.locator('[name="password"] + label').textContent();
    }
}
export default LoginPage;