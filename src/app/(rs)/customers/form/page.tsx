import { getCustomer } from "@/lib/queries/getCustomer";
import BackButton from "@/components/BackButton";
import * as Sentry from "@sentry/nextjs";

export default async function CustomerFormPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  try {
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
      return <p>customer id #{customerId}</p>;
    } else {
      // new customer form component
      return <p>no customer id</p>;
    }
  } catch (error) {
    if (error instanceof Error) {
      Sentry.captureException(error);
      throw error;
    }
  }
}
