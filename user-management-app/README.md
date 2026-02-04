# 👥 User Management App

Aplicación frontend en **React + Vite** para gestionar usuarios mediante una API RESTful. Permite registro, login con JWT y operaciones CRUD completas sobre usuarios una vez autenticado.

> **Backend:** Proyecto separado llamado "backend-users"

## ✨ Características

- ✅ Registro y login de usuarios con JWT (tokens expiran en 30 minutos)
- ✅ Listado, creación, edición y eliminación de usuarios (CRUD protegido)
- ✅ Interfaz responsive y moderna
- ✅ Notificaciones toast con react-hot-toast
- ✅ Formularios consistentes con validación en tiempo real (Formik + Yup)
- ✅ Rutas protegidas con React Router

## 🛠️ Tecnologías Utilizadas

| Tecnología | Propósito |
|---|---|
| **React 18+** | Framework UI |
| **Vite** | Build tool rápido (recomendado 2026) |
| **Axios** | HTTP client con interceptores JWT |
| **React Router DOM v6** | Navegación y rutas protegidas |
| **Formik + Yup** | Formularios y validación |
| **react-hot-toast** | Notificaciones |
| **CSS Puro** | Estilos con variables y responsive design |

## 📋 Requisitos Previos

- **Node.js** ≥ 18 (recomendado LTS 20+)
- **npm** ≥ 8
- **Backend** corriendo: proyecto backend-users en `http://localhost:8000`

## 🚀 Instalación

### 1. Clonar el repositorio

```bash
git clone <URL_DEL_REPOSITORIO>
cd user-management-app
```

### 2. Instalar dependencias

```bash
npm install
```

## ⚙️ Configuración

### Variables de entorno

Crea un archivo `.env` en la raíz del proyecto:

```env
VITE_API_BASE_URL=http://localhost:8000
```

> **Nota:** Todas las variables de entorno en Vite deben empezar con `VITE_`

### Proxy para desarrollo (opcional)

Para evitar problemas de CORS, edita `vite.config.js`:

```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '/api')
      }
    }
  }
})
```

## 🔌 Backend API (backend-users)

El proyecto depende de una API REST separada.

### Autenticación

- **Tipo:** JWT Bearer Token
- **Obtener token:** `POST /token` (application/x-www-form-urlencoded)
  - `username`: email
  - `password`: contraseña
- **Header:** `Authorization: Bearer <token>`
- **Expiración:** 30 minutos

### Endpoints Principales

```
POST   /api/v1/users/        → Crear usuario (público)
GET    /api/v1/users/        → Listar usuarios (protegido)
GET    /api/v1/users/{id}    → Obtener usuario (protegido)
PUT    /api/v1/users/{id}    → Actualizar usuario (protegido)
DELETE /api/v1/users/{id}    → Eliminar usuario (protegido)
```

### Detalles

- ✓ Emails deben ser únicos
- ✓ CORS habilitado para todos los orígenes
- ✓ Fechas en UTC (ISO 8601)
- ✓ Base URL: `http://localhost:8000`

> **⚠️ Importante:** Inicia el backend antes de correr el frontend.

## ▶️ Ejecución

### Modo Desarrollo

```bash
npm run dev
```

Abre `http://localhost:5173` (o el puerto que indique Vite)

### Build de Producción

```bash
npm run build
```

Los archivos se generan en la carpeta `dist/`

Para servir localmente:

```bash
npx serve dist
```

## 🗺️ Rutas Principales

| Ruta | Descripción |
|---|---|
| `/` | Redirige a `/login` |
| `/login` | Iniciar sesión |
| `/register` | Registro de nuevo usuario |
| `/dashboard` | CRUD de usuarios (requiere autenticación) |

## 📁 Estructura del Proyecto

```
src/
├── components/
│   ├── UserForm.jsx          # Formulario reutilizable
│   └── UserList.jsx          # Lista de usuarios
├── hooks/
│   └── useAuth.js            # Hook de autenticación
├── pages/
│   ├── DashboardPage.jsx     # Panel de control
│   ├── LoginPage.jsx         # Página de login
│   └── RegisterPage.jsx      # Página de registro
├── services/
│   └── api.js                # Cliente Axios + interceptores JWT
├── App.jsx                   # Componente principal
├── main.jsx                  # Punto de entrada
└── index.css                 # Estilos globales
```

## 🤖 Generado con IA

Este proyecto fue creado y refinado iterativamente mediante conversaciones con inteligencia artificial.

| Detalle | Información |
|---|---|
| **Modelo** | Grok 4 |
| **Plataforma** | xAI (Grok) |
| **Versión** | Grok 4 (febrero 2026) |
| **Fecha de generación** | 4 de febrero de 2026 |

### Proceso de Desarrollo

- ✅ Migración de Create React App → Vite
- ✅ Implementación de autenticación con JWT
- ✅ Estilos CSS modernos y responsive
- ✅ Consistencia entre formularios
- ✅ Notificaciones toast con react-hot-toast
- ✅ README detallado

---

**¡Gracias por la colaboración en este proyecto!**