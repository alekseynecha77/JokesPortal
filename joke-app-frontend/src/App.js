import React, { useState, useContext, useEffect } from 'react';
import JokesList from './JokesList';
import './App.css';
import ThemeToggle from './components/Theme/ThemeToggle';
import ThemeContext from './components/Theme/ThemeContext';

function App() {
    const [searchTerm] = useState('');
    const [category] = useState('all');
    const { theme } = useContext(ThemeContext);

    useEffect(() => {
        document.body.classList.remove('theme-light', 'theme-dark');
        document.body.classList.add(`theme-${theme}`);
    }, [theme]);

    return (
        <div className="app-container">
            <div className="header">
                <h1>Jokes Portal</h1>
                <div className="theme-toggle-container">
                    <ThemeToggle />
                </div>
            </div>
            <JokesList searchTerm={searchTerm} category={category} />
        </div>
    );
}

export default App;
