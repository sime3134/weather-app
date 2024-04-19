import { cookies } from "next/headers";
import HomeView from "./components/HomeView";

const getWeatherData = async (city) => {
  if (city) {
    const response = await fetch(
      `http://api.weatherapi.com/v1/forecast.json?key=3226c53da11f4dc996f142724231809&q=${city}&days=5&aqi=no&alerts=no`
    );

    if (!response.ok) {
      return;
    }

    return response.json();
  }
};

const getBackgroundImage = async (city) => {
  if (city) {
    const response = await fetch(
      `https://api.unsplash.com/photos/random?query=${city}&client_id=sp4PYBTZuQa_CXlLFIEpw8W4a8J6cqALuhgkHsFWNJs`
    );

    if (!response.ok) {
      return;
    }

    return response.json();
  }
};

export default async function Home() {
  const cookieStore = cookies();
  let city = cookieStore.get("lastCity")?.value ?? "";
  city !== "" && decodeURIComponent(city);
  const weatherData = await getWeatherData(city);
  const backgroundImage = await getBackgroundImage(city);
  return (
    <HomeView
      firstCity={city}
      firstImageUrl={backgroundImage?.urls.full}
      firstWeatherData={weatherData}
    />
  );
}
