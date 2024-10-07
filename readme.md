## RESTful API with Express.js and MongoDB

This project is a RESTful API built using Express.js and MongoDB. It allows users to perform CRUD operations on a collection of contacts, supporting features like pagination, filtering, and sorting.

## Table of Contents

	1.	Project Overview
	2.	Technologies
	3.	Requirements
	4.	Installation
	5.	Running the Project
	6.	API Endpoints
	7.	Filtering, Sorting, and Pagination
	8.	Running with Docker
	9.	Testing with Jest and MongoDB
	10.	Issues and Troubleshooting

## Project Overview

The project implements a REST API for managing contacts, allowing users to:

	•	Retrieve all contacts with support for pagination, sorting, and filtering.
	•	Create a new contact.
	•	Update existing contacts.
	•	Delete a contact by its ID.

## Features:

	•	Pagination: Control the number of results per page.
	•	Filtering: Filter contacts by field values such as first name, last name, etc.
	•	Sorting: Sort contacts by any field in ascending or descending order.

## Technologies

	•	Node.js with Express.js
	•	MongoDB with Mongoose
	•	Docker for containerization
	•	Jest for testing

## Requirements

To run this project, ensure that you have the following tools installed:

	•	Node.js (v16 or higher)
	•	Docker (optional, for containerization)
	•	npm (for dependency management)

## ## Installation

	1.	Clone the repository:

git clone https://github.com/your-repository-url.git
cd RESTfulRoutesUsingExpressJS


	2.	Install the dependencies:

npm install


	3.	Set up the MongoDB database:
	•	Make sure MongoDB is running on your local machine, or you can use Docker to run MongoDB (instructions in the Docker section below).

## Running the Project

	1.	Start the server:

npm start

This will run the server on http://localhost:8080 by default.

	2.	Connecting to MongoDB:
Ensure MongoDB is running locally or in a Docker container. The connection string is configured in .env:

MONGODB_URI=mongodb://localhost:27017/contactsdb



## API Endpoints

	1.	Get All Contacts
GET /v1/contacts
	•	Retrieves all contacts with optional pagination, filtering, and sorting.
	•	Query Parameters:
	•	page: The page number (default: 1).
	•	size: The number of contacts per page (default: 10).
	•	sort: The field by which to sort (e.g., fname, lname).
	•	direction: The direction of sorting (asc or desc).
Example Request:

curl http://localhost:8080/v1/contacts


	2.	Create a New Contact
POST /v1/contacts
	•	Adds a new contact to the database.
	•	Request Body:

{
  "fname": "John",
  "lname": "Doe",
  "email": "john.doe@example.com",
  "phone": "123-456-7890",
  "birthday": "1990-01-01"
}


## Example Request:

curl -X POST http://localhost:8080/v1/contacts \
-H 'Content-Type: application/json' \
-d '{"fname": "John", "lname": "Doe", "phone": "123-456-7890", "email": "john.doe@example.com", "birthday": "1990-01-01"}'


	3.	Delete a Contact
DELETE /v1/contacts/:id
	•	Deletes a contact by its ID.
Example Request:

curl -X DELETE http://localhost:8080/v1/contacts/CONTACT_ID



## Filtering, Sorting, and Pagination

	•	Filtering:
	•	Use the following headers to filter:
	•	X-Filter-By: Field to filter (e.g., fname, lname).
	•	X-Filter-Operator: Operator for filtering (=, !=, >, <).
	•	X-Filter-Value: Value to filter by.
	•	Sorting:
	•	Query parameters:
	•	sort: Field by which to sort (e.g., fname, lname).
	•	direction: Sorting direction (asc or desc).
	•	Pagination:
	•	Query parameters:
	•	page: The page number.
	•	size: Number of contacts per page.

## Running with Docker

	1.	Build and Run Docker Containers:

docker-compose up --build


	2.	Access the API:
Once the containers are up, the API will be running on http://localhost:8080.
	3.	Check MongoDB logs:

docker logs restfulroutesusingexpressjs-mongo-1


	4.	Test the API:
You can test the API using curl or any API client like Postman.

## Docker Compose Setup

The docker-compose.yml file contains two services:

	•	app: Runs the Express.js API server.
	•	mongo: Runs the MongoDB database.

## Testing with Jest and MongoDB

This project includes automated tests using Jest. It also uses MongoDB to handle test data.

	1.	Run the Tests:

npx jest

## If you are facing issues with open handles after tests complete, run Jest with the --detectOpenHandles flag:

npx jest --detectOpenHandles


	2.	Test Debugging Notes:
	•	Ensure MongoDB is running before running the tests. Use Docker or install MongoDB locally.
	•	If Jest fails due to timeouts, increase the timeout in the test file using jest.setTimeout().
	3.	Closing MongoDB Connection and Server:
	•	Jest might throw errors if the MongoDB connection or server isn’t closed properly. This project ensures both are closed using the afterAll() function in the test file.

## Issues and Troubleshooting

