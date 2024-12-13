import { PageWithChat } from "@/components/layout/PageWithChat";
import { PageContainer } from "@/components/layout/PageContainer";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";

export default function MarinaMap() {
  const [selectedDock, setSelectedDock] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <PageWithChat>
      <PageContainer>
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-semibold text-[#133134]">Marina Map</h1>
            <div className="flex gap-4">
              <Input
                placeholder="Search slips..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-[200px]"
              />
              <Select value={selectedDock} onValueChange={setSelectedDock}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select dock" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Docks</SelectItem>
                  <SelectItem value="a">Dock A</SelectItem>
                  <SelectItem value="b">Dock B</SelectItem>
                  <SelectItem value="c">Dock C</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline">Reset View</Button>
            </div>
          </div>

          <Card>
            <CardContent className="p-6">
              <div className="aspect-[16/9] bg-[#F8F9FA] rounded-lg flex items-center justify-center">
                <p className="text-muted-foreground">Interactive marina map will be displayed here</p>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="text-sm font-medium">Total Slips</div>
                <div className="text-2xl font-bold mt-2">150</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="text-sm font-medium">Available</div>
                <div className="text-2xl font-bold mt-2">45</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="text-sm font-medium">Occupied</div>
                <div className="text-2xl font-bold mt-2">98</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="text-sm font-medium">Maintenance</div>
                <div className="text-2xl font-bold mt-2">7</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </PageContainer>
    </PageWithChat>
  );
}