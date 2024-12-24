# Spotify Clone

Este proyecto es un clon de Spotify desarrollado con React, que consiste en tres partes principales: un backend para manejar la lógica del servidor, un panel de administración para gestionar contenido (spotify-admin), y la aplicación principal para los usuarios (spotify-clone-only-react).

## Estructura del Proyecto

El proyecto está dividido en tres componentes principales:

### 1. Backend

Tecnologías utilizadas:

- Express.js como framework de servidor
- Mongoose para la gestión de la base de datos MongoDB
- Cloudinary para almacenamiento de archivos
- Multer para manejo de subida de archivos
- CORS para manejo de solicitudes cross-origin
- Streamifier para procesamiento de streams

Características principales:

- API RESTful para gestión de canciones y álbumes
- Integración con Cloudinary para almacenamiento de archivos multimedia
- Sin autenticación implementada (planned feature)

### 2. Panel de Administración (spotify-admin)

Tecnologías utilizadas:

- React.js
- Axios para peticiones HTTP
- Tailwind CSS para estilos
- Contexto de React para gestión de estado

Funcionalidades:

- Gestión de canciones
- Gestión de álbumes
- Interfaz administrativa intuitiva

### 3. Aplicación Principal (spotify-clone-only-react)

Tecnologías utilizadas:

- React.js
- Axios para peticiones HTTP
- React Router DOM para navegación
- useContext para gestión de estado
- Tailwind CSS para estilos

Funcionalidades:

- Visualización de álbumes
- Reproducción de canciones
- Navegación entre diferentes secciones

## Instalación

### Backend

```bash
cd backend
npm install
npm run dev
```

### Panel de Administración

```bash
cd spotify-admin
npm install
npm run dev
```

### Aplicación Principal

```bash
cd spotify-clone-only-react
npm install
npm run dev
```

## Variables de Entorno

### Backend

```env
PORT=3000
MONGODB_URI=tu_uri_de_mongodb
CLOUDINARY_NAME=tu_cloud_name
CLOUDINARY_API_KEY=tu_api_key
CLOUDINARY_API_SECRET=tu_api_secret
```

## Próximas Mejoras Planificadas

- Implementación de autenticación usando Auth.js v5
- Migración de Mongoose a Prisma para mejor tipado y gestión de la base de datos
- Mejora en la gestión de formularios con React Hook Form
- Implementación de tests
- Mejora en la gestión de estado global

## Basado en

Este proyecto está inspirado en el tutorial de [[link al video](https://youtu.be/KdGfhSpT6pc?si=k3yhPIqkc_eDhFFN)], con modificaciones y mejoras adicionales.

## Contribución

Las contribuciones son bienvenidas. Por favor, abre un issue primero para discutir qué te gustaría cambiar.
