import React from "react";
import Image from "next/image";
import {
  cloudinaryUrl,
  dexUrl,
  lendUrl,
  perpsName,
  perpsUrl,
} from "@bera/config";
import { Icons } from "@bera/ui/icons";

export default function HoneyBanner() {
  return (
    <div className="mt-10 grid grid-cols-6 items-center gap-4 p-4">
      <div className="col-span-3">
        <div className="mb-4 max-w-[250px]">
          <Image
            src={`${cloudinaryUrl}/honey/b0wxccnmqzvt2vkzjdm5`}
            alt="Coins"
            width={811}
            height={151}
          />
        </div>
        <h1 className="mb-3 text-5xl text-blue-900">Switch To Honey</h1>
        <p className="text-lg leading-normal text-blue-900">
          Turn your favorite stables into Honey.
        </p>
        <p className="text-lg leading-normal  text-blue-900">
          Leverage liquidity incentives on various platforms.
        </p>
      </div>
      <div className="col-span-1">
        <div className="rounded-xl bg-yellow-200 p-4 text-center">
          <h3 className="m-auto mb-4 w-[60px] text-sm text-yellow-900">
            Lend Honey on {perpsUrl}{" "}
          </h3>
          <div
            onClick={() => window.open(lendUrl, "_blank")}
            className="inline-flex gap-2 rounded-full bg-yellow-600 px-4 py-2 text-sm text-white"
          >
            <Icons.helpingHand />
            Lend
          </div>
        </div>
      </div>

      <div className="col-span-1">
        <div className="rounded-xl bg-green-200 p-4 text-center">
          <h3 className="m-auto mb-4 w-[80px] text-sm text-green-900">
            Add Liquidity to Earn BGT Rewards{" "}
          </h3>
          <div
            onClick={() => window.open(`${dexUrl}/pools`, "_blank")}
            className="inline-flex gap-2 rounded-full bg-green-600 px-4 py-2 text-sm text-white"
          >
            <Icons.plus />
            Add
          </div>
        </div>
      </div>
      <div className="col-span-1">
        <div className="rounded-xl bg-red-200 p-4 text-center">
          <h3 className="m-auto mb-4 w-[86px] text-sm text-red-900">
            Provide Collateral for {perpsName}
          </h3>
          <div
            onClick={() => window.open(perpsUrl, "_blank")}
            className="inline-flex gap-2 rounded-full bg-red-600 px-4 py-2 text-sm text-white"
          >
            <Icons.plus />
            Provide
          </div>
        </div>
      </div>
    </div>
  );
}
