import React from 'react';
import useSWR from 'swr';
import { API_ROUTES } from '../../api/ApiConfig';
import { BriefcaseBusiness, MapPin } from 'lucide-react';

import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';

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

export const MeteoActuel: React.FC<MyComponentProps> = ({ city }) => {
    const apiUrl = API_ROUTES.actualWeather.getActualWeather(city); // Construire l'URL avec la ville
    const { data, error } = useSWR(apiUrl, fetcher);

    if (error) return <div>Erreur de chargement des données : {error.message}</div>;
    if (!data) return <div>Chargement...</div>;

    const weather = data['meteo actuelle'];

    // Check if weather is null or undefined
    if (!weather) {
        return <div>Données météo non disponibles pour {city}</div>;
    }

    // Destructure properties safely with null checks
    const { main, weather: weatherDetails, sys, name } = weather || {};

    // Check if main is null or undefined
    if (!main) {
        return <div>Données principales non disponibles pour {city}</div>;
    }

    const { temp } = main;
    const { description } = weatherDetails?.[0] || {};
    const { sunrise } = sys || {};


    // Fonction pour extraire uniquement la date à partir de la chaîne datetime
    const extractDate = (datetime: string) => {
        const [datePart] = datetime.split(' ');
        return datePart;
    };

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-xl font-medium">Meteo actuel</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-row items-center justify-between space-y-0 pb-2">
                <div className="text-4xl font-bold">{temp}°C</div>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-12"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
                    />
                </svg>
            </CardContent>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 ">
                <CardTitle className="text-sm font-medium divide-y">{description}</CardTitle>
            </CardHeader>
            <div className="w-full border-b my-1 mb-4"></div>
            <CardContent className="flex flex-row gap-3">
                <BriefcaseBusiness />
                <p>{extractDate(sunrise)}</p> {/* Affiche la date de lever du soleil */}
            </CardContent>
            <CardFooter className="flex flex-row gap-3">
                <MapPin />
                <p>{name}</p>
            </CardFooter>
        </Card>
    );
};
