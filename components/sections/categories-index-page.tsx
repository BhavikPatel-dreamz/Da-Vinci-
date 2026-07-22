import type { Category } from "@/types/site";
import { CategoryCard } from "@/components/sections/category-card";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/section-title";

export function CategoriesIndexPage({ categories }: { categories: Category[] }) {
  return (
    <>
      <section>
        <Container className="pb-8 pt-16">
          <Eyebrow>Shop</Eyebrow>
          <h1 className="mt-3 font-display text-5xl tracking-tight md:text-6xl">
            Categories
          </h1>
          <p className="mt-4 max-w-xl text-muted-foreground">
            Browse every active category from the Medusa catalog.
          </p>
        </Container>
      </section>

      <section>
        <Container className="py-12">
          {categories.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-3 md:gap-6">
              {categories.map((category) => (
                <CategoryCard category={category} key={category.id} />
              ))}
            </div>
          ) : (
            <div className="py-24 text-center text-sm text-muted-foreground">
              No categories are available yet.
            </div>
          )}
        </Container>
      </section>
    </>
  );
}
