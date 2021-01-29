import React from 'react'

export default function SearchBar({ userValue, handleChange }) {
    return (
        <div className='col-7 text-center searchBar'>           
            <label className='search-label col-4' htmlFor='searchBar'>Search:</label><input className='col-8' value={userValue} name='searchBar' id='searchBar' onChange={handleChange} />
        </div>
    );
};