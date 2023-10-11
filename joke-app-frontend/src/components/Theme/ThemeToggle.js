import React, { useContext } from 'react';
import ThemeContext from './ThemeContext';

const ThemeToggle = () => {
    const { theme, toggleTheme } = useContext(ThemeContext); // use toggleTheme directly from context


    return (
        <button onClick={toggleTheme}>
            Toggle {theme === 'light' ? 'Dark' : 'Light'}
        </button>
    );
};

export default ThemeToggle;
