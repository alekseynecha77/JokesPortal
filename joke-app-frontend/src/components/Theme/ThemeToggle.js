import React, { useContext } from 'react';
import { ThemeContext } from './ThemeContext';

const ThemeToggle = () => {
    // Consume the theme context to get the current theme and the toggle function
    const { theme, toggleTheme } = useContext(ThemeContext);

    // Render a button that displays the opposite of the current theme
    // Clicking the button will toggle the theme
    return (
        <button onClick={toggleTheme}>
            Toggle {theme === 'light' ? 'Dark' : 'Light'}
        </button>
    );
};

// Export the ThemeToggle component for use in other parts of the application
export default ThemeToggle;
