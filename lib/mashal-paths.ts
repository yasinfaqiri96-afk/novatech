/**
 * Mashal's route constants, kept in a module of their own so client code that
 * only needs a path (the Mashal sub-navigation in the root layout) does not
 * pull the whole product catalogue in lib/mashal.ts into every page's bundle.
 */
export const mashalCanonicalPath = "/oil-and-gas-software";
export const mashalEnglishPath = "/en/oil-and-gas-erp-afghanistan";
export const mashalPashtoPath = "/ps/oil-and-gas-erp-afghanistan";

export const isMashalRoute = (path: string) => path.startsWith(mashalCanonicalPath) || path === mashalEnglishPath || path === mashalPashtoPath || path === "/portfolio/oil-and-gas-management-system" || path === "/blog/oil-and-gas-software-guide";
