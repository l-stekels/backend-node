# Weather Forecast API

This project is a simple Express.js application that serves a weather forecast API. The API utilizes the OpenWeatherMap API to retrieve a 3-day forecast based on latitude and longitude parameters provided by the user.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Node.js
- npm or yarn
- docker
- docker-compose
- make

### Installation

1. Run `make cold-start` this will install the ssl certificates and start the server in docker container
2. Run `npm install` to install the required dependencies locally
3. Run `npm run test` to run the tests
4. Run `npm run lint` to run the linter
5. Run `npm run format` for formatting and `npm prettier` for prettier

To start the application in prod environemnt run `make prod`.


## The task

Technical task for backend

1. Setup Environment:
   Create a new Node.js project using npm or yarn.
   Configure two environments: development and production.
   Set the API_KEY as follows: API_KEY_HERE.
2. API Creation:
   Develop a simple Express.js application to serve the API.
   Set up a route /forecast to handle GET requests for weather forecast information.
   Utilize the OpenWeatherMap API (https://openweathermap.org/forecast5) to retrieve a 3-day forecast.
   Allow users to pass latitude and longitude as query parameters.
3. Error Handling:
   Implement proper error handling for API requests.
   If the user fails to provide correct latitude or longitude parameters:
   Return a response with the corresponding OpenWeatherMap API response.
   Include an error message.
   Set the data to null.
4. Data Processing:
   Convert temperature from Kelvin to Celsius.
   Calculate the average temperature for each date in the forecast.
   Display the average temperature in the API response.
   Organize the data of every day in a list of arrays.
5. Additional Requirements:
   Ensure the code follows the best practices for structure, error handling, and security.
   Support both HTTP and HTTPS requests.
   Handle scenarios where incorrect latitude or longitude parameters are provided by the user:
   Return a response with the OpenWeatherMap API response.
   Include an error message.
   Set the data to null.
6. Testing
   Run the Express.js application locally on your machine.
   Use Postman to send GET requests to the local endpoint
