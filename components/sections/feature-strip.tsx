import { trustMetrics } from "@/lib/data";
import { Container } from "@/components/ui/container";
import { Icon } from "@/components/ui/icon";

export function FeatureStrip() {
  return (
    <section className="border-b border-border bg-surface/40">
      <Container className="grid grid-cols-2 md:grid-cols-4">
        {trustMetrics.map((metric, index) => (
          <div className="group relative flex items-center gap-4 border-border p-5 odd:border-l md:border-l md:p-7 md:first:border-l-0" key={metric.title}>
            <span className="absolute left-0 top-0 h-px w-0 bg-primary transition-all duration-500 group-hover:w-full" />
            <span className="grid size-9 shrink-0 place-items-center rounded-full border border-primary/25 bg-primary/5">
              <Icon className="size-4 text-primary" name={metric.icon} />
            </span>
            <div className="min-w-0">
              <div className="text-[0.58rem] uppercase tracking-[0.18em] text-muted-foreground">0{index + 1}</div>
              <div className="mt-1 text-sm font-medium">{metric.title}</div>
              <div className="mt-0.5 text-[0.7rem] text-muted-foreground">{metric.body}</div>
            </div>
          </div>
        ))}
      </Container>
    </section>
  );
}
