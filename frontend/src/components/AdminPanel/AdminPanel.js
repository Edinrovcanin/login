import React, { useState, useEffect } from 'react';
import { getUsers, updateUser } from '../../api/users';

const AdminPanel = ({ user }) => {
    const [users, setUsers] = useState([]);
    const [editingUser, setEditingUser] = useState(null);

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

    const handleEditUser = (user) => {
        setEditingUser(user);
    };

    const handleSaveUser = async () => {
        try {
            await updateUser(editingUser._id, editingUser);
            setEditingUser(null);
            fetchUsers();
        } catch (error) {
            console.error('Error updating user:', error);
        }
    };

    return (
        <div>
            <h2>Welcome, Admin!</h2>
            <h3>Your Profile:</h3>
            <p>Username: {user.username}</p>
            <p>Email: {user.email}</p>
            <p>Password: {user.password}</p>

            <h3>All Users and Admins:</h3>
            <ul>
                {users.map(user => (
                    <li key={user._id}>
                        Username: {user.username}, Role: {user.role}
                        {editingUser && editingUser._id === user._id ? (
                            <div>
                                <input
                                    type="text"
                                    value={editingUser.email}
                                    onChange={e => setEditingUser({ ...editingUser, email: e.target.value })}
                                />
                                <input
                                    type="text"
                                    value={editingUser.username}
                                    onChange={e => setEditingUser({ ...editingUser, username: e.target.value })}
                                />
                                <input
                                    type="text"
                                    value={editingUser.password}
                                    onChange={e => setEditingUser({ ...editingUser, password: e.target.value })}
                                />
                                <button onClick={handleSaveUser}>Save</button>
                            </div>
                        ) : (
                            <button onClick={() => handleEditUser(user)}>Edit User</button>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AdminPanel;
