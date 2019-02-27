import { url_base_forecast, api_key } from './../constants/api_url';

const getForecastByCity = city => {
    const api_forecast = `${url_base_forecast}?q=${city}&appid=${api_key}`;

    return api_forecast;
}

export default getForecastByCity;