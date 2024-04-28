const themeStoreName = "theme-store";

const getCurrentTheme = () => {
  const currTheme = localStorage.getItem(themeStoreName);
  if (currTheme) return JSON.parse(currTheme);
  else return "";
};

const deleteCurrTheme = () => {
  localStorage.removeItem(themeStoreName);
};

const storeCurrentTheme = (theme) => {
  localStorage.removeItem(themeStoreName);
  localStorage.setItem(themeStoreName, JSON.stringify(theme));
};

export { getCurrentTheme, storeCurrentTheme, deleteCurrTheme };
