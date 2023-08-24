import React, { useState } from 'react';
import { loginUser } from '../api/users'; // Prilagodite putanju prema vašim stvarnim putanjama

const LoginForm = ({ onLogin }) => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const [loginError, setLoginError] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const loggedInUser = await loginUser(formData);
            onLogin(loggedInUser); // Pozivamo proslijeđenu funkciju za prijavu
        } catch (error) {
            setLoginError('Invalid credentials'); // Postavljanje poruke o grešci
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <form>
                <input type="email" name="email" placeholder="Email" onChange={handleChange} />
                <input type="password" name="password" placeholder="Password" onChange={handleChange} />
                <button onClick={handleLogin}>Login</button>
            </form>
            {loginError && <p style={{ color: 'red' }}>{loginError}</p>}
        </div>
    );
};

export default LoginForm;
