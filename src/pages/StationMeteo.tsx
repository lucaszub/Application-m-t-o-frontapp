import {
  Card,
  
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useState } from 'react';
import {Humidity, MeteoActuel, Pressure, Visibility, FeelLike}  from "../components/meteoComponents/MeteoActuel"
import {SunRiseSunSet}  from "../components/meteoComponents/MeteoActuel"

import {WeatherForecast} from "../components/meteoComponents/WeatherForecast"
import {WeatherForecast5day} from "../components/meteoComponents/WeatherForecast5day"

 
import { Airpollution } from "@/components/meteoComponents/AirPollution";

export const StationMeteo = () => {
  const [city, setCity] = useState<string>('Nantes'); // État local pour stocker la valeur de la ville

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCity(event.target.value); // Mettre à jour la valeur de la ville à partir de l'input
  };
  return (
    <>
      <div className="grid w-full max-w-sm items-center gap-1.5 p-6 ml-8">
        <Label htmlFor="city">Sélectionner votre ville</Label>
        <Input id="city" onChange={handleInputChange} value={city} />
      </div>

      <div className="hidden items-start justify-center gap-2 rounded-lg p-8 md:grid lg:grid-cols-4 xl:grid-cols-4 ">
        {/* Première colonne */}
        <div className="col-span-1 grid items-start gap-12">
          <MeteoActuel city={city}/>
          <WeatherForecast5day city={city} />
        </div>

        {/* Deuxième colonne */}
        <div className="col-span-3 grid items-start gap-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Meteo aujourd'hui</CardTitle>
            </CardHeader>
            <div className="grid grid-cols-2 gap-3">
              <Airpollution city={city} />
              <SunRiseSunSet city={city} />

            </div>
            <div className="grid grid-cols-4 gap-3 ml-5 mr-5 mt-6 mb-5">
            <Humidity city={city} />
            <Pressure city={city} />
            <Visibility city={city} />
            <FeelLike city={city} />
            </div>
          </Card>
          <Card>
            
        
          <WeatherForecast city={city} />
          </Card>
        </div>
      </div>
    </>
  );
};

export default StationMeteo;
