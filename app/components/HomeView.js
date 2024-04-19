"use client";

import { Box, Sheet, SvgIcon, Typography } from "@mui/joy";

export default function HomeView({ imageUrl, weatherData }) {
  console.log(weatherData);
  return (
    <Box height="100vh" display="flex" flexDirection="column">
      <Box
        width="100vw"
        minHeight="400px"
        sx={{
          flexBasis: { xs: "30%", md: "70%" },
          backgroundImage: `url(${imageUrl})`,
          backgroundSize: "cover",
        }}
      >
        <Sheet
          sx={{ marginTop: "20px", maxWidth: "fit-content", padding: "20px" }}
          variant="solid"
          color="success"
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
          }}
          variant="solid"
          color="success"
        >
          <Typography sx={{ color: "#FFF" }} level="h1">
            <SvgIcon size="lg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                />
              </svg>
            </SvgIcon>{" "}
            Malmö
          </Typography>
        </Sheet>
      </Box>
      <Box
        sx={{
          flexBasis: { xs: "70%", md: "30%" },
          width: "100%",
          bottom: 0,
          background: "rgba(31, 122, 31, 0.2)",
          boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
          backdropFilter: "blur(5px)",
          border: "1px solid rgba(255, 255, 255, 0.3)",
        }}
      >
        Test
      </Box>
    </Box>
  );
}
