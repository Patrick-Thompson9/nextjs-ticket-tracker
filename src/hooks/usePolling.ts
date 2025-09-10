import { useEffect } from "react";
import { useRouter } from "next/navigation";

export function usePolling(searchParams: string | null, ms: number = 60000) {
  const router = useRouter();

  useEffect(() => {
    const intertvalId = setInterval(() => {
      console.log("Interval running");
      if (!searchParams) {
        console.log("refreshing data");
        router.refresh();
      }
    }, ms);

    return () => clearInterval(intertvalId);
  }, [searchParams, ms]); // eslint-disable-line react-hooks/exhaustive-deps
}
