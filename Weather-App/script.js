let weather = {
    apiKey: "a59b0c6c7c35c1aa7fba645ad98329a4",
    fetchWeather: function (city) {
        fetch(
            "https://api.openweathermap.org/data/2.5/weather?q="
            + city 
            + "&units=metric&appid=" 
            + this.apiKey
        ).then((response) => response.json())
            .then((data) => this.displayWeather(data))
    },
    displayWeather: function(data) {
        const { name } = data;
        const { icon, description } = data.weather[0];
        const { temp, humidity } = data.main;
        const { speed } = data.wind;
        console.log(name, icon, description, temp, humidity, speed);
        document.querySelector(".city").innerText = "Weather in " + name;
        document.querySelector(".temperature").innerText = temp + "°C";
        document.querySelector(".description").innerText = description;
        document.querySelector(".icon").src = "http://openweathermap.org/img/wn/" + icon + ".png";
        document.querySelector(".humidity").innerText = "Humidity: " + humidity + "%";
        document.querySelector(".wind").innerText = "Wind speed: " + speed + "km/h";
        document.querySelector(".weather").classList.remove("loading");
        document.body.style.backgroundImage = "url('https://source.unsplash.com/1600x900/?" + name +"')"
    },
    search: function() {
        this.fetchWeather(document.querySelector(".search-bar").value);
    },
    fetchCities: function() {
        fetch("cities.txt") // Update the file path if needed
            .then((response) => response.text())
            .then((data) => this.populateCityList(data));
    },

    populateCityList: function(data) {
        const cityList = data.split("\n");
        const datalist = document.getElementById("cities");

        cityList.forEach((city) => {
            const option = document.createElement("option");
            option.value = city.trim();
            datalist.appendChild(option);
        });
    },
};

window.onload = function() {
    weather.fetchCities();
};

document.querySelector(".search button").addEventListener("click", function() {
    weather.search();
})

document.querySelector(".search-bar").addEventListener("keyup", function(event) {
    if (event.key == "Enter") {
        weather.search();
    }
})

document.querySelector(".search-bar").addEventListener("input", function() {
    const input = this.value.toLowerCase();
    const options = document.querySelectorAll("#cities option");

    options.forEach((option) => {
        if (option.value.toLowerCase().indexOf(input) !== -1) {
            option.style.display = "block";
        } else {
            option.style.display = "none";
        }
    });
});