import Image from "next/image";
import { hero } from "@/lib/data";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Icon } from "@/components/ui/icon";
import { Reveal } from "@/components/ui/reveal";
import { Eyebrow } from "@/components/ui/section-title";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0">
        <Image
          alt=""
          className="object-cover opacity-70"
          fill
          priority
          sizes="100vw"
          src={hero.image}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background/30 to-background" />
      </div>
      <Container className="relative flex min-h-[86vh] items-end pb-16 pt-32 md:pb-24">
        <div className="max-w-3xl">
          <Reveal>
            <Eyebrow>{hero.eyebrow}</Eyebrow>
          </Reveal>
          <Reveal delay={100}>
            <h1 className="mt-4 font-display text-5xl leading-[0.95] tracking-tight sm:text-6xl md:text-7xl lg:text-8xl">
              {hero.title} <br />
              <span className="font-normal italic text-primary">{hero.accent}</span>
            </h1>
          </Reveal>
          <Reveal delay={250}>
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-muted-foreground">{hero.body}</p>
          </Reveal>
          <Reveal className="mt-10 flex flex-wrap gap-3" delay={400}>
            <ButtonLink href="/collections/portable">
              Shop portable
              <Icon className="size-4" name="arrow-right" />
            </ButtonLink>
            <ButtonLink href="/collections" variant="secondary">
              Explore collections
            </ButtonLink>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
