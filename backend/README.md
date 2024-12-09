# Todo App

Esta es una aplicación de lista de tareas (Todo App) que incluye un frontend en React y un backend en Node.js con Express. La aplicación permite a los usuarios agregar, editar, completar y eliminar tareas. También incluye autenticación de usuarios y la capacidad de exportar e importar listas de tareas en formato JSON.

## Requisitos

- Node.js
- npm o yarn
- MySQL

## Instalación

### Clonar el repositorio

```bash
git clone https://github.com/your-username/todo-app.git
cd todo-app


Configuración del Backend

cd backend

npm install
Crea un archivo .env en el directorio backend y agrega las siguientes variables de entorno:

PORT=8000
DB_HOST=localhost
DB_USER=your_mysql_user
DB_PASSWORD=your_mysql_password
DB_NAME=todoapp
JWT_SECRET=your_jwt_secret
Inicializa la base de datos ejecutando el archivo initDB.js

Configuración del Frontend
Navega al directorio del frontend:
Instala las dependencias:
Inicia el servidor frontend:
npm start

