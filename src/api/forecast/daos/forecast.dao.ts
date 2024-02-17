import { GetForecastDto, ProcessedForecast, ProcessedForecastItem } from '../dto/forecast.dto';
import openWeatherMapApiService from "../services/openWeatherMapApi.service";

const KELVIN_TO_CELSIUS = 273.15;

class ForecastDao {
    #kelvinToCelsius = (kelvin: number): number => {
        return parseFloat((kelvin - KELVIN_TO_CELSIUS).toFixed(2));
    }

    async get(fields: GetForecastDto): Promise<ProcessedForecast> {
        try {
            const data = await openWeatherMapApiService.getForecast(fields.lat, fields.lon);
            // Set is a data structure that only allows unique values, if for some reason the API returned dates in a different order we would also need to sort them
            const dates = [...new Set(data.list.map(item => item.dt_txt.split(' ')[0]))].slice(0,3);

            // Group the data by day: keep items as a list and sum `main.temp`
            const groupedData = new Map<string, { items: ProcessedForecastItem['data']; totalTemp: number }>();
            for (let item of data.list) {
                const date = item.dt_txt.split(' ')[0];
                // Filter the data to only include 3 days, skip if the date is not in the list
                if (!dates.includes(date)) {
                  continue;
                }
              // Convert all the temperature data to Celsius, alternatively this could be done with API and passing ```units=metric``` as a query parameter
                const parsedItem = {
                    ...item,
                    main: {
                        ...item.main,
                        temp: this.#kelvinToCelsius(item.main.temp),
                        feels_like: this.#kelvinToCelsius(item.main.feels_like),
                        temp_min: this.#kelvinToCelsius(item.main.temp_min),
                        temp_max: this.#kelvinToCelsius(item.main.temp_max),
                    },
                };
                const savedGroup = groupedData.get(date) ?? {
                    totalTemp: 0,
                    items: [],
                };
                groupedData.set(date, {
                    totalTemp: savedGroup.totalTemp + parsedItem.main.temp,
                    items: [...savedGroup.items, parsedItem],
                });
            }
            // Calculate the average temperature for each day
            const processedForecast: ProcessedForecastItem[] = [];
            groupedData.forEach((group, date) => {
                processedForecast.push({
                    date,
                    averageTemperature: parseFloat((group.totalTemp / group.items.length).toFixed(2)),
                    data: group.items,
                } as ProcessedForecastItem);
            });

            return {forecast: processedForecast};
        } catch (error) {
            throw {message: "An error occurred while fetching the forecast", error: error};
        }
    }
}

export default new ForecastDao();
