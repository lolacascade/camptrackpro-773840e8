import { useParams } from "react-router-dom";
import { CustomerDetailsInsights } from "@/components/customers/details/CustomerDetailsInsights";
import { PageWithChat } from "@/components/layout/PageWithChat";
import { PageContainer } from "@/components/layout/PageContainer";

export default function CustomerDetails() {
  const { id } = useParams();
  const customerId = id ? parseInt(id, 10) : 0; // Convert string ID to number

  if (!customerId) {
    return <div>Invalid customer ID</div>;
  }

  return (
    <PageWithChat>
      <PageContainer>
        <CustomerDetailsInsights customerId={customerId} />
      </PageContainer>
    </PageWithChat>
  );
}