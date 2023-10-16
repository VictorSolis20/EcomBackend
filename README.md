# Backend para E-Commerce con Autenticación JWT y MongoDB

Este proyecto consiste en el desarrollo del backend de un sistema de comercio electrónico (e-commerce) con autenticación basada en JSON Web Tokens (JWT) conectada a una base de datos MongoDB. El backend proporciona las funcionalidades esenciales para gestionar usuarios, productos y ordenes, y garantiza la seguridad de los datos y operaciones utilizando JWT.

## Características Principales

- Base de Datos en MongoDB Atlas: Utilizamos MongoDB Atlas como servicio de base de datos para garantizar escalabilidad y disponibilidad.

- Tres Colecciones en la Base de Datos:
  1. **Usuarios**: Almacenamiento de información de usuarios registrados.
  2. **Productos**: Registro de todos los productos disponibles en el e-commerce.
  3. **Órdenes**: Seguimiento de las órdenes realizadas por los usuarios.

- Componentes del Backend:
  - **Rutas**: Definición de rutas para diferentes endpoints, incluyendo autenticación, gestión de usuarios, gestión de productos y órdenes.
  - **Modelos**: Esquemas de datos de MongoDB para las colecciones de usuarios, productos y órdenes.
  - **Middlewares**: Implementación de middlewares para autenticación y validación de solicitudes.
  - **Controladores**: Lógica de controladores para gestionar las operaciones de la API.

- Autenticación y Seguridad:
  - **Autenticación con JWT**: Cada solicitud se autentica mediante tokens JWT para proteger las rutas y operaciones sensibles.
  - **Registro y Autenticación de Usuarios**: Implementación de endpoints para registro y autenticación de usuarios con almacenamiento seguro de contraseñas utilizando hashing.

- Gestión de Productos:
  - **CRUD de Productos**: Ofrecemos un conjunto de endpoints protegidos para la creación, lectura, actualización y eliminación de productos, disponibles únicamente para administradores de la aplicación.

- Pedidos Protegidos:
  - **Órdenes de Usuarios**: Se implementan endpoints protegidos que permiten a cada usuario crear sus pedidos y visualizar sus propias órdenes. La seguridad se garantiza a través de la autenticación JWT.

## Requisitos y Configuración

Antes de ejecutar el proyecto, asegúrate de configurar las variables de entorno adecuadas, como las credenciales de MongoDB y las claves secretas de JWT.

## Instalación y Uso

1. Clona este repositorio.
2. Instala las dependencias utilizando `npm install`.
3. Configura las variables de entorno en un archivo `.env`.
4. Inicia el servidor con `npm run server`.