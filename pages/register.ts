import { Locator, Page } from "@playwright/test";

class RegisterForm {
    readonly page: Page;
    readonly firstName: Locator;
    readonly lastName: Locator;
    readonly phone: Locator;
    constructor(page: Page) {
        this.page = page;
        this.firstName = page.locator('#firstName')
        this.lastName = page.locator('#lastName')
        this.phone = page.locator('#phone')
    }
    async navigate() {
        await this.page.goto('https://qa-practice.netlify.app/register');
    }
}