import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Icon } from "@/components/ui/icon";
import { Eyebrow } from "@/components/ui/section-title";

export function ComparisonCta() {
  return (
    <section>
      <Container className="py-16">
        <div className="grid items-center gap-6 rounded-2xl border border-border bg-surface p-8 md:grid-cols-[1fr_auto] md:p-14">
          <div>
            <Eyebrow>Not sure which model?</Eyebrow>
            <h3 className="mt-3 max-w-xl font-display text-2xl tracking-tight md:text-3xl">
              Compare every DaVinci portable side-by-side.
            </h3>
          </div>
          <ButtonLink href="#" variant="secondary">
            Open comparison
            <Icon className="size-4" name="arrow-right" />
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
