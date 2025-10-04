import { Suspense } from "react";
import EntryPageComp from "@/components/entryPageComp";

export default function EntryPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <EntryPageComp />
    </Suspense>
  );
}
