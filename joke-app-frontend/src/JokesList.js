import React, { useState, useEffect } from 'react';  // Importing necessary hooks and React object from 'react'
import axios from 'axios';  // Importing axios library for making API calls

function JokesList() {  // Functional component definition
    const [joke, setJoke] = useState("");  // State for a single joke
    const [jokes, setJokes] = useState([]);  // State for multiple jokes (from search)
    const [loading, setLoading] = useState(true);  // State to track loading status
    const [categories, setCategories] = useState([]);  // State to store joke categories
    const [selectedCategory, setSelectedCategory] = useState("");
    const [searchQuery, setSearchQuery] = useState("");  // State for search input value
    const [errorMessage, setErrorMessage] = useState(null);  // State for search input value

    const fetchRandomJoke = async () => {  // Function to fetch a random joke
        setLoading(true);  // Setting loading state to true before API call
        try {
            let apiEndpoint = "https://api.chucknorris.io/jokes/random";  // Default API endpoint for a random joke
            if (selectedCategory) {  // If a category is selected
                apiEndpoint += `?category=${selectedCategory}`;  // Append category query to the API endpoint
            }
            const response = await axios.get(apiEndpoint);  // Making the API call
            setJoke(response.data.value);  // Setting the fetched joke to state
            setLoading(false);  // Setting loading state to false after API call
        } catch (error) {
            console.error("Error fetching Chuck Norris joke", error);  // Logging error in case of failure
            setLoading(false);  // Setting loading state to false after API call
        }
    };

    const fetchCategories = async () => {  // Function to fetch joke categories
        try {
            const response = await axios.get("https://api.chucknorris.io/jokes/categories");  // API call to fetch categories
            setCategories(response.data);  // Setting fetched categories to state
        } catch (error) {
            console.error("Error fetching categories", error);  // Logging error in case of failure
        }
    };

    const handleSearch = async () => {
        setLoading(true);
        setErrorMessage(null);  // Clearing any previous error message.
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

            // Extracting error message from API or using a default message
            let errorMsg = error.response && error.response.data && error.response.data.message
                ? error.response.data.message
                : "An error occurred while searching. Please try again later.";

            setErrorMessage(errorMsg);  // Setting the error message to state.
            setLoading(false);
        }
    };

    // Function to clear the input field and reset related states
    const handleClear = () => {
        setSearchQuery("");      // Clear the search input
        setSelectedCategory(""); // Reset the selected category to "All" (now represented by "")
        setJokes([]);  
        setErrorMessage(null);
    };

    useEffect(() => {  // Hook to run side-effects, runs when component mounts and when selectedCategory changes
        fetchRandomJoke();  // Fetching a random joke
        fetchCategories();  // Fetching joke categories
    }, [selectedCategory]);  // Dependency array, causes useEffect to re-run when selectedCategory changes

    return (
        <div>
            <select
                onChange={e => setSelectedCategory(e.target.value)}
                value={selectedCategory}
            >
                <option value="">All</option>
                {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                ))}
            </select>

            <input
                type="text"
                placeholder="Search for jokes..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
            />
            <button onClick={handleSearch}>Search</button>
            <button onClick={handleClear} style={{ backgroundColor: 'red', color: 'white' }}>Clear</button>

            {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}  {/* Error message display */}

            {loading ? (
                <div className="spinner"></div>
            ) : jokes.length > 0 ? (
                jokes.map(j => <p key={j.id}>{j.value}</p>)
            ) : (
                <p>{joke}</p>
            )}
        </div>
    );

}

export default JokesList;  // Exporting the component for use in other parts of the application

