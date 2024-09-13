import React from 'react';
import { FaSun, FaMoon } from 'react-icons/fa';
import { useTheme } from './ThemeContext'; // Import the useTheme hook to access the theme toggle function

const ThemeToggleIcon = () => {
    const { isDarkTheme, toggleTheme } = useTheme();
    
    return (
      <button onClick={toggleTheme} className="nav-icon nav-icon-button" data-tooltip="Theme">
        {isDarkTheme ? <FaSun size={24} /> : <FaMoon size={24} />}
      </button>
    );
  };

export default ThemeToggleIcon;