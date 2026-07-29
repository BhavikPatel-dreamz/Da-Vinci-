import type { Metadata } from "next";
import { SiteShell } from "@/components/layout/site-shell";
import { ProductListingPage } from "@/components/sections/product-listing-page";
import { listAllProducts } from "@/lib/medusa";
import {
  PRODUCT_PAGE_SIZE,
  type ProductListingSearchParams,
} from "@/lib/pagination";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Products \u2014 DaVinci",
  description: "Browse every product from the Medusa catalog.",
};

type ProductsRouteProps = {
  searchParams: Promise<ProductListingSearchParams>;
};

export default async function ProductsRoute({ searchParams }: ProductsRouteProps) {
  const resolvedSearchParams = await searchParams;
  const { count, products } = await listAllProducts();

  return (
    <SiteShell>
      <ProductListingPage
        basePath="/products"
        count={count}
        description="Browse every product from the Medusa catalog."
        emptyMessage="No products are available yet."
        eyebrow="Shop"
        limit={PRODUCT_PAGE_SIZE}
        products={products}
        searchParams={resolvedSearchParams}
        title="Products"
      />
    </SiteShell>
  );
}
