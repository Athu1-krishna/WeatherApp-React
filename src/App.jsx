import React, { useState } from "react";
import "./App.css";

const App = () => {
  const [city, setCity] = useState("Kakkanad"); // Default city set to "Kakkanad"
  const [weatherData, setWeatherData] = useState(null); // for weather data storage
  const [error, setError] = useState("");

  const apiKey = "8ac5c4d57ba6a4b3dfcf622700447b1e"; // Your OpenWeatherMap API Key

  const fetchWeather = async () => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
      );
      const data = await response.json();

      if (data.cod === 200) {
        setWeatherData(data);
        setError(""); // Clear previous errors
      } else {
        setError("City not found!!!");
        setWeatherData(null);
      }
    } catch (error) {
      setError("Error fetching data.");
      setWeatherData(null);
    }
  };

  // Fetch weather data when the component mounts
  React.useEffect(() => {
    fetchWeather();
  }, [city]); // Call fetchWeather when city changes

  const handleInputChange = (e) => {
    setCity(e.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault(); // Prevent default form submission
    fetchWeather();
  };

  return (

    <div className="bg-[#20B2AA] h-screen flex justify-center align-top" >
      <div className="bg-[#008080] mt-40 h-2/4 text-white" style={{ maxWidth: "35%", boxShadow:'revert-layer'}}>
                <form className="flex justify-between" onSubmit={handleSearch}>
                  <input
                    type="text"
                    value={city}
                    onChange={handleInputChange}
                    placeholder="Enter city name"
                    className="border-none focus:outline-none w-60 p-2 text-md text-[#20B2AA]"
                  />
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-10  ">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                </svg>

                </form>
                <div className="flex justify-center mt-8">
                  {error && <p className="error text-red-700 text-2xl font-bold">{error}</p>}
                </div>
                <div className="flex justify-center mt-8">
                  <p className="font-semibold text-[16px]">{weatherData && (weatherData.name)}</p>
                </div>
                <div className="flex justify-center mt-12">
                 <p className="font-semibold text-[25px] lg:text-[40px]">{weatherData && (weatherData.main.temp)} <span className="text-[15px] lg:text-[30px]">°C</span> </p>
                </div>
                <div className="flex justify-center mt-8">
                  <p className="font-semibold text-[20px]">{weatherData && (weatherData.weather[0].main)}</p>
                </div>
                
                
      </div>
      <div className="bg-white mt-40  h-2/4" style={{maxWidth:"55%", opacity:'0.9' }}>
        <h2 className="text-2xl font-bold text-[#008080] p-8">Today's Highlight</h2>
        <div className="p-2 flex flex-col justify-start">
          <div className="grid grid-cols-2  gap-6">
            <div className="bg-[#008080] text-slate-200 flex flex-col w-45 justify-start items-center">
              <h3 className="text-sm mt-2">Wind Speed</h3>
              <div className="mt-2">
                <span className="lg:text-4xl text-2xl font-bold">{weatherData && (weatherData.wind.speed)}m/s</span>
              </div>
            </div>
            <div className="bg-[#008080] text-slate-200 flex flex-col w-45 justify-start items-center">
              <h3 className="text-sm mt-2">Humidity</h3>
              <div className="mt-2">
                <span className="lg:text-4xl text-2xl font-bold">{weatherData && (weatherData.main.humidity)} %</span>
              </div>
            </div>
            <div className="bg-[#008080] text-slate-200 flex flex-col w-45 justify-start items-center">
              <h3 className="text-sm mt-2">Visibility</h3>
              <div className="mt-2">
                <span className="lg:text-4xl text-2xl font-bold">{weatherData && (weatherData.visibility / 1000)} km</span>
              </div>
            </div>
            <div className="bg-[#008080] text-slate-200 flex flex-col w-45 justify-start items-center">
              <h3 className="text-sm mt-2">Feels Like</h3>
              <div className="mt-2">
                <span className="lg:text-4xl text-2xl font-bold">{weatherData && (weatherData.main.feels_like)}°C</span>
              </div>
            </div>
          </div>
   
          
        </div>
      </div>
    </div>
    
  );
};

export default App;