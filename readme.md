RESTful API with Express.js and MongoDB

This project is a RESTful API built using Express.js and MongoDB. It allows users to perform CRUD operations on a collection of contacts, supporting features like pagination, filtering, and sorting.

Table of Contents

	1.	Project Overview
	2.	Technologies
	3.	Requirements
	4.	Installation
	5.	Running the Project
	6.	API Endpoints
	7.	Filtering, Sorting, and Pagination
	8.	Running with Docker

Project Overview

The project implements a REST API for managing contacts, allowing users to:

	•	Retrieve all contacts with support for pagination, sorting, and filtering.
	•	Create a new contact.
	•	Update existing contacts.
	•	Delete a contact by its ID.

Features:

	•	Pagination: Control the number of results per page.
	•	Filtering: Filter contacts by field values such as first name, last name, etc.
	•	Sorting: Sort contacts by any field in ascending or descending order.

Technologies

	•	Node.js with Express.js
	•	MongoDB with Mongoose
	•	Docker for containerization
	•	npm for dependency management

Requirements

To run this project, ensure that you have the following tools installed:

	•	Node.js (v16 or higher)
	•	Docker
	•	npm

Installation

	1.	Clone the repository:

git clone https://github.com/your-repository-url.git
cd RESTfulRoutesUsingExpressJS


	2.	Install the dependencies:
Inside the project directory, run:

npm install


	3.	Set up the MongoDB database:
Make sure MongoDB is running on your local machine, or you can use Docker to run MongoDB (instructions in the Docker section below).

Running the Project

1. Start the server

You can start the Node.js server by running:

npm start

This will run the server on http://localhost:8080 by default.

2. Connecting to MongoDB

Ensure MongoDB is running locally or in a Docker container. The connection string is already configured in the project, but you can modify it in app.js:

mongoose.connect('mongodb://localhost:27017/contactsdb', { useNewUrlParser: true, useUnifiedTopology: true });

API Endpoints

1. Get All Contacts

GET /v1/contacts

	•	Description: Retrieves all contacts with optional pagination, filtering, and sorting.
	•	Query Parameters:
	•	page: The page number (default: 1).
	•	size: The number of contacts per page (default: 10).
	•	sort: The field by which to sort (e.g., fname, lname).
	•	direction: The direction of sorting (asc or desc).
	•	Headers:
	•	X-Filter-By: The field to filter by (e.g., fname, lname).
	•	X-Filter-Operator: The filter operator (=, !=, >, <).
	•	X-Filter-Value: The value to filter by.

Example Request:

curl http://localhost:8080/v1/contacts

2. Create a New Contact

POST /v1/contacts

	•	Description: Adds a new contact to the database.
	•	Request Body:

{
  "fname": "John",
  "lname": "Doe",
  "email": "john.doe@example.com",
  "phone": "123-456-7890",
  "birthday": "1990-01-01"
}



Example Request:

curl -X POST http://localhost:8080/v1/contacts \
-H 'Content-Type: application/json' \
-d '{"fname": "John", "lname": "Doe", "phone": "123-456-7890", "email": "john.doe@example.com", "birthday": "1990-01-01"}'

3. Delete a Contact

DELETE /v1/contacts/:id

	•	Description: Deletes a contact by its ID.

Example Request:

curl -X DELETE http://localhost:8080/v1/contacts/CONTACT_ID

Filtering, Sorting, and Pagination

Filtering

To filter contacts, use the following headers:

	•	X-Filter-By: Field to filter (e.g., fname, lname).
	•	X-Filter-Operator: Operator for filtering (=, !=, >, <).
	•	X-Filter-Value: Value to filter by.

Sorting

You can sort contacts using the following query parameters:

	•	sort: The field by which to sort (e.g., fname, lname).
	•	direction: Sorting direction (asc or desc).

Pagination

Pagination is controlled using these query parameters:

	•	page: The page number.
	•	size: The number of contacts per page.

Running with Docker

1. Build and Run Docker Containers

To use Docker for running the API and MongoDB, you can build and start the containers using docker-compose.

Steps:

	1.	Build the containers:

docker-compose up --build


	2.	Access the API:
Once the containers are up, the API will be running on http://localhost:8080.
	3.	Check MongoDB logs:
You can view the MongoDB logs using the following command:

docker logs restfulroutesusingexpressjs-mongo-1


	4.	Test the API:
You can test the API using curl or any API client like Postman.

Docker Compose Setup

The docker-compose.yml file contains two services:

	•	app: Runs the Express.js API server.
	•	mongo: Runs the MongoDB database.

You can modify the file to change ports or other settings.

Issues and Troubleshooting

	1.	MongoDB Connection Errors:
If MongoDB is not running, ensure that the service is up, or run it in Docker.
	2.	Internal Server Error:
If you receive an “Internal Server Error” response, check the logs for any issues with MongoDB queries or invalid inputs.


TESTING WITH JEST and MONGODB

