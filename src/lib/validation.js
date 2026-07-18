export const quoteFields = ["company", "email", "country", "category", "grade", "quantity", "requirements"];

export function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}
