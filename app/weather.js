const DHAKA_LATITUDE = 23.8103;
const DHAKA_LONGITUDE = 90.4125;

function updateCurrentDate() {
	const options = {
		weekday: "long",
		year: "numeric",
		month: "long",
		day: "numeric",
	};
	const now = new Date();
	document.getElementById("current-date").textContent = now.toLocaleDateString(
		"en-US",
		options
	);
}

function getWeatherIcon(code) {
	const iconMap = {
		0: "☀️",
		1: "🌤️",
		2: "⛅",
		3: "☁️",
		45: "🌫️",
		48: "🌫️",
		51: "🌦️",
		53: "🌦️",
		55: "🌧️",
		56: "🌧️",
		57: "🌧️",
		61: "🌧️",
		63: "🌧️",
		65: "🌧️",
		66: "🌧️",
		67: "🌧️",
		71: "❄️",
		73: "❄️",
		75: "❄️",
		77: "❄️",
		80: "🌧️",
		81: "🌧️",
		82: "🌧️",
		85: "❄️",
		86: "❄️",
		95: "⛈️",
		96: "⛈️",
		99: "⛈️",
	};
	return iconMap[code] || "🌈";
}

async function fetchWeather() {
	const url = `https://api.open-meteo.com/v1/forecast?latitude=${DHAKA_LATITUDE}&longitude=${DHAKA_LONGITUDE}&current=temperature_2m,relative_humidity_2m,weather_code&timezone=auto`;

	try {
		const response = await fetch(url);
		if (!response.ok) throw new Error("Weather data not available");
		const data = await response.json();
		displayWeather(data);
	} catch (error) {
		console.error("Error fetching weather data:", error);
		document.getElementById("weather-content").innerHTML = `
                    <div class="error">Failed to load weather data. Please try again later.</div>
                `;

		setTimeout(fetchWeather, 30000);
	}
}

function displayWeather(data) {
	const weatherContent = document.getElementById("weather-content");
	const current = data.current;
	const temp = Math.round(current.temperature_2m);
	const humidity = current.relative_humidity_2m;
	const weatherIcon = getWeatherIcon(current.weather_code);

	weatherContent.innerHTML = `
                <div class="weather-main">
                    <div class="temperature">${temp}°C</div>
                    <div class="weather-icon" style="font-size: 50px;">${weatherIcon}</div>
                </div>
                <div class="weather-details">
                    <div class="detail-item">
                        <img class="detail-icon" src="https://cdn-icons-png.flaticon.com/512/1582/1582886.png" alt="Humidity">
                        <div>${humidity}%</div>
                    </div>
                </div>
            `;
}

function initWidget() {
	updateCurrentDate();
	fetchWeather();

	setInterval(updateCurrentDate, 60000);

	setInterval(fetchWeather, 1800000);
}

window.onload = initWidget;
