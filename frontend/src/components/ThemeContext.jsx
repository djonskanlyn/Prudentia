import React, { createContext, useState, useEffect, useContext } from 'react';

// Create the Theme Context
const ThemeContext = createContext();

// Custom hook to use the Theme Context
export const useTheme = () => useContext(ThemeContext);

// ThemeProvider component to wrap the app
export const ThemeProvider = ({ children }) => {
  // Initialize theme state with value from localStorage, or default to false (light theme)
  const [isDarkTheme, setIsDarkTheme] = useState(() => {
    const savedTheme = localStorage.getItem('isDarkTheme');
    return savedTheme === 'true'; // Return true if 'true' is stored, otherwise false
  });

  // Function to toggle between light and dark themes
  const toggleTheme = () => {
    setIsDarkTheme((prevTheme) => {
      const newTheme = !prevTheme;
      localStorage.setItem('isDarkTheme', newTheme); // Save the new theme to localStorage
      return newTheme;
    });
  };

  // Define the theme class for ag-Grid
  const themeClass = isDarkTheme ? 'ag-theme-alpine-dark' : 'ag-theme-alpine';

  return (
    <ThemeContext.Provider value={{ isDarkTheme, toggleTheme, themeClass }}>
      {children}
    </ThemeContext.Provider>
  );
};
