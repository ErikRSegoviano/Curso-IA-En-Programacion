// src/components/UserForm.jsx
import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { registerUser, updateUser } from '../services/api';
import toast from 'react-hot-toast';

const UserForm = ({ selectedUser, onSubmit }) => {
    const isEdit = !!selectedUser;

    const formik = useFormik({
        initialValues: {
            email: selectedUser?.email || '',
            full_name: selectedUser?.full_name || '',
            password: '',
        },
        validationSchema: Yup.object({
            email: Yup.string().email('Email inválido').required('Requerido'),
            full_name: Yup.string().required('Requerido'),
            password: isEdit
                ? Yup.string()
                : Yup.string().min(6, 'Mínimo 6 caracteres').required('Requerido'),
        }),
        enableReinitialize: true,
        onSubmit: async (values, { resetForm }) => {
            const action = isEdit ? updateUser : registerUser;
            const id = isEdit ? selectedUser.id : null;
            const successMsg = isEdit ? 'Usuario actualizado' : 'Usuario creado';
            const loadingMsg = isEdit ? 'Actualizando...' : 'Creando...';

            try {
                await toast.promise(
                    id ? action(id, values) : action(values),
                    {
                        loading: loadingMsg,
                        success: successMsg,
                        error: (err) => err.response?.data?.detail || 'Error al guardar usuario',
                    }
                );

                if (!isEdit && values.password) resetForm(); // limpia solo en creación
                onSubmit();
            } catch (error) {
                // toast ya lo maneja
            }
        },
    });

    return (
        <div className="user-form">
            <h3>{isEdit ? 'Editar Usuario' : 'Crear Nuevo Usuario'}</h3>

            <form onSubmit={formik.handleSubmit}>
                {/* 1. Nombre completo */}
                <div className="form-group">
                    <label htmlFor="full_name">Nombre completo</label>
                    <input
                        id="full_name"
                        name="full_name"
                        type="text"
                        className="form-input"
                        placeholder="Juan Pérez"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.full_name}
                    />
                    {formik.touched.full_name && formik.errors.full_name && (
                        <p className="form-error">{formik.errors.full_name}</p>
                    )}
                </div>

                {/* 2. Email */}
                <div className="form-group">
                    <label htmlFor="email">Correo electrónico</label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        className="form-input"
                        placeholder="usuario@ejemplo.com"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.email}
                    />
                    {formik.touched.email && formik.errors.email && (
                        <p className="form-error">{formik.errors.email}</p>
                    )}
                </div>

                {/* 3. Contraseña */}
                <div className="form-group">
                    <label htmlFor="password">
                        {isEdit ? 'Nueva contraseña (opcional)' : 'Contraseña'}
                    </label>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        className="form-input"
                        placeholder={isEdit ? 'Deja en blanco para no cambiar' : '••••••••'}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.password}
                    />
                    {formik.touched.password && formik.errors.password && (
                        <p className="form-error">{formik.errors.password}</p>
                    )}
                </div>

                {/* Botón con margen superior claro */}
                <button
                    type="submit"
                    className="auth-button mt-6 w-full"   // ← mt-6 + w-full para que ocupe todo el ancho
                    disabled={formik.isSubmitting}
                >
                    {formik.isSubmitting
                        ? isEdit ? 'Actualizando...' : 'Creando...'
                        : isEdit ? 'Guardar Cambios' : 'Crear Usuario'}
                </button>
            </form>
        </div>
    );
};

export default UserForm;