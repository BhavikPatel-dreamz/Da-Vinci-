import Image from "next/image";
import { hero } from "@/lib/data";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Icon } from "@/components/ui/icon";
import { Reveal } from "@/components/ui/reveal";
import { Eyebrow } from "@/components/ui/section-title";

export function HeroSection() {
  return (
    <section className="relative isolate min-h-[calc(100svh-6.75rem)] overflow-hidden border-b border-border">
      <div className="absolute inset-0">
        <Image
          alt="DaVinci IQ-C precision device on dark stone"
          className="object-cover object-[68%_center] sm:object-center"
          fill
          priority
          sizes="100vw"
          src={hero.image}
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(13,12,11,0.98)_0%,rgba(13,12,11,0.88)_28%,rgba(13,12,11,0.24)_62%,rgba(13,12,11,0.1)_100%)] sm:bg-[linear-gradient(90deg,rgba(13,12,11,0.96)_0%,rgba(13,12,11,0.72)_34%,rgba(13,12,11,0.06)_70%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/10 via-transparent to-background/80" />
        <div className="hero-grid absolute inset-0 opacity-25" />
      </div>

      <Container className="relative flex min-h-[calc(100svh-6.75rem)] flex-col justify-between pb-7 pt-14 md:pb-8 md:pt-20">
        <div className="flex items-center justify-between text-[0.62rem] uppercase tracking-[0.22em] text-foreground/45">
          <span>Portland · Oregon</span>
          <span className="hidden items-center gap-2 sm:flex">
            <span className="size-1.5 animate-pulse rounded-full bg-primary" />
            Available now
          </span>
        </div>

        <div className="max-w-[48rem] py-14 md:py-20">
          <Reveal>
            <Eyebrow className="flex items-center gap-3 text-primary">
              <span className="h-px w-8 bg-primary" />
              {hero.eyebrow}
            </Eyebrow>
          </Reveal>
          <Reveal delay={100}>
            <h1 className="mt-6 text-balance font-display text-[clamp(3.45rem,8vw,7.6rem)] leading-[0.86] tracking-[-0.055em]">
              {hero.title}
              <br />
              <span className="font-normal text-primary">{hero.accent}</span>
            </h1>
          </Reveal>
          <Reveal delay={250}>
            <p className="mt-8 max-w-[34rem] text-base leading-7 text-foreground/65 md:text-lg">
              {hero.body}
            </p>
          </Reveal>
          <Reveal className="mt-10 flex flex-wrap items-center gap-3" delay={400}>
            <ButtonLink className="min-w-44" href="/products">
              Discover IQ-C
              <Icon className="size-4" name="arrow-right" />
            </ButtonLink>
            <ButtonLink className="border-foreground/20 bg-background/20 backdrop-blur-sm" href="/collections" variant="secondary">
              View the collection
            </ButtonLink>
          </Reveal>
        </div>

        <div className="grid gap-5 border-t border-foreground/10 pt-5 text-xs text-foreground/50 sm:grid-cols-[1fr_auto] sm:items-end">
          <div className="flex flex-wrap gap-x-8 gap-y-3">
            <span><b className="mr-2 font-medium text-foreground">01°</b> exact control</span>
            <span><b className="mr-2 font-medium text-foreground">51 sec</b> heat-up</span>
            <span><b className="mr-2 font-medium text-foreground">10 yr</b> warranty</span>
          </div>
          <span className="hidden text-[0.6rem] uppercase tracking-[0.2em] sm:block">Scroll to explore ↓</span>
        </div>
      </Container>
    </section>
  );
}
