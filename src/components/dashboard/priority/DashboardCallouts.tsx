import { Card, CardContent } from "@/components/ui/card";
import { Users, UserCheck } from "lucide-react";

export function DashboardCallouts() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card className="border-muted bg-muted/5">
        <CardContent className="flex items-center gap-3 p-4">
          <Users className="h-5 w-5 text-muted-foreground" />
          <p className="text-sm text-muted-foreground">
            <span className="font-medium text-foreground">5 customers</span> are due for check-out today
          </p>
        </CardContent>
      </Card>
      
      <Card className="border-primary/20 bg-primary/5">
        <CardContent className="flex items-center gap-3 p-4">
          <UserCheck className="h-5 w-5 text-primary" />
          <p className="text-sm text-muted-foreground">
            <span className="font-medium text-primary">2 VIPs</span> arriving this afternoon
          </p>
        </CardContent>
      </Card>
    </div>
  );
}