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
import {MeteoActuel} from "../components/meteoComponents/MeteoActuel"

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
              <Card className="col-span-1 ml-5">
                <CardContent className="flex justify-between mx-3 mt-3">
                  <CardDescription>Sunrise & Sunset</CardDescription>
                </CardContent>
                <CardContent className="flex flex-row justify-between w-full gap-10 ">
                  <div className="flex flex-col items-center w-1/2">
                    <p className="text-xs text-muted-foreground mb-2 text-center">Sunrise</p>
                    <div className="flex flex-row items-center justify-center gap-2 w-full">
                      <Sun size={48} className="mr-4" />
                      <div className="text-2xl font-bold">6:46 AM</div>
                    </div>
                  </div>
                  <div className="flex flex-col items-center w-1/2">
                    <p className="text-xs text-muted-foreground mb-2 text-center">Sunset</p>
                    <div className="flex flex-row items-center justify-center gap-2 w-full">
                      <Moon size={48} className="mr-4"/>
                      <div className="text-2xl font-bold">8:46 PM</div>
                    </div>
                  </div>
                </CardContent>
              </Card>


            </div>
            <div className="grid grid-cols-4 gap-3 ml-5 mr-5 mt-6 mb-5">
              <Card className="col-span-1">
                <p className="text-ms text-muted-foreground ml-4 mt-2">Humidity</p>
                <div className="flex flex-row items-center justify-between ml-4 mr-4 mt-3">
                  <Droplet /> 
                  <div className="text-2xl font-bold">34 %</div>
                </div>
              </Card>
              <Card className="col-span-1">
                <p className="text-ms text-muted-foreground ml-4 mt-2">Humidity</p>
                <div className="flex flex-row items-center justify-between ml-4 mr-4 mt-4">
                  <Droplet /> 
                  <div className="text-2xl font-bold">34 %</div>
                </div>
              </Card>
              <Card className="col-span-1">
                <p className="text-ms text-muted-foreground ml-4 mt-2">Humidity</p>
                <div className="flex flex-row items-center justify-between ml-4 mr-4 mt-4">
                  <Droplet /> 
                  <div className="text-2xl font-bold">34 %</div>
                </div>
              </Card>
              <Card className="col-span-1">
                <p className="text-ms text-muted-foreground ml-4 mt-2">Humidity</p>
                <div className="flex flex-row items-center justify-between ml-4 mr-4 mt-4">
                  <Droplet /> 
                  <div className="text-2xl font-bold">34 %</div>
                </div>
              </Card>
            </div>
          </Card>
          <Card>
            
            <CardHeader>
              <CardTitle>Today at</CardTitle>   
            </CardHeader>
            <div className="grid grid-cols-8 gap-2 w-full ml-1 mr-4 mb-6">
              <Card className="flex flex-col items-center justify-center p-4">
                <p className="text-ms text-muted-foreground">9 AM</p>
                <Cloud size={48} />
                <p className="text-ms text-muted-foreground">5°</p>
              </Card>
              <Card className="flex flex-col items-center justify-center p-4">
                <p className="text-ms text-muted-foreground">9 AM</p>
                <Cloud size={48} />
                <p className="text-ms text-muted-foreground">5°</p>
              </Card>
              <Card className="flex flex-col items-center justify-center p-4">
                <p className="text-ms text-muted-foreground">9 AM</p>
                <Cloud size={48} />
                <p className="text-ms text-muted-foreground">5°</p>
              </Card>
              <Card className="flex flex-col items-center justify-center p-4">
                <p className="text-ms text-muted-foreground">9 AM</p>
                <Cloud size={48} />
                <p className="text-ms text-muted-foreground">5°</p>
              </Card>
              <Card className="flex flex-col items-center justify-center p-4">
                <p className="text-ms text-muted-foreground">9 AM</p>
                <Cloud size={48} />
                <p className="text-ms text-muted-foreground">5°</p>
              </Card>
              <Card className="flex flex-col items-center justify-center p-4">
                <p className="text-ms text-muted-foreground">9 AM</p>
                <Cloud size={48} />
                <p className="text-ms text-muted-foreground">5°</p>
              </Card>
              <Card className="flex flex-col items-center justify-center p-4">
                <p className="text-ms text-muted-foreground">9 AM</p>
                <Cloud size={48} />
                <p className="text-ms text-muted-foreground">5°</p>
              </Card>
              <Card className="flex flex-col items-center justify-center p-4">
                <p className="text-ms text-muted-foreground">9 AM</p>
                <Cloud size={48} />
                <p className="text-ms text-muted-foreground">5°</p>
              </Card>
            </div>
            <div className="grid grid-cols-8 gap-2 w-full ml-1 mr-4 mb-3">
              <Card className="flex flex-col items-center justify-center p-4">
                <p className="text-ms text-muted-foreground">9 AM</p>
                <Cloud size={48} />
                <p className="text-ms text-muted-foreground">5°</p>
              </Card>
              <Card className="flex flex-col items-center justify-center p-4">
                <p className="text-ms text-muted-foreground">9 AM</p>
                <Cloud size={48} />
                <p className="text-ms text-muted-foreground">5°</p>
              </Card>
              <Card className="flex flex-col items-center justify-center p-4">
                <p className="text-ms text-muted-foreground">9 AM</p>
                <Cloud size={48} />
                <p className="text-ms text-muted-foreground">5°</p>
              </Card>
              <Card className="flex flex-col items-center justify-center p-4">
                <p className="text-ms text-muted-foreground">9 AM</p>
                <Cloud size={48} />
                <p className="text-ms text-muted-foreground">5°</p>
              </Card>
              <Card className="flex flex-col items-center justify-center p-4">
                <p className="text-ms text-muted-foreground">9 AM</p>
                <Cloud size={48} />
                <p className="text-ms text-muted-foreground">5°</p>
              </Card>
              <Card className="flex flex-col items-center justify-center p-4">
                <p className="text-ms text-muted-foreground">9 AM</p>
                <Cloud size={48} />
                <p className="text-ms text-muted-foreground">5°</p>
              </Card>
              <Card className="flex flex-col items-center justify-center p-4">
                <p className="text-ms text-muted-foreground">9 AM</p>
                <Cloud size={48} />
                <p className="text-ms text-muted-foreground">5°</p>
              </Card>
              <Card className="flex flex-col items-center justify-center p-4">
                <p className="text-ms text-muted-foreground">9 AM</p>
                <Cloud size={48} />
                <p className="text-ms text-muted-foreground">5°</p>
              </Card>
            </div>
          </Card>
          <MyComponent city={city} />
        </div>
      </div>
    </>
  );
};

export default StationMeteo;
