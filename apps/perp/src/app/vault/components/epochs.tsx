"use client";

import { useState } from "react";
import { type IBHoneyEpoch } from "@bera/berajs";
import { Icons } from "@bera/ui/icons";
import { Progress } from "@bera/ui/progress";
import { Skeleton } from "@bera/ui/skeleton";
import { format, formatDistanceToNow, isPast } from "date-fns";
import useSWR from "swr";

import { POLLING } from "~/utils/constants";

export const Epochs = ({
  epoch,
  isLoading,
}: {
  epoch: IBHoneyEpoch | undefined;
  isLoading: boolean;
}) => {
  const [progressPercentage, setProgressPercentage] = useState(0);
  const [duration, setDuration] = useState("0d");

  const formattedStartDate =
    epoch === undefined || Number.isNaN(epoch?.currentEpochStart)
      ? 0
      : format(
          new Date((epoch?.currentEpochStart ?? 0) * 1000),
          "MM/dd/yy, h:mma",
        );
  const formattedEndDate =
    epoch === undefined || Number.isNaN(epoch?.currentEpochEnd)
      ? 0
      : format(
          new Date((epoch?.currentEpochEnd ?? 0) * 1000),
          "MM/dd/yy, h:mma",
        );

  useSWR(
    [epoch?.currentEpoch],
    () => {
      if (epoch) {
        const currentTime = Math.floor(Date.now() / 1000);
        const startTime = epoch?.currentEpochStart;
        const endTime = epoch?.currentEpochEnd;

        const totalTime = endTime - startTime;
        const elapsedTime = currentTime - startTime;

        const percentage = (elapsedTime / totalTime) * 100;
        if (percentage > 100) {
          setProgressPercentage(100);
        } else {
          setProgressPercentage(percentage);
        }
      }
      const unixTimestamp = epoch?.currentEpochEnd || 0;
      const dateObject = new Date(unixTimestamp * 1000); // Convert to milliseconds
      const formatted = formatDistanceToNow(dateObject, { addSuffix: false });
      if (isPast(dateObject)) {
        setDuration("Ended");
      } else if (formatted === "less than a minute") {
        setDuration(" <1 minute");
      } else {
        setDuration(formatted);
      }
    },
    {
      refreshInterval: POLLING.SLOW,
    },
  );

  return (
    <div className="flex h-full w-full flex-col justify-between rounded-md border border-border px-8 py-6 ">
      {isLoading ? (
        <div className="flex w-full flex-row items-center justify-between">
          <Skeleton className="h-[48px] w-[120px]" />
          <Skeleton className="h-[12px] w-[80px] self-center" />
        </div>
      ) : (
        <div className="flex w-full flex-row items-center justify-between">
          <p className="text-2xl font-semibold leading-loose">
            Epoch {epoch?.currentEpoch}
          </p>
          <div className="flex text-xs font-normal leading-tight text-muted-foreground">
            <Icons.timerReset className="mr-1 h-4 w-4" />
            {duration}
          </div>
        </div>
      )}
      <div className="inline-flex flex-col gap-2">
        {isLoading ? (
          <Skeleton className="h-[12px] w-[80px]" />
        ) : (
          <p className="text-xs font-normal leading-tight">
            <span className="text-muted-foreground">Start:</span>{" "}
            {formattedStartDate}
          </p>
        )}
        {isLoading ? (
          <Skeleton className="h-[16px] w-full" />
        ) : (
          <Progress
            color="#CA8A04"
            className="h-4 rounded-full "
            value={progressPercentage}
          />
        )}
        {isLoading ? (
          <Skeleton className="h-[12px] w-[80px] self-end" />
        ) : (
          <p className="self-end text-xs font-normal leading-tight">
            <span className="text-muted-foreground">End:</span>{" "}
            {formattedEndDate}
          </p>
        )}
      </div>
    </div>
  );
};
