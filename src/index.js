import './style.css';
import { locationHelper } from './location';
import { DateTime } from "luxon";
import './style.css';

let apiKey = '0acdff13de270dada10b3efcc35c537b';
let units = 'metric';
let unit = '°C'
const DOMcontrols = (() => {
	let container = document.querySelector('.container');
	let locationForm = document.getElementById('location-form');
	let cityAutocomplete = document.getElementById('cities');
	let locationInput = document.getElementById('location');
    let today = document.querySelector('.today');
    let fiveday = document.querySelector('.five-day');
    let content = document.querySelector('.content');
	async function getWeatherData(event) {
		event.preventDefault();
		try {
            let responseCurrentWeather = await fetch(
				`https://api.openweathermap.org/data/2.5/weather?q=${locationInput.value}&units=${units}&appid=${apiKey}`
			);
            let currentWeatherdata = await responseCurrentWeather.json();
            // console.log(currentWeatherdata);
            let repsonse5DayWeather = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${currentWeatherdata.coord.lat}&lon=${currentWeatherdata.coord.lon}&exclude=current,minutely,hourly&units=${units}&appid=${apiKey}`);

            let fiveDayWeather = await repsonse5DayWeather.json();
            // console.log(fiveDayWeather);

            populateCurrentWeather(currentWeatherdata);
            populateFiveDayWeather(fiveDayWeather);
            locationInput.value = '';
            
		} catch (error) {
			console.log(error);
            showErrorMessage();
		}
	}
    function showErrorMessage(){
        today.classList.add('none');
        fiveday.classList.add('none');
        let error = document.createElement('h2');
        error.textContent= 'Something went wrong please try again';
        content.appendChild(error);
        setTimeout(()=>{content.removeChild(error)},5000);
    }
    function createFiveDayDiv(weather){
        let div = document.createElement('div');
        let text = document.createElement('p');
        
        text.innerHTML = `${DateTime.fromSeconds(parseInt(weather.dt)).toLocal().toLocaleString(DateTime.DATE_FULL)}: ${locationHelper.capitalize(weather.weather[0].description)}<img src="http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png"><br>Range:<span class="max">${weather.temp.max}${unit}</span> - <span class="min">${weather.temp.min}${unit}</span> `;
        
        div.appendChild(text);
        return div;

    }
    function populateFiveDayWeather(fiveDayWeather){
        // DateTime.fromSeconds(parseInt(weather.dt)).toLocal().toLocaleString(DateTime.DATE_FULL)
        fiveday.innerHTML = '<h2>Weather for next five days</h2>';
        console.log(fiveDayWeather);
        fiveDayWeather.daily.forEach((weather,index)=>{
            if(index >= 1 && index <= 5){
                let div = createFiveDayDiv(weather);
                fiveday.appendChild(div);
            }
        });
        fiveday.classList.remove('none');

    }
    function populateCurrentWeather(current){
        // let main = document.createElement('div');
        console.log(current);
        today.innerHTML = '';
        let city = document.createElement('h2');
        let temp = document.createElement('h3');
        let description = document.createElement('h3');
        let feelslike = document.createElement('p');
        let wind = document.createElement('p');
        let tempRange = document.createElement('p');
        
        city.textContent = `Weather for ${current.name}`;
        temp.textContent = `Current Temperature : ${parseFloat(current.main.temp)} ${unit}`;
        description.innerHTML = `Condition : ${locationHelper.capitalize(current.weather[0].description)} <img src="http://openweathermap.org/img/wn/${current.weather[0].icon}@2x.png">`;
        feelslike.textContent = `Feels like : ${parseFloat(current.main.feels_like)}${unit}`;
        wind.textContent = `Wind Speed : ${current.wind.speed} km/h`;
        tempRange.innerHTML = `Max : <span class="max">${current.main.temp_max}${unit}</span>, Min : <span class="min">${current.main.temp_min}${unit}</span>`;
        today
        today.appendChild(city);
        today.appendChild(temp);
        today.appendChild(description);
        today.appendChild(feelslike);
        today.appendChild(wind);
        today.appendChild(tempRange);
        today.classList.remove('none');
        // console.log(current);


    }

	function popuplateCitySuggestions(cities) {
		cityAutocomplete.innerHTML = '';
		cities.forEach((city) => {
			let element = document.createElement('option');
			element.setAttribute('value', city);
			cityAutocomplete.appendChild(element);
		});
	}
	function suggestLocation() {
		if (this.value.length > 3) {
			let results = locationHelper.query(this.value);
			if (results) {
				popuplateCitySuggestions(results);
			}
		} else {
			cityAutocomplete.innerHTML = '';
		}
	}
	function initialize() {
		locationForm.addEventListener('submit', getWeatherData);
		locationInput.addEventListener('input', suggestLocation);
		locationHelper.initialize();
		// // locationHelper.display();
		// console.log(locationHelper.query('DElhi'));
	}
	return { initialize };
})();

DOMcontrols.initialize();
