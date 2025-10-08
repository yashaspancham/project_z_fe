import EntriesPageComp from "@/components/entriesPageComp";
import SuspenseLoading from "@/components/SuspenseLoading";
import { Suspense } from "react";
export default function Home() {
  return (
    <Suspense
      fallback={
        <SuspenseLoading />
      }
    >
      <EntriesPageComp />
    </Suspense>
  );
}
