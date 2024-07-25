// Cards weather data
const getDayString = (dayString) => {
  const date = new Date(dayString);
  const daysOfWeek = ["Sun", "Mon", "Tues", "Wed", "Thu", "Fri", "Sat"];
  const dayIndex = date.getDay();

  return [daysOfWeek[dayIndex]];
};

// Utility function to update the DOM with weather data
const updateWeatherData = (fetchedData) => {
  const locationName = document.getElementById("locationname");
  const regionName = document.getElementById("regionName");
  const countryName = document.getElementById("countryName");
  const temperature = document.getElementById("temperature");
  const humidity = document.getElementById("humidity");
  const windspeed = document.getElementById("windspeed");
  const conditiontext = document.getElementById("conditiontext");
  const tempC = document.getElementById("tempC");
  const lastupdate = document.getElementById("lastupdate");

  // Extracting relevant data
  const location = fetchedData.location;
  const current = fetchedData.current;
  
  locationName.textContent = location.name;
  regionName.textContent = location.region;
  countryName.textContent = location.country;
  temperature.textContent = current.temp_c + "°C";
  tempC.textContent = current.temp_c + "°C";
  humidity.textContent = current.humidity + "%";
  windspeed.textContent = current.wind_kph + " Km/hr";
  conditiontext.textContent = current.condition.text;
  lastupdate.textContent ='Last-update : '+ current.last_updated;

  const defaultCloud = document.getElementById("defaultCloud");
  const cloudyImage = document.getElementById("cloudyImage");
  const rainyImage = document.getElementById("rainyImage");
  const clearImage = document.getElementById("clearImage");
  const sunnyImage = document.getElementById("sunnyImage");
  
  //Initially hide images
  rainyImage.classList.add("hidden");
  cloudyImage.classList.add("hidden");
  clearImage.classList.add("hidden");
  sunnyImage.classList.add("hidden");
  defaultCloud.classList.add("hidden");


  // Show the relevant image
  if (current.condition.text.toLowerCase().includes('rain')) {
    rainyImage.classList.remove("hidden");
  } else if (current.condition.text.toLowerCase().includes('cloud')) {
    cloudyImage.classList.remove("hidden");
  } else if (current.condition.text.toLowerCase().includes('clear')) {
    clearImage.classList.remove("hidden");
  }else if (current.condition.text.toLowerCase().includes('sun')) {
    sunnyImage.classList.remove("hidden");
  }else if (current.condition.text.toLowerCase().includes('driz')) {
    rainyImage.classList.remove("hidden");
  }else{
    defaultCloud.classList.remove("hidden");
  }

  // Update temperature data for each day
  fetchedData.forecast.forecastday.forEach((day) => {
    getDayString(day.date).forEach((element) => {
      document.querySelectorAll(".day-items").forEach((item) => {
        if (element == item.textContent) {
          item.nextElementSibling.textContent = day.day.maxtemp_c + "°C";
        }
      });
    });
  });
};

// Function to fetch weather data based on location
const fetchWeatherData = async (location) => {
  // const url = `https://weatherapi-com.p.rapidapi.com/current.json?q=${location}`;
  const url = `https://weatherapi-com.p.rapidapi.com/forecast.json?q=${location}&days=7`;
  const options = {
    method: "GET",
    headers: {
      "x-rapidapi-key": "77c3ff3281mshdebeee5a560b582p196f3djsn7a01e4b77f0a",
      "x-rapidapi-host": "weatherapi-com.p.rapidapi.com",
    },
  };

  try {
    const response = await fetch(url, options);
    if (response.ok) {
      const fetchedData = await response.json();
      updateWeatherData(fetchedData);
    } else {
      throw new Error("Location is not valid");
    }
  } catch (error) {
    alert(error.message);
  }
};

// Initial fetch for default location (Mumbai)
(() => {
  fetchWeatherData("Mumbai");
})();

// Event handler for finding weather based on user input
const findBtn = async () => {
  let inp = document.getElementById("inplocation");
  if (inp.value != "") {
    fetchWeatherData(inp.value);
    inp.value = "";
  }
};

// Update the date and day
(() => {
  const date = new Date();
  // Day script
  const dayOfWeekString = date.toLocaleDateString("default", {
    weekday: "long",
  });
  document.getElementById("day").textContent = dayOfWeekString;
  const monthString = date.toLocaleString("default", { month: "long" });
  document.getElementById(
    "date"
  ).textContent = `${date.getDate()} ${monthString} ${date.getFullYear()}`;

  // Day list script
  const splittedDayText = dayOfWeekString.slice(0, 3);
  const weatherList = document.querySelectorAll(".day-items");
  weatherList.forEach((e) => {
    if (e.textContent === splittedDayText) {
      e.parentElement.classList.add("bg-gray-200", "text-black");
    } else {
      e.parentElement.classList.remove("bg-gray-200", "text-black");
    }
  });
})();
