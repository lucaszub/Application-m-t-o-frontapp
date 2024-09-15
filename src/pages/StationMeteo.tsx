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

      <div className="grid grid-rows-1 grid-cols-5 gap-4 ml-8 p-6">

          <div className="row-start-1 row-end-2 col-start-1 col-end-2">
            <MeteoActuel city={city}/>
          </div>

          
          <Card className="row-start-1 row-end-1 col-start-2 col-end-6">
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
         
         
         
          <div className="row-start-2 row-end-6 col-start-1 col-end-2">
            <WeatherForecast5day city={city} />
          </div>
   
          
          
          <Card className="row-start-2 row-end-3 col-start-2 col-end-6">
            
        
            <WeatherForecast city={city} />
          </Card>
        </div>
      
    </>
  );
};

export default StationMeteo;
