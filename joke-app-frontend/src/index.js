// I// Import the core React library
import React from 'react';

// Import the ReactDOM library with the client-specific methods for rendering 
import ReactDOM from 'react-dom/client';

// Import the global CSS styles for your app
import './index.css';

// Import the main App component
import App from './App';

// Import the ThemeContextProvider
import { ThemeContextProvider } from './components/Theme/ThemeContext';

// Create a root, a concurrent root, which is part of the React's Concurrent Mode feature.
// This will allow React to interrupt rendering to work on multiple tasks simultaneously.
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render your application
root.render(
    // Using React's StrictMode to highlight potential problems in an app during development
    <React.StrictMode>
        <ThemeContextProvider>
            <App />
        </ThemeContextProvider>
    </React.StrictMode>
);

// Note about performance measurement.
// If you're interested in performance optimization, React provides a way 
// to measure and analyze it using Web Vitals. The commented-out section is related to that.
