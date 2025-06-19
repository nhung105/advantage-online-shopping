import { test, expect } from "@playwright/test";
import RegisterPage from "../pages/Register";
import invalidPassword from "../test-data/register-form-data";
import { RegisterFormData } from "../test-data/register-form-data";
import { registerHooks } from "module";
import { execArgv } from "process";
import { throws } from "assert";

// import testData from '../test-data/register-form.json' assert { type: "json"};
let registerPage: RegisterPage;

test.beforeEach(async ({ page }) => {
  registerPage = new RegisterPage(page);
  await registerPage.navigateRegisterPage();
});

test.describe("Happy cases", () => {
  test("fill all required fields", async () => {
    let user = await registerPage.generateData(true);
    await registerPage.fillrequiredFields(user);
    await registerPage.submitForm();
  });
});

test("fill all required and optional fields", async ({ page }) => {
  let user = await registerPage.generateData(false);
  await registerPage.fillAllFields(user);
  await registerPage.submitForm();
});

test.describe("Check Validation Field", () => {
  const testcases1 = [
    {
      field: "username",
      fieldSelector: '[name="usernameRegisterPage"]',
      expectedError: "Username field is required",
      placeHolder: "Username",
    },
    {
      field: "Email",
      fieldSelector: '[name="emailRegisterPage"]',
      expectedError: "Email field is required",
      placeHolder: "Email",
    },
    {
      field: "Password",
      fieldSelector: '[name="passwordRegisterPage"]',
      expectedError: "Password field is required",
      placeHolder: "Password",
    },
    {
      field: "Confirm password",
      fieldSelector: '[name="confirm_passwordRegisterPage"]',
      expectedError: "Confirm password field is required",
      placeHolder: "Confirm password",
    },
  ];

  test.describe("Leave field blank", () => {
    testcases1.forEach(({ field, fieldSelector, expectedError }) => {
      test(`Leave ${field} blank`, async () => {
        const actual = await registerPage.getBlankError(fieldSelector);
        expect(actual).toBe(expectedError);
      });
    });
  });

  test.describe("Check field's placeholder", () => {
    testcases1.forEach(({ field, fieldSelector, placeHolder }) => {
      test(`Check ${field}'s placeholder`, async () => {
        const actualPlaceHolder = await registerPage.getPlaceHolder(
          fieldSelector
        );
        expect(actualPlaceHolder).toBe(placeHolder);
      });
    });
    const testcases2 = [
      {
        field: "firstname",
        fieldSelector: '[name="first_nameRegisterPage"]',
        placeHolder: "First Name",
      },
      {
        field: "lastname",
        fieldSelector: '[name="last_nameRegisterPage"]',
        placeHolder: "Last Name",
      },
      {
        field: "phonenumber",
        fieldSelector: '[name="phone_numberRegisterPage"]',
        placeHolder: "Phone Number",
      },
      {
        field: "city",
        fieldSelector: '[name="cityRegisterPage"]',
        placeHolder: "City",
      },
      {
        field: "address",
        fieldSelector: '[name="addressRegisterPage"]',
        placeHolder: "Address",
      },
      {
        field: "state/province/region",
        fieldSelector: '[name="state_/_province_/_regionRegisterPage"]',
        placeHolder: "State / Province / Region",
      },
      {
        field: "postalcode",
        fieldSelector: '[name="postal_codeRegisterPage"]',
        placeHolder: "Postal Code",
      },
    ];

    testcases2.forEach(({ field, fieldSelector, placeHolder }) => {
      test(`Check placeholder of ${field}`, async () => {
        expect(registerPage.getPlaceHolder(fieldSelector)).toBe(placeHolder);
      });
    });
  });

  test("input wrong email address format", async () => {
    const actualError = await registerPage.getWrongEmailError("annen");
    await expect(actualError).toBe(
      "Your email address isn't formatted correctly"
    );
  });

  test("input confirm password not same as password", async () => {
    await registerPage.passwordField.fill("Nhungabc@123");
    await registerPage.confirmPasswordField.fill("Nhungabc@123b");
    await registerPage.clickOut();
    expect(await registerPage.wrongConfirmPasswordError.textContent()).toBe(
      "Passwords do not match"
    );
  });

  test.describe("TC with existing username", () => {
    test.beforeEach(async ({ page }) => {
      const user = await registerPage.generateData(true);
      await registerPage.fillrequiredFields(user);
      await registerPage.submitForm();
    });
    test("register with existing username", async ({ page }) => {
      await registerPage.navigateRegisterPage();
      const user = await registerPage.generateData(true);
      await registerPage.fillrequiredFields(user);
      await registerPage.submitForm();
      await expect(registerPage.existingUserError).toBeVisible({
        timeout: 60000,
      });
    });

    test("register with existing username and add space before username", async ({
      page,
    }) => {
      const user = await registerPage.generateData(true);
      user.username = " " + user.username;
      await registerPage.fillrequiredFields(user);
      await registerPage.submitForm();
      await expect(registerPage.existingUserError).toBeVisible();
    });
    test("No tick AgreetoTerm", async ({ page }) => {
      const user = await registerPage.generateData(false);
      user.agreeToTerm = false;
      // console.log(user)
      await registerPage.fillrequiredFields(user);
      await expect(registerPage.registerButton).toBeDisabled();
    });
  });
  test.describe("Check UI", () => {
    test("All title fields are present", async () => {
      expect(await registerPage.getTitleText(registerPage.accountTitle)).toBe(
        "ACCOUNT DETAILS"
      );
      expect(await registerPage.getTitleText(registerPage.personalTitle)).toBe(
        "PERSONAL DETAILS"
      );
      expect(await registerPage.getTitleText(registerPage.addressTitle)).toBe(
        "ADDRESS"
      );
    });

    test("Password displaying as dots", async () => {
      await expect(registerPage.passwordField).toHaveAttribute(
        "type",
        "password"
      );
    });

    test("Check country value after being selected", async () => {
      await registerPage.selectCountry("Afganistan");
      const countrySelected = await registerPage.getCountrySelected();
      await expect(countrySelected).toBe("Afganistan");
    });

    test("Register Button diabled when no fill all required fields", async ({
      page,
    }) => {
      await registerPage.registerButton.waitFor();
      expect(await registerPage.registerButton).toBeDisabled();
    });
  });

  test.describe("Field limit", () => {
    test("fill username > 15 chars", async ({ page }) => {
      // const randomUsername = Math.random().toString(36).padEnd(20, 'xx').substring(2, 18); cách 1
      const randomUsername = await registerPage.genValue(16);
      await registerPage.usernameField.fill(randomUsername);
      await registerPage.clickOut();
      expect(await registerPage.wrongUsernameError.textContent()).toBe(
        "Use maximum 15 character"
      );
    });

    test("fill password > 12 chars", async ({ page }) => {
      const randomPassword = await registerPage.genValue(14);
      await registerPage.passwordField.fill(randomPassword);
      await registerPage.clickOut();
      expect(await registerPage.wrongPasswordError.textContent()).toBe(
        "Use maximum 12 character"
      );
    });
    test("fill First Name > 30 chars", async ({ page }) => {
      const randomFirstName = await registerPage.genValue(31);
      await registerPage.firstNameField.fill(randomFirstName);
      await registerPage.clickOut();
      expect(await registerPage.wrongFirstNameError.textContent()).toBe(
        "Use maximum 30 character"
      );
    });
    test("fill Phone Number > 20 chars", async ({ page }) => {
      const randomPhoneNumber = await registerPage.genValue(21);
      await registerPage.phoneNumberField.fill(randomPhoneNumber);
      await registerPage.clickOut();
      expect(await registerPage.wrongPhoneNumberError.textContent()).toBe(
        "Use maximum 20 character"
      );
    });
    test("fill City > 25 chars", async ({ page }) => {
      const randomCity = await registerPage.genValue(26);
      await registerPage.cityField.fill(randomCity);
      await registerPage.clickOut();
      expect(await registerPage.wrongCityError.textContent()).toBe(
        "Use maximum 25 character"
      );
    });
    test("fill Address > 50 chars", async ({ page }) => {
      const randomAddress = await registerPage.genValue(51);
      await registerPage.addressField.fill(randomAddress);
      await registerPage.clickOut();
      expect(await registerPage.wrongAddressError.textContent()).toBe(
        "Use maximum 50 character"
      );
    });
    test("fill State/Province/Region > 10 chars", async ({ page }) => {
      const randomState = await registerPage.genValue(11);
      await registerPage.stateField.fill(randomState);
      await registerPage.clickOut();
      expect(await registerPage.wrongStateError.textContent()).toBe(
        "Use maximum 10 character"
      );
    });
    test("fill Postal Code > 10 chars", async ({ page }) => {
      const randomPostalCode = await registerPage.genValue(11);
      await registerPage.postalCodeField.fill(randomPostalCode);
      await registerPage.clickOut();
      expect(await registerPage.wrongPostalCodeError.textContent()).toBe(
        "Use maximum 10 character"
      );
    });
  });

  test.describe("Already have an account question", () => {
    test("open signin popup when clicking the question", async ({ page }) => {
      await registerPage.accountquestion.click();
      await expect(registerPage.signinpopup).toBeVisible();
    });

    test("click X button on signin popup", async ({ page }) => {
      await registerPage.accountquestion.click();
      await registerPage.closepopupbutton.click();
      await expect(registerPage.signinpopup).toBeHidden();
    });
    test("click Create new account on signin popup", async ({ page }) => {
      await registerPage.accountquestion.click();
      await registerPage.createnewaccount.click();
      await expect(registerPage.accountTitle).toBeVisible();
    });
    test("Log in after creating an account", async ({ page }) => {
      const user = await registerPage.generateData(false);
      await registerPage.fillrequiredFields(user);
      await registerPage.submitForm();

      await registerPage.navigateRegisterPage();

      await registerPage.accountquestion.click();
      await page.locator('[name="username"]').fill(user.username);
      await page.locator('[name="password"]').fill(user.password);
      const signInButton = page.getByRole("button", { name: "SIGN IN" });
      // await signInButton.scrollIntoViewIfNeeded();
      // await expect(signInButton).toBeVisible();
      await expect(signInButton).toBeEnabled();
      await signInButton.click();
      const usernameDisplay = await page.locator("#menuUserLink > span");
      await expect(usernameDisplay).toContainText(user.username);
    });
  });

  test.describe("Validate footer elements", () => {
    test("Check the presence of copyright information", async ({ page }) => {
      expect(await registerPage.copyrightInfor.textContent()).toBe(
        " © Advantage Inc, 2024. Release 3.3 "
      );
    });
    test.describe("Verify all footer elements on different screen sizes", () => {
      const screenSizes = [
        { width: 1920, height: 1080 }, //Desktop
        { width: 1366, height: 768 }, //Laptop
        { width: 768, height: 1024 }, //Tablet
        { width: 375, height: 812 }, //Mobile
      ];
      screenSizes.forEach(({ width, height }) => {
        test(`Footer icons are visible on ${width} x ${height}`, async ({
          page,
        }) => {
          await registerPage.setViewportSize(width, height);
          await expect(registerPage.facebookicon).toBeVisible();
          await expect(registerPage.twittericon).toBeVisible();
          await expect(registerPage.linkedinicon).toBeVisible();
          await expect(registerPage.copyrightInfor).toBeVisible();
        });
      });
    });

    test.describe("Social media icons are functional when click", () => {
      test("Facebook icon redirects to correct page", async ({
        page,
        context,
      }) => {
        const pagePromise = context.waitForEvent("page");
        await registerPage.facebookicon.click();
        const newPage = await pagePromise;
        await expect(newPage).toHaveURL("https://www.facebook.com/MicroFocus/");
      });
      test("Twitter icon redirects to correct page", async ({
        page,
        context,
      }) => {
        const [newPage] = await Promise.all([
          context.waitForEvent("page"),
          registerPage.twittericon.click(),
        ]);
        await expect(newPage).toHaveURL("https://x.com/MicroFocus");
      });
      test("Linkedin icon redirects to correct page", async ({
        page,
        context,
      }) => {
        const [newPage] = await Promise.all([
          context.waitForEvent("page"),
          registerPage.linkedinicon.click(),
        ]);
        await expect(newPage).toHaveTitle(
          " LinkedIn Login, Sign in | LinkedIn "
        );
      });
    });

    test.describe("Check complex requirement of password", () => {
      invalidPassword.forEach(({ name, password, expected }) => {
        test(`${name}`, async ({ page }) => {
          await registerPage.passwordField.fill(password);
          await registerPage.clickOut();
          await expect(registerPage.wrongPasswordError).toContainText(expected);
        });
      });
    });
  });
});
