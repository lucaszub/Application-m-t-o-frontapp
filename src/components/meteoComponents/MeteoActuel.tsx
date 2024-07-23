import React from 'react';
import useSWR from 'swr';
import { API_ROUTES } from '../../api/ApiConfig';
import { ThermometerSun, Eye, BriefcaseBusiness, Droplet, Wind, MapPin, Moon, Sun } from 'lucide-react';

import {
    Card,
    CardContent,
    CardFooter,
    CardDescription,
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

const formatTime = (timestamp: string) => {
    const [date, time] = timestamp.split(' ');
    if (!time) return 'N/A';
    const [hours, minutes] = time.split(':');
    return `${hours.padStart(2, '0')}:${minutes.padStart(2, '0')}`;
};

const extractDate = (datetime: string) => {
    const [datePart] = datetime.split(' ');
    return datePart;
};

export const MeteoActuel: React.FC<MyComponentProps> = ({ city }) => {
    const apiUrl = API_ROUTES.actualWeather.getActualWeather(city);
    const { data, error } = useSWR(apiUrl, fetcher);

    if (error) return <div>Erreur de chargement des données : {error.message}</div>;
    if (!data) return <div>Chargement...</div>;

    const weather = data['meteo actuelle'];

    if (!weather) {
        return <div>Données météo non disponibles pour {city}</div>;
    }

    const { main, weather: weatherDetails, sys, name } = weather || {};
    if (!main) {
        return <div>Données principales non disponibles pour {city}</div>;
    }

    const { temp } = main;
    const { description } = weatherDetails?.[0] || {};
    const { sunrise } = sys || {};

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-xl font-medium">Météo actuelle</CardTitle>
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
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
                <CardTitle className="text-sm font-medium">{description}</CardTitle>
            </CardHeader>
            <div className="w-full border-b my-1 mb-4"></div>
            <CardContent className="flex flex-row gap-3">
                <BriefcaseBusiness />
                <p>{extractDate(sunrise)}</p>
            </CardContent>
            <CardFooter className="flex flex-row gap-3">
                <MapPin />
                <p>{name}</p>
            </CardFooter>
        </Card>
    );
};

