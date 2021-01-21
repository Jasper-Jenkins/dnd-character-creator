import React from 'react'

export default function SearchBar({ userValue, handleChange }) {
    return (
        <div className='col-12 text-center searchBar'>
            <label className='search-label' htmlFor='searchBar'>Search:</label><input value={userValue} name='searchBar' id='searchBar' onChange={handleChange} />
        </div>
    );
};