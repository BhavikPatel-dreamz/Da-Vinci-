import Link from "next/link";
import { CollectionCard } from "@/components/sections/collection-card";
import { Container } from "@/components/ui/container";
import { Icon } from "@/components/ui/icon";
import { SectionTitle } from "@/components/ui/section-title";
import { listCollections } from "@/lib/medusa";

export async function CatalogSection() {
  const collections = (await listCollections()).slice(0, 3);

  return (
    <section className="relative">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-64 bg-gradient-to-b from-surface/30 to-transparent" />
      <Container className="relative py-28 md:py-40">
        <SectionTitle
          action={
            <Link
              className="inline-flex items-center gap-2 border-b border-border pb-2 text-xs uppercase tracking-[0.12em] text-muted-foreground transition-colors hover:border-primary hover:text-foreground"
              href="/collections"
            >
              All collections
              <Icon className="size-4" name="arrow-up-right" />
            </Link>
          }
          className="mb-14"
          eyebrow="Designed around your ritual"
          title="Choose your way in."
          titleClassName="text-balance md:text-6xl"
        />
        <div className="grid gap-5 md:grid-cols-3 md:gap-6">
          {collections.map((collection, index) => (
            <CollectionCard
              collection={collection}
              index={index}
              key={collection.id ?? collection.handle}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
