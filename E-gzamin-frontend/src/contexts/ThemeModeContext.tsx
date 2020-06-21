import React, { useContext } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import { ThemeProvider } from "@material-ui/styles";
import { createMuiTheme } from "@material-ui/core/styles";
import lightGreen from "@material-ui/core/colors/lightGreen";
import teal from "@material-ui/core/colors/teal";
import { Theme } from "@material-ui/core/styles";

interface Props {
  children?: React.ReactNode;
}
interface DarkModeContextProps {
  darkMode: boolean;
  setDarkMode(darkMode: boolean): void;
  theme: Theme;
}

export const useThemeMode = () => useContext(ThemeModeContext);

const darkTheme = createMuiTheme({
  palette: {
    type: "dark",
    primary: {
      main: lightGreen["600"],
      dark: lightGreen["600"],
    },
    secondary: {
      light: "#0066ff",
      main: teal["600"],
      contrastText: "#ffcc00",
    },
    contrastThreshold: 3,
    tonalOffset: 0.2,
    background: {
      default: "#121212",
      paper: "#272c34",
    },
    text: {
      primary: "#eeeeee",
      secondary: "#666666",
    },
  },
});

const theme = createMuiTheme({
  palette: {
    type: "light",
    primary: {
      main: lightGreen["600"],
      dark: lightGreen["600"],
    },
    secondary: {
      light: "#0066ff",
      main: teal["600"],
      contrastText: "#ffcc00",
    },
    contrastThreshold: 3,
    tonalOffset: 0.2,
    background: {
      default: "#dddddd",
      paper: "#f5f5f5",
    },
    text: {
      primary: "#111111",
      secondary: "#666666",
    },
  },
});

export const ThemeModeContext = React.createContext<DarkModeContextProps>({
  darkMode: false,
  setDarkMode: () => {},
  theme,
});

export const ThemeModeProvider: React.FC<Props> = ({ children }) => {
  const [darkMode, setDarkMode] = useLocalStorage("darkMode", false);

  return (
    <ThemeModeContext.Provider
      value={{
        darkMode,
        setDarkMode,
        theme: darkMode ? darkTheme : theme,
      }}
    >
      <ThemeProvider theme={darkMode ? darkTheme : theme}>
        {children}
      </ThemeProvider>
    </ThemeModeContext.Provider>
  );
};
