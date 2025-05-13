# 🏥 MedPoint API

API Restful desarrollada con **NestJS** que permite la gestión de citas médicas para pacientes y médicos.

<p align="center">
  <img src="https://nestjs.com/img/logo-small.svg" alt="NestJS Logo" width="80">
</p>

NestJS es un framework progresivo para construir aplicaciones del lado del servidor. Su estructura basada en módulos, su compatibilidad con TypeScript y el seguimiento estricto de patrones como MVC y DI (inyección de dependencias) lo hacen ideal para proyectos escalables, mantenibles y bien organizados.

---

## 📌 Características principales

* 🗖️ Pedir citas médicas por parte de pacientes.
* 💳 Confirmación de asistencia mediante pago (con integración sandbox de pasarela de pago).
* ✅ Confirmación o rechazo de citas por parte del médico (solo si está pagada).
* 📋 Listado de citas del día para cada médico.
* 📚 Agenda completa por paciente con validaciones de horario y solapamientos.
* 🔐 Autenticación mediante tokens simples.
* ⚖️ Control de roles: paciente y médico.
<!-- * TODO: 🧪 Pruebas unitarias completas con cobertura. -->

---

## 📌 Principios y buenas prácticas aplicadas

- ✅ Principios **SOLID**
- ✅ Programación orientada a objetos
- ✅ Arquitectura orientada a **dominio y responsabilidades claras**
- ✅ Uso de **DTOs, services, guards, interceptors y pipes**
- ✅ Pruebas unitarias y end-to-end
- ✅ Control de errores centralizado
- ✅ Estructura limpia y mantenible

---

## 🚀 Requisitos y instalación 

Antes de comenzar, asegúrate de tener instalados los siguientes programas:

- [Node.js][nodejs-url] – Entorno de ejecución para JavaScript del lado del servidor.
- [Docker][docker-url] – Plataforma para contenedores que facilita la ejecución de la base de datos y otros servicios.

```sh
# Clonar el repositorio
git clone https://github.com/wotanCode/medpoint-api-restfull-2025.git
```

```sh
# Ingresar al proyecto
cd medpoint
```

```sh
# Instalar dependencias
npm install
```

## ▶️ Ejecución

1. Clonar el archivo `.env.template` y renombrarlo a `.env`.
2. Ajustar las variables de entorno según el uso. (Se pueden dejar los valores por defecto).
3. Levantar la base de datos.

```sh
docker-compose up -d
```

4. Levantar proyecto:

```sh
npm run start:dev
```

5. Ejecutar Seed. Get method

```sh
http://localhost:3000/api/seed
```

```bash
# Modo desarrollo
npm run start:dev

# Producción
npm run build
npm run start:prod
```

---

## 👥 Usuarios de prueba

Al ejecutar el **seed**, se insertarán los siguientes usuarios de prueba en la base de datos:

| Rol     | Email                           | Contraseña   |
|---------|----------------------------------|--------------|
| **Admin** | `admin@admin.com`              | `Admin1234`  |
| **Doctor** | `bob.doctor@example.com`      | `Doctor1234` |
| **Patient 1** | `charlie@mymail.com`        | `Abcd1234`   |
| **Patient 2** | `diana.rivera@example.com`   | `Abcd1234`   |
| **Patient 3** | `elias.torres@example.com`   | `Abcd1234`   |
| **Patient 4** | `fatima.gonzalez@example.com`| `Abcd1234`   |

Utiliza estos usuarios para realizar pruebas de autenticación y roles dentro de la API. Recuerda iniciar sesión con alguno de los usuarios de prueba para poder probar los distintos servicios, ya que todos requieren autenticación y algunos requieren diferentes tipos de autorización.

<!-- ## 🧪 Pruebas

```bash
# Unitarias
npm run test

# End-to-End
npm run test:e2e

# Cobertura
npm run test:cov
```

--- -->

<!-- ## ⚙️ Endpoints principales

### 📌 Paciente

- TODO
<!-- * `POST /appointments` → Solicitar nueva cita médica.
* `POST /appointments/:id/pay` → Pagar cita (sandbox).
* `GET /appointments/mine` → Ver citas propias. -->

<!-- ### 📌 Médico

- TODO -->
<!-- * `PATCH /appointments/:id/confirm` → Confirmar o rechazar cita (sólo si fue pagada).
* `GET /appointments/today` → Ver citas del día.

> Todos los endpoints requieren autenticación mediante token en el header. -->

---

## 👮‍♂️ Roles y permisos

