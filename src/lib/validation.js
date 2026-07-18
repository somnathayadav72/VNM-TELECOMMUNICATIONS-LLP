export const quoteFields = ["company", "email", "state", "category", "quantity", "requirements"];

export function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}
