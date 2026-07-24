# tienda
tienda
# 🛍️ Tienda Online - Sistema de E-Commerce

Aplicación web de tienda online desarrollada como taller práctico de React. El proyecto implementa una arquitectura separada entre frontend y backend, con un cliente moderno en React y un servidor en Node.js con Express, autenticación con JWT y persistencia de datos en Supabase [file:1].

La aplicación cuenta con dos roles principales: **cliente** y **administrador**. El cliente puede registrarse, iniciar sesión, ver productos, agregar productos al carrito, realizar pedidos y consultar su historial; el administrador puede iniciar sesión, acceder al dashboard, ver clientes, gestionar pedidos, administrar productos y crear nuevos administradores [file:1][file:334][file:335][file:337].

---

# 🚀 Guía de instalación y configuración local

## 1. Clonar el repositorio

Clona el repositorio en tu máquina local:

```bash
git clone https://github.com/EstebanLezcanoTobon/tienda
cd tienda
```

---

## 2. Configurar el backend

Entra a la carpeta del servidor e instala las dependencias:

```bash
cd tienda-api
npm install
```

### Variables de entorno del backend

Crea un archivo `.env` en la raíz de la carpeta `backend` y configura las variables necesarias. Como el backend usa JWT y Supabase para la persistencia de datos, debes definir al menos las credenciales del proyecto y la clave secreta del token [file:1].

Ejemplo:

```env
PORT=4000
SUPABASE_URL=https://rcyhrcznvlrhubidfqvp.supabase.co
SUPABASE_SERVICE_ROLE_KEY=sb_secret_iJ0RdmiRfefkB9PqeSpj-Q_h6Ongw_D
JWT_SECRET=clave_super_secreta
```

### Ejecutar el backend

```bash
npm run dev
```

Por defecto, el backend debería ejecutarse en el puerto `4000`, o en el puerto que definas en tu archivo `.env`.

---

## 3. Configurar el frontend

Abre otra terminal, entra a la carpeta del cliente e instala las dependencias:

```bash
cd tienda-front
npm install
```

El frontend está construido con **React**, **Vite** y el plugin de **Tailwind CSS para Vite** [file:327].


### Ejecutar el frontend

```bash
npm run dev
```

Por defecto, Vite suele levantar el proyecto en `http://localhost:5173`.

---



# 🔑 Cuentas de prueba

El taller pide incluir credenciales de prueba dentro del README [file:1]. Completa esta sección con tus cuentas reales antes de entregar:

| Rol | Correo electrónico | Contraseña | Propósito |
|-----|--------------------|------------|-----------|
| Administrador | admin@admin.com | admin | Acceso al dashboard, gestión de pedidos, clientes, productos y creación de administradores |
| Cliente | cliente@cliente.com | cliente | Registro de compras, carrito, pedidos  |

---

# 📦 Funcionalidades principales

## Cliente

- Registro de usuario con nombre, email, contraseña, teléfono y dirección [file:1][file:331].
- Inicio de sesión con validación de campos y redirección según rol [file:334].
- Visualización del catálogo de productos [file:1][file:330].
- Agregar productos al carrito de compras [file:1][file:328].
- Realizar pedidos [file:1].
- Consultar historial de pedidos [file:1][file:329].
- Ver detalle de cada pedido con productos, cantidades y precios [file:1][file:332].

## Administrador

- Inicio de sesión con acceso al panel administrativo [file:334][file:337].
- Dashboard con resumen de clientes, pedidos y productos [file:1][file:337].
- Visualización de clientes registrados [file:1][file:337].
- Gestión de pedidos y actualización de estados [file:1][file:337].
- Gestión de productos [file:1][file:337].
- Creación de nuevos administradores con mensaje de éxito y redirección al dashboard [file:1][file:335].

---

# 🔔 Experiencia de usuario

La aplicación integra alertas visuales con **SweetAlert2** para acciones importantes como confirmaciones, errores, éxito en formularios y notificaciones al agregar productos al carrito [file:328]. Además, el login redirige automáticamente según el rol del usuario, enviando a clientes a la tienda y a administradores al panel de control [file:334].

---

# 📖 Endpoints principales de la API

El taller propone una API REST con endpoints para autenticación, productos, pedidos y usuarios [file:1]. Los principales endpoints usados en este proyecto son:

| Categoría | Método | Endpoint | Descripción |
|----------|--------|----------|-------------|
| Autenticación | POST | `/auth/register` | Registrar cliente [file:1] |
| Autenticación | POST | `/auth/login` | Iniciar sesión y devolver token + rol [file:1] |
| Autenticación | POST | `/auth/register-admin` | Registrar administrador [file:1][file:335] |
| Productos | GET | `/products` | Obtener productos [file:1][file:337] |
| Pedidos | GET | `/orders/user` | Obtener pedidos del cliente autenticado [file:1][file:329] |
| Pedidos | GET | `/orders` | Obtener pedidos para administrador [file:1][file:337] |
| Usuarios | GET | `/users` | Obtener usuarios registrados [file:1][file:337] |

---

# 📁 Estructura general del proyecto

```bash
tienda/
├── frontend/                     # Aplicación cliente en React + Vite
│   ├── src/
│   │   ├── api/                  # Configuración de Axios y consumo de API
│   │   ├── components/           # Componentes reutilizables y módulos
│   │   ├── context/              # Estado global, autenticación, carrito, etc.
│   │   ├── pages/                # Páginas principales del sistema
│   │   ├── utils/                # Utilidades como alertas
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── vite.config.js
│   └── package.json
│
├── backend/                      # API REST con Node.js + Express
│   ├── src/
│   │   ├── config/               # Configuración de Supabase y entorno
│   │   ├── controllers/          # Controladores del sistema
│   │   ├── middlewares/          # Middlewares de autenticación y validación
│   │   ├── routes/               # Definición de rutas
│   │   ├── app.js
│   │   └── server.js
│   └── package.json
```

La estructura sugerida por el taller contempla módulos separados para autenticación, cliente, administrador, contexto global y páginas, lo que coincide con la organización general del proyecto [file:1].

---

# 🛠️ Tecnologías utilizadas

## Frontend
- React [file:1][file:327]
- Vite [file:327]
- React Router DOM [file:1][file:334]
- Tailwind CSS [file:327]
- Axios [file:1]
- SweetAlert2 [file:328]

## Backend
- Node.js [file:1]
- Express [file:1]
- JWT para autenticación [file:1]
- Supabase para persistencia de datos

---

# ✅ Estado actual del proyecto

El sistema ya implementa los módulos principales solicitados por el taller: autenticación, registro, rutas protegidas, catálogo, carrito, pedidos, historial, dashboard administrador, creación de administradores y gestión interna básica del sistema [file:1][file:329][file:330][file:334][file:335][file:337].

---

