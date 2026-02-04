// src/pages/RegisterPage.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { registerUser } from '../services/api';
import toast from 'react-hot-toast';   // ← nuevo import

const RegisterPage = () => {
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: { email: '', password: '', full_name: '' },
        validationSchema: Yup.object({
            email: Yup.string().email('Email inválido').required('Requerido'),
            password: Yup.string().min(6, 'Mínimo 6 caracteres').required('Requerido'),
            full_name: Yup.string().required('Requerido'),
        }),
        onSubmit: async (values) => {
            try {
                await toast.promise(
                    registerUser(values),
                    {
                        loading: 'Creando usuario...',
                        success: 'Usuario registrado correctamente',
                        error: (err) => err.response?.data?.detail || 'Error al registrar usuario',
                    }
                );
                navigate('/login');
            } catch (error) {
                // El error ya lo maneja toast.promise
            }
        },
    });

    return (
        <div className="auth-container">
            <div className="auth-card">
                <h2>Crear una cuenta</h2>

                <form className="auth-form" onSubmit={formik.handleSubmit}>
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
                            placeholder="tu@email.com"
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
                        <label htmlFor="password">Contraseña</label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            className="form-input"
                            placeholder="••••••••"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.password}
                        />
                        {formik.touched.password && formik.errors.password && (
                            <p className="form-error">{formik.errors.password}</p>
                        )}
                    </div>

                    {/* Botón con margen superior */}
                    <button
                        type="submit"
                        className="auth-button mt-6"   // ← agregamos mt-6 (margin-top: 1.5rem)
                        disabled={formik.isSubmitting}
                    >
                        {formik.isSubmitting ? 'Registrando...' : 'Registrarse'}
                    </button>
                </form>

                <p className="auth-link">
                    ¿Ya tienes una cuenta? <a href="/login">Inicia sesión</a>
                </p>
            </div>
        </div>
    );
};

export default RegisterPage;