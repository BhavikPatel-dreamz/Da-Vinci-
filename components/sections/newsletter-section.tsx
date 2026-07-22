"use client";

import type { FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/section-title";

export function NewsletterSection() {
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
  }

  return (
    <section>
      <Container className="py-24 md:py-28">
        <div className="relative overflow-hidden rounded-2xl border border-border bg-primary p-8 text-primary-foreground md:p-14">
          <div className="pointer-events-none absolute -right-20 -top-24 size-72 rounded-full border border-primary-foreground/15" />
          <div className="pointer-events-none absolute -right-4 -top-8 size-40 rounded-full border border-primary-foreground/10" />
          <div className="relative max-w-2xl">
            <Eyebrow className="text-primary-foreground/65">The journal</Eyebrow>
            <h3 className="mt-3 font-display text-3xl tracking-tight md:text-5xl">
              A little more signal.
            </h3>
            <p className="mt-3 max-w-lg text-sm leading-relaxed text-primary-foreground/70 md:text-base">
              Field notes, new drops, and the occasional temperature guide. Plus 10% off your first order.
            </p>
            <form className="mt-8 flex max-w-md flex-col gap-2 sm:flex-row" onSubmit={handleSubmit}>
              <label className="sr-only" htmlFor="newsletter-email">
                Email address
              </label>
              <input
                className="h-12 min-w-0 flex-1 rounded border border-primary-foreground/20 bg-primary-foreground/10 px-4 text-sm text-primary-foreground transition-colors placeholder:text-primary-foreground/55 focus:border-primary-foreground/70 focus:outline-none"
                id="newsletter-email"
                placeholder="your@email.com"
                required
                type="email"
              />
              <Button className="bg-background text-foreground hover:brightness-110" type="submit">
                Subscribe
              </Button>
            </form>
          </div>
        </div>
      </Container>
    </section>
  );
}
