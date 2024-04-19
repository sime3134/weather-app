"use client";

import {
  Box,
  Button,
  Card,
  CardContent,
  FormControl,
  FormHelperText,
  FormLabel,
  Grid,
  Input,
  Modal,
  ModalDialog,
  Sheet,
  Stack,
  SvgIcon,
  Typography,
} from "@mui/joy";
import Image from "next/image";
import { formatRelative } from "date-fns";
import { useState } from "react";

// Client component for the Home page
export default function HomeView({
  firstCity,
  firstImageUrl,
  firstWeatherData,
}) {
  const [open, setOpen] = useState(false); // Modal open state
  const [weatherData, setWeatherData] = useState(firstWeatherData); // Weather data state
  const [cityName, setCityName] = useState(firstCity); // City name state
  const [inputCity, setInputCity] = useState(""); // Input city state
  const [imageUrl, setImageUrl] = useState(firstImageUrl); // Current background image
  const [error, setError] = useState(null); // Errors for city input

  /**
   * Fetch and update weather data from weatherapi.com
   * @param {String} newCity
   * @returns true if successful, false otherwise
   */
  const getNewWeatherData = async (newCity) => {
    const response = await fetch("/api/v1/weather?city=" + newCity, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok || response.status === 404) {
      setError("City not found");
      return false;
    }

    const newWeatherData = await response.json();
    setError(null);
    setWeatherData(newWeatherData);
    return true;
  };

  /**
   * Fetch and update background image from unsplash.com
   * @param {String} newCity
   */
  const getNewBackgroundImage = async (newCity) => {
    const response = await fetch("/api/v1/image?city=" + newCity, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok || response.status === 404) {
      throw new Error("Failed to fetch background image");
    }

    const newBackgroundImage = await response.json();
    setImageUrl(newBackgroundImage.urls.full);
  };

  /**
   * Get relative date from two dates. For example "Today", "Yesterday", "2 days ago".
   * @param {Date} date
   * @returns Relatve date string
   */
  const getRelativeDate = (date) => {
    const index = formatRelative(date, new Date()).indexOf("at");
    return formatRelative(date, new Date()).slice(0, index);
  };

  /**
   * Handle input change for city input
   * @param {Event} event
   */
  const handleInputChange = (event) => {
    setInputCity(event.target.value);
  };

  /**
   * Handle form submit for city input
   * @param {Event} event
   */
  const handleSubmit = async (event) => {
    event.preventDefault();
    const success = await getNewWeatherData(inputCity);
    if (success) {
      getNewBackgroundImage(inputCity);
      setCityName(inputCity);
      document.cookie = `lastCity=${encodeURIComponent(inputCity)}; path=/;`;
      setOpen(false);
    }
  };

  return (
    <>
      <Box height="100vh">
        <Box
          width="100vw"
          height="100vh"
          minHeight="400px"
          position="absolute"
          sx={{
            flexBasis: { xs: "30%", md: "70%" },
            backgroundImage: `url(${
              imageUrl ??
              "https://images.unsplash.com/photo-1580193769210-b8d1c049a7d9?q=80&w=3548&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            })`,
            backgroundSize: "cover",
          }}
        >
          <Sheet
            sx={{
              marginTop: "20px",
              maxWidth: "fit-content",
              padding: "20px",
              boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
              backdropFilter: "blur(5px)",
              border: "1px solid rgba(255, 255, 255, 0.3)",
              background: "rgba(31, 122, 31, 0.4)",
            }}
          >
            <Typography sx={{ color: "#FFF" }} level="h1">
              WeatherApp
            </Typography>
          </Sheet>
          <Sheet
            sx={{
              marginTop: "20px",
              maxWidth: "fit-content",
              padding: "20px",
              float: "right",
              boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
              backdropFilter: "blur(5px)",
              border: "1px solid rgba(255, 255, 255, 0.3)",
              background: "rgba(31, 122, 31, 0.4)",
            }}
          >
            <Typography sx={{ color: "#FFF" }} level="h1">
              <Button onClick={() => setOpen(true)} variant="plain">
                <SvgIcon size="lg">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="#FFF"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                    />
                  </svg>
                </SvgIcon>{" "}
              </Button>
              {cityName === "" || !weatherData
                ? "<-- Add a City Here"
                : cityName}
            </Typography>
          </Sheet>
        </Box>
        {(cityName !== "" || !weatherData) && (
          <Box
            sx={{
              flexBasis: { xs: "70%", md: "30%" },
              width: "100%",
              position: "absolute",
              bottom: 0,
              background: "rgba(31, 122, 31, 0.2)",
              boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
              backdropFilter: "blur(5px)",
              border: "1px solid rgba(255, 255, 255, 0.3)",
            }}
          >
            <Grid
              container
              height="100%"
              justifyContent="space-around"
              alignItems="center"
            >
              <Grid xs={12} sm={6} md={3}>
                <Card
                  sx={{
                    margin: "15px 15px",
                    boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
                    backdropFilter: "blur(5px)",
                    border: "1px solid rgba(255, 255, 255, 0.3)",
                    background: "rgba(31, 122, 31, 0.2)",
                  }}
                  variant="solid"
                >
                  <CardContent
                    orientation="horizontal"
                    sx={{ justifyContent: "center" }}
                  >
                    {weatherData && (
                      <Image
                        src={`https:${weatherData?.current.condition.icon}`}
                        alt="weather icon"
                        width={80}
                        height={80}
                      />
                    )}
                  </CardContent>
                  <CardContent>
                    <Typography
                      sx={{ color: "#FFF" }}
                      textAlign="center"
                      level="h3"
                    >
                      current
                    </Typography>
                    <Typography
                      sx={{ color: "#FFF" }}
                      textAlign="center"
                      level="h4"
                    >
                      {weatherData?.current.condition.text}
                    </Typography>
                    <Typography
                      sx={{ color: "#FFF" }}
                      textAlign="center"
                      level="body-lg"
                    >
                      {weatherData?.current.temp_c}°C
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              {weatherData?.forecast.forecastday.map((day) => (
                <Grid key={day?.date} xs={12} sm={6} md={3}>
                  <Card
                    sx={{
                      margin: "15px 15px",
                      boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
                      backdropFilter: "blur(5px)",
                      border: "1px solid rgba(255, 255, 255, 0.3)",
                      background: "rgba(31, 122, 31, 0.2)",
                    }}
                    variant="solid"
                  >
                    <CardContent
                      orientation="horizontal"
                      sx={{ justifyContent: "center" }}
                    >
                      {day && (
                        <Image
                          src={`https:${day?.day.condition.icon}`}
                          alt="weather icon"
                          width={80}
                          height={80}
                        />
                      )}
                    </CardContent>
                    <CardContent>
                      <Typography
                        sx={{ color: "#FFF" }}
                        textAlign="center"
                        level="h3"
                      >
                        {getRelativeDate(day?.date)}
                      </Typography>
                      <Typography
                        sx={{ color: "#FFF" }}
                        textAlign="center"
                        level="h4"
                      >
                        {day?.day.condition.text}
                      </Typography>
                      <Typography
                        sx={{ color: "#FFF" }}
                        textAlign="center"
                        level="body-lg"
                      >
                        {Math.round(day?.day.avgtemp_c)}°C
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        )}
      </Box>
      <Modal open={open} onClose={() => setOpen(false)}>
        <ModalDialog>
          <form onSubmit={handleSubmit}>
            <Stack spacing={2}>
              <FormControl error={error ?? false}>
                <FormLabel>Name of City</FormLabel>
                <Input
                  autoFocus
                  required
                  value={inputCity}
                  onChange={handleInputChange}
                />
                <FormHelperText>{error}</FormHelperText>
              </FormControl>
              <Button type="submit">Submit</Button>
            </Stack>
          </form>
        </ModalDialog>
      </Modal>
    </>
  );
}
