import React, { useState } from 'react';
import axios from 'axios';

const BookSearch = ({ setBooks }) => {
    const [query, setQuery] = useState('');
    const [error, setError] = useState(null);

    const searchBooks = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('No token found');
            }
            console.log('Token:', token);

            const response = await axios.get(`/api/books?q=${query}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log('Request headers:', response.config.headers); 
            console.log('Response data:', response.data);

            if (response.data.items) {
                setBooks(response.data.items);
            } else {
                console.log('No items found in response');
                setBooks([]);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
            setError(error.message);
        }
    };

    return (
        <div>
            <h1>Book Search</h1>
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search for books"
            />
            <button onClick={searchBooks}>Search</button>
            {error && <p>Error: {error}</p>}
        </div>
    );
};

export default BookSearch;




