import React, { useState } from 'react';
import { registerUser, loginUser } from './api/users';
import './scss/main.scss';

const App = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const newUser = await registerUser(formData);
      setMessage('Uspješno ste se registrovali');
    } catch (error) {
      console.error('Registration error:', error);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const loggedInUser = await loginUser(formData);
      setMessage('Uspješno ste se prijavili');
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  return (
    <div>
      <h1>Registration and Login</h1>
      <form>
        <input type="text" name="username" placeholder="Username" onChange={handleChange} />
        <input type="email" name="email" placeholder="Email" onChange={handleChange} />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} />
        <button onClick={handleRegister}>Register</button>
        <button onClick={handleLogin}>Login</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default App;
