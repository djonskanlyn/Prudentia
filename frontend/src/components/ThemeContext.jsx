// ThemeContext.jsx
import React, { createContext, useState, useContext } from 'react';

// Create the Theme Context
const ThemeContext = createContext();

// Custom hook to use the Theme Context
export const useTheme = () => useContext(ThemeContext);

// ThemeProvider component to wrap the app
export const ThemeProvider = ({ children }) => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  // Function to toggle between light and dark themes
  const toggleTheme = () => {
    setIsDarkTheme((prevTheme) => !prevTheme);
  };

  // Define the theme class for ag-Grid
  const themeClass = isDarkTheme ? 'ag-theme-alpine-dark' : 'ag-theme-alpine';

  return (
    <ThemeContext.Provider value={{ isDarkTheme, toggleTheme, themeClass }}>
      {children}
    </ThemeContext.Provider>
  );
};
