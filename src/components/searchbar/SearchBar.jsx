// src/components/SearchBar.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function SearchBar() {
  const [items, setItems] = useState([]); // State to hold items
  const [itemToSearch, setItemToSearch] = useState(''); // State to hold search input
  const [error, setError] = useState(''); // State to handle errors

  useEffect(() => {
    // Fetch items from the server
    const fetchItems = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/items');
        console.log('Fetched Items:', response.data); // Log the response

        // Access the items array from the response object
        if (response.data && Array.isArray(response.data.items)) {
          setItems(response.data.items);
        } else {
          setError('Invalid data format from server.');
        }
      } catch (err) {
        console.error('Error fetching items:', err);
        setError('Failed to load items.');
      }
    };

    fetchItems();
  }, []); // Empty dependency array ensures this runs once when the component mounts

  // Filter items based on search input
  const filteredItems = items.filter(item =>
    item.itemName.toLowerCase().startsWith(itemToSearch.toLowerCase())
  );

  const handleInputChange = (e) => {
    setItemToSearch(e.target.value); // Update search input state
  };

  return (
    <div className="w-full max-w-md mx-auto p-4">
      <h1 className="text-xl font-bold mb-4">List Of Found Items</h1>
      <input
        type="text"
        placeholder="Search"
        value={itemToSearch}
        onChange={handleInputChange}
        className="w-full p-2 border border-gray-300 rounded mb-4"
      />
      {error && <p className="text-red-500">{error}</p>} {/* Display error if any */}
      {filteredItems.length > 0 ? (
        <ul className="space-y-2">
          {filteredItems.map((item) => (
            <li key={item._id} className="bg-white p-2 rounded shadow">
              <Link to={`/items/${item._id}`} className="text-blue-500 hover:underline">
                {item.itemName}
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">No items found matching the search criteria.</p>
      )}
    </div>
  );
}

export default SearchBar;
