# FastifyWeather API

A RESTful Weather API built with Fastify and TypeScript that integrates with OpenWeatherMap to provide current weather data and forecasts.

## Features

-   Get current weather data by city name
-   Get 5-day weather forecast by city name
-   Get weather data by geographic coordinates (latitude & longitude)
-   Built with Fastify for high performance
-   Written in TypeScript for type safety
-   Simple, function-based architecture

## Prerequisites

-   Node.js (v14.x or higher)
-   npm or yarn
-   OpenWeatherMap API key (sign up at [OpenWeatherMap](https://openweathermap.org/api))

## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/yourusername/fastify-weather-api.git
    cd fastify-weather-api
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Create a `.env` file in the root directory and add your OpenWeatherMap API key:

    ```
    PORT=3000
    OPENWEATHER_API_KEY=your_api_key_here
    ```

4. Build the project:

    ```bash
    npm run build
    ```

5. Start the server:
    ```bash
    npm start
    ```

## Project Structure

```
├── src/
│   ├── config.ts            # Configuration variables
│   ├── index.ts             # Application entry point
│   ├── routes/
│   │   └── weather-routes.ts # API route definitions
│   ├── services/
│   │   └── weather-service.ts # Service functions for OpenWeatherMap API
│   └── types/
│       └── weather.ts        # TypeScript interfaces
├── .env                      # Environment variables (create this file)
├── package.json
├── tsconfig.json
└── README.md
```

## API Endpoints

### Get Current Weather by City

```
GET /api/weather/:city
```

Example:

```
GET /api/weather/london
```

Response:

```json
{
    "city": "London",
    "country": "GB",
    "temperature": 15.2,
    "feels_like": 14.8,
    "humidity": 76,
    "pressure": 1012,
    "wind_speed": 4.12,
    "description": "scattered clouds",
    "icon": "03d",
    "timestamp": "2023-09-21T15:30:45.123Z"
}
```

### Get Weather Forecast by City

```
GET /api/forecast/:city
```

Example:

```
GET /api/forecast/paris
```

Response:

```json
{
  "city": "Paris",
  "country": "FR",
  "forecast": [
    {
      "date": "2023-09-21",
      "temperature": 17.5,
      "feels_like": 17.1,
      "humidity": 65,
      "description": "light rain",
      "icon": "10d"
    },
    {
      "date": "2023-09-22",
      "temperature": 18.2,
      "feels_like": 17.9,
      "humidity": 62,
      "description": "moderate rain",
      "icon": "10d"
    },
    ...
  ]
}
```

### Get Weather by Coordinates

```
GET /api/weather/coordinates?lat={latitude}&lon={longitude}
```

Example:

```
GET /api/weather/coordinates?lat=51.5074&lon=-0.1278
```

Response:

```json
{
    "city": "London",
    "country": "GB",
    "temperature": 15.2,
    "feels_like": 14.8,
    "humidity": 76,
    "pressure": 1012,
    "wind_speed": 4.12,
    "description": "scattered clouds",
    "icon": "03d",
    "timestamp": "2023-09-21T15:30:45.123Z"
}
```

### Health Check

```
GET /health
```

Response:

```json
{
    "status": "ok",
    "timestamp": "2023-09-21T15:30:45.123Z"
}
```

## Error Handling

The API returns appropriate HTTP status codes:

-   `200 OK` - The request was successful
-   `400 Bad Request` - Missing required parameters
-   `500 Internal Server Error` - Server-side errors

Error responses include an error message:

```json
{
    "error": "Failed to fetch weather data"
}
```

## Development

1. Run in development mode with hot reloading:

    ```bash
    npm run dev
    ```

2. Lint your code:

    ```bash
    npm run lint
    ```

3. Run tests:
    ```bash
    npm test
    ```

## Dependencies

-   **fastify**: Fast and low overhead web framework

## Scripts

-   `npm run dev`: Run the development server with nodemon
-   `npm run build`: Build the TypeScript code
-   `npm start`: Start the production server
-   `npm run lint`: Run ESLint checks
-   `npm test`: Run tests

## Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin feature/my-new-feature`
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

-   [OpenWeatherMap](https://openweathermap.org/) for providing the weather data API
-   [Fastify](https://www.fastify.io/) for the excellent web framework
-   [TypeScript](https://www.typescriptlang.org/) for type safety
