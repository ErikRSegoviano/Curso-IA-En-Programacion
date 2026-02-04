// src/components/UserList.jsx
import React, { useState, useEffect } from 'react';
import { getUsers, deleteUser } from '../services/api';
import UserForm from './UserForm';

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await getUsers();
            setUsers(data);
        } catch (err) {
            console.error('Error al cargar usuarios:', err);
            setError('No se pudieron cargar los usuarios. Intenta de nuevo.');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('¿Eliminar este usuario? Esta acción no se puede deshacer.')) return;

        try {
            await toast.promise(
                deleteUser(id),
                {
                    loading: 'Eliminando...',
                    success: 'Usuario eliminado correctamente',
                    error: 'No se pudo eliminar el usuario',
                }
            );
            fetchUsers();
        } catch (err) {
            // manejado por toast
        }
    };

    const handleEdit = (user) => {
        setSelectedUser(user);
    };

    const handleFormSubmit = () => {
        setSelectedUser(null);
        fetchUsers();
    };

    if (loading) {
        return <div className="loading">Cargando usuarios...</div>;
    }

    if (error) {
        return <div className="error-message">{error}</div>;
    }

    return (
        <div>
            <UserForm selectedUser={selectedUser} onSubmit={handleFormSubmit} />

            {users.length === 0 ? (
                <p style={{ textAlign: 'center', color: 'var(--gray-500)', marginTop: '2rem' }}>
                    No hay usuarios registrados aún.
                </p>
            ) : (
                <table className="user-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Email</th>
                            <th>Nombre completo</th>
                            <th>Activo</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user.id}>
                                <td>{user.id}</td>
                                <td>{user.email}</td>
                                <td>{user.full_name || '—'}</td>
                                <td>
                                    <span style={{ color: user.is_active ? 'var(--success)' : 'var(--error)' }}>
                                        {user.is_active ? 'Sí' : 'No'}
                                    </span>
                                </td>
                                <td>
                                    <button
                                        className="action-btn edit-btn"
                                        onClick={() => handleEdit(user)}
                                    >
                                        Editar
                                    </button>
                                    <button
                                        className="action-btn delete-btn"
                                        onClick={() => handleDelete(user.id)}
                                    >
                                        Eliminar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default UserList;