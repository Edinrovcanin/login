import React, { useState, useEffect } from 'react';
import { getUsers } from '../../api/users';

const SuperAdminPanel = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        // Fetch liste svih korisnika kada se komponenta mounta
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const userList = await getUsers();
            setUsers(userList);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    return (
        <div>
            <h2>Welcome, Super Admin!</h2>
            <h3>All Users:</h3>
            <ul>
                {users.map(user => (
                    <li key={user._id}>
                        Username: {user.username}, Role: {user.role}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SuperAdminPanel;
