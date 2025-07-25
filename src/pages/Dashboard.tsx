import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import ServiceCard from "@/components/ServiceCard";
import { 
  Server, 
  Database, 
  Container, 
  Cpu, 
  Network,
  Shield
} from "lucide-react";

const Dashboard = () => {
  const navigate = useNavigate();
  const [selectedService, setSelectedService] = useState<string | null>(null);

  const services = [
    {
      id: "vm",
      title: "Create a VM",
      description: "Launch virtual machines with custom configurations",
      icon: Server,
      action: () => navigate("/configuration"),
      disabled: false
    },
    {
      id: "database",
      title: "Database Services",
      description: "Managed database solutions",
      icon: Database,
      action: () => navigate("/configuration"),
      disabled: true
    },
    {
      id: "kubernetes",
      title: "Kubernetes",
      description: "Container orchestration platform",
      icon: Container,
      action: () => navigate("/configuration"),
      disabled: true
    },
    {
      id: "compute",
      title: "Compute Engine",
      description: "Scalable computing resources",
      icon: Cpu,
      action: () => navigate("/configuration"),
      disabled: true
    },
    {
      id: "api",
      title: "API & Services",
      description: "Application programming interfaces",
      icon: Network,
      action: () => navigate("/configuration"),
      disabled: true
    },
    {
      id: "security",
      title: "Security Center",
      description: "Cloud security management",
      icon: Shield,
      action: () => navigate("/control"),
      disabled: true
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Welcome, Admin!</h1>
          <p className="text-muted-foreground">
            Select a service to get started with your cloud infrastructure
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
  <ServiceCard
    key={service.id}
    title={service.title}
    description={service.description}
    icon={service.icon}
    isActive={selectedService === service.id}
    disabled={service.disabled} // pass to child
    onClick={() => {
      if (service.disabled) return; // prevent action
      setSelectedService(service.id);
      setTimeout(() => service.action(), 200);
    }}
  />
))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;