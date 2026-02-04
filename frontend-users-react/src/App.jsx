import React, { useState, useEffect } from 'react';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import './App.css';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [isLoginView, setIsLoginView] = useState(true);

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
  };

  if (token) {
    return (
      <div className="welcome">
        <h1>¡Bienvenido!</h1>
        <p>Has iniciado sesión correctamente.</p>
        <button onClick={logout}>Cerrar Sesión</button>
      </div>
    );
  }

  return (
    <div className="App">
      {isLoginView ? (
        <LoginForm 
          onSwitch={() => setIsLoginView(false)} 
          onLoginSuccess={(t) => setToken(t)} 
        />
      ) : (
        <RegisterForm onSwitch={() => setIsLoginView(true)} />
      )}
    </div>
  );
}

export default App;