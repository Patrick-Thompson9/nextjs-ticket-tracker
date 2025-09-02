import { getCustomer } from "@/lib/queries/getCustomer";
import { getTicket } from "@/lib/queries/getTicket";
import BackButton from "@/components/BackButton";
import * as Sentry from "@sentry/nextjs";
import TicketForm from "@/app/(rs)/tickets/form/TicketForm";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { Users, init as kindeInit } from "@kinde/management-api-js";

export default async function TicketsFormPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  try {
    const { customerId, ticketId } = await searchParams;
    if (!customerId && !ticketId) {
      // ticketId and customerId are not defined
      return (
        <>
          <h2 className="text-2xl mb-2">
            No Ticket ID or Customer ID provided
          </h2>
          <p>
            Please provide a valid ticket or customer ID to view or edit the
            ticket.
          </p>
          <BackButton title="Go Back" className="mt-4" variant="default" />
        </>
      );
    }

    const { getPermission, getUser } = getKindeServerSession();
    const [managerPermission, user] = await Promise.all([
      getPermission("manager"),
      getUser(),
    ]);
    const isManager = managerPermission?.isGranted;

    if (customerId) {
      // customerId is defined
      const customer = await getCustomer(Number(customerId));
      if (!customer) {
        //no customer found
        return (
          <>
            <h2 className="text-2xl mb-2">
              Customer ID #{customerId} not found
            </h2>
            <p>Please check the ID and try again.</p>
            <BackButton title="Go Back" className="mt-4" variant="default" />
          </>
        );
      }

      if (!customer.active) {
        return (
          <>
            <h2 className="text-2xl mb-2">
              Customer ID #{customerId} is inactive
            </h2>
            <p>Please check the customer status and try again.</p>
            <BackButton title="Go Back" className="mt-4" variant="default" />
          </>
        );
      }
      // customer found and active
      // return ticket form
      if (isManager) {
        kindeInit(); // Initialize Kinde Management API
        const { users } = await Users.getUsers();

        const techs = users
          ? users.map((user) => ({ id: user.email!, description: user.email! }))
          : [];
        return <TicketForm customer={customer} techs={techs} />;
      } else {
        return <TicketForm customer={customer} />;
      }
    }
    if (ticketId) {
      // ticketId is defined
      const ticket = await getTicket(Number(ticketId));
      if (!ticket) {
        // no ticket found
        return (
          <>
            <h2 className="text-2xl mb-2">Ticket ID #{ticketId} not found</h2>
            <p>Please check the ID and try again.</p>
            <BackButton title="Go Back" className="mt-4" variant="default" />
          </>
        );
      }
      // found ticket
      const customer = await getCustomer(ticket.customerId);

      if (isManager) {
        kindeInit(); // Initialize Kinde Management API
        const { users } = await Users.getUsers();

        const techs = users
          ? users.map((user) => ({ id: user.email!, description: user.email! }))
          : [];
        return <TicketForm customer={customer} ticket={ticket} techs={techs} />;
      } else {
        const isEditable =
          user?.email?.toLowerCase() === ticket.tech.toLowerCase();
        return (
          <TicketForm
            customer={customer}
            ticket={ticket}
            isEditable={isEditable}
          />
        );
      }
    }
  } catch (error) {
    if (error instanceof Error) {
      Sentry.captureException(error);
      throw error;
    }
  }
}
