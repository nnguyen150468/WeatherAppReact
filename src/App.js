// import React, {useEffect}, {useState} from 'react';
// import './App.css';

// function App(lat, lon) {
//   let [weather, setWeather] = useState(null);

//   let currentWeather = () => {
//     const api_key = '';
//     let url = `api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}`
//     let data = await fetch(url);
//     let result = await data.json();

//     console.log("result", result);
//     setWeather(result);
//   }

//   let getLocation = () => {
//     navigator.geolocation.getCurrentPosition((position) => {currentWeather(position.coords.latitude,position.coords.longitude)} )
//   }

//   useEffect(getLocation, []); //will call the function when we 

//   return (
//     <div>
//      <h1>Weather</h1>
//      <h2>{weather && weather.name}</h2>
//   <h3>Temperature {weather && weather.main.temp}</h3>
//   <p>weather description {weather && weather.weather[0].description}</p>
//     </div>
//   );
// }

// export default App;

import React, {Component} from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';

// require('dotenv').config()
// console.log('api',process.env.REACT_APP_API_KEY);

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      locationName: null,
      isLoading: true
    }
  }
  //get API, this.setState(weather.)

  currentWeather = async(lat, lon) => {
    const api_key = '85ceedc7141ecd4a1ad9ed8d0913a567';

    let url = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${api_key}`
    let response = await fetch(url);
    let data = await response.json();
    console.log('api result:', data);
    this.setState({
      locationName: data.name,
      temperature: data.main.temp,
      description: data.weather[0].description,
      isLoading: false
    });
    console.log('locationName:', this.state.locationName,
    'temperature:', data.main.temp, 'description:', data.weather[0].description);
  }

  //getLocation() 
  getLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {this.currentWeather(position.coords.latitude,position.coords.longitude)})
  }


  componentDidMount(){
    this.getLocation();
  }
  

  render(){
    return this.state.isLoading? (<h1 className="text-center text-white my-5">I am coming &#128521;</h1>) : (
      <div className="container-fluid my-auto text-white">
        <div className="container mx-auto my-4 py-4">
          <div className="row justify-content-center text-center">
            <h1 className="col-12 display-4 my-2 py-3 text-success">
              Awesome Weather App
            </h1>
            <h2 className="col-12">{this.state.locationName}</h2>
            <h3 className="col-12 text-danger">{this.state.temperature}&#8451; / {this.state.temperature*9/5+32}&#8457; </h3>
            <h3 className="col-12">{this.state.description}</h3>
          </div>
        </div>
      </div>
    )
  }
}

export default App;