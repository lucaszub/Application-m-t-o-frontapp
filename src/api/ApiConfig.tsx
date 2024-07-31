const BASE_URL = "http://127.0.0.1:8000"; // Première partie de l'URL

export const API_ROUTES = {
  departments: {
    getAllDepartments: `${BASE_URL}/departments/departements/`,
    // Ajoutez d'autres routes ici si nécessaire
  },

  regions: {
    getAllRegions: `${BASE_URL}/regions/regions/`,
    // Ajoutez d'autres routes ici si nécessaire
  },
  actualWeather: {

    getActualWeather: (city:string) => {
    
      let urweather = `${BASE_URL}/current_time/?city=${city}`;

      return urweather;

    }
  },

  forecast: {
    getForecastWeather : (city:String) => {
      let forecastweather = `${BASE_URL}/prediction/?city=${city}`

      return forecastweather
    }
  },
  airpollution: {
    getAirPollution: (city:string) => {
      let pollution = `${BASE_URL}/airpollution/?city=${city}`

      return pollution
    }
  },
  
  temperatureData: {
    getTemperatureData: (start_date: string, end_date: string, region?: string, department?: string) => {
      let url = `${BASE_URL}/temperature_stats/temperature_stats/?start_date_str=${start_date}&end_date_str=${end_date}`;
      
      if (region) {
        url += `&region_name=${region}`;
      }
      
      if (department) {
        url += `&department_name=${department}`;
      }

      return url;
    }
  },

 
  
  // Ajoutez d'autres groupes de routes ici
};
