import {ErrorResponse, OpenWeatherMapResponse} from "./openWeatherMapApi.types";
import axios from "axios";

const apiKey = process.env.API_KEY;

interface AxiosError {
    response?: {
        data: ErrorResponse;
    }
}

interface CacheItem {
    timestamp: number;
    data: OpenWeatherMapResponse;
}

class OpenWeatherMapApiService {
    #baseUrl = 'https://api.openweathermap.org/';
    #cache: Map<string, CacheItem> = new Map();

    #isCached = (key: string) => {
        const cacheEntry = this.#cache.get(key);
        if (cacheEntry !== undefined) {
            return Date.now() < this.#getNextUpdateTime(cacheEntry.timestamp);
        }

        return false;
    }

    #getNextUpdateTime = (timestamp: number): number => {
        const date = new Date(timestamp);
        const hours = date.getUTCHours();
        const nextUpdateHour = Math.ceil(hours / 3) * 3;
        date.setUTCHours(nextUpdateHour, 0, 0, 0);
        return date.getTime();
    }

    getForecast = async (lat: string, lon: string): Promise<OpenWeatherMapResponse> => {
        const url = `${this.#baseUrl}/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`;
        if (this.#isCached(url)) {
            // The value is guaranteed to be in the cache at this point because the above helper checks that
            return (this.#cache.get(url) as CacheItem).data;
        }
        try {
            const { data } = await axios.get<OpenWeatherMapResponse>(url);

            this.#cache.set(url, {timestamp: Date.now(), data});
            return data;
        } catch (error) {
            // Handle errors, if the error has data then it's an API error that can be forwarded to the caller
            // Otherwise log and throw a generic error
            const axiosError = error as AxiosError;
            if (axiosError.response && axiosError.response.data) {
                throw axiosError.response.data as ErrorResponse;
            }
            console.error('Error fetching data from OpenWeatherMap', error);
            throw {message: 'An error occurred while fetching the forecast', cod: '500'} as ErrorResponse;
        }
    }
}

export default new OpenWeatherMapApiService();
