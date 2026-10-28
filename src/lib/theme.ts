export type Theme = "light" | "dark";

export const THEME_STORAGE_KEY = "theme";

/** Runs before first paint (inlined in <head>) to apply a saved theme without a flash. */
export const themeInitScript = `try{var t=localStorage.getItem('${THEME_STORAGE_KEY}');if(t==='light'||t==='dark')document.documentElement.dataset.theme=t}catch(e){}`;
