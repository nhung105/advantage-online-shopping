import { Locator, Page } from "@playwright/test";
import Base from "./Base";

class HomePage extends Base {
    readonly logo: Locator;
    readonly ourProductsMenu: Locator;
    readonly specialOfferMenu: Locator;
    readonly popularItemsMenu: Locator;
    readonly contactUsMenu: Locator;
    readonly searchItem: Locator;
    readonly userIcon: Locator;
    readonly shoppingCartIcon: Locator;
    readonly inForIcon: Locator;
    readonly speakersCategory: Locator;
    readonly tabletsCategory: Locator;
    readonly headPhones: Locator;
    readonly laptopsCategory: Locator;
    readonly miceCategory: Locator;

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
        
    }
}
export default HomePage;