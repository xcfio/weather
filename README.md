# Weather API with Fastify

A simple weather API built with Fastify 5.x.x, TypeScript, and Node.js 24. This API integrates with OpenWeatherMap to provide current weather data and forecasts.

## Features

-   Get current weather data for any location
-   Get 5-day weather forecast for any location
-   Built with Fastify 5.x.x for high performance
-   Type-safe with TypeScript
-   Efficient error handling
-   Automatic input validation
-   API documentation with JSON Schema

## Prerequisites

-   Node.js 24.x or higher
-   An OpenWeatherMap API key (get one for free at [OpenWeatherMap](https://openweathermap.org/api))

## Installation

1. Clone the repository or set up your project
2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the project root with your OpenWeatherMap API key:

```
OPENWEATHER_API_KEY=your_api_key_here
PORT=3000
```

## Usage

Start the server:

```bash
npm start
```

The server will start on the port specified in your `.env` file (default: 3000).

## API Endpoints

### Health Check

```
GET /status
```

Response:

```json
{
    "status": "ok"
}
```

### Get Current Weather

```
GET /api/weather?location={city_name}
```

Example:

```
GET /api/weather?location=London
```

Response:

```json
{
    "location": "London",
    "country": "GB",
    "temperature": 15.2,
    "description": "scattered clouds",
    "feelsLike": 14.8,
    "humidity": 76,
    "windSpeed": 4.12,
    "timestamp": 1683559564
}
```

### Get Weather Forecast (5 days)

```
GET /api/forecast?location={city_name}
```

Example:

```
GET /api/forecast?location=Tokyo
```

Response:

```json
{
    "location": "Tokyo",
    "country": "JP",
    "forecast": [
        {
            "time": "2025-05-18T06:00:00.000Z",
            "temperature": 21.6,
            "description": "clear sky",
            "humidity": 65,
            "windSpeed": 2.24
        },
        {
            "time": "2025-05-18T09:00:00.000Z",
            "temperature": 22.1,
            "description": "few clouds",
            "humidity": 68,
            "windSpeed": 3.15
        }
    ]
}
```

## Error Handling

The API returns appropriate HTTP status codes with error messages:

-   `400` - Bad Request (e.g., missing location parameter)
-   `500` - Internal Server Error (e.g., OpenWeatherMap API issues)

Example error response:

```json
{
    "error": "Failed to fetch weather data: Location not found"
}
```

## Dependencies

-   `fastify`: Web framework for API
-   `@sinclair/typebox`: JSON Schema Type Builder

## Project Structure

-   `src/index.ts`: Main application file with all routes and logic

## Environment Variables

| Variable            | Description                 | Default    |
| ------------------- | --------------------------- | ---------- |
| OPENWEATHER_API_KEY | Your OpenWeatherMap API key | (required) |

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
