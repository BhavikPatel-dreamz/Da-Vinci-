import type { HTMLAttributes } from "react";
import { cx } from "@/lib/utils";

export function Badge({ className, ...props }: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cx(
        "rounded border border-border bg-background/80 px-2 py-1 text-[0.65rem] uppercase tracking-widest backdrop-blur",
        className,
      )}
      {...props}
    />
  );
}
