import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/home/HomePage';
import Login from './components/login/Login';
import SignUp from './components/signup/SignUp';
import ForgotPassword from './components/forgotPassword/ForgotPassword';
import ResetPassword from './components/resetPassword/ResetPassword';
import LandingPage from './components/landingpage/LandingPage';
import AddItemButton from './components/addItemButton/AddItemButton';
import ItemDetails from './components/itemDetails/ItemDetails';
import Layout from './Layout';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
          <Route path="reset-password/:token" element={<ResetPassword />} />
          <Route path="/dashboard" element={<LandingPage />} />
          <Route path="additem" element={<AddItemButton />} />
          <Route path="items/:id" element={<ItemDetails />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
