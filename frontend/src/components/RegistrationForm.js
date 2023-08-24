import React, { useState } from 'react';
import { registerUser } from '../api/users'; // Promijenjen import puta

const RegistrationForm = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        role: 'user', // Postavite defaultnu vrijednost za role
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const newUser = await registerUser(formData);
            console.log('Registration successful:', newUser);
        } catch (error) {
            console.error('Registration error:', error);
        }
    };


    return (
        <form>
            <input type="text" name="username" placeholder="Username" onChange={handleChange} />
            <input type="email" name="email" placeholder="Email" onChange={handleChange} />
            <input type="password" name="password" placeholder="Password" onChange={handleChange} />
            {/* Dodajte polje za odabir role */}
            <select name="role" onChange={handleChange}>
                <option value="user">User</option>
                <option value="admin">Admin</option>
                <option value="superadmin">Superadmin</option>
            </select>
            <button onClick={handleRegister}>Register</button>
        </form>
    );
};

export default RegistrationForm;
