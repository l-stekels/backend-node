import express from 'express';
import forecastDao from "../daos/forecast.dao";

export async function getForecast(req: express.Request, res: express.Response) {
    const { lat, lon } = req.query;
    if (typeof lat !== 'string' || typeof lon !== 'string') {
        return res.status(400).send({
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
    }
    try {
        const forecast = await forecastDao.get({lat, lon});
        return res.status(200).send({
            data: forecast,
            errors: []
        });
    } catch (e) {
        return res.status(400).send({
            data: { forecast: null },
            errors: [e]
        });
    }
}
