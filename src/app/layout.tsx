import type { Metadata } from "next";
import "./globals.css";
import { WeatherProvider } from "@/providers/Weather.provider";

export const metadata: Metadata = {
  title: "5 Day Weather Forecast",
  description: "View your 5 day forecast",
};

type RootLayoutProps = {
  children: React.ReactNode;
};

const RootLayout = ({ children }: RootLayoutProps) => (
  <html lang="en">
    <body>
      <WeatherProvider>{children}</WeatherProvider>
    </body>
  </html>
);

export default RootLayout;
