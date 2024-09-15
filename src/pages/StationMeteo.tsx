import {
  Card,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useState } from 'react';
import { Humidity, MeteoActuel, Pressure, Visibility, FeelLike } from "../components/meteoComponents/MeteoActuel";
import { SunRiseSunSet } from "../components/meteoComponents/MeteoActuel";
import { WeatherForecast } from "../components/meteoComponents/WeatherForecast";
import { WeatherForecast5day } from "../components/meteoComponents/WeatherForecast5day";
import { Airpollution } from "@/components/meteoComponents/AirPollution";

export const StationMeteo = () => {
  const [city, setCity] = useState<string>('Nantes');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCity(event.target.value);
  };

  return (
    <>
      <div className="grid w-full max-w-sm sm:max-w-md lg:max-w-lg items-center gap-1.5 p-2 ml-4">
        <Label htmlFor="city">Sélectionner votre ville</Label>
        <Input id="city" onChange={handleInputChange} value={city} />
      </div>

      <div className="grid grid-rows-1 grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 p-2">
        <div className="col-span-1">
          <MeteoActuel city={city} />
        </div>

        <Card className="col-span-1 sm:col-span-2 lg:col-span-4 overflow-auto">
          <CardHeader>
            <CardTitle className="text-xl">Meteo aujourd'hui</CardTitle>
          </CardHeader>
          <div className="grid grid-cols-2 gap-3">
            <Airpollution city={city} />
            <SunRiseSunSet city={city} />
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6">
            <Humidity city={city} />
            <Pressure city={city} />
            <Visibility city={city} />
            <FeelLike city={city} />
          </div>
        </Card>

        <div className="col-span-1 lg:col-span-1">
          <WeatherForecast5day city={city} />
        </div>

        <Card className="col-span-1 lg:col-span-4">
          <WeatherForecast city={city} />
        </Card>
      </div>
    </>
  );
};

export default StationMeteo;
