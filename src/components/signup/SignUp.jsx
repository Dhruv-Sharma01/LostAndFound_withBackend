import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { addUser, currUser } from '../../features/lostfoundSlice';
import { useNavigate } from 'react-router-dom';

function SignUp() {
  const dispatch = useDispatch();
  const users = useSelector(state => state.users);
  const [username, setUsername] = useState('');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [available, setAvailable] = useState('');
  const navigate = useNavigate();

  const handleSignup = async () => {
    // Perform client-side validation before dispatching
    if (!username || !fullName || !email || !password || !phone) {
      alert('Please fill in all fields');
      return;
    }

    try {
      const response = await axios.post('https://lostandfound-backend-eupt.onrender.com/api/register', {
        username,
        fullName,
        email,
        password,
        phoneno: phone
      });

      if (response.status === 201) {
        const { user } = response.data;
        dispatch(addUser(user));
        dispatch(currUser(user.username));
        navigate("/dashboard");
      }
    } catch (error) {
      console.error('Error signing up:', error.response?.data || error.message);
      alert('Failed to sign up. Please try again.');
    }
  };

  useEffect(() => {
    const isUsernameAvailable = users.every(user => user.username !== username);
    setAvailable(isUsernameAvailable ? 'Username Available' : 'Username Not Available');
  }, [username, users]);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
      <h2 className="text-3xl font-bold mb-4">Sign Up</h2>
      <form>
      
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4"
      />
      <input
        type="text"
        placeholder="Full Name"
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
        className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4"
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4"
      />
      <input
        type="text"
        placeholder="Phone Number"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4"
      />
      <button onClick={handleSignup} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
        Sign Up
      </button>
      <p className="mt-4">{available}</p>
        </form>
    </div>
  );
}

export default SignUp;
