import { Suspense } from "react";
import EntryPageComp from "@/components/entryPageComp";
import SuspenseLoading from "@/components/SuspenseLoading";

export default function EntryPage() {
  return (
    <Suspense fallback={<SuspenseLoading />}>
      <EntryPageComp />
    </Suspense>
  );
}
