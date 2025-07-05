// src/components/SearchBar.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function SearchBar() {
  const [items, setItems] = useState([]); // State to hold items
  const [itemToSearch, setItemToSearch] = useState(''); // State to hold search input
  const [error, setError] = useState(''); // State to handle errors
  const [isLoading, setIsLoading] = useState(true);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    // Fetch items from the server
    const fetchItems = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get('https://lostandfound-backend-eupt.onrender.com/api/items');

        // Access the items array from the response object
        if (response.data && Array.isArray(response.data.items)) {
          setItems(response.data.items);
          setError('');
        } else {
          setError('Invalid data format from server.');
        }
      } catch (err) {
        console.error('Error fetching items:', err);
        setError('Failed to load items.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchItems();
  }, []); // Empty dependency array ensures this runs once when the component mounts

  // Filter items based on search input
  const filteredItems = items.filter(item =>
    item.itemName.toLowerCase().includes(itemToSearch.toLowerCase()) ||
    item.placeFound.toLowerCase().includes(itemToSearch.toLowerCase()) ||
    item.foundBy.toLowerCase().includes(itemToSearch.toLowerCase())
  );

  const handleInputChange = (e) => {
    setItemToSearch(e.target.value); // Update search input state
    setShowResults(e.target.value.length > 0);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getTimeAgo = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));

    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays}d ago`;
    return formatDate(dateString);
  };

  const clearSearch = () => {
    setItemToSearch('');
    setShowResults(false);
  };

  return (
    <div className="w-full">
      {/* Search Input */}
      <div className="relative mb-6">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg className="h-5 w-5 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
          </svg>
        </div>
        <input
          type="text"
          placeholder="Search by item name, location, or finder..."
          value={itemToSearch}
          onChange={handleInputChange}
          className="input-field pl-10 pr-10"
        />
        {itemToSearch && (
          <button
            onClick={clearSearch}
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
          >
            <svg className="h-5 w-5 text-neutral-400 hover:text-neutral-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        )}
      </div>

      {/* Search Results */}
      {showResults && (
        <div className="space-y-4">
          {/* Results Header */}
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-heading font-semibold text-neutral-900">
              Search Results
            </h3>
            <span className="text-sm text-neutral-500">
              {filteredItems.length} item{filteredItems.length !== 1 ? 's' : ''} found
            </span>
          </div>

          {/* Error Display */}
          {error && (
            <div className="bg-accent-50 border border-accent-200 text-accent-700 px-4 py-3 rounded-xl">
              {error}
            </div>
          )}

          {/* Loading State */}
          {isLoading ? (
            <div className="space-y-3">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="bg-white p-4 rounded-xl border border-neutral-200">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-neutral-200 rounded-lg"></div>
                      <div className="flex-1">
                        <div className="h-4 bg-neutral-200 rounded w-3/4 mb-2"></div>
                        <div className="h-3 bg-neutral-200 rounded w-1/2"></div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : filteredItems.length > 0 ? (
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {filteredItems.map((item) => (
                <Link
                  key={item._id}
                  to={`/items/${item._id}`}
                  className="block bg-white p-4 rounded-xl border border-neutral-200 hover:border-primary-300 hover:shadow-soft transition-all duration-200"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path>
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-base font-medium text-neutral-900 mb-1 capitalize">
                        {item.itemName}
                      </h4>
                      <div className="flex items-center space-x-4 text-sm text-neutral-600">
                        <span className="flex items-center">
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                          </svg>
                          {item.placeFound}
                        </span>
                        <span className="flex items-center">
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                          </svg>
                          {item.foundBy}
                        </span>
                        <span className="flex items-center">
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                          </svg>
                          {getTimeAgo(item.createdAt || item.dateFound)}
                        </span>
                      </div>
                    </div>
                    <div className="flex-shrink-0">
                      <svg className="w-5 h-5 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                      </svg>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <svg className="w-12 h-12 text-neutral-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
              </svg>
              <p className="text-neutral-500 text-sm mb-2">No items found matching "{itemToSearch}"</p>
              <p className="text-neutral-400 text-xs">Try searching with different keywords</p>
            </div>
          )}
        </div>
      )}

      {/* Default State - Show Recent Items */}
      {!showResults && !isLoading && items.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-heading font-semibold text-neutral-900">
            Recent Items
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {items.slice(0, 4).map((item) => (
              <Link
                key={item._id}
                to={`/items/${item._id}`}
                className="block bg-white p-4 rounded-xl border border-neutral-200 hover:border-primary-300 hover:shadow-soft transition-all duration-200"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path>
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium text-neutral-900 mb-1 capitalize truncate">
                      {item.itemName}
                    </h4>
                    <p className="text-xs text-neutral-600 truncate">
                      {item.placeFound} • {getTimeAgo(item.createdAt || item.dateFound)}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default SearchBar;
