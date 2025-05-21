# Weather API with Fastify

[![Code Test](https://github.com/xcfio/weather/actions/workflows/test.yaml/badge.svg)](https://github.com/xcfio/weather/actions/workflows/test.yaml)
[![Netlify Status](https://api.netlify.com/api/v1/badges/26c45a6b-3628-40cb-9f15-2ae2d2961b2f/deploy-status)](https://app.netlify.com/projects/weather-xcfio/deploys)
[![Node.js Version](https://img.shields.io/badge/node-24.x-brightgreen.svg)](https://nodejs.org/)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Fastify](https://img.shields.io/badge/Fastify-5.x-202020?logo=fastify)](https://www.fastify.io/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Package Manager](https://img.shields.io/badge/pnpm-latest-orange?logo=pnpm)](https://pnpm.io/)
[![OpenWeatherMap](https://img.shields.io/badge/Powered%20by-OpenWeatherMap-orange)](https://openweathermap.org/)
[![Support on Patreon](https://img.shields.io/badge/Sponsor-Patreon-red?logo=patreon)](https://www.patreon.com/xcfio)
[![Time](https://wakatime.com/badge/user/80f5dbf4-7bff-4748-82c6-2a8a3f3ec1c0/project/c479f987-f2fb-4fbf-a8ac-ef471f96a737.svg)](https://wakatime.com/badge/user/80f5dbf4-7bff-4748-82c6-2a8a3f3ec1c0/project/c479f987-f2fb-4fbf-a8ac-ef471f96a737)

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
pnpm install
```

3. Create a `.env` file in the project root with your OpenWeatherMap API key:

```
OPENWEATHER_API_KEY=your_api_key_here
```

## Usage

Start the server:

```bash
node --run dev
```

The server will start on the port 8080

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

-   `fastify`: High-performance web framework for building APIs
-   `@fastify/cors`: CORS support for Fastify
-   `@sinclair/typebox`: JSON Schema Type Builder with TypeScript support
-   `@netlify/functions`: Netlify serverless functions integration
-   `serverless-http`: HTTP adapter for serverless environments

## Project Structure

-   `netlify/`: Serverless function configuration
-   `src/`
    -   `functions/`
        -   `coordinates.ts`: Location coordinates lookup
    -   `routes/`
        -   `forecast.ts`: 5-day forecast endpoint handler
        -   `weather.ts`: Current weather endpoint handler
    -   `index.ts`: Server setup and route registration
    -   `type.ts`: TypeScript types and JSON schemas

## Environment Variables

| Variable            | Description                 | Default    |
| ------------------- | --------------------------- | ---------- |
| OPENWEATHER_API_KEY | Your OpenWeatherMap API key | (required) |

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the [MIT]("https://opensource.org/license/mit"). See the [LICENSE](LICENSE) file for details.
