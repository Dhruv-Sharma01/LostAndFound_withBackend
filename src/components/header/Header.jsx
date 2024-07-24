import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { currUser } from '../../features/lostfoundSlice'; // Adjust path as per your project
import {useNavigate} from 'react-router-dom'
function Header() {
  const currentUser = useSelector(state => state.currentUser);
  const dispatch = useDispatch();
  const navigate=useNavigate()
  const handleLogout = () => {
    dispatch(currUser("")); 
    navigate("")
  };

  return (
    <div className="flex justify-between items-center p-4 bg-gray-200">
      <div>
        <h1 className="text-lg font-bold">Welcome, {currentUser}</h1>
      </div>
      <div>
        <button
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Header;
