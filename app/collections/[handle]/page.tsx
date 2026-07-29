import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SiteShell } from "@/components/layout/site-shell";
import { ProductListingPage } from "@/components/sections/product-listing-page";
import { getCollectionByHandle, listAllProducts } from "@/lib/medusa";
import {
  PRODUCT_PAGE_SIZE,
  type ProductListingSearchParams,
} from "@/lib/pagination";

export const dynamic = "force-dynamic";

type CollectionRouteProps = {
  params: Promise<{ handle: string }>;
  searchParams: Promise<ProductListingSearchParams>;
};

export async function generateMetadata({
  params,
}: CollectionRouteProps): Promise<Metadata> {
  const { handle } = await params;
  const collection = await getCollectionByHandle(handle);

  if (!collection) {
    return {
      title: "Collection not found \u2014 DaVinci",
    };
  }

  return {
    title: `${collection.name} \u2014 DaVinci`,
    description: collection.description,
  };
}

export default async function CollectionRoute({
  params,
  searchParams,
}: CollectionRouteProps) {
  const { handle } = await params;
  const collection = await getCollectionByHandle(handle);

  if (!collection) {
    notFound();
  }

  const resolvedSearchParams = await searchParams;
  const { count, products } = await listAllProducts({
    collectionId: collection.id,
  });

  return (
    <SiteShell>
      <ProductListingPage
        basePath={`/collections/${collection.handle}`}
        count={count}
        description={collection.description}
        emptyMessage="No products are available in this collection yet."
        eyebrow="Collection"
        limit={PRODUCT_PAGE_SIZE}
        products={products}
        searchParams={resolvedSearchParams}
        title={collection.name}
      />
    </SiteShell>
  );
}
