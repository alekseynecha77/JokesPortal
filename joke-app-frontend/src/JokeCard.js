import React from 'react';

// Define the JokeCard component
function JokeCard({ joke }) {
    // If the joke is a single string, render it directly
    if (typeof joke === 'string') {
        return (
            <div className="joke-card">
                <p>{joke}</p>
            </div>
        );
    } else {
        // If the joke has a setup and delivery, render both
        return (
            <div className="joke-card">
                <p>{joke.setup}</p>
                <p>{joke.delivery}</p>
            </div>
        );
    }
}

export default JokeCard;


