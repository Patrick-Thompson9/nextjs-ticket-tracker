import { redirect } from "next/navigation";

export default function Home() {
  redirect("/tickets");
  return <h2>Home page</h2>;
}
