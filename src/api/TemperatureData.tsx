import React, { useEffect } from 'react';
import useSWR from 'swr';
import { API_ROUTES } from './ApiConfig';

interface TemperatureDataProps {
  start_date: string;
  end_date: string;
  region?: string;
  department?: string;
  onDataLoaded: (data: { 
    year: number; 
    temperature_moyenne: number; 
    temperature_minimum: number;
    temperature_maximum: number;
    precipitations: number;
  }[]) => void;
}

const TemperatureData: React.FC<TemperatureDataProps> = ({ start_date, end_date, region, department, onDataLoaded }) => {
  const { data: temperatureData, error } = useSWR(
    `${API_ROUTES.temperatureData.getTemperatureData(start_date, end_date)}${region ? `&region_name=${region}` : ''}${department ? `&department_name=${department}` : ''}`, 
    async (url) => {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch temperature data');
      }

      return response.json();
    }
  );

  // Gestion des erreurs
  if (error) {
    console.error('Erreur lors de la récupération des données de température:', error);
  }

  // Utilisation des données lorsque disponibles
  useEffect(() => {
    if (temperatureData && temperatureData.temperature_stats) {
      const formattedData = temperatureData.temperature_stats.map((entry: { year: number, temperature_moyenne: number, temperature_minimum: number, temperature_maximum: number, precipitations: number }) => ({
        year: entry.year,
        temperature_moyenne: entry.temperature_moyenne,
        temperature_minimum: entry.temperature_minimum,
        temperature_maximum: entry.temperature_maximum,
        precipitations: entry.precipitations
      }));
      onDataLoaded(formattedData);
    }
    console.log(temperatureData);
  }, [temperatureData, onDataLoaded]);

  return null;
};

export default TemperatureData;
