import Image from "next/image";
import { craft, craftStats } from "@/lib/data";
import { Container } from "@/components/ui/container";
import { Icon } from "@/components/ui/icon";
import { Eyebrow } from "@/components/ui/section-title";

export function CraftSection() {
  return (
    <section>
      <Container className="py-24 md:py-32">
        <div className="grid items-center gap-8 md:grid-cols-2 md:gap-20">
          <div>
            <Eyebrow>{craft.eyebrow}</Eyebrow>
            <h2 className="mt-4 font-display text-4xl leading-tight tracking-tight md:text-5xl">
              {craft.title}
            </h2>
            <p className="mt-6 leading-relaxed text-muted-foreground">{craft.body}</p>
            <div className="mt-8 grid grid-cols-3 gap-6 border-t border-border pt-8">
              {craftStats.map((stat) => (
                <div key={stat.label}>
                  <div className="font-display text-2xl tracking-tight text-primary md:text-3xl">
                    {stat.value}
                  </div>
                  <div className="mt-1 text-xs text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
            <a
              className="mt-10 inline-flex items-center gap-2 bg-[linear-gradient(var(--color-primary),var(--color-primary))] bg-[length:0%_1px] bg-left-bottom bg-no-repeat text-sm transition-[background-size,color] duration-300 hover:bg-[length:100%_1px] hover:text-foreground"
              href="#"
            >
              Read the engineering notes
              <Icon className="size-4" name="arrow-up-right" />
            </a>
          </div>
          <div className="relative aspect-[4/5] overflow-hidden rounded-lg bg-surface">
            <Image
              alt="Macro detail of a heating chamber"
              className="object-cover"
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              src={craft.image}
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
