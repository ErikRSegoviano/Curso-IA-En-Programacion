# IA en Programación - Proyectos del Curso

Este repositorio contiene todos los proyectos y subproyectos desarrollados como parte del curso **"IA en Programación"** de la plataforma [Playground Digital House](https://playground.digitalhouse.com/), que forma parte de la certificación oficial en **Inteligencia Artificial en Programación**.

## 📚 Sobre el Curso

**IA en Programación** es un curso especializado que enseña cómo integrar tecnologías de Inteligencia Artificial en aplicaciones prácticas, desde APIs REST hasta aplicaciones web completas con autenticación y bases de datos.

### Certificación Relacionada

Este curso es parte de la certificación **"IA en Programación"**, que se complementa con:
- **Curso:** Fundamentos de Inteligencia Artificial
- **Repositorio:** [Curso-Fundamentos-De-IA](https://github.com/ErikRSegoviano/Curso-Fundamentos-De-IA)

## 📁 Estructura del Repositorio

### APIs REST

#### `api-rest-python/`
API REST básica desarrollada en Python con FastAPI.
- **Tecnologías:** FastAPI, Python
- **Características:** Operaciones CRUD básicas

#### `api-rest-python-docker/`
API REST con Python y Docker para containerización.
- **Tecnologías:** FastAPI, Docker, Docker Compose
- **Características:** Configuración de contenedores, deployment

#### `api-rest-postgres/`
API REST completa con base de datos PostgreSQL.
- **Tecnologías:** FastAPI, PostgreSQL, SQLAlchemy, Docker
- **Características:** ORM, migraciones de base de datos, schemas de validación

### Aplicaciones de Usuarios

#### `backend-users/`
Backend completo para gestión de usuarios con autenticación.
- **Tecnologías:** FastAPI, PostgreSQL, JWT, Bcrypt
- **Características:** 
  - Autenticación con JWT
  - Encriptación de contraseñas
  - Rutas de usuarios protegidas
  - CORS configurado
- **Estructura:** Modular con rutas separadas

#### `frontend-users/`
Frontend vanilla para interactuar con el backend de usuarios.
- **Tecnologías:** HTML, CSS, JavaScript
- **Características:** Formularios de login y registro, consumo de API

#### `frontend-users-react/`
Frontend moderno desarrollado con React y Vite.
- **Tecnologías:** React, Vite, JavaScript
- **Características:** Componentes reutilizables, SPA

#### `user-management-app/`
Aplicación web completa de gestión de usuarios.
- **Tecnologías:** React, Vite, ESLint
- **Características:** 
  - Páginas de login y registro
  - Dashboard de usuarios
  - Gestión completa de usuarios
  - Autenticación integrada

### Herramientas y Utilidades

#### `employees/`
Sistema de gestión de empleados con análisis de datos.
- **Características:**
  - Lectura y procesamiento de archivos Excel
  - Análisis de datos de empleados
  - Utilidades de procesamiento

#### `expenses/`
Sistema de análisis de gastos.
- **Características:** Análisis financiero, procesamiento de datos

#### `invoice/`
Generador de facturas en PDF.
- **Características:** 
  - Generación de documentos PDF
  - Múltiples versiones y formatos

#### `saludo.py`
Script de ejemplo introductorio al curso.

## 🚀 Cómo Usar Este Repositorio

### Requisitos Previos
- Python 3.8+
- Node.js 16+ (para proyectos React)
- Docker y Docker Compose (opcional, para proyectos containerizados)
- PostgreSQL (para proyectos con base de datos)

### Instalación General

1. **Clonar el repositorio:**
```bash
git clone https://github.com/ErikRSegoviano/Curso-IA-En-Programacion.git
cd Curso-IA-En-Programacion
```

2. **Para proyectos Python:**
```bash
cd <nombre-del-proyecto>
python -m venv venv
source venv/bin/activate  # En Windows: venv\Scripts\activate
pip install -r requirements.txt
```

3. **Para proyectos React:**
```bash
cd <nombre-del-proyecto>
npm install
npm run dev
```

4. **Para proyectos con Docker:**
```bash
docker-compose up --build
```

## 📋 Proyectos por Tema

### Fundamentos
- `saludo.py` - Introducción básica
- `api-rest-python/` - API REST simple

### APIs REST Intermedias
- `api-rest-python-docker/` - APIs con Docker
- `api-rest-postgres/` - APIs con base de datos

### Autenticación y Backend
- `backend-users/` - Sistema de autenticación JWT
- `employees/` - Gestión de datos
- `expenses/` - Análisis financiero

### Frontend
- `frontend-users/` - Frontend vanilla
- `frontend-users-react/` - Frontend con React
- `user-management-app/` - Aplicación completa

### Utilidades
- `invoice/` - Generación de facturas PDF

## 🎓 Temáticas Cubiertas

- ✅ Introducción a Python y programación básica
- ✅ APIs REST y microservicios
- ✅ Bases de datos relacionales (PostgreSQL)
- ✅ ORM con SQLAlchemy
- ✅ Autenticación y seguridad (JWT, Bcrypt)
- ✅ Containerización con Docker
- ✅ Frontend con JavaScript vanilla
- ✅ Frontend moderno con React
- ✅ Generación de documentos PDF
- ✅ Análisis y procesamiento de datos
- ✅ Integración IA en aplicaciones

## 🔗 Enlaces Relacionados

- [Playground Digital House](https://playground.digitalhouse.com/)
- [Curso: Fundamentos de Inteligencia Artificial](https://github.com/ErikRSegoviano/Curso-Fundamentos-De-IA)
- [Perfil de GitHub](https://github.com/ErikRSegoviano)

## 📝 Notas

Este repositorio está en continuo desarrollo con nuevos proyectos y mejoras según se avanzan en los módulos del curso. Cada carpeta contiene su propio README con instrucciones específicas de instalación y ejecución.

## 📄 Licencia

Los proyectos en este repositorio son de propósito educativo, desarrollados como parte del curso "IA en Programación" de Playground Digital House.

---

**Fecha de creación:** Febrero 2026  
**Autor:** Erik R. Segoviano  
**Certificación:** IA en Programación - Playground Digital House
