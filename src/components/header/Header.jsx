import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { currUser } from '../../features/lostfoundSlice';
import { useNavigate, Link, useLocation } from 'react-router-dom';

function Header() {
  const currentUser = useSelector(state => state.currentUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    dispatch(currUser(""));
    navigate("/");
  };

  // Don't show header on home page if user is not logged in
  if (!currentUser && location.pathname === '/') {
    return null;
  }

  return (
    <header className="bg-white shadow-soft border-b border-neutral-200 sticky top-0 z-50">
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Brand */}
          <div className="flex items-center space-x-4">
            <Link to={currentUser ? "/dashboard" : "/"} className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
              </div>
              <span className="text-xl font-heading font-bold text-gradient">TrackItBack</span>
            </Link>
          </div>

          {/* Navigation - Desktop */}
          {currentUser && (
            <nav className="hidden md:flex items-center space-x-8">
              <Link
                to="/dashboard"
                className={`text-neutral-600 hover:text-primary-600 transition-colors duration-200 font-medium ${
                  location.pathname === '/dashboard' ? 'text-primary-600' : ''
                }`}
              >
                Dashboard
              </Link>
              <Link
                to="/additem"
                className={`text-neutral-600 hover:text-primary-600 transition-colors duration-200 font-medium ${
                  location.pathname === '/additem' ? 'text-primary-600' : ''
                }`}
              >
                Add Item
              </Link>
            </nav>
          )}

          {/* User Menu */}
          <div className="flex items-center space-x-4">
            {currentUser ? (
              <div className="relative">
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="flex items-center space-x-2 bg-neutral-100 hover:bg-neutral-200 rounded-xl px-4 py-2 transition-colors duration-200"
                >
                  <div className="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center">
                    <span className="text-white font-medium text-sm">
                      {currentUser.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <span className="hidden sm:block text-neutral-700 font-medium">{currentUser}</span>
                  <svg className="w-4 h-4 text-neutral-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                  </svg>
                </button>

                {/* Dropdown Menu */}
                {isMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-large border border-neutral-200 py-2 z-50">
                    <div className="px-4 py-2 border-b border-neutral-200">
                      <p className="text-sm text-neutral-500">Signed in as</p>
                      <p className="text-sm font-medium text-neutral-900">{currentUser}</p>
                    </div>
                    <Link
                      to="/dashboard"
                      className="block px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-100 transition-colors duration-200"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Dashboard
                    </Link>
                    <Link
                      to="/additem"
                      className="block px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-100 transition-colors duration-200"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Add Item
                    </Link>
                    <hr className="my-2 border-neutral-200" />
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-accent-600 hover:bg-accent-50 transition-colors duration-200"
                    >
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link to="/login" className="text-neutral-600 hover:text-primary-600 font-medium transition-colors duration-200">
                  Sign In
                </Link>
                <Link to="/signup" className="btn-primary">
                  Get Started
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          {currentUser && (
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-neutral-100 transition-colors duration-200"
            >
              <svg className="w-6 h-6 text-neutral-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </button>
          )}
        </div>

        {/* Mobile Navigation */}
        {currentUser && isMenuOpen && (
          <div className="md:hidden py-4 border-t border-neutral-200">
            <nav className="flex flex-col space-y-2">
              <Link
                to="/dashboard"
                className="px-4 py-2 text-neutral-600 hover:text-primary-600 hover:bg-neutral-50 rounded-lg transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Dashboard
              </Link>
              <Link
                to="/additem"
                className="px-4 py-2 text-neutral-600 hover:text-primary-600 hover:bg-neutral-50 rounded-lg transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Add Item
              </Link>
            </nav>
          </div>
        )}
      </div>

      {/* Click outside to close menu */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsMenuOpen(false)}
        ></div>
      )}
    </header>
  );
}

export default Header;
