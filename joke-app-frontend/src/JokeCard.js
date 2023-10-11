// Importing the React library to use JSX syntax and define a functional component
import React from 'react';

// Defining a functional component called JokeCard
// It takes one prop: 'joke', which is an object containing the 'setup' and 'delivery' of the joke
function JokeCard({ joke }) {

    if (joke.joke) {
        // If the joke object has a 'joke' field, display it
        return (
            <div className="joke-card">
                <p>{joke.joke}</p>
            </div>
        );
    } else {
        // Otherwise, display both 'setup' and 'delivery'
        return (
            <div className="joke-card">
                <p>{joke.setup}</p>
                <p>{joke.delivery}</p>
            </div>
        );
    }
}

export default JokeCard;

