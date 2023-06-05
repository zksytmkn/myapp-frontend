import { isPasswordValid } from "../../utils/passwordValidator";

describe("passwordValidator", () => {
  test("returns true for valid passwords", () => {
    const password = "Password1@";
    expect(isPasswordValid(password)).toBe(true);
  });

  test("returns false for passwords without a lowercase letter", () => {
    const password = "PASSWORD1@";
    expect(isPasswordValid(password)).toBe(false);
  });

  test("returns false for passwords without an uppercase letter", () => {
    const password = "password1@";
    expect(isPasswordValid(password)).toBe(false);
  });

  test("returns false for passwords without a number", () => {
    const password = "Password@";
    expect(isPasswordValid(password)).toBe(false);
  });

  test("returns false for passwords without a special character", () => {
    const password = "Password1";
    expect(isPasswordValid(password)).toBe(false);
  });

  test("returns false for passwords shorter than 8 characters", () => {
    const password = "Pass1@";
    expect(isPasswordValid(password)).toBe(false);
  });
});
