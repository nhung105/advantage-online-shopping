import { Page } from "@playwright/test";
import screenSizes from "../test-data/screen_sizes";
class Base {
  readonly page: Page;
  constructor(page: Page) {
    this.page = page;
  }
  async navigateHomePage() {
    await this.page.goto("https://advantageonlineshopping.com/");
    await this.page.waitForLoadState("networkidle");
  }
  async clickUserIcon() {
    await this.page.locator("#menuUser").click();
  }
  async clickOut() {
    await this.page.locator(".body").click();
  }
  async setScreenSizes(width, height) {
    await this.page.setViewportSize({ width, height });
  }
}
export default Base;
