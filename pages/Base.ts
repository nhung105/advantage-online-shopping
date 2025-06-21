import { Page } from '@playwright/test'
class Base {
    readonly page: Page;
    constructor(page: Page) {
        this.page = page;
    }
    async navigateHomePage() {
        await this.page.goto('https://advantageonlineshopping.com')
    };
    async clickUserIcon() {
        await this.page.locator('#menuUser').click();
    }
    async clickOut() {
        await this.page.locator('.body').click();
    }
}
export default Base;
