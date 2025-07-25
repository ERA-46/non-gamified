import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Cloud, Settings, Monitor, Home } from "lucide-react";

const Navigation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { path: "/", label: "Dashboard", icon: Home }
  ];

  return (
    <nav className="bg-primary text-primary-foreground p-4">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Cloud className="h-8 w-8" />
          <span className="text-xl font-bold">CloudManager</span>
        </div>
        
        <div className="flex gap-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <Button
                key={item.path}
                variant={isActive ? "secondary" : "outline"}
                onClick={() => navigate(item.path)}
                className={`flex items-center gap-2 ${
                  isActive 
                    ? "bg-white text-black hover:bg-white/90" 
                    : "border-white/20 text-black hover:bg-white/10"
                }`}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </Button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;