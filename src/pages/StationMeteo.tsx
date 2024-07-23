import MapComponent from "../components/MapComponent";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { CloudSun, CloudRainWind, CloudSunRain, Sun, Cloud, Wind, BriefcaseBusiness, MapPin, Droplet, Moon   } from "lucide-react";
import  { MyComponent }  from "../api/actualweather";
import React, { useState } from 'react';
import {Humidity, MeteoActuel, Pressure, Visibility, FeelLike}  from "../components/meteoComponents/MeteoActuel"
import {SunRiseSunSet}  from "../components/meteoComponents/MeteoActuel"

import {WeatherForecast} from "../components/meteoComponents/WeatherForecast"

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
        <div className="col-span-1 grid items-start gap-2">
          <MeteoActuel city={city}/>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xl font-medium mb-5">5 Day forecast</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-row items-center justify-between">
              <div className="text-2xl font-bold flex flex-row items-center gap-4">
                <Sun size={48} />
                17°C
              </div>
              <p className="text-ms text-muted-foreground">Mardi 5</p>
              <p className="text-ms text-muted-foreground">Mars</p>
            </CardContent>
            <CardContent className="flex flex-row items-center justify-between">
              <div className="text-2xl font-bold flex flex-row items-center gap-4">
                <CloudRainWind size={48} />
                22°C
              </div>
              <p className="text-ms text-muted-foreground">Mercredi 6</p>
              <p className="text-ms text-muted-foreground">Mars</p>
            </CardContent>
            <CardContent className="flex flex-row items-center justify-between">
              <div className="text-2xl font-bold flex flex-row items-center gap-4">
                <CloudSunRain size={48} />
                18°C
              </div>
              <p className="text-ms text-muted-foreground">Jeudi 7</p>
              <p className="text-ms text-muted-foreground">Mars</p>
            </CardContent>
            <CardContent className="flex flex-row items-center justify-between">
              <div className="text-2xl font-bold flex flex-row items-center gap-4">
                <Cloud size={48} />
                34°C
              </div>
              <p className="text-ms text-muted-foreground">Vendredi 8</p>
              <p className="text-ms text-muted-foreground">Mars</p>
            </CardContent>
            <CardContent className="flex flex-row items-center justify-between">
              <div className="text-2xl font-bold flex flex-row items-center gap-4">
                <CloudSun size={48} />
                22°C
              </div>
              <p className="text-ms text-muted-foreground">Mardi 5</p>
              <p className="text-ms text-muted-foreground">Mars</p>
            </CardContent>
          </Card>
        </div>

        {/* Deuxième colonne */}
        <div className="col-span-3 grid items-start gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Meteo aujourd'hui</CardTitle>
            </CardHeader>
            <div className="grid grid-cols-2 gap-3">
              <Card className="col-span-1 ml-5">
                <CardContent className="flex justify-between mx-3 mt-3">
                  <CardDescription>airquality index</CardDescription>
                  <Badge>Good</Badge>
                </CardContent>
                <CardContent className="flex items-center justify-between w-full gap-6">
                  <Wind size={48} className="flex-shrink-0 mt-7" />
                  <div>
                    <p className="text-xs text-muted-foreground mb-2">PM25</p>
                    <div className="text-2xl font-bold">3.90</div>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-2">S02</p>
                    <div className="text-2xl font-bold">7.75</div>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-2">N02</p>
                    <div className="text-2xl font-bold">33.6</div>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-2">O3</p>
                    <div className="text-2xl font-bold">38.6</div>
                  </div>
                </CardContent>
              </Card>
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
          <MyComponent city={city} />
          <WeatherForecast city={city} />
          <Humidity city={city} />

        </div>
      </div>
    </>
  );
};

export default StationMeteo;
