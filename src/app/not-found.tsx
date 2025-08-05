import Link from "next/link";
import Image from "next/image";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h2 className="text-4xl font-bold">Page Not Found</h2>
      <p>Could not find requested resource</p>
      <Image
        className="my-5 bg-white rounded-full"
        src="/images/not-found-img.png"
        alt="Page Not Found"
        width={500}
        height={500}
        title="Page Not Found"
        priority={true}
        sizes="300px"
      />
      <Link
        href="/home"
        className="bg-blue-500 text-xl font-bold underline rounded-sm p-2 border-blue-800 border-2 hover:bg-blue-600"
      >
        Return Home
      </Link>
    </div>
  );
}
export const metadata = {
  title: "Not Found",
};
