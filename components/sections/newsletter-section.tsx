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
      <Container className="py-24">
        <div className="max-w-2xl">
          <Eyebrow>Journal</Eyebrow>
          <h3 className="mt-3 font-display text-3xl tracking-tight md:text-4xl">
            Ten percent off your first order.
          </h3>
          <p className="mt-3 text-muted-foreground">
            Field notes, new drops, and the occasional temperature guide. No spam, ever.
          </p>
          <form className="mt-8 flex max-w-md gap-2" onSubmit={handleSubmit}>
            <label className="sr-only" htmlFor="newsletter-email">
              Email address
            </label>
            <input
              className="h-12 min-w-0 flex-1 rounded border border-border bg-surface px-4 text-sm transition-colors placeholder:text-muted-foreground/70 focus:border-primary focus:outline-none"
              id="newsletter-email"
              placeholder="your@email.com"
              required
              type="email"
            />
            <Button type="submit">Subscribe</Button>
          </form>
        </div>
      </Container>
    </section>
  );
}
