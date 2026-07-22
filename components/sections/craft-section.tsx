import Image from "next/image";
import Link from "next/link";
import { craft, craftStats } from "@/lib/data";
import { Container } from "@/components/ui/container";
import { Icon } from "@/components/ui/icon";
import { Eyebrow } from "@/components/ui/section-title";

export function CraftSection() {
  return (
    <section className="overflow-hidden">
      <Container className="py-28 md:py-40">
        <div className="grid items-center gap-12 md:grid-cols-[0.92fr_1.08fr] md:gap-20">
          <div className="relative order-2 md:order-1">
            <div className="pointer-events-none absolute -left-20 -top-20 size-64 rounded-full bg-primary/10 blur-3xl" />
            <Eyebrow className="text-primary">{craft.eyebrow} · Since 2011</Eyebrow>
            <h2 className="mt-5 text-balance font-display text-4xl leading-[1.05] tracking-[-0.04em] md:text-6xl">
              {craft.title}
            </h2>
            <p className="mt-7 max-w-xl leading-7 text-muted-foreground">{craft.body}</p>
            <div className="mt-10 grid grid-cols-3 gap-4 border-y border-border py-7">
              {craftStats.map((stat) => (
                <div key={stat.label}>
                  <div className="font-display text-2xl tracking-[-0.04em] text-primary md:text-4xl">
                    {stat.value}
                  </div>
                  <div className="mt-1 text-xs text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
            <Link
              className="mt-10 inline-flex items-center gap-2 bg-[linear-gradient(var(--color-primary),var(--color-primary))] bg-[length:0%_1px] bg-left-bottom bg-no-repeat text-sm transition-[background-size,color] duration-300 hover:bg-[length:100%_1px] hover:text-foreground"
              href="/products"
            >
              Read the engineering notes
              <Icon className="size-4" name="arrow-up-right" />
            </Link>
          </div>
          <div className="relative order-1 aspect-[4/5] overflow-hidden rounded-xl border border-border bg-surface md:order-2">
            <Image
              alt="Macro detail of a heating chamber"
              className="object-cover"
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              src={craft.image}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/45 via-transparent to-transparent" />
            <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between border-t border-foreground/20 pt-4 text-[0.6rem] uppercase tracking-[0.18em] text-foreground/65 md:bottom-7 md:left-7 md:right-7">
              <span>Zirconia chamber<br />Macro study 04</span>
              <span>01 / 04</span>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
