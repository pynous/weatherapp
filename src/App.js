import React, { Component } from 'react'
import './App.css';
import Weather from './Components/Weather';
import 'bootstrap/dist/css/bootstrap.min.css';
import "weather-icons/css/weather-icons.css";
import Form from './Components/Form';
//api.openweathermap.org/data/2.5/weather?q=London,uk

const API_KEY = '7f7899af677d007e381ccdf6057af504';



export default class App extends Component {
 constructor(){
   super();
   this.state = {
     city: undefined,
     country: undefined,
     icon: undefined,
     main: undefined,
     celsius: undefined,
     temp_max: undefined,
     temp_min: undefined,
     description: "",
     error: false
   };
   this.getWeather();
  
   this.weatherIcon = {
      Thunderstrom: "wi-thunderstorm",
      Drizzle: "wi-sleet",
      Rain: "wi-storm-showers",
      Snow: "wi-snow",
      Atmosphere: "wi-fog",
      Clear: "wi-day-sunny",
      Clouds: "wi-day-fog"
   }

 }

 toCelsius(temp){
   let cel = Math.floor(temp - 273.15);
   return cel;
 }

 get_WeatherIcon(icons, rangeId){
   switch(true){
     case rangeId >= 200 && rangeId <=232:
       this.setState({icon: this.weatherIcon.Thunderstrom});
       break;
     case rangeId >= 300 && rangeId <=321:
       this.setState({icon: this.weatherIcon.Drizzle});
       break;
     case rangeId >= 500 && rangeId <=531:
        this.setState({icon: this.weatherIcon.Rain});
        break;
     case rangeId >= 600 && rangeId <=622:
       this.setState({icon: this.weatherIcon.Snow});
       break;
   case rangeId >= 701 && rangeId <=781:
        this.setState({icon: this.weatherIcon.Atmosphere});
        break;
    case rangeId === 800:
        this.setState({icon: this.weatherIcon.Clear});
        break;
    case rangeId >= 801 && rangeId <=804:
      this.setState({icon: this.weatherIcon.Clouds});
      break;
    default:
      this.setState({icon: this.weatherIcon.Clouds});
   }
 }

 getWeather = async e => {
   
  e.preventDefault();

  const city = e.target.elements.city.value;
  const country = e.target.elements.country.value;
  
  if(city&&country){

   const api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}`
   );
   const response = await api_call.json();
  
   console.log(response);

  this.setState({
    city: `${response.name},${response.sys.country}`,
    icon: this.weatherIcon.Thunderstrom,
    main: undefined,
    celsius: this.toCelsius(response.main.temp),
    temp_max: this.toCelsius(response.main.temp_max),
    temp_min: this.toCelsius(response.main.temp_min),
    description: response.weather[0].description,
    error: false
  });
  
  this.get_WeatherIcon(this.weatherIcon,response.weather[0].id);
}else {
    this.setState({error : true});
}


 }

  render(){
    return (
      <div className="App">
        
       <Form loadweather={this.getWeather} error={this.state.error}/>
      <Weather 
      city={this.state.city} 
      country={this.state.country} 
      temp_celsius={this.state.celsius}
      temp_max={this.state.temp_max}
      temp_min={this.state.temp_min}
      description={this.state.description}
      weatherIcon={this.state.icon}
      />
      

    </div>
    )
  }
}



