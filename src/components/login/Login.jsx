import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link,useNavigate } from 'react-router-dom';
import { currUser } from '../../features/lostfoundSlice';
import axios from "axios"
function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    // const currentUser=useSelector(state=>state.currentUser);
    const dispatch = useDispatch();
    const users = useSelector(state => state.users);
    // const currentuser = useSelector(state => state.currentUser);
    const navigate = useNavigate();

    const makeLogin = async (e) => {
        e.preventDefault();
        try {
          const response = await axios.post('https://lostandfound-backend-eupt.onrender.com/api/login', {email, password });
          if (response.status===200) {
            const { user, accessToken, refreshToken } = response.data;
            dispatch(currUser(Array(user.username,user.id)));
            navigate('/dashboard');
          } else {
            alert(`${response.status}`);
          }
        } catch (error) {
          console.error('Error logging in:', error);
          alert('Error logging in');
        }
      };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
            <h1 className="text-3xl font-bold mb-4">Welcome</h1>
            <input
                type="text"
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
            <button onClick={makeLogin} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                Login {message}
            </button>
            <Link to='/signup'><button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2 focus:outline-none focus:shadow-outline">
                No Account? SignUp 
            </button></Link>

        </div>
    );
}

export default Login;