### Throughout the development and testing of this RESTful API, I encountered several technical challenges. Below is a comprehensive summary of the key issues I faced, as well as the steps I took to resolve them. This should serve as a guide for debugging similar issues in future projects.

1. Issue: Test Package Not Executing with Jest Command

	•	Description: Initially, the Jest testing framework failed to run properly, showing the error command not found or simply not executing after installing all dependencies.
	•	Root Cause: The issue arose due to an outdated version of Node.js and missing test dependencies in the local environment. Specifically, the project had required packages like Jest, Axios, and node-libcurl, which were not globally or correctly installed.
	•	Resolution: I fixed this by running the following commands:

npm install -g jest
npm install --save axios
npm install --save node-libcurl

This ensured that Jest was available globally, and the required packages for testing were properly installed.

2. Issue: Open Handles and Jest Not Exiting

	•	Description: During testing, the Jest framework failed to exit after completing all test cases. This led to hanging processes and the message: “Jest did not exit one second after the test run has completed.”
	•	Root Cause: The issue was due to open handles that were not properly closed. This usually happens when the Node.js server or MongoDB connection remains open after tests complete.
	•	Resolution: I resolved this by ensuring that both the server and the MongoDB connection were properly closed using the afterAll() hook in the test file. Additionally, I used the --detectOpenHandles flag in Jest to identify any remaining open handles:

npx jest --detectOpenHandles

This allowed me to pinpoint and address open TCP connections that were preventing Jest from exiting.

3. Issue: Address Already in Use (EADDRINUSE)

	•	Description: While running tests, I encountered the error: listen EADDRINUSE: address already in use :::8080.
	•	Root Cause: This error occurred because the server port (8080) was already in use, likely due to a previously running instance of the API or a Docker container occupying the same port.
	•	Resolution: I resolved the issue by ensuring that no other process was running on port 8080. I stopped all Docker containers, checked for any lingering Node.js processes, and restarted the server. The following commands were used to identify and kill any lingering processes:

lsof -i :8080
kill -9 <PID>

I also added logic to the test setup to dynamically assign a port to avoid future conflicts.

4. Issue: MongoDB Connection Timeout

	•	Description: MongoDB connections would occasionally time out during tests, causing the test suite to exceed the default timeout of 5000 ms.
	•	Root Cause: The default Jest timeout for asynchronous operations was too short for the MongoDB connection and queries, especially when dealing with larger data sets or slow network connections.
	•	Resolution: I increased the Jest timeout to 20000 ms for all tests to allow sufficient time for MongoDB operations to complete:

jest.setTimeout(20000);

This allowed all database operations to complete within the extended timeout period.

5. Issue: Connection.prototype.close() no longer accepts a callback

	•	Description: When attempting to close the MongoDB connection after tests, I encountered a Mongoose-specific error: Connection.prototype.close() no longer accepts a callback.
	•	Root Cause: Mongoose deprecated the use of callbacks for the connection.close() function, which was causing the tests to break during teardown.
	•	Resolution: I updated the afterAll() hook to use the new Promise-based syntax for closing the MongoDB connection. This ensured proper closure without callbacks:

afterAll(async () => {
  await mongoose.connection.close();
});



6. Issue: Slow Tests and Excessive Timeout

	•	Description: Test execution was sometimes slow, causing timeouts even after increasing the timeout value to 20000 ms.
	•	Root Cause: The MongoDB server and test data setup were taking too long to initialize during each test run.
	•	Resolution: I optimized the tests by reducing the size of the test dataset and ensuring that unnecessary data was not loaded into memory. Additionally, I ensured that MongoDB queries were properly indexed to avoid delays during retrieval.

7. Issue: Missing Axios and Node-libcurl

	•	Description: The test package relied on Axios for making HTTP requests and node-libcurl for handling specific requests, but these packages were not initially included in the project dependencies.
	•	Root Cause: Axios and node-libcurl were either missing or not installed correctly, leading to test failures.
	•	Resolution: I manually installed the missing packages using npm:

npm install --save axios
npm install --save node-libcurl

This fixed the issue and ensured all necessary dependencies were available for the test suite to run correctly.

8. Issue: Debugging Docker Container Issues

	•	Description: There were occasional issues with the MongoDB Docker container not starting correctly or not persisting data across multiple test runs.
	•	Root Cause: The Docker container was either stopped prematurely or did not have the correct volume mapping, causing it to lose data between runs.
	•	Resolution: I updated the docker-compose.yml file to ensure that MongoDB data was persisted between test runs by using a named volume. Additionally, I ensured that Docker logs were reviewed for any error messages related to MongoDB or the application:

docker logs restfulroutesusingexpressjs-mongo-1

I also ensured that all Docker containers were stopped properly before starting new ones:

docker-compose down
docker-compose up --build



By addressing these issues, I was able to successfully configure and test the project with Jest and MongoDB in a reliable and scalable manner. The process of resolving these issues has led to a more stable test environment and deeper insights into troubleshooting similar issues in future development.