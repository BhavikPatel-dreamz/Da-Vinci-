import { trustMetrics } from "@/lib/data";
import { Container } from "@/components/ui/container";
import { Icon } from "@/components/ui/icon";

export function FeatureStrip() {
  return (
    <section className="border-y border-border">
      <Container className="grid grid-cols-2 divide-x divide-border md:grid-cols-4">
        {trustMetrics.map((metric) => (
          <div className="flex items-center gap-4 p-6 md:p-8" key={metric.title}>
            <Icon className="size-5 text-primary" name={metric.icon} />
            <div className="min-w-0">
              <div className="text-sm font-medium">{metric.title}</div>
              <div className="text-xs text-muted-foreground">{metric.body}</div>
            </div>
          </div>
        ))}
      </Container>
    </section>
  );
}
