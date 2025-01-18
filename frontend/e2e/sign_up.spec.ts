import { test, expect } from "@playwright/test"

test("SignUp Successfully", async ({ page }) => {
  await page.goto("/sign_up")

  // NOTE: 会員登録フォームを入力
  await page.getByRole("textbox", { name: "ユーザ名" }).fill("test_name")
  await page.getByRole("textbox", { name: "Email" }).fill("test@example.com")
  await page.getByRole("textbox", { name: "パスワード" }).fill("password")

  await page.getByRole("button", { name: "登録する" }).click()

  // NOTE: 登録に成功すると、フォーム内容がクリアされる
  await expect(page.getByRole("textbox", { name: "ユーザ名" })).toHaveValue("")
})

test("SignUp ValidationError", async ({ page }) => {
  await page.goto("/sign_up")

  await page.getByRole("button", { name: "登録する" }).click()

  await expect(page.getByRole("textbox", { name: "ユーザ名は必須入力です。" })).toBeVisible()
  await expect(page.getByRole("textbox", { name: "Emailは必須入力です。" })).toBeVisible()
  await expect(page.getByRole("textbox", { name: "パスワードは必須入力です。" })).toBeVisible()
})
