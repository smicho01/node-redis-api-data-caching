import axios from "axios";

const API_KEY = '67cdf2b79e9ca4fe79b9f0b145f59f1e'
const cityEndpoint = (city) => `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`

const getWeather = async (city) => {
    let apiResponse = await axios.get(cityEndpoint(city))
    return {...apiResponse.data, 'source' : 'API'}
}

const city = 'London'
let weather = await getWeather(city)
console.log(weather)
