import {ErrorResponse, List} from "../services/weatherForecast.types";

export interface ProcessedForecastItem {
    date: string;
    averageTemperature: number;
    data: List[];
}

export interface ProcessedForecast {
    forecast: ProcessedForecastItem[];
}

export interface ForecastError {
    message: string;
    error: ErrorResponse|null;
}

export interface GetForecastDto {
    lat: string;
    lon: string;
}