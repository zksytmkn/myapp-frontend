export function isPasswordValid(password) {
  const minLength = 8;
  const strongRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*+\-_])(?=.{8,})/;
  return strongRegex.test(password) && password.length >= minLength;
}
