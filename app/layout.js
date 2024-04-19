import { Inter } from "next/font/google";
import "./globals.css";
import { CssBaseline, CssVarsProvider } from "@mui/joy";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "WeatherApp",
  description: "App that displays weather data for a given location",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <CssVarsProvider>
        <CssBaseline />
        <body className={inter.className}>{children}</body>
      </CssVarsProvider>
    </html>
  );
}
