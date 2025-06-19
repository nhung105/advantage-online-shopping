import { Page, Locator, expect } from "@playwright/test";
class LoginPage {
  readonly page: Page;
  readonly username: Locator;
  readonly password: Locator;
  readonly rememberMeCheckbox: Locator;
  readonly createNewAccount: Locator;
  readonly SignInButton: Locator;
  readonly closeButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.username = page.getByLabel("Username");
    this.username = page.getByLabel("Password");
    this.rememberMeCheckbox = page.getByText("REMEMBER ME");
    this.createNewAccount = page.getByText("CREATE NEW ACCOUNT");
    this.SignInButton = page.getByText("SIGN IN");
    this.closeButton = page.locator('.closeBtn.loginPopUpCloseBtn"');
  }
}
export default LoginPage;
