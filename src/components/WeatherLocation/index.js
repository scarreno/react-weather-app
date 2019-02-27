import React, {Component} from 'react';
import Location from './Location';
import WeatherData from './WeatherData';
import './styles.css';
import transformWeather from './../../services/transformWeather';
import CircularProgress from '@material-ui/core/CircularProgress';
import { PropTypes } from 'prop-types';
import getUrlWeatherByCity from './../../services/getUrlWeatherByCity';

class WeatherLocation extends Component{

    constructor(props){
        super();

        const { city } = props;

        this.state = {
            city,
            data: null
        };
    }

    componentDidMount() {
        this.handleUpdateClick();
    }

    handleUpdateClick = () => {
        const api_url = getUrlWeatherByCity(this.state.city);

        fetch(api_url).then(resolve=> {
            return resolve.json();

        }).then(data => {
            const newWeather = transformWeather(data);

            this.setState({
                data: newWeather
            });
        });
    }
    render(){
        const {city, data} = this.state;
        const { onWeatherLocationClick } = this.props;

        return(            
            <div className="weatherLocationCont" onClick={onWeatherLocationClick}>
                <Location city={city}></Location>
                { data ? <WeatherData data={data}></WeatherData> : <CircularProgress/> }
            </div>
        );
    }
}

WeatherLocation.propTypes = {
    city: PropTypes.string.isRequired,
    onWeatherLocationClick: PropTypes.func
};

export default WeatherLocation;