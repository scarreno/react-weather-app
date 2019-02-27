import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ForecastItem from './ForecastItem';
import './styles.css';
import getForecastByCity from './../services/getForecastByCity';
import transformForecast from './../services/transformForecast';
/*
const data = {
    temperature: 10, 
    weatherState: 'normal', 
    humidity: 10, 
    wind: 'normal'
};

const days = [
    'Lunes',
    'Martes',
    'Miercoles',
    'Jueves',
    'Viernes'
];
*/

class ForecastExtended extends Component{

    constructor(){
        super();

        this.state = {
            forecastData: null
        };
    }

    componentDidMount(){
        this.updateCity(this.props.city);
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.city !== this.props.city){
            this.setState({forecastData: null});
            this.updateCity(nextProps.city);            
        }
    }
    updateCity = city => {
        const url_forecast = getForecastByCity(city);

        fetch(url_forecast).then(data=> (data.json()))
        .then(weather_data => {
            const forecastData = transformForecast(weather_data);

            this.setState({
                forecastData
            });
        });
    };

    renderForecastItemDays(forecastData){
        return (forecastData.map(item => 
            (
                <ForecastItem 
                    key={`${item.weekDay}${item.hour}`}
                    weekDay={item.weekDay} 
                    hour={item.hour} 
                    data={item.data}>
                </ForecastItem>
                )));
    };

    render(){
        const { city } = this.props;
        const { forecastData } = this.state;
        return (
            <div>
                <h2 className="forecast-title">
                    Pronostico extendido para {city}                    
                </h2>
                {forecastData ? this.renderForecastItemDays(forecastData): this.renderProgress()}
            </div>
            );
    }
    renderProgress = () => {
        return <h3>Cargando Pronóstico extendido...</h3>;
    }
}

ForecastExtended.propTypes = {
    city: PropTypes.string.isRequired
};

export default ForecastExtended;