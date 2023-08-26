import React, { useState } from 'react';
import { registerUser, loginUser } from './api/users';
import './scss/main.scss';
import UserPanel from './components/UserPanel/UserPanel';
import AdminPanel from './components/AdminPanel/AdminPanel';
import SuperAdminPanel from './components/SuperAdminPanel/SuperAdminPanel';
import RegistrationForm from './components/RegistrationForm'; // Dodali smo import komponente

const App = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    role: 'user', // Postavite defaultnu vrijednost za role
  });

  const [user, setUser] = useState(null); // Ovdje ćemo čuvati informacije o trenutnom korisniku

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const newUser = await registerUser(formData);
      console.log('Registration successful:', newUser);
      setUser(newUser);
    } catch (error) {
      console.error('Registration error:', error);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const loggedInUser = await loginUser(formData);
      console.log('Login successful:', loggedInUser);
      setUser(loggedInUser);
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  return (
    <div>
      <h1>Registration and Login</h1>
      {/* Prikaz registracijske forme */}
      <RegistrationForm />

      {/* Ako korisnik nije prijavljen ili registrovan, prikazujemo formu */}
      {!user && (
        <form>
          <input type="text" name="username" placeholder="Username" onChange={handleChange} />
          <input type="email" name="email" placeholder="Email" onChange={handleChange} />
          <input type="password" name="password" placeholder="Password" onChange={handleChange} />
          <button onClick={handleRegister}>Register</button>
          <button onClick={handleLogin}>Login</button>
        </form>
      )}
      {/* Ako korisnik ima ulogu, prikazujemo odgovarajući panel */}
      {user && user.role === 'user' && <UserPanel />}
      {user && user.role === 'admin' && <AdminPanel user={user} />}
      {user && user.role === 'superadmin' && <SuperAdminPanel />}
    </div>
  );
};

export default App;

