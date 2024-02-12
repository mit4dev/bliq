"use client";

import { RideInformation } from "@/src/types";
import { RestApiClient } from "@/src/utils";
import { useQuery } from "@tanstack/react-query";
import dynamic from "next/dynamic";
import { useState } from "react";
import { QueryKeys } from "../../constants";
import { EmptyListView } from "./EmptyListView";
import { ErrorListView } from "./ErrorListView";
import { ListSkeletonView } from "./ListSkeletonView";
import RideOptionCard from "./RideOptionCard";

function RideOptionList() {
  const [selectedOption, setSelectedOption] = useState<RideInformation | undefined>();

  const { data, isLoading, isRefetching, isError } = useQuery<RideInformation[]>({
    queryKey: [QueryKeys.RideOptions],
    queryFn: async () => {
      const response = await RestApiClient.get("v1/aggregates");

      const errorRate = 0.1;
      if (errorRate >= Math.random()) {
        throw new Error();
      }

      return response.data;
    },
  });

  if (isLoading || isRefetching) {
    return <ListSkeletonView />;
  }

  if (isError) {
    return <ErrorListView />;
  }

  if (!data) {
    return;
  }

  if (!data.length) {
    return <EmptyListView />;
  }

  return (
    <div className="flex flex-col gap-y-2">
      {data.map((d) => (
        <RideOptionCard
          key={d.id}
          data={d}
          onClick={() => setSelectedOption(d)}
          active={selectedOption?.id === d.id}
        />
      ))}
    </div>
  );
}

export default dynamic(() => Promise.resolve(RideOptionList), { ssr: false });
