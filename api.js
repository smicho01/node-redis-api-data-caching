import axios from "axios";
import Redis from "ioredis";


const redis = new Redis({
    'port': 6379,
    'host': '127.0.0.1',
    'password': 'jshdf43t67_ywdh+g432i7fywhefugvytf&*'
})
const API_KEY = '67cdf2b79e9ca4fe79b9f0b145f59f1e'
const cityEndpoint = (city) => `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`

const getWeather = async (city) => {
    // Try if value exists in Redis cache & use it
    let cahceEntry = await redis.get(`weather:${city}`)
    // If Redist has that cached (cahce hit) ... return it
    if(cahceEntry) {
        cahceEntry = JSON.parse(cahceEntry)
        return {...cahceEntry, 'source' : 'Redis Cache'}
    }
    
    // ... No cache (cache miss) .... then get response from API
    let apiResponse = await axios.get(cityEndpoint(city))
    redis.set(`weather:${city}`, JSON.stringify(apiResponse.data), 'EX', 3600 ) // 1h cache
    return {...apiResponse.data, 'source' : 'API'}
}

const city = 'London'
const timeStart = new Date().getTime() // to calculate response time
let weather = await getWeather(city)
const timeEnd = new Date().getTime() // to calculate response time

weather.responseTime = `${timeEnd - timeStart}ms`

console.log(weather)
process.exit()