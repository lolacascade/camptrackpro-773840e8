import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Anchor, Phone, Mail, Globe } from "lucide-react";

interface MarinaOverviewCardProps {
  marinaDetails: any;
}

export function MarinaOverviewCard({ marinaDetails }: MarinaOverviewCardProps) {
  return (
    <Card className="border-2 border-[#133134]/10">
      <CardContent className="p-6">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-[#133134]">
              {marinaDetails?.name || 'Marina Name Not Set'}
            </h2>
            <div className="flex items-start space-x-2 text-muted-foreground">
              <MapPin className="h-4 w-4 mt-1 shrink-0" />
              <span>{marinaDetails?.address || 'Address Not Set'}</span>
            </div>
            <div className="flex items-center space-x-2 text-muted-foreground">
              <Anchor className="h-4 w-4 shrink-0" />
              <span>Total Slips: {marinaDetails?.total_slips || 'Not Set'}</span>
            </div>
            <div className="flex items-center space-x-2 text-muted-foreground">
              <Phone className="h-4 w-4 shrink-0" />
              <span>{marinaDetails?.contact_phone || 'Phone Not Set'}</span>
            </div>
            <div className="flex items-center space-x-2 text-muted-foreground">
              <Mail className="h-4 w-4 shrink-0" />
              <span>{marinaDetails?.contact_email || 'Email Not Set'}</span>
            </div>
            {marinaDetails?.website && (
              <div className="flex items-center space-x-2 text-muted-foreground">
                <Globe className="h-4 w-4 shrink-0" />
                <a href={marinaDetails.website} target="_blank" rel="noopener noreferrer" 
                   className="hover:text-[#133134] transition-colors">
                  Visit Website
                </a>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}