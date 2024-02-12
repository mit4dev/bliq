"use client";

import { Button } from "@/src/components";
import { QueryKeys } from "@/src/constants";
import { useQueryClient } from "@tanstack/react-query";

export default function RetryButton() {
  const queryClient = useQueryClient();

  const onRetryClick = () => {
    const isFetching = queryClient.isFetching({ queryKey: [QueryKeys.RideOptions] });
    if (isFetching) {
      return;
    }

    queryClient.refetchQueries({ queryKey: [QueryKeys.RideOptions] });
  };

  return <Button title="Retry" onClick={onRetryClick} />;
}
