const backgroundImages = [
    "dominic-chasse-BoYBcsGLSbQ-unsplash.jpg",
    "andreas-slotosch-DOsTcysjCkM-unsplash.jpg",
    "daniil-silantev-w4Y8kT_h_sk-unsplash.jpg",
    "egor-litvinov-AHMMIaOr9SQ-unsplash.jpg",
    "frames-for-your-heart-3ZkrkoYzybU-unsplash.jpg",
    "gilley-aguilar-TMj6GYRGnHI-unsplash.jpg",
    "graham-holtshausen-mchGuXktqAs-unsplash.jpg",
    "harrison-steen-S8NAfbSnEAY-unsplash.jpg",
    "igor-sporynin-CMaXEdq5OKo-unsplash.jpg",
    "igor-sporynin-DMNyJtN8bvE-unsplash.jpg",
    "ivan-cheremisin-ArQeCkEp59s-unsplash.jpg",
    "joshua-kettle-IADgzdyI7Ls-unsplash.jpg",
    "kjell-jostein-sivertsen-YXFjzvz7Bjg-unsplash.jpg",
    "lorin-both-Z9W7EBprj5Y-unsplash.jpg",
    "marco-d-abramo-4WHTdxG5t1c-unsplash.jpg",
    "martijn-vonk-zgxtbI8et3I-unsplash (1).jpg",
    "martin-siblik-Xj4wPot_HEI-unsplash.jpg",
    "mateusz-bajdak-MugHtF8WHAQ-unsplash.jpg",
    "matias-north-YRw7QL_vOL4-unsplash.jpg",
    "musa-ortac-tdnk-Y-07-8-unsplash.jpg",
    "nora-jane-long-vyjnV-2J0Lw-unsplash.jpg",
    "paulina-herpel-du1UwrRpNtA-unsplash.jpg",
    "peter-thomas-U_Gk-FmUzaQ-unsplash.jpg",
    "simon-humler-tQuVoOkniPo-unsplash.jpg",
    "slava-auchynnikau-5Y3TYuVHGRU-unsplash.jpg",
    "slava-auchynnikau-DdjQaVxAqRA-unsplash.jpg",
    "the-now-time-uyNRcKvfJfQ-unsplash.jpg",
    "tiago-ferreira-IEECr_dsg5c-unsplash.jpg",
    "tim-huang-KJcpt9t0pus-unsplash.jpg",
    "tolga-ahmetler-3rTUHr0cm_k-unsplash.jpg",
    "willian-justen-de-vasconcellos-vPBBpj6fLW0-unsplash.jpg",
    "wolfgang-hasselmann-o-bm7aE35g4-unsplash.jpg",
    "zhenyu-luo-7wOwcg9M5Fk-unsplash.jpg",
    "zhenyu-luo-F0RCtMTAgzQ-unsplash.jpg"
];

let currentImageIndex = 0;

function changeBackgroundImage() {
    const selectedImage = backgroundImages[Math.floor(Math.random() * backgroundImages.length)];
    document.documentElement.style.background = `url('./background-images/${selectedImage}') no-repeat center center fixed`;
    document.documentElement.style.transition = "background-image 1.5s ease-in-out";  // Smooth transition

    currentImageIndex = (currentImageIndex + 1) % backgroundImages.length;
}


changeBackgroundImage();


setInterval(changeBackgroundImage, 5000);

const searchBtn = document.querySelector(".search-btn");
const searchInput = document.querySelector(".search");
const weatherContainer = document.querySelector(".weather-container");


const getWeatherData = async (city) => {
  const apiKey = "83ff668fec7f74c3ca7469d8e45dc14e";
  const weatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  const forecastApiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

  try {

    const weatherResponse = await fetch(weatherApiUrl);
    const weatherData = await weatherResponse.json();

   
    const forecastResponse = await fetch(forecastApiUrl);
    const forecastData = await forecastResponse.json();

    displayWeather(weatherData, forecastData);
  } catch (error) {
    console.error("Error fetching weather data:", error);
    alert("Unable to retrieve weather information.");
  }
};

// Function to display weather and forecast data
const displayWeather = (weatherData, forecastData) => {
  const { name } = weatherData;
  const { icon, description } = weatherData.weather[0];
  const currentTemp = (weatherData.main.temp).toFixed(1);

  // Display current weather with icon and description
  weatherContainer.innerHTML = `
  <h2>${name}</h2>
  <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="${description}" />
  <p>Temperature: ${currentTemp} °C</p>
  <p>${description}</p>
  <h3>5-Day Forecast</h3>
  <div class="forecast-container">
    ${forecastData.list
      .filter(day => day.dt_txt.includes("12:00:00")) // Get only forecasts for 12:00 PM
      .map(day => {
        const forecastDate = new Date(day.dt_txt);

        // Format date as DD/MM/YYYY
        const dayNum = String(forecastDate.getDate()).padStart(2, "0");
        const month = String(forecastDate.getMonth() + 1).padStart(2, "0");
        const year = forecastDate.getFullYear();
        const formattedDate = `${dayNum}/${month}/${year}`;

        return `
          <div class="forecast-day">
            <p>${formattedDate}</p>
            <img src="https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png" alt="${day.weather[0].description}" />
            <p>${(day.main.temp).toFixed(1)} °C</p>
          </div>
        `;
      })
      .join("")}
  </div>
`;
};


searchBtn.addEventListener("click", () => {
const city = searchInput.value.trim();
if (city) {
  getWeatherData(city);
} else {
  alert("Please enter a city name.");
}
});


const locationBtn = document.querySelector(".location-btn");

// Event listener for the Find Location button
locationBtn.addEventListener("click", () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                // Call the existing getWeatherByLocation function
                getWeatherByLocation(latitude, longitude);
            },
            (error) => {
                console.error("Geolocation error:", error);
                alert("Unable to access your location. Please allow location access.");
            }
        );
    } else {
        alert("Geolocation is not supported by your browser.");
    }
});

const getWeatherByLocation = async (lat, lon) => {
    const apiKey = "83ff668fec7f74c3ca7469d8e45dc14e";
    const weatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
    const forecastApiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

    try {
        const weatherResponse = await fetch(weatherApiUrl);
        const weatherData = await weatherResponse.json();

        const forecastResponse = await fetch(forecastApiUrl);
        const forecastData = await forecastResponse.json();

       
        displayWeather(weatherData, forecastData);
    } catch (error) {
        console.error("Error fetching weather data:", error);
        alert("Unable to retrieve weather information.");
    }
};


    // Update the weather container with current and forecast weather
    weatherContainer.innerHTML = `
        <h2>${name}</h2>
        <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="${description}" />
        <p>Temperature: ${currentTemp} °C</p>
        <p>${description}</p>
        <h3>5-Day Forecast</h3>
        <div class="forecast-container">
          ${forecastData.list.map(day => {
              const date = new Date(day.dt_txt).toLocaleDateString('en-GB'); // Format: DD/MM/YYYY
              return `
                <div class="forecast-day">
                    <p>${date}</p>
                    <img src="https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png" alt="${day.weather[0].description}" />
                    <p>${(day.main.temp).toFixed(1)} °C</p>
                </div>
              `;
          }).join('')}
        </div>
    `;