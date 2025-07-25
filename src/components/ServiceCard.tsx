import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

type ServiceCardProps = {
  title: string;
  description: string;
  icon: React.ElementType;
  onClick?: () => void;
  isActive?: boolean;
  disabled?: boolean;
};

const ServiceCard = ({
  title,
  description,
  icon: Icon,
  onClick,
  isActive = false,
  disabled = false,
}: ServiceCardProps) => {
  const handleClick = () => {
    if (!disabled && onClick) {
      onClick();
    }
  };

  return (
    <Card
      onClick={handleClick}
      className={`transition-all select-none ${
        disabled
          ? "cursor-not-allowed opacity-50"
          : "cursor-pointer hover:shadow-lg hover:scale-105"
      } ${isActive ? "ring-2 ring-primary bg-primary/5" : ""}`}
    >
      <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
        <div
          className={`p-4 rounded-full ${
            isActive ? "bg-primary text-primary-foreground" : "bg-muted"
          }`}
        >
          <Icon className="h-8 w-8" />
        </div>
        <div>
          <h3 className="font-semibold text-lg">{title}</h3>
          <p className="text-muted-foreground text-sm mt-1">{description}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ServiceCard;