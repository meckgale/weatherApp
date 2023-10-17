import _ from 'lodash';
import './reset.css';
import './style.css';

const condition = document.querySelector('.condition');
const city = document.querySelector('.city');
const country = document.querySelector('.country');
const localTime = document.querySelector('.localTime');
const temperature = document.querySelector('.temperature');
const feelTemp = document.querySelector('.feelTemp')
const windSpeed = document.querySelector('.windSpeed');
const humidity = document.querySelector('.humidity');
const errorName = document.querySelector('.errorName')

async function getData(name) {
    try {
        const response = await getCity(name);
        reset();
        if(response.status === 200) {
            const cityData = await response.json();
            condition.textContent = cityData.current.condition.text;
            city.textContent = cityData.location.name.toUpperCase();
            country.textContent = cityData.location.country;
            const localDate = cityData.location.localtime;
            localTime.textContent =  localDate.slice(11)
            temperature.textContent = cityData.current.temp_c + '°C';
            feelTemp.textContent = 'Feels Like: ' + cityData.current.feelslike_c + '°C';
            windSpeed.textContent = 'Wind: ' + cityData.current.wind_kph + 'km/h';
            humidity.textContent = 'Humidity: ' + cityData.current.humidity + '%';
        }
        else {
            const errorData = await response.json()
            errorName.textContent = errorData.error.message
        }

    } catch(error) {
        console.log(error);
    }
}

async function getCity(name) {
    if(name !== '') {
        return await fetch(`https://api.weatherapi.com/v1/current.json?key=eec4ea956b954c50a3e151037231710&q=${name}`, {mode: 'cors'})
    }
    else {
        return await fetch('https://api.weatherapi.com/v1/current.json?key=eec4ea956b954c50a3e151037231710&q=izmir', {mode: 'cors'})
    }
}

const input = document.querySelector('#search')
input.addEventListener('keydown', (event) => {
    if(event.key === 'Enter') {
        let name = input.value;
        getData(name);
    }
})

function reset() {
    condition.textContent = '';
    country.textContent = '';
    city.textContent = '';
    temperature.textContent = '';
    feelTemp.textContent = '';
    windSpeed.textContent = '';
    humidity.textContent = '';
    errorName.textContent = '';
}

getData(name);