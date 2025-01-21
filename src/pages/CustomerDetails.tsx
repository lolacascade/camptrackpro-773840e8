import { useParams } from "react-router-dom";
import { CustomerDetailsInsights } from "@/components/customers/details/CustomerDetailsInsights";
import { PageWithChat } from "@/components/layout/PageWithChat";
import { PageContainer } from "@/components/layout/PageContainer";

export default function CustomerDetails() {
  const { id } = useParams();

  if (!id) {
    return <div>Invalid customer ID</div>;
  }

  return (
    <PageWithChat>
      <PageContainer>
        <CustomerDetailsInsights customerId={id} />
      </PageContainer>
    </PageWithChat>
  );
}