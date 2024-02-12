"use client";

import RetryButton from "./RetryButton";

export function ErrorListView() {
  return (
    <div className="flex flex-col items-center">
      <p className="text-center text-lg font:semibold">An error has been occurred</p>
      <RetryButton />
    </div>
  );
}
