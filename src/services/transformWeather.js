import { SUN,
    CLOUD,
    RAIN,
    SNOW,
    THUNDER,
    DRIZZLE } from './../constants/weathers';
import convert from 'convert-units';

const getTemp = kelvin => {
    return Number(convert(kelvin).from('K').to('C').toFixed(0));
};

const getWeatherState = weather => {
    const { id } = weather;

    if (id < 300) {
        return THUNDER;
    } else if (id < 400) {
        return DRIZZLE;
    } else if (id < 500) {
        return RAIN;
    } else if (id < 700) {
        return SNOW;
    } else if (id === 800) {
        return SUN;
    }else{
        return CLOUD;
    }
};
const transformWeather = weatherData => {
    const { humidity, temp } = weatherData.main;
    const { speed } = weatherData.wind;
    const weatherState = getWeatherState(weatherData.weather[0]);
    const temperature = getTemp(temp);

    const data = {
        temperature,
        weatherState,
        humidity,
        wind: `${speed} m/s`
    };

    return data;
};

export default transformWeather;