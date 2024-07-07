import React from 'react';
import useSWR from 'swr';
import { API_ROUTES } from './ApiConfig';

interface DepartmentListProps {
  onDepartmentsLoaded: (departments: string[]) => void;
}

const DepartmentList: React.FC<DepartmentListProps> = ({ onDepartmentsLoaded }) => {
  const { data: departments, error } = useSWR(API_ROUTES.departments.getAllDepartments, async (url) => {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch departments');
    }

    return response.json();
  });

  // Gestion des erreurs
  if (error) {
    console.error('Error fetching departments:', error);
  }

  // Utilisation des données lorsque disponibles
  React.useEffect(() => {
    if (departments && Array.isArray(departments.departements)) {
      onDepartmentsLoaded(departments.departements);
    }
  }, [departments, onDepartmentsLoaded]);

  return null; // Ce composant ne retourne rien, il ne fait que déclencher l'appel API
};

export default DepartmentList;
