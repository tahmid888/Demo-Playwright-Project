import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import loginData from "../testData/loginData.json";

test("Login Test", async ({ page }) => {
  const loginPage = new LoginPage(page);
  // await login.gotoLoginPage();
  // await login.login("a", "b@123");
  // await page.waitForTimeout(3000);

  // use first object from JSON
  const data = loginData[0];

  await loginPage.gotoLoginPage(data.url);
  await loginPage.login(data.usernames, data.password);
});
