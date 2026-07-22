import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Icon } from "@/components/ui/icon";
import { Eyebrow } from "@/components/ui/section-title";

export function ComparisonCta() {
  return (
    <section className="overflow-hidden">
      <Container className="py-16 md:py-20">
        <div className="relative grid items-center gap-8 overflow-hidden rounded-2xl border border-primary/25 bg-[radial-gradient(circle_at_90%_0%,color-mix(in_oklab,var(--color-primary)_18%,transparent),transparent_38%),var(--color-surface)] p-8 md:grid-cols-[1fr_auto] md:p-14">
          <div className="pointer-events-none absolute -right-20 -top-24 size-64 rounded-full border border-primary/15" />
          <div className="pointer-events-none absolute -right-8 -top-12 size-40 rounded-full border border-primary/10" />
          <div className="relative">
            <Eyebrow className="text-primary">Find your fit</Eyebrow>
            <h3 className="mt-3 max-w-xl font-display text-2xl tracking-tight md:text-3xl">
              The right device makes all the difference.
            </h3>
            <p className="mt-3 max-w-lg text-sm leading-relaxed text-muted-foreground">
              Explore every DaVinci portable and compare the details that matter to your ritual.
            </p>
          </div>
          <ButtonLink className="relative" href="/products" variant="secondary">
            Compare devices
            <Icon className="size-4" name="arrow-right" />
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
