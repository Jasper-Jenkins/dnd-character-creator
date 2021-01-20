import React from 'react'

export default function SearchBar({ userValue, handleChange }) {
    return (
        <div className='col-12 text-center searchBar'>
            <label className='search-label' htmlFor='search-bar'>Search:</label><input value={userValue} name='search-bar'onChange={handleChange} />
        </div>
    );
};