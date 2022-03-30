import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import SearchResults from './components/SearchResults';
import './App.css';

const App = () => {
    // "searchTerm" state variable - the latest value the user typed into the search input
    const [searchTerm, setSearchTerm] = useState("");

    // Task 3 - using useEffect() once, when the page first renders
    useEffect(() => {
      alert("Welcome to the App!");
    }, [])

    // Handle the user changing the content of the input
    const handleChangeSearch = (event) => {
      setSearchTerm(event.target.value);
    }

    return (
        <div>
            <Header />
            <div className="main">
                <SearchResults currentSearch={searchTerm} change={handleChangeSearch} />
            </div>
        </div>
    );
}

export default App;
