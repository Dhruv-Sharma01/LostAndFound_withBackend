import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import SearchBar from '../searchbar/SearchBar';
import axios from 'axios';

function LandingPage() {
  const currentUser = useSelector(state => state.currentUser);
  const [stats, setStats] = useState({
    totalItems: 0,
    recentItems: 0,
    myItems: 0,
    todayItems: 0
  });
  const [recentItems, setRecentItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get('https://lostandfound-backend-eupt.onrender.com/api/items');

      if (response.data && Array.isArray(response.data.items)) {
        const items = response.data.items;
        const today = new Date();
        const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate());
        const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);

        // Calculate statistics
        const totalItems = items.length;
        const recentItems = items.filter(item => new Date(item.createdAt) >= weekAgo).length;
        const myItems = items.filter(item => item.foundBy === currentUser).length;
        const todayItems = items.filter(item => new Date(item.createdAt) >= todayStart).length;

        setStats({ totalItems, recentItems, myItems, todayItems });

        // Get recent items (last 5)
        const sortedItems = items.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setRecentItems(sortedItems.slice(0, 5));
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setIsLoading(false);
    }
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-primary-50 to-secondary-50">
      <div className="container mx-auto px-6 py-8">
        {/* Welcome Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-heading font-bold text-neutral-900 mb-2">
                Welcome back, {currentUser || 'User'}! 👋
              </h1>
              <p className="text-neutral-600">
                Here's what's happening with lost and found items today.
              </p>
            </div>
            <Link to="/additem" className="btn-primary">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
              </svg>
              Add Found Item
            </Link>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="card card-hover">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mr-4">
                <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
                </svg>
              </div>
              <div>
                <p className="text-2xl font-heading font-bold text-neutral-900">
                  {isLoading ? '...' : stats.totalItems}
                </p>
                <p className="text-sm text-neutral-600">Total Items</p>
              </div>
            </div>
          </div>

          <div className="card card-hover">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-secondary-100 rounded-xl flex items-center justify-center mr-4">
                <svg className="w-6 h-6 text-secondary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <div>
                <p className="text-2xl font-heading font-bold text-neutral-900">
                  {isLoading ? '...' : stats.recentItems}
                </p>
                <p className="text-sm text-neutral-600">This Week</p>
              </div>
            </div>
          </div>

          <div className="card card-hover">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-accent-100 rounded-xl flex items-center justify-center mr-4">
                <svg className="w-6 h-6 text-accent-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                </svg>
              </div>
              <div>
                <p className="text-2xl font-heading font-bold text-neutral-900">
                  {isLoading ? '...' : stats.myItems}
                </p>
                <p className="text-sm text-neutral-600">My Items</p>
              </div>
            </div>
          </div>

          <div className="card card-hover">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mr-4">
                <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                </svg>
              </div>
              <div>
                <p className="text-2xl font-heading font-bold text-neutral-900">
                  {isLoading ? '...' : stats.todayItems}
                </p>
                <p className="text-sm text-neutral-600">Today</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Search Section */}
          <div className="lg:col-span-2">
            <div className="card">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-heading font-semibold text-neutral-900">
                  Search Lost & Found Items
                </h2>
                <svg className="w-5 h-5 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
              </div>
              <SearchBar />
            </div>
          </div>

          {/* Recent Activity */}
          <div className="card">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-heading font-semibold text-neutral-900">
                Recent Activity
              </h2>
              <Link to="/items" className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                View all
              </Link>
            </div>

            {isLoading ? (
              <div className="space-y-4">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="animate-pulse">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-neutral-200 rounded-lg"></div>
                      <div className="flex-1">
                        <div className="h-4 bg-neutral-200 rounded w-3/4 mb-2"></div>
                        <div className="h-3 bg-neutral-200 rounded w-1/2"></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : recentItems.length > 0 ? (
              <div className="space-y-4">
                {recentItems.map((item) => (
                  <Link
                    key={item._id}
                    to={`/items/${item._id}`}
                    className="flex items-center space-x-3 p-3 rounded-lg hover:bg-neutral-50 transition-colors duration-200"
                  >
                    <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path>
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-neutral-900 truncate">
                        {item.itemName}
                      </p>
                      <p className="text-xs text-neutral-500">
                        Found at {item.placeFound} • {getTimeAgo(item.createdAt)}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <svg className="w-12 h-12 text-neutral-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2 2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"></path>
                </svg>
                <p className="text-neutral-500 text-sm">No recent items found</p>
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8">
          <div className="card">
            <h2 className="text-xl font-heading font-semibold text-neutral-900 mb-6">
              Quick Actions
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Link to="/additem" className="flex items-center p-4 rounded-xl border border-neutral-200 hover:border-primary-300 hover:bg-primary-50 transition-all duration-200">
                <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center mr-4">
                  <svg className="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-neutral-900">Add Found Item</p>
                  <p className="text-sm text-neutral-600">Report a new found item</p>
                </div>
              </Link>

              <button
                onClick={() => window.location.reload()}
                className="flex items-center p-4 rounded-xl border border-neutral-200 hover:border-secondary-300 hover:bg-secondary-50 transition-all duration-200"
              >
                <div className="w-10 h-10 bg-secondary-100 rounded-lg flex items-center justify-center mr-4">
                  <svg className="w-5 h-5 text-secondary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-neutral-900">Refresh Data</p>
                  <p className="text-sm text-neutral-600">Update latest items</p>
                </div>
              </button>

              <Link to="/items" className="flex items-center p-4 rounded-xl border border-neutral-200 hover:border-accent-300 hover:bg-accent-50 transition-all duration-200">
                <div className="w-10 h-10 bg-accent-100 rounded-lg flex items-center justify-center mr-4">
                  <svg className="w-5 h-5 text-accent-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-neutral-900">Browse All Items</p>
                  <p className="text-sm text-neutral-600">View complete list</p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
