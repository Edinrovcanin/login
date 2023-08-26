import React from 'react';

const AdminPanel = ({ user }) => {
    return (
        <div>
            <h2>Welcome, Admin!</h2>
            <h3>Your Profile:</h3>
            <p>Username: {user.username}</p>
            <p>Email: {user.email}</p>
            <p>Password: {user.password}</p>
        </div>
    );
};

export default AdminPanel;
