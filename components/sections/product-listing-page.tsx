import Link from "next/link";
import type { Product, ProductStatusFlag } from "@/types/site";
import { ProductCard } from "@/components/sections/product-card";
import { Button, buttonClasses } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Icon } from "@/components/ui/icon";
import { Eyebrow } from "@/components/ui/section-title";
import {
  getPageFromSearchParams,
  type ProductListingSearchParams,
} from "@/lib/pagination";
import { cx } from "@/lib/utils";

type SortValue =
  | "recommended"
  | "featured"
  | "bestseller"
  | "new"
  | "price-asc"
  | "price-desc"
  | "rating-desc"
  | "name-asc";

type StockFilter = "all" | "in-stock" | "sold-out";

type ProductListingPageProps = {
  basePath: string;
  count: number;
  description: string;
  emptyMessage?: string;
  eyebrow: string;
  limit: number;
  products: Product[];
  searchParams: ProductListingSearchParams;
  title: string;
};

type Option = {
  label: string;
  value: string;
};

const statusLabels: Record<ProductStatusFlag, string> = {
  bestseller: "Bestseller",
  featured: "Featured",
  new: "New",
  sale: "Sale",
};

function getSearchValue(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

function getUniqueOptions(values: string[]) {
  return Array.from(new Set(values.filter(Boolean))).sort((first, second) =>
    first.localeCompare(second),
  );
}

function hasStock(product: Product) {
  return product.variants.some((variant) => variant.inStock);
}

function compareFlag(first: Product, second: Product, flag: ProductStatusFlag) {
  const firstRank = first.statusFlags.includes(flag) ? 1 : 0;
  const secondRank = second.statusFlags.includes(flag) ? 1 : 0;

  return secondRank - firstRank;
}

function compareCreatedAt(first: Product, second: Product) {
  const firstDate = first.createdAt ? Date.parse(first.createdAt) : 0;
  const secondDate = second.createdAt ? Date.parse(second.createdAt) : 0;

  return secondDate - firstDate;
}

function sortProducts(items: Product[], sort: SortValue) {
  return [...items].sort((first, second) => {
    if (sort === "featured") {
      return compareFlag(first, second, "featured") || compareCreatedAt(first, second);
    }

    if (sort === "bestseller") {
      return (
        compareFlag(first, second, "bestseller") ||
        (second.reviewCount ?? 0) - (first.reviewCount ?? 0)
      );
    }

    if (sort === "new") {
      return compareFlag(first, second, "new") || compareCreatedAt(first, second);
    }

    if (sort === "price-asc") {
      return first.price - second.price;
    }

    if (sort === "price-desc") {
      return second.price - first.price;
    }

    if (sort === "rating-desc") {
      return (second.rating ?? 0) - (first.rating ?? 0);
    }

    if (sort === "name-asc") {
      return first.name.localeCompare(second.name);
    }

    return 0;
  });
}

function filterProducts({
  category,
  collection,
  products,
  status,
  stock,
}: {
  category: string;
  collection: string;
  products: Product[];
  status: ProductStatusFlag | "all";
  stock: StockFilter;
}) {
  return products.filter((product) => {
    if (status !== "all" && !product.statusFlags.includes(status)) {
      return false;
    }

    if (collection !== "all" && !product.collectionNames.includes(collection)) {
      return false;
    }

    if (category !== "all" && !product.categoryNames.includes(category)) {
      return false;
    }

    if (stock === "in-stock" && !hasStock(product)) {
      return false;
    }

    if (stock === "sold-out" && hasStock(product)) {
      return false;
    }

    return true;
  });
}

function buildSortOptions(products: Product[]) {
  const options: Option[] = [{ label: "Recommended", value: "recommended" }];
  const hasFlag = (flag: ProductStatusFlag) =>
    products.some((product) => product.statusFlags.includes(flag));

  if (hasFlag("featured")) {
    options.push({ label: "Featured", value: "featured" });
  }

  if (hasFlag("bestseller")) {
    options.push({ label: "Bestseller", value: "bestseller" });
  }

  if (hasFlag("new")) {
    options.push({ label: "New arrivals", value: "new" });
  }

  if (products.some((product) => product.rating)) {
    options.push({ label: "Top rated", value: "rating-desc" });
  }

  return [
    ...options,
    { label: "Price: Low to High", value: "price-asc" },
    { label: "Price: High to Low", value: "price-desc" },
    { label: "Name: A to Z", value: "name-asc" },
  ];
}

function buildPageHref({
  basePath,
  category,
  collection,
  page,
  sort,
  status,
  stock,
}: {
  basePath: string;
  category: string;
  collection: string;
  page: number;
  sort: SortValue;
  status: ProductStatusFlag | "all";
  stock: StockFilter;
}) {
  const query = new URLSearchParams();

  if (category !== "all") {
    query.set("category", category);
  }

  if (collection !== "all") {
    query.set("collection", collection);
  }

  if (sort !== "recommended") {
    query.set("sort", sort);
  }

  if (status !== "all") {
    query.set("status", status);
  }

  if (stock !== "all") {
    query.set("stock", stock);
  }

  if (page > 1) {
    query.set("page", String(page));
  }

  const search = query.toString();
  return search ? `${basePath}?${search}` : basePath;
}

export function ProductListingPage({
  basePath,
  count,
  description,
  emptyMessage = "Nothing matches those filters.",
  eyebrow,
  limit,
  products,
  searchParams,
  title,
}: ProductListingPageProps) {
  const statusOptions = (["featured", "bestseller", "new", "sale"] as const).filter((flag) =>
    products.some((product) => product.statusFlags.includes(flag)),
  );
  const collectionOptions = getUniqueOptions(
    products.flatMap((product) => product.collectionNames),
  );
  const categoryOptions = getUniqueOptions(
    products.flatMap((product) => product.categoryNames),
  );
  const sortOptions = buildSortOptions(products);
  const requestedCategory = getSearchValue(searchParams.category);
  const requestedCollection = getSearchValue(searchParams.collection);
  const requestedSort = getSearchValue(searchParams.sort);
  const requestedStatus = getSearchValue(searchParams.status);
  const requestedStock = getSearchValue(searchParams.stock);
  const category =
    requestedCategory && categoryOptions.includes(requestedCategory)
      ? requestedCategory
      : "all";
  const collection =
    requestedCollection && collectionOptions.includes(requestedCollection)
      ? requestedCollection
      : "all";
  const sort =
    requestedSort &&
    sortOptions.some((option) => option.value === requestedSort)
      ? (requestedSort as SortValue)
      : "recommended";
  const status =
    requestedStatus &&
    statusOptions.includes(requestedStatus as ProductStatusFlag)
      ? (requestedStatus as ProductStatusFlag)
      : "all";
  const stock =
    requestedStock && ["in-stock", "sold-out"].includes(requestedStock)
      ? (requestedStock as StockFilter)
      : "all";
  const filteredProducts = filterProducts({
    category,
    collection,
    products,
    status,
    stock,
  });
  const sortedProducts = sortProducts(filteredProducts, sort);
  const totalPages = Math.max(1, Math.ceil(sortedProducts.length / limit));
  const currentPage = Math.min(getPageFromSearchParams(searchParams), totalPages);
  const pageStart = (currentPage - 1) * limit;
  const pageProducts = sortedProducts.slice(pageStart, pageStart + limit);
  const activeFilterCount = [
    status !== "all",
    collection !== "all",
    category !== "all",
    stock !== "all",
  ].filter(Boolean).length;
  const hasCustomQuery = activeFilterCount > 0 || sort !== "recommended";
  const pageHref = (page: number) =>
    buildPageHref({
      basePath,
      category,
      collection,
      page,
      sort,
      status,
      stock,
    });

  return (
    <>
      <section>
        <Container className="pb-8 pt-16">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h1 className="mt-3 font-display text-5xl tracking-tight md:text-6xl">
            {title}
          </h1>
          <p className="mt-4 max-w-xl text-muted-foreground">{description}</p>
        </Container>
      </section>

      <div className="sticky top-16 z-30 border-y border-border bg-background/85 backdrop-blur-xl">
        <Container className="py-2 text-sm">
          <details open={activeFilterCount > 0}>
            <summary className="flex min-h-10 cursor-pointer list-none items-center justify-between gap-3 rounded-[var(--radius)] px-4 transition-colors hover:bg-secondary">
              <span className="inline-flex items-center gap-2 font-medium">
                <Icon className="size-4" name="sliders-horizontal" />
                Filters &amp; sort
                {activeFilterCount > 0 ? (
                  <span className="rounded-full bg-primary px-1.5 py-0.5 text-[0.65rem] text-primary-foreground">
                    {activeFilterCount}
                  </span>
                ) : null}
              </span>
              <span className="text-xs text-muted-foreground">
                {sortedProducts.length === count
                  ? `${count} products`
                  : `${sortedProducts.length} of ${count} products`}
              </span>
            </summary>

            <form
              action={basePath}
              className="grid gap-3 border-t border-border py-4 md:grid-cols-3 lg:grid-cols-6"
              method="get"
            >
              {statusOptions.length > 0 ? (
                <FilterSelect
                  label="Status"
                  name="status"
                  options={statusOptions.map((flag) => ({
                    label: statusLabels[flag],
                    value: flag,
                  }))}
                  value={status}
                />
              ) : null}

              {collectionOptions.length > 1 ? (
                <FilterSelect
                  label="Collection"
                  name="collection"
                  options={collectionOptions.map((option) => ({
                    label: option,
                    value: option,
                  }))}
                  value={collection}
                />
              ) : null}

              {categoryOptions.length > 1 ? (
                <FilterSelect
                  label="Category"
                  name="category"
                  options={categoryOptions.map((option) => ({
                    label: option,
                    value: option,
                  }))}
                  value={category}
                />
              ) : null}

              <FilterSelect
                label="Availability"
                name="stock"
                options={[
                  { label: "In stock", value: "in-stock" },
                  { label: "Sold out", value: "sold-out" },
                ]}
                value={stock}
              />

              <FilterSelect
                includeAll={false}
                label="Sort"
                name="sort"
                options={sortOptions}
                value={sort}
              />

              <div className="flex items-end gap-2">
                <Button className="h-11 flex-1" type="submit" variant="secondary">
                  <Icon className="size-4" name="arrow-up-down" />
                  Apply
                </Button>
                {hasCustomQuery ? (
                  <Link className={buttonClasses("ghost", "h-11")} href={basePath}>
                    Clear
                  </Link>
                ) : null}
              </div>
            </form>
          </details>
        </Container>
      </div>

      <section>
        <Container className="py-10">
          {pageProducts.length === 0 ? (
            <div className="py-32 text-center text-muted-foreground">{emptyMessage}</div>
          ) : (
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6 lg:grid-cols-4">
              {pageProducts.map((product, index) => (
                <ProductCard index={index} key={product.id} product={product} />
              ))}
            </div>
          )}

          {totalPages > 1 ? (
            <nav
              aria-label="Product pagination"
              className="mt-12 flex items-center justify-center gap-3 text-sm"
            >
              {currentPage > 1 ? (
                <Link className={buttonClasses("secondary")} href={pageHref(currentPage - 1)}>
                  Previous
                </Link>
              ) : (
                <span
                  aria-disabled="true"
                  className={buttonClasses("secondary", "pointer-events-none opacity-40")}
                >
                  Previous
                </span>
              )}

              <span className="text-xs text-muted-foreground">
                Page {currentPage} of {totalPages}
              </span>

              {currentPage < totalPages ? (
                <Link className={buttonClasses("secondary")} href={pageHref(currentPage + 1)}>
                  Next
                </Link>
              ) : (
                <span
                  aria-disabled="true"
                  className={buttonClasses("secondary", "pointer-events-none opacity-40")}
                >
                  Next
                </span>
              )}
            </nav>
          ) : null}
        </Container>
      </section>
    </>
  );
}

function FilterSelect({
  includeAll = true,
  label,
  name,
  options,
  value,
}: {
  includeAll?: boolean;
  label: string;
  name: string;
  options: Option[];
  value: string;
}) {
  return (
    <label className="grid gap-2 text-xs uppercase tracking-[0.22em] text-muted-foreground">
      {label}
      <select
        className={cx(
          "h-11 rounded-[var(--radius)] border border-border bg-background px-3 text-sm normal-case tracking-normal text-foreground outline-none transition-colors",
          "focus:border-primary",
        )}
        defaultValue={value}
        name={name}
      >
        {includeAll ? <option value="all">All</option> : null}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}
