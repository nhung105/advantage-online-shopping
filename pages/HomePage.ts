import { Locator, Page } from "@playwright/test";
import Base from "./Base";
import { LoadFnOutput } from "module";

class HomePage extends Base {
    readonly logo: Locator;
    readonly ourProductsMenu: Locator;
    readonly specialOfferMenu: Locator;
    readonly popularItemsMenu: Locator;
    readonly contactUsMenu: Locator;
    readonly searchItem: Locator;
    readonly userIcon: Locator;
    readonly inForIcon: Locator;
    readonly speakersCategory: Locator;
    readonly tabletsCategory: Locator;
    readonly headPhonesCategory: Locator;
    readonly laptopsCategory: Locator;
    readonly miceCategory: Locator;
    readonly searchField: Locator;
    readonly closeSearchBtn: Locator;
    readonly shoppingCartIcon: Locator;
    readonly removeItemButton: Locator;
    readonly checkOutPopup: Locator;
    readonly shoppingCartInfor: Locator;
    readonly toolTipCart: Locator;



    constructor(page: Page) {
        super(page);
        this.logo = page.getByRole("link", { name: "dvantage DEMO" });
        this.ourProductsMenu = page.getByRole("link", { name: "OUR PRODUCTS" });
        this.specialOfferMenu = page.getByRole("link", { name: "SPECIAL OFFER" });
        this.popularItemsMenu = page.getByRole("link", { name: "POPULAR ITEMS" });
        this.contactUsMenu = page.getByRole("link", { name: "CONTACT US" });
        this.searchItem = page.locator("#search");
        this.contactUsMenu = page.getByRole("link", { name: "CONTACT US" });
        this.userIcon = page.locator("#menuUserLink");
        this.shoppingCartIcon = page.locator("#shoppingCartLink");
        this.inForIcon = page.locator("#menuHelp");
        this.speakersCategory = page.locator('#speakersImg');
        this.tabletsCategory = page.locator('#tabletsTxt');
        this.headPhonesCategory = page.locator("#headphonesTxt");
        this.laptopsCategory = page.locator("#laptopsTxt")
        this.miceCategory = page.locator("#miceTxt")
        this.searchField = page.locator('#autoComplete')
        this.closeSearchBtn = page.locator('div[data-ng-click="closeSearchForce()"] img[src*="closeDark.png"]');
        this.shoppingCartIcon = page.locator('#shoppingCartLink');
        this.shoppingCartInfor = page.locator('#shoppingCart');
        this.toolTipCart = page.locator('#toolTipCart')


        // tooltip
        this.removeItemButton = page.locator('#toolTipCart div.removeProduct');
        this.checkOutPopup = page.locator('#checkOutPopUp');

    }
    async getEmptyPopupMessage() {
        return await this.page.locator('#toolTipCart label').allTextContents()
    }
    async getNumber() {
        return await this.page.locator('#menuCart + span').textContent();
    }
    async selectItem(item: string) {
        await this.page.getByText(item).click()
    }
    async addToCart() {
        await this.page.locator('[name="save_to_cart"]').click()
    }
}
export default HomePage;