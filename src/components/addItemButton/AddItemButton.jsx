import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { PORT } from '../../../backend/server';
function AddItemButton() {
  const currentUser = useSelector(state => state.currentUser);
  const userId = useSelector(state => state.userId);

  const [phone, setPhone] = useState('1234567890');
  const [name, setName] = useState('');
  const [itemName, setItemName] = useState('');
  const [date, setDate] = useState('');
  const [place, setPlace] = useState('');
  const [image, setImage] = useState(null);
  const[phoneNo,setphoneNo]=useState('');
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const addit = async () => {
    console.log(date);
    
    // Ensure date is in ISO format if required
    const formattedDate = new Date(date).toISOString();
  
    // Create JSON payload
    const payload = {
      itemName,
      dateFound: formattedDate,
      placeFound: place,
      itemImage: '', // Leave empty or handle image differently
      foundBy: name,
      phoneNo:phoneNo
    };
  
    try {
      const response = await axios.post(`http://localhost:${PORT}/api/items`, payload, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.status === 201) {
        alert('Item added successfully!');
        navigate('/dashboard');
      }
    } catch (error) {
      console.error('Error adding item:', error.response.data);
      alert('Failed to add item. Please try again.');
    }
   
  };
  
  

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <h1>Please Enter Details {currentUser}</h1>
      <input
        type="text"
        placeholder="Name Of Item"
        value={itemName}
        onChange={(e) => setItemName(e.target.value)}
        className="w-full mb-4 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className="w-full mb-4 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        type="text"
        placeholder="Place of Finding"
        value={place}
        onChange={(e) => setPlace(e.target.value)}
        className="w-full mb-4 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        type="text"
        placeholder="Your Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full mb-4 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        type="text"
        onChange={(e) => setphoneNo(e.target.value)}
        placeholder='Your Phone Number'
        className="w-full mb-4"
      />
      <button
        onClick={addit}
        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Add {itemName}
      </button>
    </div>
  );
}

export default AddItemButton;
