================================================================================
                    USER MANAGEMENT FRONTEND
================================================================================

Interfaz de usuario moderna para registro e inicio de sesión, diseñada para 
interactuar con la API de User Management.

================================================================================
DESCRIPCIÓN
================================================================================

Aplicación web frontend que permite a los usuarios:
- ✅ Registrarse creando una nueva cuenta
- ✅ Iniciar sesión con credenciales existentes
- ✅ Visualizar información del usuario (nombre completo y email) tras autenticación
- ✅ Cerrar sesión de forma segura

Diseño moderno, responsivo y con excelente experiencia de usuario. El token JWT 
nunca se muestra en pantalla por razones de seguridad.

================================================================================
PROYECTO BACKEND
================================================================================

Este frontend se conecta con el proyecto backend separado:

Nombre del proyecto: backend-users
Tecnología: Docker
Base de datos: PostgreSQL
URL por defecto: http://localhost:8000

Para ejecutar el backend, consulta el repositorio "backend-users" y sigue las 
instrucciones de Docker Compose para levantar el servicio con PostgreSQL.

================================================================================
ESTRUCTURA DEL PROYECTO
================================================================================

user-management-frontend/
├── index.html          # Página principal con interfaz de login/registro
├── styles.css          # Estilos CSS (diseño moderno y responsivo)
├── script.js           # Lógica JavaScript (comunicación con API)
└── README.md           # Este archivo de documentación

================================================================================
CONFIGURACIÓN
================================================================================

1. REQUISITOS
- Navegador web moderno (Chrome, Firefox, Edge, Safari)
- Backend API corriendo en http://localhost:8000
- Docker instalado (para ejecutar el backend)
- PostgreSQL (incluido en el contenedor Docker del backend)

2. CONFIGURACIÓN DE LA API
Por defecto, el frontend apunta a http://localhost:8000. Si tu API está en otra dirección:

1. Abre script.js
2. Modifica la constante:
   const API_BASE_URL = 'http://localhost:8000'; // ← Cambia esta URL si es necesario

3. EJECUCIÓN DEL BACKEND
Para levantar el backend con Docker:

# Clonar el repositorio backend-users
git clone <url-del-repositorio-backend-users>
cd backend-users

# Levantar los contenedores (API + PostgreSQL)
docker-compose up -d

# Verificar que los contenedores estén corriendo
docker-compose ps

El backend se ejecutará en http://localhost:8000 con PostgreSQL como base de datos.

4. EJECUCIÓN DEL FRONTEND
Simplemente abre index.html en tu navegador, o usa un servidor local:

Python:
   python -m http.server 8080

Node.js:
   npx http-server -p 8080

PHP:
   php -S localhost:8080

Luego visita: http://localhost:8080

================================================================================
FLUJO DE USO
================================================================================

REGISTRO
1. Haz clic en la pestaña "Registrarse"
2. Completa:
   - Nombre completo
   - Correo electrónico válido
   - Contraseña (mínimo 6 caracteres)
3. Al registrarte exitosamente:
   - ✅ Los campos se limpian automáticamente
   - ✅ Muestra mensaje: "¡Usuario creado exitosamente!"
   - ✅ Muestra barra de progreso con cuenta regresiva de 15 segundos
   - ✅ Redirige automáticamente al formulario de login (NO inicia sesión automáticamente)

INICIO DE SESIÓN
1. Ingresa tu email y contraseña
2. Al autenticarte exitosamente:
   - ✅ Muestra pantalla de bienvenida con tu nombre y email
   - ✅ Token JWT almacenado en localStorage (oculto)
   - ✅ Sesión persistente al recargar la página

CERRAR SESIÓN
- Haz clic en "Cerrar Sesión" en el panel de bienvenida
- Se elimina el token y regresas al formulario de login

================================================================================
ARQUITECTURA DEL SISTEMA
================================================================================

Frontend (este proyecto)
├── index.html
├── styles.css
└── script.js
    └── Se comunica con API REST

Backend (backend-users)
├── API REST (FastAPI/Fastify/Express)
├── PostgreSQL (base de datos)
└── Docker Compose (orquestación)

Flujo de datos:
Frontend → API Backend → PostgreSQL

================================================================================
ENDPOINTS DE LA API UTILIZADOS
================================================================================

Función          | Endpoint           | Método | Autenticación
-----------------|--------------------|--------|------------------
Login            | /token             | POST   | No
Registro         | /api/v1/users/     | POST   | No
Listar usuarios  | /api/v1/users/     | GET    | Sí (Bearer Token)

================================================================================
GENERADO CON INTELIGENCIA ARTIFICIAL
================================================================================

Este proyecto fue generado íntegramente con asistencia de Inteligencia Artificial.

Detalle           | Información
------------------|--------------------------------------------------
Modelo            | Qwen
Plataforma        | Alibaba Cloud
Versión           | Qwen-Max (2026)
Fecha             | Febrero 2026
Tipo de generación| Código frontend completo (HTML, CSS, JavaScript)

PROCESO DE GENERACIÓN:
1. Análisis de la documentación de la API proporcionada
2. Diseño de interfaz moderna y responsiva
3. Implementación de lógica de autenticación JWT
4. Creación de sistema de cuenta regresiva con barra de progreso
5. Optimización de experiencia de usuario y seguridad

NOTA: Aunque el código fue generado con IA, se recomienda realizar pruebas 
exhaustivas antes de usarlo en entornos de producción.

================================================================================
SEGURIDAD
================================================================================

- ✅ Token JWT almacenado únicamente en localStorage
- ✅ Token nunca visible en la interfaz de usuario
- ✅ Contraseñas ocultas en campos de tipo password
- ✅ Validación de campos obligatorios en frontend
- ✅ Manejo seguro de errores sin exponer información sensible
- ✅ Comunicación con backend a través de HTTPS (en producción)

================================================================================
LICENCIA
================================================================================

MIT License - Libre para uso personal y comercial.

================================================================================
TIP
================================================================================

Para desarrollo, mantén la consola del navegador abierta (F12) para ver 
posibles errores de conexión con la API.

Si el backend no responde, verifica:
1. Que Docker esté corriendo
2. Que los contenedores de backend-users estén activos
3. Que PostgreSQL esté funcionando correctamente
4. Que el puerto 8000 no esté siendo usado por otra aplicación