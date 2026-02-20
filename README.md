# CS3 Store API

## 🚀 Cómo ejecutar el proyecto
1. Clonar el repositorio.
2. Asegurarse de tener Docker y Docker Compose instalados.
3. Ejecutar: `docker-compose up --build -d`
4. La API estará disponible en `http://localhost:3000`
5. La documentación Swagger está en `http://localhost:3000/docs`


## 🔑 Credenciales de Prueba
Al levantar el contenedor, un Lifecycle Hook de NestJS inserta automáticamente este usuario (gracias a `bcryptjs`):
- **Email:** admin@test.com
- **Password:** password123

## Decisiones Arquitectónicas
- **Docker Multi-stage Build:** Imágenes Alpine ligeras, separando dependencias de desarrollo (devDependencies) del empaquetado de producción.
- **Seguridad (Auth):** Implementación Stateless con JWT y contraseñas hasheadas con Bcrypt + Pepper y un Salt de 10 (configurado por variables de entorno). Separación estricta de responsabilidades (Firma en AuthService, Validación en JwtStrategy).
- **Graceful Shutdown:** Configurado en el main.ts para cerrar conexiones a BD de forma segura al apagar contenedores.
- **Healthchecks:** Implementación de `pg_isready` en Docker Compose para asegurar sincronización de arranque entre NestJS y PostgreSQL.

## 🚧 Deuda Técnica y Próximos Pasos (Con un poco más de tiempo)
- **Migraciones (TypeORM):** Actualmente `synchronize: true` está activo para agilizar la prueba en desarrollo local. Para un entorno real de producción, implementaría scripts de migración formales.
- **Testing (Jest):** Implementación de pruebas unitarias para la lógica de negocio de los servicios principales.


## Algunos request en Curl se pueden poner en Postman y al dar enter funcionaran
- ## **healtcheck**
  - curl --location 'http://localhost:3000/api/health'
- ## **getArticles**
  - curl --location 'http://localhost:3000/api/v1/article?page=1&limit=1' \
--header 'authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkNzc4MzY1ZC1iYTZjLTQ1NTgtYTc5Ny0xMzdmNmZiNzAxNzgiLCJlbWFpbCI6ImFkbWluQHRlc3QuY29tIiwicm9sZSI6IkFETUlOIiwiaWF0IjoxNzcxNTcyOTk4LCJleHAiOjE3NzE1NzM4OTh9.yemkROCrjqjjujCYQlERMbOjXQkFY15jmJNC7mDMfm8'
## Cambiar el token en los headers
- ## **login**
  - curl --location 'http://localhost:3000/api/v1/auth/login' \
--header 'Content-Type: application/json' \
--data-raw '{
    "email": "admin@test.com",
    "password": "password123"
}'
## lanzar una vez la semilla esté lista
