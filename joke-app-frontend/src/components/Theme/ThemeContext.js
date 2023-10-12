import React, { createContext, useState } from 'react';

// Create a new context for theme management
export const ThemeContext = createContext();

// Define a provider component for the ThemeContext
export const ThemeContextProvider = ({ children }) => {
    // Initialize a state to manage the current theme ('light' or 'dark')
    const [theme, setTheme] = useState('light');

    // Define a function to toggle between 'light' and 'dark' themes
    const toggleTheme = () => {
        setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
    };

    // Provide the current theme and toggle function to children components
    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};
