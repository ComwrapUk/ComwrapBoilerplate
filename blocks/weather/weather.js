import { getSiteConfigVariables } from '../helpers.js';

class WeatherApi {
  #apiKey = '';

  #baseUrl = 'api.weatherapi.com/v1';

  #endpoints = {
    forecast: '/forecast.json',
  };

  constructor (apiKey) {
    this.#apiKey = apiKey;
  }

  #buildEndpoint(endpoint) {
    return `https://${this.#baseUrl}${endpoint}`;
  }

  /**
   * Get forecast API
   * @param {string} cityName The city name in English
   * @param {number} numDays
   * @param {string} lang
   * @returns {Promise<ForecastResponse>}
   */
  async getForecast(cityName, numDays, lang) {
    const url = new URL(this.#buildEndpoint(this.#endpoints.forecast));
    url.searchParams.append('q', cityName);
    url.searchParams.append('days', numDays);
    url.searchParams.append('lang', lang);
    url.searchParams.append('key', this.#apiKey);
    const resp = await fetch(url);
    return resp.json();
  }
}

/**
 * Get weather API instance
 * @returns {Promise<WeatherApi>}
 */
async function getWeatherApi() {
  const variables = await getSiteConfigVariables();
  const apiKey = variables['$system:weatherapi$'];
  const weatherApi = new WeatherApi(apiKey);
  return weatherApi;
}

/**
 * Formats a date
 * @param {string} date 'yyyy-mm-dd'
 * @returns {string} a formatted date 'dd-mm-yyyy'
 */
function formatDate(date) {
  if (!date) return '';
  return date.split('-').reverse().join('/');
}

/** @param {HTMLDivElement} block */
export default async function decorate(block) {
  // read block config
  /**
   * @type {{
   *   title: string;
   *   city: string;
   *   lang: string;
   *   min?: string;
   *   max?: string;
   * }}
   */
  const config = [...block.children]
    .map((row) => [...row.children].map((col) => col.innerText?.trim()))
    .reduce((acc, [k, v]) => ({ ...acc, [k]: v }), {});
  const { title, city, lang } = config;
  const numDays = 3;

  const weatherApi = await getWeatherApi();
  const weatherData = await weatherApi.getForecast(city, numDays, lang);

  block.textContent = '';
  /* eslint-disable indent */
  block.insertAdjacentHTML(
    'beforeend',
    `<div class="weather-container">
        <div class="weather-title">${title || ''}</div>
        <div class="weather-city">${city}</div>
        <div class="weather-forecast-container">
            ${Array.from(Array(numDays).keys()).map((index) => `<div class="weather-card">
                <div class="weather-day">
                    ${formatDate(weatherData.forecast.forecastday[index].date)}</div>
                <div class="weather-image">
                    <img
                        src='${`https:${weatherData.forecast.forecastday[index].day.condition.icon}`}'
                        alt="${weatherData.forecast.forecastday[index].day.condition.text}">
                </div>
                <div>
                    <div>${config.min || 'Min.'} ${weatherData.forecast.forecastday[index].day.mintemp_c}°C</div>
                    <div>${config.max || 'Max.'} ${weatherData.forecast.forecastday[index].day.maxtemp_c}°C</div>
                </div>
                <div>${weatherData.forecast.forecastday[index].day.condition.text}</div>
            </div>`).join('')}
        </div>
    </div>`,
  );
}

/**
 * @typedef {Object} ForecastResponse
 * @property {Current} current
 * @property {{
 *   forecastday: ForecastItem[],
 * }} forecast
 */

/**
 * @typedef {Object} Current
 * @property {Condition} condition
 * @property {string} last_updated
 * @property {number} temp_c
 */

/**
 * @typedef {Object} ForecastItem
 * @property {string} date The date in 'yyyy-MM-dd' or 'yyyy-MM-dd hh:mm' format
 * @property {Day} day
 * @property {HourItem[]} hour
 */

/**
 * @typedef {Object} Day
 * @property {Condition} condition
 * @property {number} mintemp_c
 * @property {number} maxtemp_c
 */

/**
 * @typedef {Object} Condition
 * @property {string} text
 * @property {string} icon
 */

/**
 * @typedef {HourItem}
 * @property {number} time_epoch
 * @property {string} time
 * @property {number} temp_c
 * @property {Condition} condition
 */
