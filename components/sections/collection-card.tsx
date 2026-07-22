import Image from "next/image";
import Link from "next/link";
import type { Collection } from "@/types/site";
import { Icon } from "@/components/ui/icon";
import { Reveal } from "@/components/ui/reveal";
import { Eyebrow } from "@/components/ui/section-title";

export function CollectionCard({
  collection,
  index,
  reveal = true,
  showDescription = false,
  ctaLabel,
}: {
  collection: Collection;
  index: number;
  reveal?: boolean;
  showDescription?: boolean;
  ctaLabel?: string;
}) {
  const delay = [0, 80, 150][index] ?? 0;
  const card = (
    <Link
      className="group relative block aspect-[4/5] overflow-hidden rounded-lg bg-surface"
      href={`/collections/${collection.handle}`}
    >
      <Image
        alt={collection.name}
        className="object-cover transition-transform duration-700 group-hover:scale-105"
        fill
        sizes="(min-width: 768px) 33vw, 100vw"
        src={collection.image}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
      <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8">
        <Eyebrow className="text-primary/90">{collection.tagline}</Eyebrow>
        <h3 className="mt-2 font-display text-2xl tracking-tight md:text-3xl">
          {collection.name}
        </h3>
        {showDescription ? (
          <p className="mt-2 max-w-sm text-sm text-muted-foreground">
            {collection.description}
          </p>
        ) : null}
        <div className="mt-4 inline-flex items-center gap-2 text-sm">
          {ctaLabel ?? `Shop ${collection.name.toLowerCase()}`}
          <Icon
            className="size-4 transition-transform duration-200 group-hover:translate-x-1"
            name="arrow-right"
          />
        </div>
      </div>
    </Link>
  );

  if (!reveal) {
    return card;
  }

  return <Reveal delay={delay as 0 | 80 | 150}>{card}</Reveal>;
}
