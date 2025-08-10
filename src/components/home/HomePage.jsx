import React from 'react';
import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-primary-50 to-secondary-50">
      {/* Hero Section */}
      <div className="container mx-auto px-6 py-20">
        <div className="text-center">
          {/* Main Heading */}
          <div className="mb-8 animate-fade-in">
            <h1 className="text-5xl md:text-6xl font-heading font-bold text-gradient mb-6">
             TrackItBack
            </h1>
            <p className="text-xl md:text-2xl text-neutral-600 mb-4 max-w-3xl mx-auto">
              Reuniting lost items with their owners through community collaboration
            </p>
            <p className="text-lg text-neutral-500 max-w-2xl mx-auto">
              Join thousands of users who have successfully recovered their lost belongings or helped others find theirs.
            </p>
          </div>

          {/* Feature Icons */}
          <div className="grid md:grid-cols-3 gap-8 mb-12 max-w-4xl mx-auto">
            <div className="card text-center animate-slide-up">
              <div className="w-16 h-16 bg-primary-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-heading font-semibold text-neutral-800 mb-2">Smart Search</h3>
              <p className="text-neutral-600">Quickly find lost items with our intelligent search system</p>
            </div>

            <div className="card text-center animate-slide-up" style={{animationDelay: '0.1s'}}>
              <div className="w-16 h-16 bg-secondary-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-secondary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-heading font-semibold text-neutral-800 mb-2">Location Based</h3>
              <p className="text-neutral-600">Find items based on where they were lost or found</p>
            </div>

            <div className="card text-center animate-slide-up" style={{animationDelay: '0.2s'}}>
              <div className="w-16 h-16 bg-accent-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-accent-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-heading font-semibold text-neutral-800 mb-2">Community Driven</h3>
              <p className="text-neutral-600">Connect with helpful community members</p>
            </div>
          </div>

          {/* Call to Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-slide-up" style={{animationDelay: '0.3s'}}>
            <Link to="/login" className="btn-primary text-lg px-8 py-4 w-full sm:w-auto">
              <svg className="w-5 h-5 mr-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"></path>
              </svg>
              Sign In
            </Link>
            <Link to="/signup" className="btn-secondary text-lg px-8 py-4 w-full sm:w-auto">
              <svg className="w-5 h-5 mr-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"></path>
              </svg>
              Get Started
            </Link>
          </div>

          {/* Stats Section */}
          <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-heading font-bold text-primary-600 mb-2">1000+</div>
              <div className="text-neutral-600">Items Found</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-heading font-bold text-secondary-600 mb-2">500+</div>
              <div className="text-neutral-600">Happy Users</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-heading font-bold text-accent-600 mb-2">50+</div>
              <div className="text-neutral-600">Cities</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-heading font-bold text-primary-600 mb-2">24/7</div>
              <div className="text-neutral-600">Support</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
