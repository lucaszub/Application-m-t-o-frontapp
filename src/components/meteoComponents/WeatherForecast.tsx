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

interface WeatherCondition {
  id: number;
  main: string;
  description: string;
  icon: string;
}

interface WeatherForecastItem {
  main?: WeatherMain;
  weather?: WeatherCondition[];
  dt_txt?: string;
}

interface PredictionMeteo {
  list: WeatherForecastItem[];
}

interface WeatherResponse {
  'prediction meteo': PredictionMeteo;
}

const formatDate = (dateString: string | undefined) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  const days = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
  const day = days[date.getDay()];
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  return `${day} ${hours}h${minutes}`;
};

const getIcon = (weatherId: number, description: string) => {
  if (weatherId >= 200 && weatherId < 300) return CloudLightning; // Orage
  if (weatherId >= 300 && weatherId < 500) return CloudDrizzle; // Bruine
  if (weatherId >= 500 && weatherId < 600) return CloudRain; // Pluie
  if (weatherId >= 600 && weatherId < 700) return CloudSnow; // Neige
  if (weatherId === 800) {
    if (description.includes("partly cloudy") || description.includes("few clouds")) {
      return Cloud; // Quelques nuages dans un ciel dégagé
    }
    return Sun; // Ciel dégagé
  }
  if (weatherId >= 801 && weatherId < 900) {
    if (description.includes("partly cloudy") || description.includes("mostly cloudy")) {
      return Cloud; // Nuages partiels ou principalement nuageux
    }
  }
  return Cloud; // Icône par défaut pour des conditions inconnues
};

export const WeatherForecast: React.FC<MyComponentProps> = ({ city }) => {
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

  // Nous limitons la liste à 16 éléments pour remplir les 2 lignes de 8 colonnes
  const forecasts = list.slice(0, 16);

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Prévisions pour {city}</CardTitle>
        </CardHeader>
        <div className="grid grid-cols-8 gap-2 w-full ml-1 mr-4 mb-6">
          {forecasts.map((forecast: WeatherForecastItem, index: number) => {
            const { main, weather, dt_txt } = forecast;
            const { temp } = main || {};
            const description = weather ? weather[0].description : '';
            const formattedDate = formatDate(dt_txt);
            const Icon = getIcon(weather ? weather[0].id : 0, description);

            return (
              <Card key={index} className='flex flex-col items-center justify-center p-2'>
                <CardHeader className='text-center'>
                  <p className="text-ms text-muted-foreground">{formattedDate}</p>
                </CardHeader>
                <CardContent className='flex flex-col items-center justify-center p-2'>
                  <Icon size={48} />
                  <p className="text-ms text-muted-foreground">
                    {temp !== undefined ? `${temp}°C` : 'Données non disponibles'}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </Card>
    </div>
  );
};
