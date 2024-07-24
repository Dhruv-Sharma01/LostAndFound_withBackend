import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import SearchBar from '../searchbar/SearchBar';

function LandingPage() {
  // const currentUser = ;

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
      <h1 className="text-3xl font-bold mb-4">Welcome, </h1>
      <SearchBar />
      <Link to="/additem">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">
          Add Newly Found Item
        </button>
      </Link>
    </div>
  );
}

export default LandingPage;
