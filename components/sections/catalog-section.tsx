import Link from "next/link";
import { CollectionCard } from "@/components/sections/collection-card";
import { Container } from "@/components/ui/container";
import { Icon } from "@/components/ui/icon";
import { SectionTitle } from "@/components/ui/section-title";
import { listCollections } from "@/lib/medusa";

export async function CatalogSection() {
  const collections = (await listCollections()).slice(0, 3);

  return (
    <section>
      <Container className="py-24 md:py-32">
        <SectionTitle
          action={
            <Link
              className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
              href="/collections"
            >
              All collections
              <Icon className="size-4" name="arrow-up-right" />
            </Link>
          }
          className="mb-12"
          eyebrow="The catalog"
          title="Three lines, one obsession with detail."
        />
        <div className="grid gap-4 md:grid-cols-3 md:gap-6">
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
