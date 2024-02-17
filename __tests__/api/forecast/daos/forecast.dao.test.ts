import forecastDao from '@daos/forecast.dao';
import openWeatherMapApiService from '@services/openWeatherMapApi.service';

// Mock openWeatherMapApiService
jest.mock('@services/openWeatherMapApi.service', () => ({
    getForecast: jest.fn()
}));

describe('forecastDao', () => {
    it('should correctly convert raw API data', async () => {
        const rawApiData = require('@mocks/openWeatherMapApiResponse.json');
        const { data } = require('@mocks/expectedResponse.json');
        // Mock the return value of getForecast
        (openWeatherMapApiService.getForecast as jest.Mock).mockResolvedValue(rawApiData);

        const lat = '40.7128';
        const lon = '74.0060';
        const result = await forecastDao.get({ lat, lon });

        expect(result).toEqual(data);
    });
});