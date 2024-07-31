import React from 'react';
import useSWR from 'swr';
import { API_ROUTES } from '../../api/ApiConfig';
import { Cloud, Sun } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";

const fetcher = (url: string) =>
  fetch(url).then(res => {
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    return res.json();
  });

interface MyComponentProps {
  city: string;
}

interface WeatherMain {
  temp?: number;
}

interface WeatherForecastItem {
  main?: WeatherMain;
  dt_txt?: string;
}

interface PredictionMeteo {
  list: WeatherForecastItem[];
}

interface WeatherResponse {
  'prediction meteo': PredictionMeteo;
}

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

const getIcon = (temp: number | undefined) => {
  if (temp === undefined) return Cloud;
  if (temp < 0) return Cloud;
  if (temp < 15) return Cloud;
  if (temp >= 15) return Sun;
  return Cloud;
};

const calculateDailyAverages = (forecastList: WeatherForecastItem[]) => {
  const dayTemperatures: { [key: string]: number[] } = {};

  forecastList.forEach(forecast => {
    const { dt_txt, main } = forecast;
    const date = new Date(dt_txt || '');
    const dayKey = date.toISOString().split('T')[0]; // Utilise la date au format YYYY-MM-DD comme clé

    if (main?.temp !== undefined) {
      if (!dayTemperatures[dayKey]) {
        dayTemperatures[dayKey] = [];
      }
      dayTemperatures[dayKey].push(main.temp);
    }
  });

  const dailyAverages = Object.entries(dayTemperatures).map(([dayKey, temps]) => {
    const averageTemp = temps.reduce((sum, temp) => sum + temp, 0) / temps.length;
    const { day, dateNumber, month } = formatDate(dayKey);
    return { day, dateNumber, month, averageTemp };
  });

  return dailyAverages;
};

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

  // Nous limitons la liste à 40 éléments pour couvrir plusieurs jours
  const forecasts = list.slice(0, 40);
  const dailyAverages = calculateDailyAverages(forecasts);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-xl font-medium mb-5">Prévisions sur 5 jours</CardTitle>
      </CardHeader>
      {dailyAverages.map((item, index) => {
        const Icon = getIcon(item.averageTemp);
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
