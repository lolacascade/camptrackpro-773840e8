import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, UserCheck, Wrench } from "lucide-react";

interface PriorityAction {
  label: string;
  onClick: () => void;
  variant?: "default" | "destructive" | "outline";
}

interface PriorityCardProps {
  title: string;
  description: string;
  type: "overdue" | "vip" | "maintenance";
  action: PriorityAction;
}

export function PriorityCard({ title, description, type, action }: PriorityCardProps) {
  const getIcon = () => {
    switch (type) {
      case "overdue":
        return <AlertCircle className="h-5 w-5 text-destructive" />;
      case "vip":
        return <UserCheck className="h-5 w-5 text-primary" />;
      case "maintenance":
        return <Wrench className="h-5 w-5 text-muted-foreground" />;
    }
  };

  const getCardStyle = () => {
    switch (type) {
      case "overdue":
        return "border-destructive/20 bg-destructive/5";
      case "vip":
        return "border-primary/20 bg-primary/5";
      case "maintenance":
        return "border-muted/20 bg-muted/5";
    }
  };

  return (
    <Card className={`${getCardStyle()} transition-all hover:shadow-md`}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="flex items-center gap-2">
          {getIcon()}
          <CardTitle className="text-sm font-medium">{title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4">{description}</p>
        <Button
          variant={action.variant || "default"}
          size="sm"
          onClick={action.onClick}
          className="w-full"
        >
          {action.label}
        </Button>
      </CardContent>
    </Card>
  );
}