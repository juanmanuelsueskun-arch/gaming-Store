# 🎮 Plataforma de Comercio Electrónico - Gaming Store

Este sistema es una aplicación web de e-commerce desarrollada como parte de un taller práctico enfocado en React. El diseño del proyecto separa de manera independiente la arquitectura del cliente y del servidor, integrando una interfaz moderna en React con un backend estructurado en Node.js y Express. La seguridad se gestiona mediante tokens JWT y el almacenamiento de la información corre a cargo de Supabase.

El ecosistema distingue dos perfiles de usuario bien definidos:
* **Compradores (Clientes):** Tienen la facultad de crear cuentas, autenticarse, navegar por el catálogo, gestionar su carrito de compras, procesar órdenes y revisar el registro de sus compras anteriores.
* **Gestores (Administradores):** Cuentan con credenciales de acceso para ingresar a un panel de control centralizado, supervisar la lista de usuarios, controlar el flujo de pedidos, modificar el inventario de artículos y habilitar nuevos perfiles administrativos.

---

# ⚙️ Configuración del Entorno Local

## 1. Clonación del Proyecto

Descarga una copia local del código fuente ejecutando la siguiente instrucción en tu consola:

```bash
git clone https://github.com/juanmanuelsueskun-arch/gaming-Store
cd tienda
```

---

## 2. Puesta en Marcha del Servidor (Backend)

Dirígete al directorio correspondiente a la API e instala los módulos requeridos por el sistema:

```bash
cd tienda-api
npm install
```

### Configuración de Parámetros de Entorno

Genera un nuevo archivo con el nombre `.env` dentro de la carpeta raíz de la sección `backend`. Debido a que el servidor requiere validación JWT y conexión con Supabase para operar, es indispensable rellenar los datos de conexión correspondientes.

Usa esta estructura de referencia:

```env
PORT=4000
SUPABASE_URL=https://tu-proyecto-supabase.supabase.co
JWT_SECRET=tu_firma_secreta_jwt
```

### Inicialización de la API

Pon a funcionar el entorno de desarrollo del backend mediante:

```bash
npm run dev
```

De manera predeterminada, la API escuchará las solicitudes a través del puerto `4000` (a menos que se asigne un puerto distinto en las variables de entorno).

---

## 3. Despliegue de la Interfaz (Frontend)

Abre una pestaña adicional en tu terminal, ingresa al directorio del cliente e instala los paquetes necesarios:

```bash
cd tienda-front
npm install
```

La interfaz gráfica fue construida empleando las tecnologías de **React**, **Vite** y el motor de estilos **Tailwind CSS**.

### Lanzamiento de la Aplicación

Inicia el servidor local de la interfaz:

```bash
npm run dev
```

Por regla general, Vite desplegará la interfaz del cliente en la dirección local `http://localhost:5173`.

---

# 🔐 Credenciales para Pruebas

En cumplimiento con los requerimientos de la actividad práctica, se listan los accesos preconfigurados para validar las funciones del sitio. Por favor, actualiza estos campos con tus datos de prueba antes de realizar la entrega definitiva:

| Perfil | Usuario (Email) | Clave de Acceso | Acciones Permitidas |
|-----|--------------------|------------|-----------|
| Administrador | admin@admin.com | admin | Acceso al panel, control de pedidos, consulta de usuarios, edición de catálogo y alta de administradores. |
| Cliente | cliente@cliente.com | cliente | Exploración de la tienda, adición de productos, procesamiento de checkout e historial de compras. |

---

# 📦 Módulos y Funcionalidades Desarrolladas

## Experiencia del Cliente

- Formulario de alta con campos para nombre, correo, clave de ingreso, contacto telefónico y dirección de envío.
- Control de acceso con filtros de validación y direccionamiento automático dependiendo de los privilegios.
- Galería interactiva con el listado completo de mercancía disponible.
- Carrito virtual con capacidad de añadir y acumular artículos.
- Sistema de checkout para el procesamiento de transacciones.
- Historial dinámico para el seguimiento de compras efectuadas.
- Pantalla detallada de facturación por cada orden (desglose de ítems, volúmenes y totales).

