import Image from "next/image";
import Link from "next/link";
import type { Category } from "@/types/site";
import { Icon } from "@/components/ui/icon";
import { Eyebrow } from "@/components/ui/section-title";

export function CategoryCard({ category }: { category: Category }) {
  return (
    <Link
      className="group relative block aspect-[4/5] overflow-hidden rounded-lg bg-surface"
      href={`/categories/${category.handle}`}
    >
      <Image
        alt={category.name}
        className="object-cover transition-transform duration-700 group-hover:scale-105"
        fill
        sizes="(min-width: 768px) 33vw, 100vw"
        src={category.image}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
      <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8">
        <Eyebrow className="text-primary/90">Category</Eyebrow>
        <h3 className="mt-2 font-display text-2xl tracking-tight md:text-3xl">
          {category.name}
        </h3>
        <p className="mt-2 max-w-sm text-sm text-muted-foreground">
          {category.description}
        </p>
        <div className="mt-4 inline-flex items-center gap-2 text-sm">
          Shop
          <Icon
            className="size-4 transition-transform duration-200 group-hover:translate-x-1"
            name="arrow-right"
          />
        </div>
      </div>
    </Link>
  );
}
