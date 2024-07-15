import React, { useState, useCallback, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ThemeProvider } from "@/components/theme-provider";
import MapComponent from '../components/MapComponent';
import { Overview } from '../components/overview';
import { Station } from '../components/station';
import { Stat } from '../components/stat';
import Selector from '../components/Selector';
import DepartmentList from '../api/DepartementList';
import RegionList from '../api/RegionsList';
import TemperatureData from '../api/TemperatureData';
import { Chart } from "../components/Chart";

interface TemperatureDataItem {
  year: number;
  temperature_moyenne: number;
  temperature_maximum: number;
  temperature_minimum: number;
  precipitations: number;
}

const Tendances: React.FC = () => {
  const [departments, setDepartments] = useState<string[]>([]);
  const [regions, setRegions] = useState<string[]>([]);
  const [startDate, setStartDate] = useState<Date>(new Date('2010-01-01'));
  const [endDate, setEndDate] = useState<Date>(new Date('2024-06-30'));
  const [temperatureData, setTemperatureData] = useState<TemperatureDataItem[]>([]);
  const [selectedRegion, setSelectedRegion] = useState<string>('');
  const [selectedDepartment, setSelectedDepartment] = useState<string>('');

  const handleDataLoaded = useCallback((data: TemperatureDataItem[]) => {
    const formattedData = data.map((item: TemperatureDataItem) => ({
      year: item.year,
      temperature_moyenne: item.temperature_moyenne,
      temperature_maximum: item.temperature_maximum || 0,
      temperature_minimum: item.temperature_minimum || 0,
      precipitations: item.precipitations || 0,
    }));
    setTemperatureData(formattedData);
  }, []);

  const temperatureStats = useMemo(() => {
    if (temperatureData.length === 0) return {};

    const totalMoyenne = temperatureData.reduce((acc, curr) => acc + curr.temperature_moyenne, 0);
    const totalMoyennePrecipitation = temperatureData.reduce((acc, curr) => acc + curr.precipitations, 0);
    const totalMin = Math.min(...temperatureData.map(item => item.temperature_minimum));
    const totalMax = Math.max(...temperatureData.map(item => item.temperature_maximum));

    return {
      temperature_moyenne: +(totalMoyenne / temperatureData.length).toFixed(1), // Round to 1 decimal place
      precipitations: +(totalMoyennePrecipitation / temperatureData.length).toFixed(0),
      temperature_minimum: totalMin,
      temperature_maximum: totalMax,
    };
  }, [temperatureData]);

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="ml-8 mx-auto p-6">
        <div className="flex items-center justify-between space-y-2 mb-10">
          <h2 className="text-3xl font-bold tracking-tight">Weather trendy</h2>
        </div>

        <DepartmentList onDepartmentsLoaded={setDepartments} />
        <RegionList onRegionsLoaded={setRegions} />
        <Selector 
          departments={departments} 
          regions={regions} 
          onStartDateChange={(date) => {
            if (date) {
              setStartDate(date);
            }
          }} 
          onEndDateChange={(date) => {
            if (date) {
              setEndDate(date);
            }
          }} 
          onRegionChange={setSelectedRegion}
          onDepartmentChange={setSelectedDepartment}
        />

        {startDate && endDate && (
        <TemperatureData 
          start_date={startDate.toISOString().split('T')[0]} 
          end_date={endDate.toISOString().split('T')[0]}
          region={selectedRegion}
          department={selectedDepartment}
          onDataLoaded={handleDataLoaded}
        />
        )}

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-3">
          <Stat 
            temperature_moyenne={temperatureStats.temperature_moyenne}
            temperature_minimum={temperatureStats.temperature_minimum}
            temperature_maximum={temperatureStats.temperature_maximum}
            precipitations={temperatureStats.precipitations}
          />
        </div>
        <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-2">
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle>Précipitation</CardTitle>
            </CardHeader>
            <CardContent className="pl-2">
              <Overview data={temperatureData} />
            </CardContent>
          </Card>
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle>Température</CardTitle>
              <CardDescription>Mensuelle</CardDescription>
            </CardHeader>
            <CardContent className="pl-2">
              <Chart data={temperatureData} />
            </CardContent>
          </Card>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default Tendances;
