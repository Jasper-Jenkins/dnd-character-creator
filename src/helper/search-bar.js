import React from 'react'

export default function SearchBar({ value, handleChange }) {
    return (
        <div>
            Search: <input value={value} onChange={handleChange} />
        </div>
    );
};