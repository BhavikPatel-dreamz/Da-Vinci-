import { testimonials } from "@/lib/data";
import { Container } from "@/components/ui/container";
import { Icon } from "@/components/ui/icon";

export function TestimonialsSection() {
  return (
    <section>
      <Container className="py-24">
        <div className="grid items-start gap-12 md:grid-cols-[auto_1fr]">
          <div>
            <div className="flex items-center gap-3">
              <div className="font-display text-5xl tabular-nums">4.8</div>
              <div className="flex flex-col">
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Icon className="size-4 fill-primary text-primary" key={index} name="star" />
                  ))}
                </div>
                <div className="mt-1 text-xs text-muted-foreground">3,214 verified reviews</div>
              </div>
            </div>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {testimonials.map((testimonial) => (
              <blockquote className="border-l-2 border-primary pl-4" key={testimonial.author}>
                <p className="text-sm leading-relaxed">{`"${testimonial.quote}"`}</p>
                <footer className="mt-3 text-xs text-muted-foreground">
                  {testimonial.author} {"\u00b7"} <span>{testimonial.product}</span>
                </footer>
              </blockquote>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
