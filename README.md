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

* HTML, CSS, JavaScript
* Integración con API REST

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
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middlewares/
│   ├── config/
│   └── app.js
│
│── frontend/
│   ├── assets/
│   ├── js/
│   └── index.html
│
│── docker/
│── README.md
│── .env.example
```

---

## Instalación y ejecución

### Requisitos previos

* Node.js (v16 o superior)
* Docker (opcional)
* PostgreSQL

### Pasos

1. Clonar el repositorio:

```bash
git clone https://github.com/alouestt/conexion-local.git
cd conexion-local
```

2. Configurar variables de entorno:

```bash
cp .env.example .env
```

3. Instalar dependencias:

```bash
npm install
```

4. Ejecutar el servidor:

```bash
npm run dev
```

5. Acceder a la aplicación:

```
http://localhost:3000
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
