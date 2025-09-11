import { LoginLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { Button } from "@/components/ui/button";

export default function LoginPage() {
  return (
    <main className="h-dvh flex flex-col items-center mt-10 p-10">
      <div className="flex flex-col w-1/3 md:w-2/3 text-center items-center justify-between gap-10 p-5 bg-gray-500/30 rounded-sm">
        <h1 className="text-6xl">Welcome to the Ticket Tracker</h1>
        <hr className="border border-black/30 w-full" />
        <Button className="w-full" asChild>
          <LoginLink>Sign In</LoginLink>
        </Button>
      </div>
    </main>
  );
}
