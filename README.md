# CS3 Store API

## 🚀 Cómo ejecutar el proyecto
1. Clonar el repositorio.
2. Asegurarse de tener Docker y Docker Compose instalados.
3. Ejecutar el entorno contenerizado:
  ```bash
  docker-compose up --build -d
4. La API estará disponible en `http://localhost:3000/api`
5. La documentación Swagger está en `http://localhost:3000/api/docs`


## 🔑 Credenciales de Prueba
Al levantar el contenedor, la base de datos se hidrata automáticamente con el siguiente usuario administrador
- **Email:** admin@test.com
- **Password:** password123


## Decisiones y Arquitectura
- **Docker Multi-stage Build:** Imágenes Alpine ligeras, separando dependencias de desarrollo (devDependencies) del empaquetado de producción.

- **Seguridad (Auth):** Implementación Stateless con JWT y contraseñas hasheadas con Bcrypt + Pepper y un Salt de 10 (configurado por variables de entorno). Separación estricta de responsabilidades (Firma en AuthService, Validación en JwtStrategy).

- **Graceful Shutdown:** Configurado en el main.ts para cerrar conexiones a BD de forma segura al apagar contenedores.

- **Healthchecks:** Implementación de `pg_isready` en Docker Compose para asegurar sincronización de arranque entre NestJS y PostgreSQL.

- **Separación de responsabilidades** Actualmente El login está dentro de auth pero lo ideal es que solo valide el token, el refresh y devolver la data validada y su payload. Por esto se decide separar algunas operaciones hacía users

- **Trabajo por features y versionamiento** se dice separa por una carpata de versión dentro del versionamiento sugerido por Nestjs haciendo más fácil buscar y encontrar funcionalides

- **Prevención SQLi** el uso del ORM (TypeORM) y consultas parametrizadas para evitar inyecciones de código por defecto.

## 🚧 Deuda Técnica y Próximos Pasos
- **Migraciones (TypeORM):** Actualmente `synchronize: true` está activo para agilizar la prueba en desarrollo local. Para un entorno real de producción, implementaría scripts de migración formales.

- **Testing (Jest):** Implementación de pruebas unitarias para la lógica de negocio de los servicios principales.

-- **Front** Se sugiere un front para poder probar de manera más factible

- **Creación de PDF** se planea usar la librería pdfkit debido a los conocimientos en front y el uso de la misma en prouyectos anteriores

- **Logica de negocio** falta implementar los calculos, las inserciones de articulos y cantidades para una sola factur. No siendo un stoper pero conocer las necesidades del negocio en temás de carga por petición, maximos y minimos esperados, puede cambiar la forma de afrontar la inserción, manejo y calculo de la data

## Visualización de data
- **Url de PgAdmun**
  - http://localhost:5050
- **PgAdmin se utiliza con las credenciales**
  - admin@cs3.com
  - admin

## Algunos request en Curl se pueden poner en Postman y al dar enter funcionaran
- ## **healtcheck**
  - curl --location 'http://localhost:3000/api/health'
- ## **getArticles**
  - curl --location 'http://localhost:3000/api/v1/article?page=1&limit=1' \
--header <AQUI_TU_TOKEN>
## Cambiar el token en los headers
- ## **login**
  - curl --location 'http://localhost:3000/api/v1/auth/login' \
--header 'Content-Type: application/json' \
--data-raw '{
    "email": "admin@test.com",
    "password": "password123"
}'
## lanzar una vez la semilla esté lista

## ⚠️ Nota de Seguridad
- Para que las pruebas sean rápidas se deja expuesto el docker-compose.yml con las credenciales quemadas

## Documentación
-- **URL**
  - http://localhost:3000/api/docs
-- **Postman**
  - Se anexa postman.json para velocidad en los endpoints creados


## Completado
-- Configuración de infraestructura contenerizada (Docker & Docker Compose).
-- Arquitectura base en NestJS siguiendo principios SOLID y separación de dominios.
-- Módulo de Autenticación robusto (JWT Stateless, Bcrypt + Pepper, Salt round 10).
-- Endpoint Healthcheck (/api/health) para validación de red en contenedores.
-- Implementación de Swagger/OpenAPI para la documentación viva.
-- Configuración base de base de datos PostgreSQL lista para escalar.
-- Endpoints de consulta paginada (ej. Article).

## Pendiente
- **CRUDs Restantes**
  -- Organization falta implementar
  -- Facture falta implementar
  -- FactureDetail falta implementar
  -- Article falta implementar (solo tiene un get paginado sin data semilla)
  -- User fala implementar algunos operaciones del CRUD

- **Soft Deletes**
  -- No hay delete aún así se dejó lista la bd para hacer softDelete

- **Lógica de Negocio (Cálculos)**
  -- Los calculos y la logica de negocio es algo que puede discutirse más a profundidad

- **Testing**
  -- Cobertura de pruebas unitarias (Jest) para los servicios core

- **Generación de PDFs**
  -- Se propone usar pdfkit (basado en experiencia previa) delegando esto a un worker o servicio aislado.

- **Login y Docs**
-- finalizar la integración con AsyncLocalStorage ALS y así mantener la trazabilidad de la sesión del usuario
-- Anexar el logger en los lugares necesarios para darnos visibilidad a la hora de consultar los logs
-- Terminar de organizar el Swagger

## Mejoras Implementadas
-- Una pequeña mejora es la utilización de la librería Joi para validar que las variables de entorno se encuentren disponibles y así no esperar a tener un error porque una variable falte despues del que el servicio se encuentre arriba

-- implementación de UOW para hacer seguimiento con el sistema de logs, al encontrar el session-tracker de la petición se puede hacer seguimiento de todos los logs de esa petición con su UOW

-- Colección de Postman: Se anexa el archivo postman.json en la raíz del repositorio para agilizar la evaluación manual.
