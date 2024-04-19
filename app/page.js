import HomeView from "./components/HomeView";

const getWeatherData = async (city) => {
  const response = await fetch(
    `http://api.weatherapi.com/v1/forecast.json?key=3226c53da11f4dc996f142724231809&q=${city}&days=5&aqi=no&alerts=no`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch weather data");
  }

  return response.json();
};

export default async function Home() {
  const city = "Malmö"; //Read from cookies later
  const weatherData = await getWeatherData(city);
  return (
    <HomeView imageUrl={backgroundImage.urls.full} weatherData={weatherData} />
  );
}
