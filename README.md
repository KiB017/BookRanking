Este proyecto de backend está diseñado para gestionar y mostrar libros junto con sus calificaciones por parte de los usuarios.

## Funcionalidades Principales

- **Gestión de Libros:** Permite la creación, actualización y eliminación de libros en la base de datos.
- **Calificación de Libros:** Los usuarios pueden votar por los libros, indicando si les gusta o no.
- **Listado de Libros:** Ofrece endpoints para obtener listas de libros, filtrados y ordenados según diferentes criterios.

## Tecnologías Utilizadas

- **Node.js:** Plataforma de desarrollo para el backend.
- **Express:** Framework de aplicaciones web para Node.js.
- **PostgreSQL:** Sistema de gestión de bases de datos relacional.
- **Sequelize:** ORM para Node.js que facilita la interacción con la base de datos PostgreSQL.

## Instalación y Configuración

1. **Clonar el Repositorio:**

2. **Instalar Dependencias:**

3. **Configuración de la Base de Datos:**

- Asegúrate de tener PostgreSQL instalado y configurado.
- Modifica el archivo `config/database.js` con la información de tu base de datos.

4. **Ejecutar el Servidor:**

## Uso

- **Endpoints Disponibles:** Todos los endpoints están definidos en los archivos de rutas.
- **Autenticación:** Agrega autenticación si es necesario para proteger ciertas funcionalidades del backend.