| Rol      | Permisos                                     |
| -------- | -------------------------------------------- |
| admin    | Control completo                             |
| doctor   | Confirmar/rechazar citas, ver agenda diaria. |
| patient  | Solicitar y pagar citas. Ver su historial.   |

---

## ✅ Validaciones clave

* ⛔ No se puede solicitar citas fuera del horario habilitado (07:00–12:00 / 14:00–18:00).
* ⛔ No se puede solicitar cita en horarios ya ocupados.
* ⛔ No se puede confirmar una cita que no ha sido pagada.
* ⚠️ Validaciones adicionales como formato de datos, campos requeridos y estados de cita.

---

## 🔐 Autenticación

Este proyecto utiliza un sistema de autenticación basado en **JWT (JSON Web Tokens)**.

- NestJS proporciona los mecanismos necesarios para generar, firmar y validar tokens.
- El token contiene información del usuario y su rol, permitiendo un control de acceso eficiente.
- La caducidad del token está configurada por defecto en **8 horas**.

> ⚙️ Podés ajustar el tiempo de expiración o la lógica de autenticación modificando la configuración en el módulo de autenticación

## 🧱 Base de Datos

Este proyecto utiliza **PostgreSQL** (versión 14.3) como sistema de gestión de base de datos.

### 📌 Detalles de conexión:

| Parámetro  | Valor               |
|------------|---------------------|
| Nombre     | `medpointdb`        |
| Host       | `localhost`         |
| Puerto     | `5432`              |
| Usuario    | `postgres`          |
| Contraseña | `mysecretpassword`  |


<!-- ## 📁 Estructura del proyecto

- TODO -->
<!-- 
```
src/
├── auth/
├── users/
├── appointments/
├── payments/
├── common/
│   ├── guards/
│   ├── interceptors/
│   └── utils/
└── main.ts
    app.module.ts
```

> Diseño modular y desacoplado usando interfaces, inyección de dependencias, DTOs y entidades claras.

--- -->

## 🧰 Tecnologías usadas

- [![NestJS][nestjs-badge]][nestjs-url] Framework para construir aplicaciones server-side eficientes y escalables.
- [![TypeScript][typescript-badge]][typescript-url] Superset de JavaScript con tipado estático.
- [![Docker][docker-badge]][docker-url] Plataforma para desarrollar, enviar y ejecutar aplicaciones dentro de contenedores.
- [![PostgreSQL][postgresql-badge]][postgresql-url] Sistema de base de datos relacional avanzado.
- [![TypeORM][typeorm-badge]][typeorm-url] ORM para TypeScript y JavaScript compatible con múltiples bases de datos.
- [![Jest][jest-badge]][jest-url] Framework de testing con enfoque en simplicidad.
- [![Passport][passport-badge]][passport-url] Middleware de autenticación para Node.js.
- [![Class Validator][classvalidator-badge]][classvalidator-url] Validación basada en decoradores para TypeScript.

---

## 👨‍💻 Autor

Desarrollado con ❤️ por Pedro Yanez

[![GitHub][github-badge]][github-url] [![LinkedIn][linkedin-badge]][linkedin-url]

---

## 📜 Licencia

Este proyecto está bajo la licencia MIT. Consulta el archivo `LICENSE` para más detalles.

<!-- Fuente de la verdad -->
[nodejs-url]: https://nodejs.org/
[nestjs-url]: https://nestjs.com/
[nestjs-badge]: https://img.shields.io/badge/NestJS-E0234E?style=for-the-badge&logo=nestjs&logoColor=white
[typescript-url]: https://www.typescriptlang.org/
[typescript-badge]: https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white
[docker-url]: https://www.docker.com/
[docker-badge]: https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white
[postgresql-url]: https://www.postgresql.org/
[postgresql-badge]: https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white
[typeorm-url]: https://typeorm.io/
[typeorm-badge]: https://img.shields.io/badge/TypeORM-262627?style=for-the-badge&logo=typeorm&logoColor=white
[jest-url]: https://jestjs.io/
[jest-badge]: https://img.shields.io/badge/Jest-C21325?style=for-the-badge&logo=jest&logoColor=white
[passport-url]: http://www.passportjs.org/
[passport-badge]: https://img.shields.io/badge/Passport-34E27A?style=for-the-badge&logo=passport&logoColor=white
[classvalidator-url]: https://github.com/typestack/class-validator
[classvalidator-badge]: https://img.shields.io/badge/Class_Validator-000000?style=for-the-badge&logo=github&logoColor=white
[github-url]: https://github.com/wotancode
[github-badge]: https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white
[linkedin-url]: https://www.linkedin.com/in/pedro-yanez/
[linkedin-badge]: https://img.shields.io/badge/LinkedIn-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white