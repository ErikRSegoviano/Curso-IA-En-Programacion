import React, { useState } from 'react';
import { authService } from '../services/api';

const RegisterForm = ({ onSwitch }) => {
  const [formData, setFormData] = useState({ email: '', password: '', full_name: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await authService.register(formData);
    if (response.ok) {
      alert('Registro exitoso. Ahora puedes iniciar sesión.');
      onSwitch();
    } else {
      const error = await response.json();
      alert(`Error: ${error.detail}`); // Manejo de errores según doc
    }
  };

  return (
    <div className="form-container">
      <h2>Crear Cuenta</h2>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" placeholder="Nombre Completo" required
          onChange={(e) => setFormData({...formData, full_name: e.target.value})} 
        />
        <input 
          type="email" placeholder="Correo Electrónico" required
          onChange={(e) => setFormData({...formData, email: e.target.value})} 
        />
        <input 
          type="password" placeholder="Contraseña" required
          onChange={(e) => setFormData({...formData, password: e.target.value})} 
        />
        <button type="submit">Registrarse</button>
      </form>
      <p>¿Ya tienes cuenta? <span onClick={onSwitch} style={{color: 'blue', cursor: 'pointer'}}>Inicia sesión</span></p>
    </div>
  );
};

export default RegisterForm;