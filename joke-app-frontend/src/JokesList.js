// Import the necessary modules from the React library
import React, { useState, useEffect } from 'react';

// Import the axios library, which is used for making HTTP requests (like API calls)
import axios from 'axios';

import JokeCard from './JokeCard'; // Assuming JokeCard is in the same directory


// Define a functional component called JokesList
function JokesList() {
    // Initialize state to store a single joke, using the useState hook
    const [joke, setJoke] = useState("");

    // Initialize state to store a list of jokes from search results
    const [jokes, setJokes] = useState([]);

    // Initialize state to track the loading status of API calls
    const [loading, setLoading] = useState(true);

    // Initialize state to store available joke categories
    const [categories, setCategories] = useState([]);

    // Initialize state to store the currently selected joke category
    const [selectedCategory, setSelectedCategory] = useState("");

    // Initialize state to store the user's search query input
    const [searchQuery, setSearchQuery] = useState("");

    // Initialize state to store any error messages during operations
    const [errorMessage, setErrorMessage] = useState(null);

    // Define an asynchronous function to fetch a random joke from the API
    const fetchRandomJoke = async () => {
        setLoading(true); // Indicate that an API call is in progress
        try {
            let apiEndpoint = "https://api.chucknorris.io/jokes/random";
            if (selectedCategory) {  // If a category is selected, modify the API endpoint
                apiEndpoint += `?category=${selectedCategory}`;
            }
            const response = await axios.get(apiEndpoint);
            setJoke(response.data.value);
            setLoading(false); // Indicate that the API call has completed
        } catch (error) {
            console.error("Error fetching Chuck Norris joke", error);
            setLoading(false);
        }
    };

    // Define an asynchronous function to fetch the available joke categories from the API
    const fetchCategories = async () => {
        try {
            const response = await axios.get("https://api.chucknorris.io/jokes/categories");
            setCategories(response.data);
        } catch (error) {
            console.error("Error fetching categories", error);
        }
    };

    // Define an asynchronous function to handle joke searches based on user input
    const handleSearch = async () => {
        setLoading(true);
        setErrorMessage(null);
        if (searchQuery.length < 3 || searchQuery.length > 120) {
            setErrorMessage("Search query must be between 3 and 120 characters.");
            setLoading(false);
            return;
        }

        try {
            const response = await axios.get(`https://api.chucknorris.io/jokes/search?query=${encodeURIComponent(searchQuery)}`);
            setJokes(response.data.result);
            setLoading(false);
        } catch (error) {
            console.error("Error searching for jokes", error);
            let errorMsg = error.response && error.response.data && error.response.data.message
                ? error.response.data.message
                : "An error occurred while searching. Please try again later.";
            setErrorMessage(errorMsg);
            setLoading(false);
        }
    };

    // Function to reset various states and clear the search input
    const handleClear = () => {
        setSearchQuery("");
        setSelectedCategory("");
        setJokes([]);
        setErrorMessage(null);
    };

    // useEffect hook runs when the component mounts and also when selectedCategory changes
    useEffect(() => {
        fetchRandomJoke();
        fetchCategories();
    }, [selectedCategory]);

    // Render the component UI
    return (
        <div>
            {/* Dropdown for joke categories */}
            <select
                onChange={e => setSelectedCategory(e.target.value)}
                value={selectedCategory}
            >
                <option value="">All</option>
                {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                ))}
            </select>

            {/* Input field for searching jokes */}
            <input
                type="text"
                placeholder="Search for jokes..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
            />
            <button onClick={handleSearch}>Search</button>
            <button onClick={handleClear} style={{ backgroundColor: 'red', color: 'white' }}>Clear</button>

            {/* Display error message if any */}
            {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}

            {/* Display loading spinner, or list of jokes, or a single joke based on current state */}
            {loading ? (
                <div className="spinner"></div>
            ) : jokes.length > 0 ? (
                jokes.map(j => <JokeCard key={j.id} joke={j.value} />)
            ) : (
                <JokeCard joke={joke} />
            )}
        </div>
    );
}


export default JokesList;  // Exporting the component for use in other parts of the application

