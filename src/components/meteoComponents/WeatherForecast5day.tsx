import React from 'react';
import useSWR from 'swr';
import { API_ROUTES } from '../../api/ApiConfig';
import { Cloud, Sun, CloudRain, CloudSnow, CloudDrizzle, CloudLightning } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";

// Fetcher function for SWR
const fetcher = (url: string) =>
  fetch(url).then(res => {
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    return res.json();
  });

// Props for the component
interface MyComponentProps {
  city: string;
}

// Weather data interfaces
interface Weather {
  id: number;
  main: string;
  description: string;
  icon: string;
}

interface WeatherMain {
  temp?: number;
}

interface WeatherForecastItem {
  main?: WeatherMain;
  weather?: Weather[];
  dt_txt?: string;
}

interface PredictionMeteo {
  list: WeatherForecastItem[];
}

interface WeatherResponse {
  'prediction meteo': PredictionMeteo;
}

// Function to format date
const formatDate = (dateString: string | undefined) => {
  if (!dateString) return { day: '', dateNumber: 0, month: '' };
  const date = new Date(dateString);
  const days = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
  const months = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];
  const day = days[date.getDay()];
  const dateNumber = date.getDate();
  const month = months[date.getMonth()];

  return { day, dateNumber, month };
};

// Function to get the icon based on weather ID
const getIcon = (weatherId: number) => {
  if (weatherId >= 200 && weatherId < 300) return CloudLightning; // Thunderstorm
  if (weatherId >= 300 && weatherId < 500) return CloudDrizzle;   // Drizzle
  if (weatherId >= 500 && weatherId < 600) return CloudRain;      // Rain
  if (weatherId >= 600 && weatherId < 700) return CloudSnow;      // Snow
  if (weatherId === 800) return Sun;                              // Clear sky
  if (weatherId >= 801 && weatherId < 900) return Cloud;          // Cloudy

  return Cloud; // Default icon for unknown conditions
};

// Function to calculate daily averages
const calculateDailyAverages = (forecastList: WeatherForecastItem[]) => {
  const dayTemperatures: { [key: string]: { temps: number[], weatherIds: number[] } } = {};

  forecastList.forEach(forecast => {
    const { dt_txt, main, weather } = forecast;
    const date = new Date(dt_txt || '');
    const dayKey = date.toISOString().split('T')[0]; // Use YYYY-MM-DD format as key

    if (main?.temp !== undefined) {
      if (!dayTemperatures[dayKey]) {
        dayTemperatures[dayKey] = { temps: [], weatherIds: [] };
      }
      dayTemperatures[dayKey].temps.push(main.temp);
      if (weather && weather.length > 0) {
        dayTemperatures[dayKey].weatherIds.push(weather[0].id); // Store weather ID
      }
    }
  });

  const dailyAverages = Object.entries(dayTemperatures).map(([dayKey, data]) => {
    const averageTemp = data.temps.reduce((sum, temp) => sum + temp, 0) / data.temps.length;

    // Handle the case where weatherIds might be empty
    const mostFrequentWeatherId = data.weatherIds.length > 0
      ? data.weatherIds.sort((a, b) =>
        data.weatherIds.filter(id => id === a).length - data.weatherIds.filter(id => id === b).length
      ).pop() || 0 // Provide a default value of 0 if no weather ID is found
      : 0; // Default value if no weather ID is present

    const { day, dateNumber, month } = formatDate(dayKey);
    return { day, dateNumber, month, averageTemp, mostFrequentWeatherId };
  });

  return dailyAverages;
};

// Main component
export const WeatherForecast5day: React.FC<MyComponentProps> = ({ city }) => {
  const apiUrl = API_ROUTES.forecast.getForecastWeather(city);
  const { data, error } = useSWR<WeatherResponse>(apiUrl, fetcher);

  if (error) return <div>Erreur de chargement des données : {error.message}</div>;
  if (!data) return <div>Chargement...</div>;

  const { 'prediction meteo': predictionMeteo } = data;

  if (!predictionMeteo) {
    return <div>Données météo non disponibles pour {city}</div>;
  }

  const { list } = predictionMeteo;

  if (!list || !list.length) {
    return <div>Aucune prévision disponible pour {city}</div>;
  }

  // Limit the list to 40 elements to cover several days
  const forecasts = list.slice(0, 40);
  const dailyAverages = calculateDailyAverages(forecasts);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-xl font-medium mb-5">Prévisions sur 5 jours</CardTitle>
      </CardHeader>
      {dailyAverages.map((item, index) => {
        // Use the most frequent weather ID for the day
        const Icon = getIcon(item.mostFrequentWeatherId);

        return (
          <CardContent key={index} className="flex flex-row items-center justify-between">
            <div className="text-2xl font-bold flex flex-row items-center gap-4">
              <Icon size={48} />
              {item.averageTemp !== undefined ? `${item.averageTemp.toFixed(0)}°C` : 'Données non disponibles'}
            </div>
            <p className="text-ms text-muted-foreground">
              {item.day} {item.dateNumber}
            </p>
            <p className="text-ms text-muted-foreground">
              {item.month}
            </p>
          </CardContent>
        );
      })}
    </Card>
  );
};
