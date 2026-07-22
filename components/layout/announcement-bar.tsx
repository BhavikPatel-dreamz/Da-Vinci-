"use client";

import { useEffect, useState } from "react";
import { announcementMessages } from "@/lib/data";
import { Container } from "@/components/ui/container";

export function AnnouncementBar() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % announcementMessages.length);
    }, 4000);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <div className="border-b border-border bg-background/60 text-xs text-muted-foreground">
      <Container className="flex h-9 items-center justify-center overflow-hidden">
        <span
          key={announcementMessages[index]}
          className="animate-[ticker-in_350ms_ease-out_both] text-[0.68rem] uppercase tracking-wider"
        >
          {announcementMessages[index]}
        </span>
      </Container>
    </div>
  );
}
