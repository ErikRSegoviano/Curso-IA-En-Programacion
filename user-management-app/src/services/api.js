import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000';

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Interceptor para agregar el token JWT si existe
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Función para login
export const login = async (username, password) => {
  const formData = new URLSearchParams();
  formData.append('username', username);
  formData.append('password', password);

  const response = await axios.post(`${API_BASE_URL}/token`, formData, {
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  });
  return response.data;
};

// Función para registrar usuario
export const registerUser = async (userData) => {
  const response = await api.post('/api/v1/users/', userData);
  return response.data;
};

// Función para listar usuarios
export const getUsers = async () => {
  const response = await api.get('/api/v1/users/');
  return response.data;
};

// Función para obtener un usuario por ID
export const getUserById = async (id) => {
  const response = await api.get(`/api/v1/users/${id}`);
  return response.data;
};

// Función para actualizar usuario
export const updateUser = async (id, userData) => {
  const response = await api.put(`/api/v1/users/${id}`, userData);
  return response.data;
};

// Función para eliminar usuario
export const deleteUser = async (id) => {
  await api.delete(`/api/v1/users/${id}`);
};

export default api;