## Herramientas de Administración

- Autenticación segura con entrada exclusiva al módulo de gestión.
- Panel de control (Dashboard) estadístico con contadores de usuarios, ventas e inventario.
- Módulo de consulta de la base de datos de usuarios registrados.
- Monitor de transacciones con herramientas para actualizar el estado del despacho.
- Sistema de control de inventario para la edición del catálogo de productos.
- Formulario de registro para nuevos administradores con alertas de confirmación y redireccionamiento integrado.

---

# 🔔 Mecanismos de Interacción y UX

El entorno gráfico utiliza el paquete de **SweetAlert2** para emitir alertas emergentes que notifican al usuario sobre operaciones críticas (procesos exitosos, validación de errores, solicitudes de confirmación y retroalimentación inmediata al incluir productos al carrito). Asimismo, la arquitectura de login redirige orgánicamente al usuario, enviando al perfil comercial directamente a las compras y al perfil de gestión hacia la consola administrativa.

---

# 📖 Rutas Clave de la API (REST Endpoints)

El desarrollo expone una arquitectura API REST organizada para gestionar los recursos de validación, productos, órdenes de compra y perfiles de usuario. Los endpoints principales que dan soporte a la aplicación son:

| Segmento | Tipo | Ruta / Endpoint | Objetivo del Servicio |
|----------|--------|----------|-------------|
| Control de Acceso | POST | `/auth/register` | Dar de alta un nuevo cliente en el sistema. |
| Control de Acceso | POST | `/auth/login` | Validar credenciales, retornar token JWT y definir rol de acceso. |
| Control de Acceso | POST | `/auth/register-admin` | Registrar un nuevo usuario con permisos de gestión. |
| Catálogo | GET | `/products` | Recuperar la lista completa de artículos activos. |
| Transacciones | GET | `/orders/user` | Extraer las compras vinculadas al cliente que inició sesión. |
| Transacciones | GET | `/orders` | Consultar la totalidad de pedidos registrados (Uso exclusivo Admin). |
| Gestión de Usuarios | GET | `/users` | Listar el padrón completo de cuentas en la plataforma. |

---

# 📁 Distribución del Código Fuente

```bash
tienda/
├── frontend/                     # Código de la interfaz en React + Vite
│   ├── src/
│   │   ├── api/                  # Peticiones HTTP y configuración cliente de Axios
│   │   ├── components/           # Elementos visuales comunes y bloques modulares
│   │   ├── context/              # Manejo del estado global (sesión, compras, etc.)
│   │   ├── pages/                # Vistas y pantallas del flujo de navegación
│   │   ├── utils/                # Funciones auxiliares y disparadores de alertas
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── vite.config.js
│   └── package.json
│
├── backend/                      # Componente del servidor en Node.js + Express
│   ├── src/
│   │   ├── config/               # Conectores de base de datos y variables de entorno
│   │   ├── controllers/          # Lógica de negocio y respuesta a peticiones
│   │   ├── middlewares/          # Filtros de seguridad, JWT y reglas de validación
│   │   ├── routes/               # Enrutamiento de las solicitudes entrantes
│   │   ├── app.js
│   │   └── server.js
│   └── package.json
```

La segmentación del código cumple con los lineamientos del taller, distribuyendo las responsabilidades en bloques independientes para autenticación, gestión del cliente, panel administrativo, contextos compartidos y vistas del sistema.

---

# 🛠️ Set de Tecnologías Aplicadas

## Frontend (Cliente)
- React.js
- Vite
- React Router DOM
- Tailwind CSS
- Axios
- SweetAlert2

## Backend (Servidor y Datos)
- Node.js
- Express
- JSON Web Tokens (JWT)
- Supabase

---

# ✅ Estado y Alcance del Proyecto

La plataforma cubre satisfactoriamente el espectro funcional exigido por la práctica. Se encuentran completamente operativos los sistemas de login y registro, enrutamiento condicional y protegido, navegación de productos, lógica del carrito, procesamiento de órdenes, consulta de histórico, panel de métricas, alta de nuevos administradores y las tareas de gestión interna asociadas al flujo comercial.