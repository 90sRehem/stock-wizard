import { Password } from "./password";

describe('Password', () => {
  it('should be able to create a password', () => {
    const password = new Password({ value: "@t3sTe" });
    expect(password.isValid()).toBe(true);
  });

  it('should not be able to create a password with less than 6 characters', () => {
    const password = new Password({ value: "12345" });
    expect(password.isValid()).toBe(false);
  });

  it('should not be able to create a password without a uppercase letter', () => {
    const password = new Password({ value: "123456" });
    expect(password.isValid()).toBe(false);
  });

  it('should not be able to create a password without a number', () => {
    const password = new Password({ value: "abcdef" });
    expect(password.isValid()).toBe(false);
  });

  it('should not be able to create a password without a special character', () => {
    const password = new Password({ value: "abcdef" });
    expect(password.isValid()).toBe(false);
  });

  it('should be able to compare a password', async () => {
    const password = new Password({ value: "@t3sTe" });
    const isValid = await password.comparePassword("@t3sTe");
    expect(isValid).toBe(true);
  });
});