import { useState } from 'react';
import { authService } from '../services/api';

const LoginForm = ({ onSwitch, onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await authService.login(email, password);
    const data = await response.json();

    if (response.ok) {
      localStorage.setItem('token', data.access_token); // Guardar token en localStorage
      onLoginSuccess(data.access_token);
    } else {
      alert(`Error: ${data.detail}`);
    }
  };

  return (
    <div className="form-container">
      <h2>Iniciar Sesión</h2>
      <form onSubmit={handleSubmit}>
        <input 
          type="email" placeholder="Email" required
          value={email} onChange={(e) => setEmail(e.target.value)} 
        />
        <input 
          type="password" placeholder="Password" required
          value={password} onChange={(e) => setPassword(e.target.value)} 
        />
        <button type="submit">Entrar</button>
      </form>
      <p>¿No tienes cuenta? <span onClick={onSwitch} style={{color: 'blue', cursor: 'pointer'}}>Regístrate</span></p>
    </div>
  );
};

export default LoginForm;