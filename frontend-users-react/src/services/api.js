const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export const authService = {
  // Login: utiliza application/x-www-form-urlencoded
  login: async (email, password) => {
    const formData = new URLSearchParams();
    formData.append('username', email); // La API pide 'username' para el email
    formData.append('password', password);

    const response = await fetch(`${API_URL}/token`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: formData,
    });
    return response;
  },

  // Registro: utiliza application/json
  register: async (userData) => {
    const response = await fetch(`${API_URL}/api/v1/users/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: userData.email,
        password: userData.password,
        full_name: userData.full_name
      }),
    });
    return response;
  }
};