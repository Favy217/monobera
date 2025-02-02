"use client";

import React from "react";
import { useBeraJs } from "@bera/berajs";
import { ConnectWalletBear } from "@bera/shared-ui";

import StatusBanner from "~/components/status-banner";
import { Dashboard } from "./dashboard";

export default function DashboardPageContent() {
  const { isReady } = useBeraJs();

  return (
    <div className="flex flex-col gap-8 md:gap-6">
      <StatusBanner />
      <hr />
      {isReady ? (
        <Dashboard />
      ) : (
        <div className="mt-20">
          <ConnectWalletBear message="Connect your wallet to view your supplies, borrows, and open positions." />
        </div>
      )}
    </div>
  );
}
