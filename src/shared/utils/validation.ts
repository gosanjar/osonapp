export const PHONE_PATTERN = /^\+?998\s?\d{2}\s?\d{3}\s?\d{2}\s?\d{2}$/

export const shopNameRules = {
  pattern: {
    value: /^[a-zA-Z\s]+$/,
    message: "Faqat harflar bo'lishi kerak",
  },
  minLength: { value: 2, message: "Kamida 2 ta belgi bo'lishi kerak" },
}

export const passwordRules = {
  minLength: { value: 8, message: "Kamida 8 ta belgi bo'lishi kerak" },
  validate: {
    uppercase: (v: string) => /[A-Z]/.test(v) || "Kamida 1 ta katta harf bo'lishi kerak",
    lowercase: (v: string) => /[a-z]/.test(v) || "Kamida 1 ta kichik harf bo'lishi kerak",
    digit: (v: string) => /\d/.test(v) || "Kamida 1 ta raqam bo'lishi kerak",
  },
}
