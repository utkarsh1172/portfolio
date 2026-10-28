export type Theme = "light" | "dark";

export const THEME_STORAGE_KEY = "theme";

/** Runs before first paint (inlined in <head>). Dark is the default; a saved choice wins. */
export const themeInitScript = `(function(){var t='dark';try{if(localStorage.getItem('${THEME_STORAGE_KEY}')==='light')t='light'}catch(e){}document.documentElement.dataset.theme=t})()`;
