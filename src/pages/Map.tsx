import { PageWithChat } from "@/components/layout/PageWithChat";
import { PageContainer } from "@/components/layout/PageContainer";
import { Card, CardContent } from "@/components/ui/card";

export default function Map() {
  return (
    <PageWithChat>
      <PageContainer>
        <div className="space-y-6">
          <h1 className="text-3xl font-semibold text-[#133134]">Map</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-medium">Total Sites</h3>
                <p className="text-2xl font-bold mt-2">0</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-medium">Active Sites</h3>
                <p className="text-2xl font-bold mt-2">0</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-medium">Maintenance</h3>
                <p className="text-2xl font-bold mt-2">0</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-medium">Revenue</h3>
                <p className="text-2xl font-bold mt-2">$0</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </PageContainer>
    </PageWithChat>
  );
}