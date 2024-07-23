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

// Typage simplifié des données de l'API
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
  if (!dateString) return '';
  const date = new Date(dateString);
  const days = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
  const day = days[date.getDay()];
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  return `${day} ${hours}h${minutes}`;
};

const getIcon = (temp: number | undefined) => {
  if (temp === undefined) return Cloud;
  if (temp < 0) return Cloud;
  if (temp < 15) return Cloud;
  if (temp >= 15) return Sun;
  return Cloud;
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
            const { main, dt_txt } = forecast;
            const { temp } = main || {};
            const formattedDate = formatDate(dt_txt);
            const Icon = getIcon(temp);

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
