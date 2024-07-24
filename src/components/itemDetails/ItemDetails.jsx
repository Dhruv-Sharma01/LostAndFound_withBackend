import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function ItemDetails() {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/items`);
        const items = res.data.items;
        const selectedItem = items.find((item) => item._id === id);

        if (selectedItem) {
          setItem(selectedItem);
        } else {
          setError('Item not found.');
        }
      } catch (err) {
        console.error('Error fetching item:', err);
        setError('Failed to fetch item details.');
      }
    };

    fetchItem();
  }, [id]);

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (!item) {
    return <div>Loading...</div>;
  }

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
      <h1 className="text-3xl font-bold mb-4">Item Details</h1>
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <p className="text-xl mb-4"><strong>Item Name:</strong> {item.itemName || 'N/A'}</p>
        <p className="text-xl mb-4"><strong>Date Found:</strong> {item.dateFound ? formatDate(item.dateFound) : 'N/A'}</p>
        <p className="text-xl mb-4"><strong>Place Found:</strong> {item.placeFound || 'N/A'}</p>
        <p className="text-xl mb-4"><strong>Found By:</strong> {item.foundBy || 'N/A'}</p>
        <p className="text-xl mb-4"><strong>Phone Number:</strong> {item.phoneNo || 'N/A'}</p>
      </div>
    </div>
  );
}

export default ItemDetails;
