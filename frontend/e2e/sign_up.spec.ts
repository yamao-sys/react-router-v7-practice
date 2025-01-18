import { test, expect } from "@playwright/test"

test("SignUp Successfully", async ({ page }) => {
  await page.goto("/sign_up")

  // NOTE: 会員登録フォームを入力
  await page.getByRole("textbox", { name: "ユーザ名" }).fill("test_name")
  await page.getByRole("textbox", { name: "Email" }).fill("test@example.com")
  await page.getByRole("textbox", { name: "パスワード" }).fill("password")

  await page.getByRole("button", { name: "登録する" }).click()

  // NOTE: 登録に成功すると、ログイン画面に遷移する
  await page.waitForURL("/sign_in")
  await expect(page.getByRole("heading", { name: "ログインフォーム" })).toBeVisible()
})

test("SignUp ValidationError", async ({ page }) => {
  await page.goto("/sign_up")

  await page.getByRole("button", { name: "登録する" }).click()

  await expect(page.getByText("ユーザ名は必須入力です。")).toBeVisible()
  await expect(page.getByText("Emailは必須入力です。")).toBeVisible()
  await expect(page.getByText("パスワードは必須入力です。")).toBeVisible()
})
