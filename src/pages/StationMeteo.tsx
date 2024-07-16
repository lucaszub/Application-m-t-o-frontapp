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

export const StationMeteo = () => {
  return (
    <>
      <div className="grid w-full max-w-sm items-center gap-1.5 p-8">
        <Label htmlFor="city">Sélectionner votre ville</Label>
        <Input id="city" />
      </div>

      <div className="hidden items-start justify-center gap-6 rounded-lg p-8 md:grid lg:grid-cols-4 xl:grid-cols-4">
        {/* Première colonne */}
        <div className="col-span-1 grid items-start gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xl font-medium">Meteo actuel</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div className="text-5xl font-bold">34°C</div>
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
              <CardTitle className="text-sm font-medium divide-y">Broken Cloud</CardTitle>
            </CardHeader>
            {/* Réduire l'espace du divider ici */}
            <div className="w-full border-b border-gray-200 my-1"></div>
            <CardContent className="flex flex-row gap-3">
              <BriefcaseBusiness />
              <p>Lundi 6 mars</p>
            </CardContent>
            <CardFooter className="flex flex-row gap-3">
              <MapPin />
              <p>Nantes, France</p>
            </CardFooter>
          </Card>
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
                <CardContent className="flex flex-row justify-between w-full gap-10">
                  <div className="flex flex-col items-center w-1/2">
                    <p className="text-xs text-muted-foreground mb-2 text-center">Sunrise</p>
                    <div className="flex flex-row items-center justify-center gap-2 w-full">
                      <Sun size={48} />
                      <div className="text-2xl font-bold">6:46 AM</div>
                    </div>
                  </div>
                  <div className="flex flex-col items-center w-1/2">
                    <p className="text-xs text-muted-foreground mb-2 text-center">Sunset</p>
                    <div className="flex flex-row items-center justify-center gap-2 w-full">
                      <Moon size={48} />
                      <div className="text-2xl font-bold">8:46 PM</div>
                    </div>
                  </div>
                </CardContent>
              </Card>


            </div>
            <div className="grid grid-cols-4 gap-3 ml-5 mr-5 mt-6 mb-5">
              <Card className="col-span-1">
                <p className="text-ms text-muted-foreground ml-4 mt-2">Humidity</p>
                <div className="flex flex-row items-center justify-between ml-4 mr-4 mt-6">
                  <Droplet /> 
                  <div className="text-2xl font-bold">34 %</div>
                </div>
              </Card>
              <Card className="col-span-1">
                <p className="text-ms text-muted-foreground ml-4 mt-2">Humidity</p>
                <div className="flex flex-row items-center justify-between ml-4 mr-4 mt-6">
                  <Droplet /> 
                  <div className="text-2xl font-bold">34 %</div>
                </div>
              </Card>
              <Card className="col-span-1">
                <p className="text-ms text-muted-foreground ml-4 mt-2">Humidity</p>
                <div className="flex flex-row items-center justify-between ml-4 mr-4 mt-6">
                  <Droplet /> 
                  <div className="text-2xl font-bold">34 %</div>
                </div>
              </Card>
              <Card className="col-span-1">
                <p className="text-ms text-muted-foreground ml-4 mt-2">Humidity</p>
                <div className="flex flex-row items-center justify-between ml-4 mr-4 mt-6">
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
        </div>
      </div>
    </>
  );
};

export default StationMeteo;
