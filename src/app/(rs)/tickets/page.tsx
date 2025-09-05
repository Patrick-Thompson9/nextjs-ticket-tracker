import TicketSearch from "@/app/(rs)/tickets/TicketSearch";
import { getTicketSearchResults } from "@/lib/queries/getTicketSearchResults";
import { getOpenTickets } from "@/lib/queries/getOpenTickets";
import TicketTable from "@/app/(rs)/tickets/TicketTable";

export const metadata = {
  title: "Ticket Search",
};

export default async function Tickets({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const { searchText } = await searchParams;

  if (!searchText) {
    const results = await getOpenTickets();

    return (
      <>
        <TicketSearch />
        {results.length ? (
          <TicketTable data={results} />
        ) : (
          <p>No Open Tickets</p>
        )}
      </>
    );
  }

  const results = await getTicketSearchResults(searchText);

  return (
    <>
      <TicketSearch />
      {results.length ? (
        <TicketTable data={results} />
      ) : (
        <p>No Tickets Found</p>
      )}
    </>
  );
}
