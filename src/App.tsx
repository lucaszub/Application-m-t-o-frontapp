import { Navbar } from './components/Navbar';
import { ThemeProvider } from "@/components/theme-provider";
import { Logo } from './components/logo';
import { ModeToggle } from './components/ModeToggle';
import { Route, Routes } from 'react-router-dom';
import { Auth } from './components/Auth';
import Tendances from './pages/Tendances';
import {StationMeteo} from './pages/StationMeteo';
import { LoginForm } from './pages/SignUp'
import { SignIn } from './pages/SignIn'
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
        <div className="ml-8 ">
          <Routes>
            {/* Route pour la page Tendances */}
            <Route path="/" element={<Tendances />} />
            <Route path="/Les stations météorologiques" element={<StationMeteo />} />
            <Route path="/SignUp" element={<LoginForm />} />
            <Route path="/SignIn" element={<SignIn />} />
          </Routes>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;



