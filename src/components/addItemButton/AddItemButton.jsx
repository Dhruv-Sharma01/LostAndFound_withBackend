import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

function AddItemButton() {
  const currentUser = useSelector(state => state.currentUser);
  const userId = useSelector(state => state.userId);
  const navigate = useNavigate();

  // Form state
  const [formData, setFormData] = useState({
    itemName: '',
    date: '',
    place: '',
    name: '',
    phoneNo: '',
    description: ''
  });

  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);

      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImage(null);
    setImagePreview(null);
    // Reset file input
    const fileInput = document.getElementById('image-upload');
    if (fileInput) fileInput.value = '';
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.itemName.trim()) {
      newErrors.itemName = 'Item name is required';
    }

    if (!formData.date) {
      newErrors.date = 'Date found is required';
    } else {
      const selectedDate = new Date(formData.date);
      const today = new Date();
      if (selectedDate > today) {
        newErrors.date = 'Date cannot be in the future';
      }
    }

    if (!formData.place.trim()) {
      newErrors.place = 'Location is required';
    }

    if (!formData.name.trim()) {
      newErrors.name = 'Your name is required';
    }

    if (!formData.phoneNo.trim()) {
      newErrors.phoneNo = 'Phone number is required';
    } else if (!/^\d{10}$/.test(formData.phoneNo.replace(/\D/g, ''))) {
      newErrors.phoneNo = 'Please enter a valid 10-digit phone number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      // Ensure date is in ISO format if required
      const formattedDate = new Date(formData.date).toISOString();

      // Create JSON payload
      const payload = {
        itemName: formData.itemName.trim(),
        dateFound: formattedDate,
        placeFound: formData.place.trim(),
        itemImage: '', // Leave empty or handle image differently
        foundBy: formData.name.trim(),
        phoneNo: formData.phoneNo.trim(),
        description: formData.description.trim()
      };

      const response = await axios.post(`https://lostandfound-backend-eupt.onrender.com/api/items`, payload, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 201) {
        setIsSuccess(true);
        setTimeout(() => {
          navigate('/dashboard');
        }, 2000);
      }
    } catch (error) {
      console.error('Error adding item:', error);
      setErrors({ submit: 'Failed to add item. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-primary-50 to-secondary-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="mx-auto w-16 h-16 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-2xl flex items-center justify-center mb-6">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
            </svg>
          </div>
          <h1 className="text-3xl font-heading font-bold text-neutral-900 mb-2">
            Add Found Item
          </h1>
          <p className="text-neutral-600">
            Help reunite lost items with their owners by sharing the details below.
          </p>
        </div>

        {/* Success State */}
        {isSuccess ? (
          <div className="card text-center">
            <div className="w-16 h-16 bg-secondary-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-secondary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <h2 className="text-xl font-heading font-semibold text-neutral-900 mb-2">
              Item Added Successfully!
            </h2>
            <p className="text-neutral-600 mb-6">
              Your found item has been posted and is now visible to others searching for their lost belongings.
            </p>
            <div className="flex justify-center space-x-4">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary-600"></div>
              <span className="text-sm text-neutral-500">Redirecting to dashboard...</span>
            </div>
          </div>
        ) : (
          /* Form */
          <div className="card">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Item Name */}
              <div>
                <label htmlFor="itemName" className="block text-sm font-medium text-neutral-700 mb-2">
                  Item Name *
                </label>
                <input
                  type="text"
                  id="itemName"
                  name="itemName"
                  value={formData.itemName}
                  onChange={handleInputChange}
                  placeholder="e.g., iPhone 13, Blue Wallet, Car Keys"
                  className={`input-field ${errors.itemName ? 'border-accent-500 focus:ring-accent-200 focus:border-accent-500' : ''}`}
                  required
                />
                {errors.itemName && (
                  <p className="mt-1 text-sm text-accent-600">{errors.itemName}</p>
                )}
              </div>

              {/* Date Found */}
              <div>
                <label htmlFor="date" className="block text-sm font-medium text-neutral-700 mb-2">
                  Date Found *
                </label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  max={new Date().toISOString().split('T')[0]}
                  className={`input-field ${errors.date ? 'border-accent-500 focus:ring-accent-200 focus:border-accent-500' : ''}`}
                  required
                />
                {errors.date && (
                  <p className="mt-1 text-sm text-accent-600">{errors.date}</p>
                )}
              </div>

              {/* Location */}
              <div>
                <label htmlFor="place" className="block text-sm font-medium text-neutral-700 mb-2">
                  Location Found *
                </label>
                <input
                  type="text"
                  id="place"
                  name="place"
                  value={formData.place}
                  onChange={handleInputChange}
                  placeholder="e.g., Central Park, Coffee Shop on Main St, University Library"
                  className={`input-field ${errors.place ? 'border-accent-500 focus:ring-accent-200 focus:border-accent-500' : ''}`}
                  required
                />
                {errors.place && (
                  <p className="mt-1 text-sm text-accent-600">{errors.place}</p>
                )}
              </div>

              {/* Description */}
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-neutral-700 mb-2">
                  Description (Optional)
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Additional details about the item, condition, or circumstances..."
                  rows="3"
                  className="input-field resize-none"
                />
              </div>

              {/* Image Upload */}
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Item Photo (Optional)
                </label>
                <div className="space-y-4">
                  {imagePreview ? (
                    <div className="relative">
                      <img
                        src={imagePreview}
                        alt="Item preview"
                        className="w-full h-48 object-cover rounded-xl border border-neutral-200"
                      />
                      <button
                        type="button"
                        onClick={removeImage}
                        className="absolute top-2 right-2 w-8 h-8 bg-accent-500 text-white rounded-full flex items-center justify-center hover:bg-accent-600 transition-colors duration-200"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                      </button>
                    </div>
                  ) : (
                    <div className="border-2 border-dashed border-neutral-300 rounded-xl p-6 text-center hover:border-primary-400 transition-colors duration-200">
                      <svg className="w-12 h-12 text-neutral-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                      </svg>
                      <p className="text-neutral-600 mb-2">Upload a photo of the item</p>
                      <p className="text-sm text-neutral-500">PNG, JPG up to 10MB</p>
                      <input
                        type="file"
                        id="image-upload"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                      />
                      <label
                        htmlFor="image-upload"
                        className="mt-4 inline-block btn-outline cursor-pointer"
                      >
                        Choose File
                      </label>
                    </div>
                  )}
                </div>
              </div>

              {/* Contact Information */}
              <div className="border-t border-neutral-200 pt-6">
                <h3 className="text-lg font-heading font-semibold text-neutral-900 mb-4">
                  Contact Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Your Name */}
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-neutral-700 mb-2">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Enter your full name"
                      className={`input-field ${errors.name ? 'border-accent-500 focus:ring-accent-200 focus:border-accent-500' : ''}`}
                      required
                    />
                    {errors.name && (
                      <p className="mt-1 text-sm text-accent-600">{errors.name}</p>
                    )}
                  </div>

                  {/* Phone Number */}
                  <div>
                    <label htmlFor="phoneNo" className="block text-sm font-medium text-neutral-700 mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      id="phoneNo"
                      name="phoneNo"
                      value={formData.phoneNo}
                      onChange={handleInputChange}
                      placeholder="(555) 123-4567"
                      className={`input-field ${errors.phoneNo ? 'border-accent-500 focus:ring-accent-200 focus:border-accent-500' : ''}`}
                      required
                    />
                    {errors.phoneNo && (
                      <p className="mt-1 text-sm text-accent-600">{errors.phoneNo}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Submit Error */}
              {errors.submit && (
                <div className="bg-accent-50 border border-accent-200 text-accent-700 px-4 py-3 rounded-xl">
                  {errors.submit}
                </div>
              )}

              {/* Form Actions */}
              <div className="flex flex-col sm:flex-row gap-4 pt-6">
                <Link to="/dashboard" className="btn-outline text-center">
                  <svg className="w-5 h-5 mr-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
                  </svg>
                  Cancel
                </Link>
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`flex-1 btn-primary ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Adding Item...
                    </div>
                  ) : (
                    <>
                      <svg className="w-5 h-5 mr-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                      </svg>
                      Add Found Item
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

export default AddItemButton;
