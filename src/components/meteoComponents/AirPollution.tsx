import React from 'react';
import useSWR from 'swr';
import { API_ROUTES } from '../../api/ApiConfig';
import { Wind } from 'lucide-react';
import { Badge } from "@/components/ui/badge";

import {
    Card,
    CardContent,
    CardDescription
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

export const Airpollution: React.FC<MyComponentProps> = ({ city }) => {
    const apiUrl = API_ROUTES.airpollution.getAirPollution(city);
    const { data, error } = useSWR(apiUrl, fetcher);

    if (error) return <div>Erreur de chargement des données : {error.message}</div>;
    if (!data) return <div>Chargement...</div>;

    const airpollution = data['airpollution'][0];

    if (!airpollution) {
        return <div>Données météo non disponibles pour {city}</div>;
    }

    const { main, components } = airpollution || {};
    if (!main || !components) {
        return <div>Données principales non disponibles pour {city}</div>;
    }

    return (
        <Card className="col-span-1 ml-5">
            <CardContent className="flex justify-between mx-3 mt-3">
                <CardDescription>airquality index</CardDescription>
                <Badge>Good</Badge>
            </CardContent>
            
            <CardContent className="flex items-center justify-between w-full gap-6">    
                <Wind size={48} className="flex-shrink-0 mt-7" />    
                <div>
                    <p className="text-xs text-muted-foreground mb-2">PM25</p>
                    <div className="text-2xl font-bold">{components.pm2_5}</div>
                </div>
                <div>
                    <p className="text-xs text-muted-foreground mb-2">S02</p>
                    <div className="text-2xl font-bold">{components.so2}</div>
                </div>
                <div>
                    <p className="text-xs text-muted-foreground mb-2">N02</p>
                    <div className="text-2xl font-bold">{components.no2}</div>
                </div>
                <div>
                    <p className="text-xs text-muted-foreground mb-2">O3</p>
                    <div className="text-2xl font-bold">{components.o3}</div>
                </div>
            
            </CardContent>
        </Card>
    );
}
