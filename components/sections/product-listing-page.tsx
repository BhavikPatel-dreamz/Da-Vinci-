"use client";

import { useState } from "react";
import type { Product, ProductStatusFlag } from "@/types/site";
import { ProductCard } from "@/components/sections/product-card";
import { Button, buttonClasses } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Icon } from "@/components/ui/icon";
import { Eyebrow } from "@/components/ui/section-title";
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
  offset: number;
  products: Product[];
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

export function ProductListingPage({
  count,
  description,
  emptyMessage = "Nothing matches those filters.",
  eyebrow,
  limit,
  offset,
  products,
  title,
}: ProductListingPageProps) {
  const initialPage = Math.max(1, Math.floor(offset / limit) + 1);
  const [category, setCategory] = useState("all");
  const [collection, setCollection] = useState("all");
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [sort, setSort] = useState<SortValue>("recommended");
  const [status, setStatus] = useState<ProductStatusFlag | "all">("all");
  const [stock, setStock] = useState<StockFilter>("all");
  const statusOptions = (["featured", "bestseller", "new", "sale"] as const).filter((flag) =>
    products.some((product) => product.statusFlags.includes(flag)),
  );
  const collectionOptions = getUniqueOptions(
    products.flatMap((product) => product.collectionNames),
  );
  const categoryOptions = getUniqueOptions(products.flatMap((product) => product.categoryNames));
  const sortOptions = buildSortOptions(products);
  const filteredProducts = filterProducts({
    category,
    collection,
    products,
    status,
    stock,
  });
  const sortedProducts = sortProducts(filteredProducts, sort);
  const totalPages = Math.max(1, Math.ceil(sortedProducts.length / limit));
  const safeCurrentPage = Math.min(currentPage, totalPages);
  const pageStart = (safeCurrentPage - 1) * limit;
  const pageProducts = sortedProducts.slice(pageStart, pageStart + limit);
  const activeFilterCount = [status !== "all", collection !== "all", category !== "all", stock !== "all"].filter(Boolean).length;

  function clearFilters() {
    setCategory("all");
    setCollection("all");
    setStatus("all");
    setStock("all");
    setCurrentPage(1);
  }

  function updateCategory(value: string) {
    setCategory(value);
    setCurrentPage(1);
  }

  function updateCollection(value: string) {
    setCollection(value);
    setCurrentPage(1);
  }

  function updateSort(value: SortValue) {
    setSort(value);
    setCurrentPage(1);
  }

  function updateStatus(value: ProductStatusFlag | "all") {
    setStatus(value);
    setCurrentPage(1);
  }

  function updateStock(value: StockFilter) {
    setStock(value);
    setCurrentPage(1);
  }

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
        <Container className="flex min-h-14 flex-wrap items-center justify-between gap-3 py-2 text-sm">
          <Button
            aria-expanded={filtersOpen}
            onClick={() => setFiltersOpen((open) => !open)}
            type="button"
            variant="ghost"
          >
            <Icon className="size-4" name="sliders-horizontal" />
            Filters
            {activeFilterCount > 0 ? (
              <span className="rounded-full bg-primary px-1.5 py-0.5 text-[0.65rem] text-primary-foreground">
                {activeFilterCount}
              </span>
            ) : null}
          </Button>
          <div className="text-xs text-muted-foreground">
            {sortedProducts.length === count
              ? `${count} products`
              : `${sortedProducts.length} of ${count} products`}
          </div>
          <label className={buttonClasses("ghost", "cursor-pointer")}>
            <Icon className="size-4" name="arrow-up-down" />
            <select
              aria-label="Sort products"
              className="border-0 bg-transparent text-muted-foreground text-sm focus:outline-none"
              onChange={(event) => updateSort(event.target.value as SortValue)}
              value={sort}
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>
        </Container>

        {filtersOpen ? (
          <Container className="grid gap-3 border-t border-border py-4 md:grid-cols-4">
            {statusOptions.length > 0 ? (
              <FilterSelect
                label="Status"
                onChange={(value) => updateStatus(value as ProductStatusFlag | "all")}
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
                onChange={updateCollection}
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
                onChange={updateCategory}
                options={categoryOptions.map((option) => ({
                  label: option,
                  value: option,
                }))}
                value={category}
              />
            ) : null}

            <FilterSelect
              label="Availability"
              onChange={(value) => updateStock(value as StockFilter)}
              options={[
                { label: "In stock", value: "in-stock" },
                { label: "Sold out", value: "sold-out" },
              ]}
              value={stock}
            />

            {activeFilterCount > 0 ? (
              <Button className="md:self-end" onClick={clearFilters} type="button" variant="secondary">
                Clear filters
              </Button>
            ) : null}
          </Container>
        ) : null}
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
              <button
                className={buttonClasses("secondary", safeCurrentPage <= 1 ? "pointer-events-none opacity-40" : "")}
                disabled={safeCurrentPage <= 1}
                onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
                type="button"
              >
                Previous
              </button>

              <span className="text-xs text-muted-foreground">
                Page {safeCurrentPage} of {totalPages}
              </span>

              <button
                className={buttonClasses("secondary", safeCurrentPage >= totalPages ? "pointer-events-none opacity-40" : "")}
                disabled={safeCurrentPage >= totalPages}
                onClick={() => setCurrentPage((page) => Math.min(totalPages, page + 1))}
                type="button"
              >
                Next
              </button>
            </nav>
          ) : null}
        </Container>
      </section>
    </>
  );
}

function FilterSelect({
  label,
  onChange,
  options,
  value,
}: {
  label: string;
  onChange: (value: string) => void;
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
        onChange={(event) => onChange(event.target.value)}
        value={value}
      >
        <option value="all">All</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}
