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

const getBackgroundImage = async (city) => {
  const response = await fetch(
    `https://api.unsplash.com/photos/random?query=${city}&client_id=sp4PYBTZuQa_CXlLFIEpw8W4a8J6cqALuhgkHsFWNJs`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch background image");
  }

  return response.json();
};

export default async function Home() {
  const city = "Malmö"; //Read from cookies later
  const weatherData = await getWeatherData(city);
  const backgroundImage = await getBackgroundImage(city);
  return (
    <HomeView
      firstCity={city}
      firstImageUrl={backgroundImage.urls.full}
      firstWeatherData={weatherData}
    />
  );
}
