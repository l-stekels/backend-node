import request from 'supertest';
import express from 'express';
import { getForecast } from '@controllers/forecast.controller';
import openWeatherMapApi from '@services/openWeatherMapApi.service';

// Mock openWeatherMapApi
jest.mock('@services/openWeatherMapApi.service', () => ({
    getForecast: jest.fn()
}));

const app = express();
app.use(express.json());
app.get('/forecast', getForecast);

describe('ForecastController', () => {
    it('should return forecast data', async () => {
        const mockApiData = require('@mocks/openWeatherMapApiResponse.json');
        const expectedData = require('@mocks/expectedResponse.json');
        (openWeatherMapApi.getForecast as jest.Mock).mockResolvedValue(mockApiData);

        const res = await request(app).get('/forecast?lat=40.7128&lon=74.0060');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual(expectedData);
    });
    it('should return 400 if lat and lon are missing', async () => {
        const res = await request(app).get('/forecast');
        expect(res.statusCode).toEqual(400);
        expect(res.body).toEqual({
            data: {
                forecast: null
            },
            errors: [
                {
                    message: 'Missing required query parameters: lat and lon',
                    error: null
                }
            ]
        });
    });
    it('should return openWeatherAPI error if lat or long invalid', async () => {
        const mockApiData = require('@mocks/openWeatherMapApiResponse.400.json');
        const expectedData = require('@mocks/expectedResponse.json');
        (openWeatherMapApi.getForecast as jest.Mock).mockRejectedValue(mockApiData);

        const res = await request(app).get('/forecast?lat=40.7128&lon=74.0060');
        expect(res.statusCode).toEqual(400);
        expect(res.body).toEqual({
            data: {
                forecast: null
            },
            errors: [
                {
                    message: 'An error occurred while fetching the forecast',
                    error: {
                        cod: '400',
                        message: 'wrong latitude',
                    }
                }
            ]
        });
    })
});