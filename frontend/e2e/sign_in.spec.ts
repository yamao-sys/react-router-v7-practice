import { test, expect } from "@playwright/test"

test("SignIn Successfully", async ({ page }) => {
  await page.goto("/sign_up")

  // NOTE: 会員登録フォームを入力
  await page.getByRole("textbox", { name: "ユーザ名" }).fill("test_login")
  await page.getByRole("textbox", { name: "Email" }).fill("test_login@example.com")
  await page.getByRole("textbox", { name: "パスワード" }).fill("password")

  await page.getByRole("button", { name: "登録する" }).click()

  // NOTE: ログイン
  await page.goto("/sign_in")
  await page.getByRole("textbox", { name: "Email" }).fill("test_login@example.com")
  await page.getByRole("textbox", { name: "パスワード" }).fill("password")

  await page.getByRole("button", { name: "ログインする" }).click()

  await page.waitForURL("/todos")
  await expect(page).toHaveURL("/todos")
})
