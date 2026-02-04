# Proyecto: Frontend User Management (React + Vite) ✅

**Descripción**

Frontend de una plataforma de gestión de usuarios desarrollado con **React** y **Vite**. Permite el flujo completo de autenticación (registro e inicio de sesión) consumiendo una API REST, y gestiona la persistencia de tokens JWT para mantener la sesión.

---

## 📋 Contenido

- [Características](#-características)
- [Tecnologías](#-tecnologías)
- [Instalación](#-instalación)
- [Ejecución](#-ejecución)
- [Integración con la API](#-integración-con-la-api)
- [Estructura del proyecto](#-estructura-del-proyecto)
- [Notas](#-notas)

---

## ✨ Características

- Registro y login de usuarios
- Persistencia de token JWT en `localStorage`
- Formato de peticiones según la API (JSON / x-www-form-urlencoded)
- UI responsiva basada en tarjetas
- Manejo básico de errores y alertas

---

## 🔧 Tecnologías

- **Framework:** React 18
- **Build:** Vite
- **Lenguaje:** JavaScript (ES6+)
- **Estilos:** CSS3 (Variables, Flexbox)
- **Estado:** React Hooks (`useState`, `useEffect`)

---

## ⚙️ Instalación

**Requisitos:** Node.js v18 o superior

Ejecuta en la raíz del proyecto:

```bash
npm install
```

Crea un archivo `.env` con la URL de la API:

```env
VITE_API_URL=http://localhost:8000
```

---

## ▶️ Ejecución

Inicia el servidor de desarrollo:

```bash
npm run dev
```

---

## 🔗 Integración con la API

- **Registro:** POST `/api/v1/users/` — cuerpo en **JSON** con `email`, `password`, `full_name`.
- **Login:** POST `/token` — contenido **x-www-form-urlencoded** con `username` (email) y `password`.
- **Persistencia:** `access_token` guardado en `localStorage`. Al recargar, la aplicación verifica y restaura la sesión si el token existe.
- **Logout:** eliminar el token de `localStorage` y resetear el estado de la app.

---

## 🗂 Estructura del proyecto (resumen)

```
src/
  ├─ components/
  │   ├─ LoginForm.jsx
  │   └─ RegisterForm.jsx
  ├─ services/
  │   └─ api.js
  ├─ App.jsx
  ├─ main.jsx
  └─ App.css
```

---

> **Nota sobre generación por IA:** Este proyecto fue desarrollado con asistencia de Inteligencia Artificial (Modelo: *Gemini 2.0 Flash*). Fecha de generación: **Febrero 2026**.

---

## 📝 Contribuciones

Sugerencias y mejoras son bienvenidas. Haz un fork, crea una rama y envía un PR.

---

**Fin del documento**
