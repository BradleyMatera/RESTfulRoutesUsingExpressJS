# Contacts REST API

A RESTful API for managing contacts, built with **Node.js**, **Express 4**, **Mongoose 8**, and **MongoDB**. Includes automated tests via **Jest** and **Supertest**, and can be run locally or with **Docker**.

## Table of Contents

1. [Tech Stack](#tech-stack)
2. [Environment Variables](#environment-variables)
3. [How to Run Locally](#how-to-run-locally)
4. [How to Run with Docker](#how-to-run-with-docker)
5. [How to Run Tests](#how-to-run-tests)
6. [API Endpoints](#api-endpoints)

---

## Tech Stack

- **Runtime:** Node.js (v16+)
- **Framework:** Express 4
- **ODM:** Mongoose 8
- **Database:** MongoDB
- **Testing:** Jest 29 + Supertest 7
- **Containerization:** Docker + Docker Compose

---

## Environment Variables

Copy `.env.example` to `.env` and fill in your values. **Never commit `.env`.**

```
PORT=8080
MONGODB_URI=mongodb://localhost:27017/contacts
```

---

## How to Run Locally

```bash
# 1. Install dependencies
npm install

# 2. Copy and edit the env file
cp .env.example .env

# 3. Start MongoDB locally (if not using Docker)
# Then start the API server
npm start         # production
npm run dev       # development (nodemon auto-reload)
```

The API will be available at `http://localhost:8080`.

---

## How to Run with Docker

```bash
docker-compose up --build
```

This starts both the Express app and a MongoDB container. The API is available at `http://localhost:8080`.

To stop the containers:

```bash
docker-compose down
```

---

## How to Run Tests

Make sure MongoDB is running (locally or via Docker) and your `.env` is configured.

```bash
npm test
```

---

## API Endpoints

All routes are prefixed with `/v1/contacts`.

Contact objects in responses use `id` (string) and omit the internal `_id` and `__v` fields.

### `GET /v1/contacts`

Returns a paginated, sorted list of contacts.

**Query parameters:**

| Parameter   | Default | Description                              |
|-------------|---------|------------------------------------------|
| `page`      | `1`     | Page number (min 1)                      |
| `limit`     | `10`    | Results per page (min 1, max 100)        |
| `sort`      | `lname` | Field to sort by (`fname`, `lname`, ...) |
| `direction` | `asc`   | Sort direction: `asc` or `desc`          |

**Example response:**

```json
{
  "contacts": [
    {
      "id": "66f1a2b3c4d5e6f7a8b9c0d1",
      "fname": "John",
      "lname": "Doe",
      "phone": "1234567890",
      "email": "john.doe@example.com",
      "birthday": "1990-01-01T00:00:00.000Z"
    }
  ],
  "pagination": {
    "currentPage": 1,
    "totalPages": 1,
    "totalContacts": 1
  }
}
```

---

### `POST /v1/contacts`

Creates a new contact.

**Required fields:** `fname`, `lname`, `phone`, `email`, `birthday`

**Example request:**

```bash
curl -X POST http://localhost:8080/v1/contacts \
  -H 'Content-Type: application/json' \
  -d '{"fname":"John","lname":"Doe","phone":"1234567890","email":"john.doe@example.com","birthday":"1990-01-01"}'
```

**Example response (201):**

```json
{
  "id": "66f1a2b3c4d5e6f7a8b9c0d1",
  "fname": "John",
  "lname": "Doe",
  "phone": "1234567890",
  "email": "john.doe@example.com",
  "birthday": "1990-01-01T00:00:00.000Z"
}
```

**Validation error response (400):**

```json
{ "errors": ["phone is required", "email is required"] }
```

---

### `GET /v1/contacts/:id`

Returns a single contact by ID.

**Example request:**

```bash
curl http://localhost:8080/v1/contacts/66f1a2b3c4d5e6f7a8b9c0d1
```

Returns `404` if the contact does not exist.

---

### `PUT /v1/contacts/:id`

Replaces a contact's data. All required fields must be provided.

**Example request:**

```bash
curl -X PUT http://localhost:8080/v1/contacts/66f1a2b3c4d5e6f7a8b9c0d1 \
  -H 'Content-Type: application/json' \
  -d '{"fname":"Jane","lname":"Doe","phone":"9876543210","email":"jane.doe@example.com","birthday":"1992-02-02"}'
```

Returns `404` if the contact does not exist, `400` if required fields are missing.

---

### `DELETE /v1/contacts/:id`

Deletes a contact. Returns `204 No Content` on success, `404` if not found.

```bash
curl -X DELETE http://localhost:8080/v1/contacts/66f1a2b3c4d5e6f7a8b9c0d1
```
