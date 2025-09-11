import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="bg-black bg-home-img bg-cover bg-center">
      <main className="flex flex-col justify-center text-center max-w-5xl mx-auto h-dvh">
        <div className="flex flex-col gap-6 p-12 rounded-xl bg-black/90 w-4/5 sm:max-w-96 mx-auto text-white small:text-2xl">
          <h1 className="text-4xl font-bold">
            Patrick&apos;s IT <br /> Ticket Tracker
          </h1>
          <address>123 Main St, Anytown, Scotland</address>
          <p>Open from 9am - 5pm</p>
          <p>
            Phone: <Link href="tel:+441234567890">+44 1234 567890</Link>
          </p>
          <p>
            Email:{" "}
            <Link href="mailto:patrick_thompson9@icloud.com">
              patrick_thompson9@icloud.com
            </Link>
          </p>
          <Link href="/tickets">
            <Button variant="default" className="w-full">
              Continue to Ticket Tracker
              <span className="sr-only">View Tickets</span>
            </Button>
          </Link>
        </div>
      </main>
    </div>
  );
}
