import React from 'react';
import useSWR from 'swr';
import { API_ROUTES } from './ApiConfig';

interface RegionsListProps {
  onRegionsLoaded: (regions: string[]) => void;
}

const RegionsList: React.FC<RegionsListProps> = ({ onRegionsLoaded }) => {
  const { data: regions, error } = useSWR(API_ROUTES.regions.getAllRegions, async (url) => {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch regions');
    }

    return response.json();
  });

  // Gestion des erreurs
  if (error) {
    console.error('Error fetching regions:', error);
  }

  // Utilisation des données lorsque disponibles
  React.useEffect(() => {
    if (regions && Array.isArray(regions.Regions)) {
      onRegionsLoaded(regions.Regions);
    }
  }, [regions, onRegionsLoaded]);

  return null; // Ce composant ne retourne rien, il ne fait que déclencher l'appel API
};

export default RegionsList;
