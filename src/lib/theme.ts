export type Theme = "light" | "dark";

export const THEME_STORAGE_KEY = "theme";

/**
 * Runs before first paint (inlined in <head>). Dark is the default; a saved
 * choice wins. Also marks that JavaScript runs, so reveal animations only
 * hide content when something will reveal it again.
 */
export const themeInitScript = `(function(){var d=document.documentElement;d.classList.add('js');var t='dark';try{if(localStorage.getItem('${THEME_STORAGE_KEY}')==='light')t='light'}catch(e){}d.dataset.theme=t})()`;
