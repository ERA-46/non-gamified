import { useState, useEffect } from "react";
import Navigation from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import {
  Shield,
  Users,
  Activity,
  Server,
  Network,
  AlertCircle,
  CheckCircle,
  Clock
} from "lucide-react";

interface SystemMetric {
  id: string;
  name: string;
  value: number;
  status: "healthy" | "warning" | "critical";
  unit: string;
}

interface Agent {
  id: string;
  name: string;
  avatar: string;
  status: "online" | "offline" | "busy";
  lastSeen: string;
}

const ControlCenter = () => {
  const { toast } = useToast();
  const [metrics, setMetrics] = useState<SystemMetric[]>([
    { id: "cpu", name: "CPU Usage", value: 45, status: "healthy", unit: "%" },
    { id: "memory", name: "Memory", value: 67, status: "warning", unit: "%" },
    { id: "disk", name: "Disk I/O", value: 23, status: "healthy", unit: "%" },
    { id: "network", name: "Network", value: 89, status: "critical", unit: "%" }
  ]);

  const [agents] = useState<Agent[]>([
    { 
      id: "1", 
      name: "Security Agent", 
      avatar: "/lovable-uploads/67ec44ff-66c9-4b7b-bb20-572279ca9cd7.png", 
      status: "online", 
      lastSeen: "2 min ago" 
    },
    { 
      id: "2", 
      name: "Monitor Agent", 
      avatar: "/lovable-uploads/67ec44ff-66c9-4b7b-bb20-572279ca9cd7.png", 
      status: "online", 
      lastSeen: "1 min ago" 
    },
    { 
      id: "3", 
      name: "Backup Agent", 
      avatar: "/lovable-uploads/67ec44ff-66c9-4b7b-bb20-572279ca9cd7.png", 
      status: "busy", 
      lastSeen: "5 min ago" 
    },
    { 
      id: "4", 
      name: "Update Agent", 
      avatar: "/lovable-uploads/67ec44ff-66c9-4b7b-bb20-572279ca9cd7.png", 
      status: "offline", 
      lastSeen: "1 hour ago" 
    },
    { 
      id: "5", 
      name: "Analytics Agent", 
      avatar: "/lovable-uploads/67ec44ff-66c9-4b7b-bb20-572279ca9cd7.png", 
      status: "online", 
      lastSeen: "Just now" 
    }
  ]);

  const [systemScore, setSystemScore] = useState(73);

  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => prev.map(metric => ({
        ...metric,
        value: Math.max(0, Math.min(100, metric.value + (Math.random() - 0.5) * 10))
      })));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const avgScore = metrics.reduce((acc, metric) => {
      const normalizedScore = metric.status === "healthy" ? 100 - metric.value :
                             metric.status === "warning" ? 80 - metric.value :
                             60 - metric.value;
      return acc + Math.max(0, normalizedScore);
    }, 0) / metrics.length;
    
    setSystemScore(Math.round(avgScore));
  }, [metrics]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "healthy":
        return <CheckCircle className="h-4 w-4 text-success" />;
      case "warning":
        return <AlertCircle className="h-4 w-4 text-warning" />;
      case "critical":
        return <AlertCircle className="h-4 w-4 text-destructive" />;
      default:
        return <Clock className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "online":
        return "bg-success";
      case "busy":
        return "bg-warning";
      case "offline":
        return "bg-destructive";
      default:
        return "bg-muted";
    }
  };

  const handleAgentAction = (agentName: string, action: string) => {
    toast({
      title: `${action} ${agentName}`,
      description: `Successfully ${action.toLowerCase()} ${agentName}`,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto p-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-foreground mb-2">Control Center</h1>
          <p className="text-muted-foreground">Monitor and manage your cloud infrastructure</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* System Metrics */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5" />
                  System Metrics
                  <Badge className={`ml-auto ${systemScore > 80 ? 'bg-success' : systemScore > 60 ? 'bg-warning' : 'bg-destructive'} text-white`}>
                    Score: {systemScore}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {metrics.map((metric) => (
                  <div key={metric.id} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {getStatusIcon(metric.status)}
                        <span className="font-medium">{metric.name}</span>
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {metric.value.toFixed(1)}{metric.unit}
                      </span>
                    </div>
                    <Progress 
                      value={metric.value} 
                      className="h-2"
                    />
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Server className="h-5 w-5" />
                  Active Services
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <span>Load Balancer</span>
                    <Badge className="bg-success text-white">Active</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <span>Database</span>
                    <Badge className="bg-success text-white">Active</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <span>Cache Service</span>
                    <Badge className="bg-warning text-white">Scaling</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <span>CDN</span>
                    <Badge className="bg-success text-white">Active</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Agent Management */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  System Agents
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {agents.map((agent) => (
                  <div key={agent.id} className="flex items-center gap-3 p-3 border rounded-lg">
                    <div className="relative">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={agent.avatar} alt={agent.name} />
                        <AvatarFallback>
                          {agent.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div className={`absolute -bottom-1 -right-1 h-3 w-3 ${getStatusColor(agent.status)} rounded-full border-2 border-background`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">{agent.name}</p>
                      <p className="text-xs text-muted-foreground">{agent.lastSeen}</p>
                    </div>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => handleAgentAction(agent.name, "Restart")}
                    >
                      Restart
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Security Status
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span>Firewall</span>
                  <Badge className="bg-success text-white">Protected</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span>SSL Certificate</span>
                  <Badge className="bg-success text-white">Valid</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span>Intrusion Detection</span>
                  <Badge className="bg-warning text-white">Monitoring</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span>Access Control</span>
                  <Badge className="bg-success text-white">Enforced</Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Network className="h-5 w-5" />
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button 
                  className="w-full" 
                  onClick={() => handleAgentAction("All Systems", "Refresh")}
                >
                  Refresh All
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => handleAgentAction("System", "Backup")}
                >
                  Create Backup
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => handleAgentAction("Security", "Scan")}
                >
                  Security Scan
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ControlCenter;