# ConexiónLocal

**ConexiónLocal** es una plataforma web orientada a fortalecer la visibilidad digital de micronegocios locales en la ciudad de Medellín, permitiendo a los comerciantes registrar sus negocios y productos, y a los usuarios descubrirlos mediante herramientas de búsqueda geográfica e interacción.

---

## Descripción del proyecto

El proyecto surge como respuesta a la brecha digital que afecta a pequeños comerciantes, quienes, a pesar de ofrecer productos y servicios de calidad, no cuentan con presencia en canales digitales. ConexiónLocal propone una solución tecnológica accesible que facilita la conexión entre consumidores y negocios locales.

La plataforma permite registrar negocios, publicar productos, gestionar reseñas, y visualizar ubicaciones en un mapa interactivo, promoviendo así el desarrollo económico local mediante el uso de tecnologías web.

---

## Objetivos

### Objetivo general

Desarrollar una aplicación web que permita a los micronegocios locales mejorar su visibilidad digital y facilitar la interacción con potenciales clientes.

### Objetivos específicos

* Implementar un sistema de autenticación seguro mediante JWT.
* Desarrollar funcionalidades CRUD para negocios y productos.
* Integrar servicios de geolocalización para búsqueda de negocios cercanos.
* Permitir la gestión de reseñas por parte de los usuarios.
* Desplegar la aplicación en un entorno accesible en la nube.

---

## Funcionalidades principales

* Registro e inicio de sesión de usuarios
* Gestión de negocios y productos
* Búsqueda de negocios por ubicación y categoría
* Visualización en mapa interactivo (Leaflet + OpenStreetMap)
* Sistema de reseñas y calificaciones
* Panel de administración básico
* Carga de imágenes mediante Cloudinary

---

## Tecnologías utilizadas

### Backend

* Node.js
* Express.js
* PostgreSQL
* Sequelize ORM
* JWT (autenticación)
* Bcrypt (encriptación de contraseñas)

### Frontend

* React 18
* Vite
* React Router DOM
* Leaflet + React Leaflet (mapas interactivos)
* Axios (cliente HTTP)
* Context API (gestión de estado y autenticación)

### Herramientas y servicios

* Docker
* GitHub
* Postman
* Figma
* Cloudinary
* Render / Railway (despliegue)

---

## Estructura del proyecto

```bash
conexion-local/
│── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── database.js
│   │   ├── controllers/
│   │   │   ├── authController.js
│   │   │   ├── negocioController.js
│   │   │   └── productoController.js
│   │   ├── models/
│   │   │   ├── User.js
│   │   │   ├── Negocio.js
│   │   │   └── Producto.js
│   │   ├── routes/
│   │   │   ├── authRoutes.js
│   │   │   ├── negocioRoutes.js
│   │   │   └── productoRoutes.js
│   │   ├── services/
│   │   ├── app.js
│   │   └── server.js
│   ├── .env
│   └── package.json
│
│── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   └── ProtectedRoute.jsx
│   │   ├── context/
│   │   │   └── AuthContext.jsx
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── CrearNegocio.jsx
│   │   │   ├── CrearProducto.jsx
│   │   │   └── MapaNegocios.jsx
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
│
│── README.md
```

---

## Instalación y ejecución

### Requisitos previos

* Node.js (v18 o superior)
* PostgreSQL
* Docker (opcional)

### Pasos

1. Clonar el repositorio:

```bash
git clone https://github.com/alouestt/conexion-local.git
cd conexion-local
```

2. Configurar variables de entorno del backend:

```bash
# Editar backend/.env con las credenciales de la base de datos
DB_NAME=conexion_local
DB_USER=postgres
DB_PASSWORD=tu_contraseña
DB_HOST=localhost
DB_DIALECT=postgres
```

3. Instalar dependencias e iniciar el backend:

```bash
cd backend
npm install
npm run dev
```

El servidor quedará disponible en `http://localhost:3000`.

4. En otra terminal, instalar dependencias e iniciar el frontend:

```bash
cd frontend
npm install
npm run dev
```

5. Acceder a la aplicación:

```
http://localhost:5173
```

---

## Seguridad

El sistema implementa buenas prácticas de seguridad:

* Autenticación basada en JWT
* Encriptación de contraseñas con bcrypt
* Validación de datos con Joi
* Protección contra inyecciones SQL mediante Sequelize
* Rate limiting en endpoints públicos

---

## Metodología

El desarrollo del proyecto se basa en la metodología ágil Scrum, organizada en 6 Sprints de 2 semanas cada uno, lo que permite la entrega incremental de funcionalidades y la adaptación continua a los cambios.

---

## Despliegue

El proyecto está diseñado para ser desplegado en plataformas como:

* Render
* Railway

---

## Equipo de trabajo

* Product Owner
* Scrum Master
* Equipo de desarrollo (Full Stack)

---

## Licencia

Este proyecto se desarrolla con fines académicos.

---
