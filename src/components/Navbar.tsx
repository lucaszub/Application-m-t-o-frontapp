import { Link } from 'react-router-dom';
import { ThemeProvider } from "@/components/theme-provider";
// import {Logo} from "/components/logo"

// ...

<Link to="/examples/dashboard" className="text-sm font-medium transition-colors hover:text-primary">
  Overview
</Link>

import { cn } from "@/lib/utils"

export function Navbar({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
    <nav
      className={cn("flex justify-between items-center space-x-4 lg:space-x-6 gap-12 ml-6", className)}
      {...props}
    >
      <div className="flex items-center space-x-4 lg:space-x-6 gap-12">
        {/* <Logo /> */}
        <Link
          to="/Tendances"
          className="text-sm font-medium transition-colors hover:text-primary"
        >
          Visualiser les tendances
        </Link>
        <Link
          to="/Les stations météorologiques"
          className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
        >
          Les stations météorologiques 
        </Link>
        <Link
          to="/Comparaison Climatique"
          className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
        >
          Comparaison Climatique
        </Link>
        <Link
          to="/examples/dashboard"
          className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
        >
          Le projet
        </Link>

      </div>
    
    </nav>
    </ThemeProvider>
  )
}