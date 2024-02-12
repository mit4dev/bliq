"use client";

import RetryButton from "./RetryButton";

export function EmptyListView() {
  return (
    <div className="flex flex-col items-center">
      <p className="text-center text-lg font:semibold">No rides available at the moment</p>
      <RetryButton />
    </div>
  );
}
