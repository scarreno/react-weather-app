import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import LocationList from './components/LocationList';
import ForecastExtended from './components/ForecastExtended';
import './App.css';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core';
import { Grid, Row, Col } from 'react-flexbox-grid';
import { setCity } from './actions/';
import { connect } from 'react-redux';


const cities = [
  "Santiago,cl",
  "Buenos Aires,ar",
  "Cancún,mx",
  "Iquique,cl",
  "Sydney,au",
  "Lima,per",
  "Bogota,col",
  "Madrid,es"
]

const theme = createMuiTheme();

class App extends Component {

  constructor(){
    super();

    this.state = { city: null};
  }

  handleSelectedLocation = city => {
    this.setState({
      city
    });

    this.props.setCity(city);

  } ;

  render() {
    const { city }= this.state;
    return (
      <MuiThemeProvider theme={theme}>
      {/*} <Grid fluid>
              <Row>
                <h1>Grid System</h1>
              </Row>
              <Row>
                <h5>Las columnas muestran en la misma fila mientra sumen 12</h5>
              </Row>
              <Row>
                <Col xs={12} md={4} sm={6} lg={3}>
                  <div className="red"></div>
                </Col>
                <Col xs={12} md={4} sm={6} lg={3}>
                  <div className="blue"></div>
                </Col>
                <Col xs={12} md={4} sm={6} lg={3}>
                  <div className="green"></div>
                </Col>                
                <Col xs={12} md={4} sm={6} lg={3}>
                  <div className="yellow"></div>
                </Col>                                
              </Row>
            </Grid>
        */}
          <Grid>
            <Row>
              <AppBar position="sticky">
                <Toolbar>
                  <Typography variant="title" color="inherit">
                    Weather
                  </Typography>
                </Toolbar>
              </AppBar>

            </Row>
            <Row>
              <Col xs={12} md={6}>
                <LocationList 
                  cities={cities}
                  onSelectedLocation={this.handleSelectedLocation}/>
              </Col>              
              <Col xs={12} md={6}>
                <Paper elevation={4}>
                  <div className="details">
                    {
                      !city?
                        <h1>No se ha seleccionado ninguna ciudad</h1>:
                        <ForecastExtended city={city}></ForecastExtended>
                    }                    
                  </div>
                </Paper>                
              </Col>
            </Row>
          </Grid>            
      </MuiThemeProvider>

    );
  }
}

const mapDispatchToPropsActions = dispatch => ({
  setCity: value => dispatch(setCity(value))
});

const AppConnected = connect(null,mapDispatchToPropsActions)(App);

export default AppConnected;
