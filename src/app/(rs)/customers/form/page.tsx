import { getCustomer } from "@/lib/queries/getCustomer";
import BackButton from "@/components/BackButton";
import CustomerForm from "@/app/(rs)/customers/form/CustomerForm";
import * as Sentry from "@sentry/nextjs";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const { customerId } = await searchParams;

  if (!customerId) return { title: "New Customer" };

  return { title: `Edit Customer ID #${customerId}` };
}

export default async function CustomerFormPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  try {
    const { getPermission } = getKindeServerSession();
    const managerPermission = await getPermission("manager");
    const isManager = managerPermission?.isGranted;

    const { customerId } = await searchParams;

    // edit customer form
    if (customerId) {
      const customer = await getCustomer(Number(customerId));
      if (!customer) {
        return (
          <>
            <h2>Customer ID #{customerId} not found</h2>
            <p>Please check the ID and try again.</p>
            <BackButton title="Go Back" className="mt-4" variant="default" />
          </>
        );
      }
      console.log("Customer data:", customer);
      // put customer form component
      return <CustomerForm isManager={isManager} customer={customer} />;
    } else {
      // new customer form component
      return <CustomerForm isManager={isManager} />;
    }
  } catch (error) {
    if (error instanceof Error) {
      Sentry.captureException(error);
      throw error;
    }
  }
}
