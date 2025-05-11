# 🏥 MedPoint API

API Restful desarrollada con **NestJS** que permite la gestión de citas médicas para pacientes y médicos.

---

## 📌 Características principales

* 🗖️ Pedir citas médicas por parte de pacientes.
* 💳 Confirmación de asistencia mediante pago (con integración sandbox de pasarela de pago).
* ✅ Confirmación o rechazo de citas por parte del médico (solo si está pagada).
* 📋 Listado de citas del día para cada médico.
* 📚 Agenda completa por paciente con validaciones de horario y solapamientos.
* 🔐 Autenticación mediante tokens simples.
* ⚖️ Control de roles: paciente y médico.
* 🧪 Pruebas unitarias completas con cobertura.

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
| Paciente | Solicitar y pagar citas. Ver su historial.   |
| Médico   | Confirmar/rechazar citas, ver agenda diaria. |

---

## ✅ Validaciones clave

* ⛔ No se puede solicitar citas fuera del horario habilitado (07:00–12:00 / 14:00–18:00).
* ⛔ No se puede solicitar cita en horarios ya ocupados.
* ⛔ No se puede confirmar una cita que no ha sido pagada.
* ⚠️ Validaciones adicionales como formato de datos, campos requeridos y estados de cita.

---

## 🔐 Autenticación

- TODO
<!-- * Se utiliza un esquema de token simple en los headers:

  ```
  Authorization: Bearer <token>
  ```
* Los tokens pueden ser generados manualmente para pruebas o provistos vía configuración. -->

---

## 🧱 Base de datos

* Base utilizada: **PostgreSQL**
<!-- * El script de creación de base de datos se encuentra en: `scripts/init.sql` -->

<!-- Tablas principales:

* `users` (médicos y pacientes)
* `appointments`
* `payments`
* `tokens` (opcional para autenticación)

--- -->

## 📁 Estructura del proyecto

- TODO
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