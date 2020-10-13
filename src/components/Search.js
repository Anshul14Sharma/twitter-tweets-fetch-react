import React, { useState } from "react";

const Search = ({ onSearch }) => {
    const [search, setSearch] = useState("");

    const onInputChange = e => {
        setSearch(e.target.value);
    };

    const getSearch = e => {
        e.preventDefault();
        onSearch(search);
        // setSearch('');
    }
    
    return (
        <form onSubmit={getSearch} className="search-form">
            <input
            type="text"
            className="search-bar"
            placeholder="#hashtag or @twitter_handler e.g modi, @iamsrk, #news etc.."
            value={search}
            onChange={onInputChange}
            />
            <button className="search-button" type="submit">Submit</button>
        </form>
    );
};

export default Search;