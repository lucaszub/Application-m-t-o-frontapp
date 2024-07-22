// myComponent.tsx

import React from 'react';
import useSWR from 'swr';
import { API_ROUTES } from './ApiConfig.tsx';

const fetcher = (url: string) => fetch(url).then(res => {
  if (!res.ok) {
    throw new Error(`HTTP error! status: ${res.status}`);
  }
  return res.json();
});

interface MyComponentProps {
  city: string;
}

export const MyComponent: React.FC<MyComponentProps> = ({ city }) => {
  const apiUrl = API_ROUTES.actualWeather.getActualWeather(city); // Construire l'URL avec la ville
  const { data, error } = useSWR(apiUrl, fetcher);

  if (error) return <div>Erreur de chargement des données : {error.message}</div>;
  if (!data) return <div>Chargement...</div>;

  const weather = data["meteo actuelle"];

  // Check if weather is null or undefined
  if (!weather) {
    return <div>Données météo non disponibles pour {city}</div>;
  }

  // Destructure properties safely with null checks
  const { main, wind, weather: weatherDetails, sys } = weather || {};
  
  // Check if main is null or undefined
  if (!main) {
    return <div>Données principales non disponibles pour {city}</div>;
  }

  const { temp, feels_like, pressure, humidity } = main;
  const { speed, deg } = wind || {};
  const { description } = weatherDetails?.[0] || {};
  const { sunrise, sunset } = sys || {};

  return (
    <div  className="text-5xl font-bold">
      {/* <h1>Météo actuelle à {city}</h1> */}
      {temp}°C
      {/* <p>Température : {temp}°C (Ressentie : {feels_like}°C)</p> */}
      {/* <p>Description : {description}</p> */}
      {/* <p>Pression : {pressure} hPa</p> */}
      {/* <p>Humidité : {humidity}%</p>
      <p>Vitesse du vent : {speed} m/s, Direction : {deg}°</p>
      <p>Lever du soleil : {sunrise}</p>
      <p>Coucher du soleil : {sunset}</p> */}
    </div>
  );
};

