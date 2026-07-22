"use client";

import { useState, useSyncExternalStore } from "react";
import { useBodyScrollLock } from "@/hooks/use-body-scroll-lock";
import { Button, buttonClasses } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/section-title";

const ageCookie = "davinci-age-verified=1";

function getAgeGateSnapshot() {
  return typeof document !== "undefined" && !document.cookie.includes(ageCookie);
}

function subscribeAgeGate(onStoreChange: () => void) {
  const timer = window.setTimeout(onStoreChange, 0);

  return () => window.clearTimeout(timer);
}

export function AgeGate() {
  const shouldShow = useSyncExternalStore(subscribeAgeGate, getAgeGateSnapshot, () => false);
  const [dismissed, setDismissed] = useState(false);
  const visible = shouldShow && !dismissed;

  useBodyScrollLock(visible);

  if (!visible) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[100] flex animate-[fade-in_220ms_ease-out_both] items-center justify-center bg-background/95 px-6 backdrop-blur-xl">
      <div className="w-full max-w-lg animate-[modal-in_360ms_ease-out_50ms_both] text-center">
        <Eyebrow className="mb-6">DaVinci {"\u00b7"} Age Verification</Eyebrow>
        <h1 className="font-display text-4xl font-medium tracking-tight md:text-5xl">
          Are you <span className="text-primary">21 or older?</span>
        </h1>
        <p className="mx-auto mt-4 max-w-md leading-relaxed text-muted-foreground">
          Our products are intended for adults of legal age. By entering, you confirm you are at
          least 21 years old.
        </p>
        <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
          <Button
            onClick={() => {
              document.cookie = `${ageCookie}; path=/; max-age=${60 * 60 * 24 * 30}`;
              setDismissed(true);
            }}
            type="button"
          >
            I am 21 or older
          </Button>
          <a
            className={buttonClasses("secondary")}
            href="https://google.com"
          >
            Exit
          </a>
        </div>
        <p className="mt-8 text-xs text-muted-foreground">
          We use a cookie to remember your confirmation.
        </p>
      </div>
    </div>
  );
}
