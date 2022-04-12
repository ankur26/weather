import './style.css';
import { locationHelper } from './location';

const DOMcontrols = ( () => {
    let container = document.querySelector('.container');
    let locationForm = document.getElementById('location-form');
    let cityAutocomplete = document.getElementById('cities');
    let locationInput = document.getElementById('location');

    function getWeatherData(event){
        event.preventDefault();
        console.log("Weather data fetch");
    }
    function popuplateCitySuggestions(cities){
        cityAutocomplete.innerHTML = '';
        cities.forEach(city => {
            let element = document.createElement("option");
            element.setAttribute("value",city);
            cityAutocomplete.appendChild(element);
        });
    }
    function suggestLocation(){
        if(this.value.length > 3){
            let results = locationHelper.query(this.value);
            if(results){
                popuplateCitySuggestions(results);
            }
        }
    }
    function initialize(){
        locationForm.addEventListener('submit',getWeatherData);
        locationInput.addEventListener('input',suggestLocation);
        locationHelper.initialize();
        // // locationHelper.display();
        // console.log(locationHelper.query("DElhi"));
    }
    return {initialize};
})();



DOMcontrols.initialize();

