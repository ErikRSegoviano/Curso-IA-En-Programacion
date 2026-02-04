// src/pages/LoginPage.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useAuth } from '../hooks/useAuth';
import toast from 'react-hot-toast';   // ← nuevo

const LoginPage = () => {
  const { signIn } = useAuth();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: { email: '', password: '' },
    validationSchema: Yup.object({
      email: Yup.string().email('Email inválido').required('Requerido'),
      password: Yup.string().required('Requerido'),
    }),
    onSubmit: async (values) => {
      try {
        await toast.promise(
          signIn(values.email, values.password),
          {
            loading: 'Iniciando sesión...',
            success: '¡Bienvenido!',
            error: (err) => err.response?.data?.detail || 'Credenciales incorrectas',
          }
        );
        navigate('/dashboard');
      } catch (error) {
        // manejado por toast.promise
      }
    },
  });

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Iniciar Sesión</h2>

        <form className="auth-form" onSubmit={formik.handleSubmit}>
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

          <button
            type="submit"
            className="auth-button"
            disabled={formik.isSubmitting}
          >
            {formik.isSubmitting ? 'Iniciando sesión...' : 'Iniciar Sesión'}
          </button>
        </form>

        <p className="auth-link">
          ¿No tienes una cuenta? <a href="/register">Regístrate aquí</a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;