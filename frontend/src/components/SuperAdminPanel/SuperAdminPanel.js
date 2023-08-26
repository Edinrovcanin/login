import React, { useState, useEffect } from 'react';
import { getUsers, promoteUserToAdmin, demoteAdminToUser, deleteUser } from '../../api/users';

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

    const handlePromoteToAdmin = async (userId) => {
        try {
            await promoteUserToAdmin(userId);
            fetchUsers();
        } catch (error) {
            console.error('Promote to Admin error:', error);
        }
    };

    const handleDemoteToUser = async (userId) => {
        try {
            await demoteAdminToUser(userId);
            fetchUsers();
        } catch (error) {
            console.error('Demote to User error:', error);
        }
    };

    const handleDeleteUser = async (userId) => {
        try {
            await deleteUser(userId);
            fetchUsers();
        } catch (error) {
            console.error('Delete User error:', error);
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
                        <button onClick={() => handlePromoteToAdmin(user._id)}>Promote to Admin</button>
                        <button onClick={() => handleDemoteToUser(user._id)}>Demote to User</button>
                        <button onClick={() => handleDeleteUser(user._id)}>Delete User</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SuperAdminPanel;
