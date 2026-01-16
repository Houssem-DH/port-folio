export const locales = ["en", "fr", "ar"];
export const defaultLocale = "en";

export function getDirection(locale) {
  return locale === "ar" ? "rtl" : "ltr";
}
