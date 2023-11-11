import { createContext, useContext } from 'react';
import useLocalStorage from '@/utils/useLocalstorage';

const ThemeContext = createContext({})

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useLocalStorage("theme", "light");
  if (theme === "light") {
    document.documentElement.classList.remove("dark");
  } else {
    document.documentElement.classList.add("dark");
  }

  const changeTheme = () => {
    if (theme === "light") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  }

  return (
    <ThemeContext.Provider
    value={{ theme, changeTheme }}
>
    {children}
</ThemeContext.Provider>
  );
}

export const useTheme = () => {
  return useContext(ThemeContext);
}