import { Navbar } from './components/Navbar';
import { ThemeProvider } from "@/components/theme-provider";
import { Logo } from './components/logo';
import { ModeToggle } from './components/ModeToggle';
import { Route, Routes } from 'react-router-dom';
import { Auth } from './components/Auth';
import Tendances from './pages/Tendances';
import {StationMeteo} from './pages/StationMeteo';

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="app">
        <div className=" hidden flex-col md:flex relative ">
          <div className="border-b">
            <div className="flex h-16 items-center px-4 gap-2 ml-8 justify-between">
              <div className="flex items-center">
                <Logo />
                <Navbar />
              </div>
              <div className="flex items-center space-x-4">
                <Auth />
                <ModeToggle />
              </div>
            </div>
          </div>
        </div>
        <div className="ml-8 mx-auto p-6">
          <Routes>
            {/* Route pour la page Tendances */}
            <Route path="/Tendances" element={<Tendances />} />
            
            {/* Ajoutez d'autres routes ici */}
            <Route path="/Les stations météorologiques" element={<StationMeteo />} />
            <Route path="/Comparaison Climatique" element={<StationMeteo />} />
          </Routes>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
