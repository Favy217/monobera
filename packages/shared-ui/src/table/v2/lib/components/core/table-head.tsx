"use client";

import React, { useEffect, useState, type PropsWithChildren } from "react";
import { cn } from "@bera/ui";
import { TableHeader as TableHeadComponent } from "@bera/ui/table";

type TableHeadProps = PropsWithChildren<{
  className?: string;
  style?: React.CSSProperties;
  flexTable?: boolean;
  tableBodyRef?: React.RefObject<HTMLTableSectionElement | null>;
  backgroundColor?: "muted" | "none";
}>;

export const TableHead: React.FC<TableHeadProps> = ({
  className,
  tableBodyRef,
  style,
  flexTable,
  children,
  backgroundColor = "muted",
}) => {
  const [hasVerticalScrollbar, setHasVerticalScrollbar] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setHasVerticalScrollbar(
        (tableBodyRef?.current?.clientHeight ?? 0) <
          (tableBodyRef?.current?.scrollHeight ?? 0),
      );
    };

    const resizeObserver = new ResizeObserver(handleResize);
    if (tableBodyRef?.current) {
      resizeObserver.observe(tableBodyRef?.current);
    }

    return () => {
      if (tableBodyRef?.current) {
        resizeObserver.unobserve(tableBodyRef?.current);
      }
      resizeObserver.disconnect();
    };
  }, [tableBodyRef]);

  return (
    <TableHeadComponent
      style={style}
      className={cn(
        flexTable ? "flex" : "table-header-group",
        "relative w-full ",
        {
          "bg-muted": backgroundColor === "muted",
          // "bg-none": backgroundColor === "none",
        },
        hasVerticalScrollbar ? "pr-2" : "",
        className,
      )}
    >
      {children}
    </TableHeadComponent>
  );
};