export const SunRiseSunSet: React.FC<MyComponentProps> = ({ city }) => {
    const apiUrl = API_ROUTES.actualWeather.getActualWeather(city);
    const { data, error } = useSWR(apiUrl, fetcher);

    if (error) return <div>Erreur de chargement des données : {error.message}</div>;
    if (!data) return <div>Chargement...</div>;

    const weather = data['meteo actuelle'];

    if (!weather) {
        return <div>Données météo non disponibles pour {city}</div>;
    }

    const { sys } = weather || {};
    const { sunrise, sunset } = sys || {};

    return (
        <Card className="col-span-1 ml-5">
            <CardContent className="flex justify-between mx-3 mt-3">
                <CardDescription>Sunrise & Sunset</CardDescription>
            </CardContent>
            <CardContent className="flex flex-row justify-between w-full gap-10">
                <div className="flex flex-col items-center w-1/2">
                    <p className="text-xs text-muted-foreground mb-2 text-center">Sunrise</p>
                    <div className="flex flex-row items-center justify-center gap-2 w-full">
                        <Sun size={48} className="mr-4" />
                        <div className="text-2xl font-bold">{sunrise ? formatTime(sunrise) : 'N/A'}</div>
                    </div>
                </div>
                <div className="flex flex-col items-center w-1/2">
                    <p className="text-xs text-muted-foreground mb-2 text-center">Sunset</p>
                    <div className="flex flex-row items-center justify-center gap-2 w-full">
                        <Moon size={48} className="mr-4" />
                        <div className="text-2xl font-bold">{sunset ? formatTime(sunset) : 'N/A'}</div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};


export const Humidity: React.FC<MyComponentProps> = ({ city }) => {
    const apiUrl = API_ROUTES.actualWeather.getActualWeather(city);
    const { data, error } = useSWR(apiUrl, fetcher);

   
    if (error) return <div>Erreur de chargement des données : {error.message}</div>;
    if (!data) return <div>Chargement...</div>;

    const weather = data['meteo actuelle'];

    if (!weather) {
        return <div>Données météo non disponibles pour {city}</div>;
    }

    const { main, weather: weatherDetails, sys, name } = weather || {};
    if (!main) {
        return <div>Données principales non disponibles pour {city}</div>;
    }

    const { humidity} = main;



    return (
        <Card className="col-span-1">
            <p className="text-ms text-muted-foreground ml-4 mt-2">Humidity</p>
            <div className="flex flex-row items-center justify-between ml-4 mr-4 mt-3">
                <Droplet /> 
                <div className="text-2xl font-bold">{humidity} %</div>
            </div>
        </Card>
    );
};

export const Pressure: React.FC<MyComponentProps> = ({ city }) => {
    const apiUrl = API_ROUTES.actualWeather.getActualWeather(city);
    const { data, error } = useSWR(apiUrl, fetcher);

   
    if (error) return <div>Erreur de chargement des données : {error.message}</div>;
    if (!data) return <div>Chargement...</div>;

    const weather = data['meteo actuelle'];

    if (!weather) {
        return <div>Données météo non disponibles pour {city}</div>;
    }

    const { main, weather: weatherDetails, sys, name } = weather || {};
    if (!main) {
        return <div>Données principales non disponibles pour {city}</div>;
    }

    const { pressure} = main;



    return (
        <Card className="col-span-1">
            <p className="text-ms text-muted-foreground ml-4 mt-2">Pressure</p>
            <div className="flex flex-row items-center justify-between ml-4 mr-4 mt-3">
                <Wind />
                <div className="text-2xl font-bold">{pressure}hPa</div>
            </div>
        </Card>
    );
};


export const Visibility: React.FC<MyComponentProps> = ({ city }) => {
    const apiUrl = API_ROUTES.actualWeather.getActualWeather(city);
    const { data, error } = useSWR(apiUrl, fetcher);

   
    if (error) return <div>Erreur de chargement des données : {error.message}</div>;
    if (!data) return <div>Chargement...</div>;

    const weather = data['meteo actuelle'];

    if (!weather) {
        return <div>Données météo non disponibles pour {city}</div>;
    }

    const { visibility, main, weather: weatherDetails, sys, name } = weather || {};
    if (!main) {
        return <div>Données principales non disponibles pour {city}</div>;
    }




    return (
        <Card className="col-span-1">
            <p className="text-ms text-muted-foreground ml-4 mt-2">Visibility</p>
            <div className="flex flex-row items-center justify-between ml-4 mr-4 mt-3">
                <Eye  />
                <div className="text-2xl font-bold">{visibility}m</div>
            </div>
        </Card>
    );
};

export const FeelLike: React.FC<MyComponentProps> = ({ city }) => {
    const apiUrl = API_ROUTES.actualWeather.getActualWeather(city);
    const { data, error } = useSWR(apiUrl, fetcher);

   
    if (error) return <div>Erreur de chargement des données : {error.message}</div>;
    if (!data) return <div>Chargement...</div>;

    const weather = data['meteo actuelle'];

    if (!weather) {
        return <div>Données météo non disponibles pour {city}</div>;
    }

    const { main, weather: weatherDetails, sys, name } = weather || {};
    if (!main) {
        return <div>Données principales non disponibles pour {city}</div>;
    }

    const { feels_like} = main;



    return (
        <Card className="col-span-1">
            <p className="text-ms text-muted-foreground ml-4 mt-2">Température Ressentie</p>
            <div className="flex flex-row items-center justify-between ml-4 mr-4 mt-3">
                <ThermometerSun  />
                <div className="text-2xl font-bold">{feels_like}°C</div>
            </div>
        </Card>
    );
};

