function SkeletonCard() {
  return (
    <div className="flex animate-pulse border border-gray-200 rounded-lg min-h-32 p-3 sm:p-5 md:p-8 ">
      <div className="flex flex-col flex-1 gap-2">
        <div className="flex items-center">
          <div className="h-7 w-7 bg-gray-300 rounded-lg" />
          <div className="h-6 w-2" />
          <div className="h-6 w-32 bg-gray-300 rounded" />
        </div>
        <div className="rounded h-4 w-1/6 bg-gray-300"></div>
        <div className="rounded h-4 w-1/4 bg-gray-300"></div>
      </div>
      <div className="flex items-center">
        <div className="h-5 w-16 bg-gray-300 rounded" />
      </div>
    </div>
  );
}

export function ListSkeletonView() {
  return (
    <div className="flex flex-col gap-y-2">
      {[...Array(15)].map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
}
