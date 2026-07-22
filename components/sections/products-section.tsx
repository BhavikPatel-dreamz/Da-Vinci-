import { ProductCard } from "@/components/sections/product-card";
import { Container } from "@/components/ui/container";
import { SectionTitle } from "@/components/ui/section-title";
import { listProducts } from "@/lib/medusa";

export async function ProductsSection() {
  const { products } = await listProducts({ limit: 4 });

  return (
    <section>
      <Container className="py-16 md:py-20">
        <SectionTitle
          className="mb-12"
          eyebrow="Just landed"
          title="Bestsellers & new arrivals."
        />
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
          {products.map((product, index) => (
            <ProductCard index={index} key={product.id} product={product} />
          ))}
        </div>
      </Container>
    </section>
  );
}
