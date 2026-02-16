# Prueba Técnica - Desarrollador Backend NestJS

Prueba técnica para evaluar las capacidades de desarrollo backend de los candidatos en el área de Desarrollo de Tecnología en CS3.

## 📋 Tabla de Contenidos
- [Introducción](#introducción)
- [Objetivos de Evaluación](#objetivos-de-evaluación)
- [Requisitos Técnicos](#requisitos-técnicos)
- [Configuración Inicial](#configuración-inicial)
- [Estructura de la Base de Datos](#estructura-de-la-base-de-datos)
- [Requerimientos Funcionales](#requerimientos-funcionales)
- [Criterios de Evaluación](#criterios-de-evaluación)
- [Entrega del Proyecto](#entrega-del-proyecto)

---

## 🎯 Introducción

Este repositorio contiene una serie de requerimientos de un caso práctico que busca evaluar las capacidades técnicas del candidato para desarrollar una API REST/GraphQL para un sistema de gestión de compras y ventas de una tienda miscelánea.

### Objetivos de Evaluación

Se evaluarán los siguientes aspectos:

1. **Creatividad y resolución de problemas** - Capacidad para resolver los requerimientos de forma eficiente
2. **Calidad del código** - Estructura clara, buenas prácticas, y código mantenible
3. **Eficiencia algorítmica** - Optimización de consultas y lógica de negocio
4. **Familiaridad con tecnologías modernas** - NestJS, TypeScript, Docker, GraphQL
5. **Principios SOLID** - Aplicación de principios de diseño de software
6. **Testing** - Implementación de pruebas unitarias e integración
7. **Documentación** - README claro con instrucciones de instalación y uso

---

## ⚙️ Requisitos Técnicos

### Obligatorios ✅

- **Framework**: NestJS (última versión estable)
- **Lenguaje**: TypeScript (strict mode habilitado)
- **Contenedores**: Docker & Docker Compose
- **Base de datos**: SQL Server, PostgreSQL o MySQL
- **ORM**: TypeORM o Prisma
- **Autenticación**: JWT (JSON Web Tokens)
- **Validación**: class-validator y class-transformer
- **Variables de entorno**: dotenv o @nestjs/config

### Opcionales (Puntos extra) ⭐

- **API**: GraphQL con Apollo Server
- **Testing**: Jest (unitarias) y Supertest (e2e)
- **Documentación**: Swagger/OpenAPI o GraphQL Playground
- **Caché**: Redis para optimización
- **Migraciones**: TypeORM migrations o Prisma migrate
- **Logging**: Winston o Pino
- **Generación PDF**: puppeteer, pdfkit o @nestjs/pdf

---

## 🚀 Configuración Inicial

### Fork del Repositorio

```bash
# Realizar fork desde Bitbucket
# URL: https://bitbucket.org/cs3dev/backend-test

# Clonar el repositorio forkeado
git clone https://[TU_USUARIO]@bitbucket.org/[TU_USUARIO]/backend-test.git

# Crear branch con tu nombre completo
git checkout -b "[tu-nombre-completo]"
```

## 🗄️ Estructura de la Base de Datos

### Diagrama ER

```
Organization (1) ----< Facture >---- (1) Client
                         |
                         |
                    FactureDetail (N)
                         |
                         |
                      Article (1)
```

### Tablas

#### 1. Organization (organization)

| Campo | Tipo | Null | Descripción |
|-------|------|------|-------------|
| id | UUID | NO | Identificador único |
| name | VARCHAR(200) | NO | Nombre de la organización |
| email | VARCHAR(50) | NO | Email corporativo |
| phone | VARCHAR(50) | NO | Teléfono |
| documentNumber | VARCHAR(40) | NO | NIT/RUC |
| address | VARCHAR(400) | NO | Dirección |
| createdAt | DATETIME | NO | Fecha de creación |
| updatedAt | DATETIME | NO | Fecha de actualización |
| deletedAt | DATETIME | SÍ | Soft delete |

#### 2. Client (client)

| Campo | Tipo | Null | Descripción |
|-------|------|------|-------------|
| id | UUID | NO | Identificador único |
| name | VARCHAR(200) | NO | Nombre completo |
| documentType | VARCHAR(10) | NO | CC/CE/NIT/Pasaporte |
| documentNumber | VARCHAR(40) | NO | Número de documento |
| address | VARCHAR(400) | NO | Dirección |
| phone | VARCHAR(50) | SÍ | Teléfono |
| email | VARCHAR(100) | SÍ | Email |
| createdAt | DATETIME | NO | Fecha de creación |
| updatedAt | DATETIME | NO | Fecha de actualización |
| deletedAt | DATETIME | SÍ | Soft delete |

#### 3. Facture (facture)

| Campo | Tipo | Null | Descripción |
|-------|------|------|-------------|
| id | UUID | NO | Identificador único |
| invoiceNumber | VARCHAR(50) | NO | Número de factura (único) |
| date | DATETIME | NO | Fecha de emisión |
| expiredDate | DATETIME | NO | Fecha de vencimiento |
| clientId | UUID (FK) | NO | Referencia a client |
| organizationId | UUID (FK) | NO | Referencia a organization |
| status | ENUM | NO | PENDING/PAID/CANCELLED |
| totalAmount | DECIMAL(12,2) | NO | Monto total |
| discount | DECIMAL(12,2) | NO | Descuento aplicado |
| createdAt | DATETIME | NO | Fecha de creación |
| updatedAt | DATETIME | NO | Fecha de actualización |
| deletedAt | DATETIME | SÍ | Soft delete |

#### 4. FactureDetail (facture_detail)

| Campo | Tipo | Null | Descripción |
|-------|------|------|-------------|
| id | UUID | NO | Identificador único |
| factureId | UUID (FK) | NO | Referencia a facture |
| articleId | UUID (FK) | NO | Referencia a article |
| quantity | INT | NO | Cantidad de artículos |
| unitPrice | DECIMAL(12,2) | NO | Precio unitario |
| subtotal | DECIMAL(12,2) | NO | Subtotal (quantity * unitPrice) |
| discount | DECIMAL(12,2) | NO | Descuento aplicado |
| total | DECIMAL(12,2) | NO | Total con descuento |
| createdAt | DATETIME | NO | Fecha de creación |
| updatedAt | DATETIME | NO | Fecha de actualización |
| deletedAt | DATETIME | SÍ | Soft delete |

#### 5. Article (article)

| Campo | Tipo | Null | Descripción |
|-------|------|------|-------------|
| id | UUID | NO | Identificador único |
| sku | VARCHAR(50) | NO | Código único del artículo |
| name | VARCHAR(200) | NO | Nombre del artículo |
| description | TEXT | SÍ | Descripción detallada |
| unitPrice | DECIMAL(12,2) | NO | Precio unitario |
| wholesaleQuantity | INT | SÍ | Cantidad mínima al por mayor |
| wholesaleDiscount | DECIMAL(5,2) | SÍ | % de descuento al por mayor |
| stock | INT | NO | Cantidad en inventario |
| isActive | BOOLEAN | NO | Estado del artículo |
| createdAt | DATETIME | NO | Fecha de creación |
| updatedAt | DATETIME | NO | Fecha de actualización |
| deletedAt | DATETIME | SÍ | Soft delete |

#### 6. User (user) - Para Autenticación

| Campo | Tipo | Null | Descripción |
|-------|------|------|-------------|
| id | UUID | NO | Identificador único |
| email | VARCHAR(100) | NO | Email (único) |
| password | VARCHAR(255) | NO | Hash de contraseña |
| firstName | VARCHAR(100) | NO | Nombre |
| lastName | VARCHAR(100) | NO | Apellido |
| role | ENUM | NO | ADMIN/SELLER/VIEWER |
| isActive | BOOLEAN | NO | Estado del usuario |
| createdAt | DATETIME | NO | Fecha de creación |
| updatedAt | DATETIME | NO | Fecha de actualización |
| deletedAt | DATETIME | SÍ | Soft delete |

---

## 📝 Requerimientos Funcionales

### 1. Autenticación y Autorización ✅

**Implementar sistema completo de autenticación:**

- **POST** `/auth/register` - Registro de usuarios
- **POST** `/auth/login` - Login (retorna JWT)
- **POST** `/auth/refresh` - Refresh token
- **GET** `/auth/profile` - Obtener perfil del usuario autenticado
- **Guards**: Proteger todos los endpoints excepto login/register
- **Roles**: Implementar autorización basada en roles (ADMIN, SELLER, VIEWER)

**Ejemplo de respuesta esperada:**

```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "email": "user@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "role": "SELLER"
  }
}
```

### 2. CRUD Completo para Todas las Entidades ✅

Implementar endpoints CRUD para:
- Organization
- Client
- Article
- Facture
- FactureDetail

**Endpoints estándar por entidad:**

```
GET    /api/v1/{entity}          - Listar (con paginación, filtros, ordenamiento)
GET    /api/v1/{entity}/:id      - Obtener por ID
POST   /api/v1/{entity}          - Crear
PATCH  /api/v1/{entity}/:id      - Actualizar parcialmente
PUT    /api/v1/{entity}/:id      - Actualizar completamente
DELETE /api/v1/{entity}/:id      - Eliminar (soft delete)
```

**Requisitos adicionales:**
- Validación de DTOs con class-validator
- Paginación con limit/offset o cursor-based
- Filtros dinámicos
- Ordenamiento múltiple
- Manejo de errores consistente

### 3. Resumen de Factura con Cálculo de Descuentos 💰

**Endpoint:** `GET /api/v1/factures/:id/summary`

**Lógica de negocio:**

1. Obtener factura con todos sus detalles
2. Por cada artículo en factura_detail:
   - Si `quantity >= article.wholesaleQuantity`
   - Aplicar descuento: `discount = unitPrice * quantity * (wholesaleDiscount / 100)`
3. Calcular totales

**Respuesta esperada:**

```json
{
  "facture": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "invoiceNumber": "FAC-2026-001",
    "date": "2026-02-16T10:00:00Z",
    "client": {
      "id": "...",
      "name": "Juan Pérez",
      "documentNumber": "12345678"
    }
  },
  "details": [
    {
      "article": {
        "id": "...",
        "name": "Laptop HP",
        "sku": "LAP-001"
      },
      "quantity": 10,
      "unitPrice": 1000.00,
      "subtotal": 10000.00,
      "discountApplied": true,
      "discountPercentage": 15,
      "discountAmount": 1500.00,
      "total": 8500.00
    }
  ],
  "summary": {
    "subtotal": 10000.00,
    "totalDiscount": 1500.00,
    "totalAmount": 8500.00,
    "itemsCount": 10
  }
}
```

### 4. Top 5 Facturas por Cantidad de Artículos 📊

**Endpoint:** `GET /api/v1/reports/top-factures-by-quantity`

**Query params opcionales:**
- `startDate`: Filtrar desde fecha
- `endDate`: Filtrar hasta fecha
- `clientId`: Filtrar por cliente

**Respuesta esperada:**

```json
{
  "data": [
    {
      "factureId": "...",
      "invoiceNumber": "FAC-2026-100",
      "clientName": "Juan Pérez",
      "totalItems": 150,
      "totalAmount": 25000.00,
      "date": "2026-02-15T10:00:00Z"
    }
  ],
  "meta": {
    "total": 5,
    "generatedAt": "2026-02-16T10:00:00Z"
  }
}
```

### 5. Top 5 Facturas por Monto Total 💵

**Endpoint:** `GET /api/v1/reports/top-factures-by-amount`

**Misma estructura de respuesta que el punto anterior, ordenado por `totalAmount DESC`**

### 6. Generación de PDF 📄

**Endpoint:** `GET /api/v1/factures/:id/pdf`

**Librería recomendada:** `puppeteer`, `pdfkit` o `@nestjs-modules/pdf`

**Funcionalidad:**
- Generar PDF profesional con logo de la organización
- Incluir datos de la factura, cliente, detalles de artículos
- Tabla con totales y descuentos
- Retornar como stream o base64

**Headers de respuesta:**
```
Content-Type: application/pdf
Content-Disposition: attachment; filename="factura-FAC-2026-001.pdf"
```

**Bonus:** Implementar también para los reportes:
- `GET /api/v1/reports/top-factures-by-quantity/pdf`
- `GET /api/v1/reports/top-factures-by-amount/pdf`

---

## ✅ Criterios de Evaluación

La evaluación se realizará de manera cualitativa sobre los siguientes aspectos. No hay un puntaje mínimo requerido - queremos ver hasta dónde puedes llegar y cómo abordas los problemas.

### Aspectos a Evaluar

#### 1. Funcionalidad
- ¿Los endpoints implementados funcionan correctamente?
- ¿La lógica de negocio está bien implementada?
- ¿Se cumplen los requerimientos especificados?
- ¿La aplicación maneja casos edge apropiadamente?

#### 2. Calidad del Código
- **Clean Code**: Código legible, bien organizado y fácil de mantener
- **SOLID Principles**: Aplicación de principios de diseño orientado a objetos
- **DRY (Don't Repeat Yourself)**: Evitar duplicación de código
- **Arquitectura**: Separación clara de responsabilidades (controllers, services, repositories)
- **Naming**: Nombres descriptivos y consistentes

#### 3. Documentación
- **README**: Instrucciones claras de instalación y uso
- **Code Comments**: Comentarios donde sea necesario
- **API Docs**: Swagger/OpenAPI o GraphQL Playground
- **Decisiones técnicas**: Explicación de por qué se eligieron ciertas tecnologías

#### 4. Seguridad
- **Autenticación**: Implementación correcta de JWT
- **Autorización**: Roles y permisos apropiados
- **Validaciones**: Validación exhaustiva de inputs
- **SQL Injection**: Prevención mediante ORM y parametrización
- **Secrets**: No hay credenciales hardcodeadas

#### 5. Optimización y Performance
- **Queries eficientes**: Uso apropiado de joins y eager/lazy loading
- **Índices**: Índices en campos frecuentemente consultados
- **Paginación**: Implementada en listados grandes
- **Caché** (Opcional): Redis para optimizar consultas frecuentes

#### 6. Extras Opcionales
Cualquiera de estos suma positivamente:
- GraphQL con resolvers bien estructurados
- Sistema de logging robusto (Winston/Pino)
- Migraciones versionadas
- Rate limiting
- Audit trail
- Webhooks
- Exportación a Excel/CSV
- CI/CD pipeline
- Frontend básico

### Lo que NO es importante

- **Perfección**: Preferimos ver progreso real sobre código perfecto incompleto
- **Cantidad de features**: Es mejor tener 3 features bien hechas que 10 a medias
- **Diseño visual**: Si implementas PDF, la funcionalidad es más importante que lo bonito que se vea el documento
- **Completar todo**: Entrega lo que puedas completar bien en el tiempo disponible

### Lo que MÁS valoramos

✅ **Código que funciona** - Preferible a código teóricamente perfecto pero con bugs

✅ **Buenas decisiones** - Explicar por qué elegiste cierto enfoque

✅ **Manejo de errores** - Código robusto que no se rompe fácilmente

✅ **Validaciones** - Protección contra inputs inválidos

---

## 📦 Entrega del Proyecto

### Plazo

**2 días hábiles** desde la recepción de la prueba.

> 💡 **IMPORTANTE**: Entrega lo que puedas completar dentro del plazo. Es mejor entregar un proyecto parcial con alta calidad que uno completo con baja calidad. No hay penalización por no completar todos los requerimientos.

### Modalidades de Entrega

#### Opción 1: Pull Request (Recomendada)

1. Realizar commits atómicos con mensajes descriptivos:
   ```bash
   git add .
   git commit -m "feat: implement JWT authentication"
   git push origin [tu-nombre-completo]
   ```

2. Crear Pull Request a la rama principal con:
   - Título descriptivo
   - Descripción de lo implementado
   - Instrucciones de instalación y ejecución
   - Capturas de pantalla (opcional)
   - Lista de lo que completaste y lo que quedó pendiente

3. Notificar por email a: **dvergel@cs3.com.co**
   - Asunto: `[Prueba Backend] - [Tu Nombre]`
   - Incluir link al PR

#### Opción 2: Repositorio Forkeado

1. Asegurarse de que el repositorio sea público o dar acceso a CS3
2. Enviar email a **dvergel@cs3.com.co** con:
   - Link al repositorio
   - Instrucciones completas de instalación
   - Explicación de arquitectura y decisiones técnicas
   - Lista de features implementadas vs pendientes
   - Video demo (opcional pero recomendado)

### Checklist Pre-entrega ✅

- [ ] Código compila sin errores
- [ ] Docker Compose funciona con `docker-compose up`
- [ ] Variables de entorno documentadas en `.env.example`
- [ ] README.md completo con instrucciones
- [ ] Migraciones incluidas y documentadas
- [ ] Seeds de datos de prueba disponibles
- [ ] Endpoints documentados (Swagger o GraphQL Playground)
- [ ] Tests ejecutándose correctamente (los que hayas implementado)
- [ ] Sin credenciales hardcodeadas
- [ ] `.gitignore` configurado correctamente

## Estado del Proyecto completado

## Arquitectura
[Explicar brevemente la arquitectura y decisiones técnicas]

### Completado ✅
- [Lista de features completadas]

### Pendiente ⏳
- [Lista de features que no alcanzaste a implementar]

### Decisiones Técnicas
- [Explica por qué elegiste ciertas tecnologías o patrones]

## Mejoras Implementadas
[Lista de mejoras adicionales que agregaste más allá de lo requerido]