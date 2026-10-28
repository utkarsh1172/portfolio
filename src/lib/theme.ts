export type Theme = "light" | "dark";

export const THEME_STORAGE_KEY = "theme";

/** Runs before first paint (inlined in <head>). Dark unless the visitor chose light; no flash. */
export const themeInitScript = `try{if(localStorage.getItem('${THEME_STORAGE_KEY}')==='light')document.documentElement.dataset.theme='light'}catch(e){}`;
