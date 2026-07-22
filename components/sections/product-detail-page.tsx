"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type ReactNode } from "react";
import type { IconName, Product, ProductVariant } from "@/types/site";
import { cx } from "@/lib/utils";
import { useCart } from "@/components/cart/cart-provider";
import { ProductCard } from "@/components/sections/product-card";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Icon } from "@/components/ui/icon";
import { Eyebrow } from "@/components/ui/section-title";
import { WishlistButton } from "@/components/wishlist/wishlist-button";

type ProductDetailPageProps = {
  product: Product;
  relatedProducts: Product[];
};

type ProductAccordionItem = {
  value: string;
  title: string;
  content: ReactNode;
  contentClassName?: string;
};

const swatchClasses: Record<string, string> = {
  "#0d0d0f": "bg-[#0d0d0f]",
  "#4a4a4e": "bg-[#4a4a4e]",
  "#8a8a8e": "bg-[#8a8a8e]",
  "#c97c3d": "bg-[#c97c3d]",
};

const trustItems: { icon: IconName; label: string }[] = [
  { icon: "shield-check", label: "10-yr warranty" },
  { icon: "truck", label: "Free over $100" },
  { icon: "rotate-ccw", label: "30-day returns" },
];

export function ProductDetailPage({ product, relatedProducts }: ProductDetailPageProps) {
  const router = useRouter();
  const { addLineItem, error: cartError, isMutating } = useCart();
  const [activeImage, setActiveImage] = useState(0);
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [addingMode, setAddingMode] = useState<"cart" | "buy" | null>(null);
  const selectedVariant = product.variants[selectedVariantIndex] ?? product.variants[0];
  const comparisonProducts = [product, ...relatedProducts.slice(0, 2)];
  const canPurchase = Boolean(selectedVariant.id && selectedVariant.inStock);

  async function addSelectedVariant(action: "cart" | "buy" = "cart") {
    if (!canPurchase) {
      return;
    }

    setAddingMode(action);

    try {
      const nextCart = await addLineItem(selectedVariant.id, quantity);

      if (!nextCart) {
        return;
      }

      if (action === "buy") {
        router.push("/checkout");
        return;
      }

      setAdded(true);
      window.setTimeout(() => setAdded(false), 1500);
    } catch {
      // The cart provider owns the user-facing error state.
    } finally {
      setAddingMode(null);
    }
  }

  return (
    <>
      <Container className="pt-8">
        <nav aria-label="Breadcrumb" className="text-xs text-muted-foreground">
          <Link className="hover:text-foreground" href="/collections">
            Shop
          </Link>{" "}
          / <span className="text-foreground">{product.name}</span>
        </nav>
      </Container>

      <section>
        <Container className="grid gap-10 py-8 md:py-12 lg:grid-cols-[1fr_460px] lg:gap-16">
          <ProductGallery
            activeImage={activeImage}
            onImageChange={setActiveImage}
            product={product}
          />

          <div className="lg:sticky lg:top-24 lg:self-start">
            {product.badge ? <Eyebrow className="text-primary">{product.badge}</Eyebrow> : null}
            <h1 className="mt-2 font-display text-4xl tracking-tight md:text-5xl">
              {product.name}
            </h1>
            <p className="mt-2 text-muted-foreground">{product.subtitle}</p>

            {product.rating && product.reviewCount ? (
              <div className="mt-4 flex items-center gap-2 text-sm">
                <StarRating iconClassName="size-3.5" />
                <span className="text-muted-foreground">
                  {product.rating} {"\u00b7"} {product.reviewCount} reviews
                </span>
              </div>
            ) : null}

            <div className="mt-6 flex items-baseline gap-3">
              <div className="text-3xl tabular-nums">
                {selectedVariant.priceDisplay}
              </div>
              {product.compareAt ? (
                <div className="text-lg text-muted-foreground line-through tabular-nums">
                  {product.compareAtDisplay}
                </div>
              ) : null}
            </div>

            <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
              {product.shortDescription}
            </p>

            <VariantSelector
              onChange={setSelectedVariantIndex}
              optionLabel={product.optionLabel}
              selectedIndex={selectedVariantIndex}
              variants={product.variants}
            />

            <div className="mt-8 grid grid-cols-[auto_1fr] gap-3">
              <div className="inline-flex h-12 items-center rounded border border-border">
                <button
                  aria-label="Decrease"
                  className="grid size-12 place-items-center transition-colors hover:bg-secondary"
                  onClick={() => setQuantity((current) => Math.max(1, current - 1))}
                  type="button"
                >
                  <Icon className="size-4" name="minus" />
                </button>
                <span className="w-10 text-center text-sm tabular-nums">{quantity}</span>
                <button
                  aria-label="Increase"
                  className="grid size-12 place-items-center transition-colors hover:bg-secondary"
                  onClick={() => setQuantity((current) => current + 1)}
                  type="button"
                >
                  <Icon className="size-4" name="plus" />
                </button>
              </div>

              <Button
                className="relative h-12 w-full overflow-hidden disabled:cursor-not-allowed disabled:opacity-50"
                disabled={!canPurchase || isMutating}
                onClick={() => void addSelectedVariant("cart")}
                type="button"
              >
                {added ? (
                  <span className="inline-flex animate-[ticker-in_180ms_ease-out_both] items-center gap-2">
                    <Icon className="size-4" name="check" />
                    Added
                  </span>
                ) : (
                  <span className="animate-[ticker-in_180ms_ease-out_both]">
                    {addingMode === "cart"
                      ? "Adding..."
                      : canPurchase
                        ? "Add to cart"
                        : "Sold out"}
                  </span>
                )}
              </Button>
            </div>

            <Button
              className="mt-3 h-12 w-full disabled:cursor-not-allowed disabled:opacity-50"
              disabled={!canPurchase || isMutating}
              onClick={() => void addSelectedVariant("buy")}
              type="button"
              variant="secondary"
            >
              {addingMode === "buy" ? "Preparing..." : "Buy now"}
            </Button>
            <WishlistButton className="mt-3 h-12 w-full" product={product} showLabel />
            {cartError ? <p className="mt-3 text-xs text-primary">{cartError}</p> : null}

            <div className="mt-4 text-xs text-muted-foreground">
              {selectedVariant.inStock ? (
                <span className="text-primary">
                  {"\u25cf"} In stock {"\u2014"} ships in 1{"\u2013"}2 days
                </span>
              ) : (
                <span>Currently sold out</span>
              )}
            </div>

            <div className="mt-8 grid grid-cols-3 gap-3 border-t border-border pt-6 text-xs text-muted-foreground">
              {trustItems.map((item) => (
                <TrustItem icon={item.icon} key={item.label} label={item.label} />
              ))}
            </div>

            <ProductAccordion items={getProductAccordionItems(product)} />
          </div>
        </Container>
      </section>

      <ProductFeatures product={product} />
      <ProductComparison comparisonProducts={comparisonProducts} product={product} />
      <ProductReviews product={product} />
      <RelatedProducts products={relatedProducts} />
    </>
  );
}

function ProductGallery({
  activeImage,
  onImageChange,
  product,
}: {
  activeImage: number;
  onImageChange: (imageIndex: number) => void;
  product: Product;
}) {
  return (
    <div>
      <div className="relative aspect-square overflow-hidden rounded-lg bg-surface">
        <Image
          alt={product.name}
          className="animate-[gallery-in_350ms_ease-out_both] object-cover"
          fill
          key={product.images[activeImage]}
          priority
          sizes="(min-width: 1024px) 58vw, 100vw"
          src={product.images[activeImage]}
        />
      </div>
      <div className="mt-3 grid grid-cols-4 gap-3">
        {product.images.map((image, index) => (
          <button
            aria-label={`View ${product.name} image ${index + 1}`}
            className={cx(
              "relative aspect-square overflow-hidden rounded border bg-surface transition-colors",
              index === activeImage
                ? "border-primary"
                : "border-border hover:border-muted-foreground",
            )}
            key={image}
            onClick={() => onImageChange(index)}
            type="button"
          >
            <Image
              alt=""
              aria-hidden="true"
              className="object-cover"
              fill
              sizes="(min-width: 1024px) 110px, 25vw"
              src={image}
            />
          </button>
        ))}
      </div>
    </div>
  );
}

function VariantSelector({
  onChange,
  optionLabel,
  selectedIndex,
  variants,
}: {
  onChange: (variantIndex: number) => void;
  optionLabel: string;
  selectedIndex: number;
  variants: ProductVariant[];
}) {
  const selectedVariant = variants[selectedIndex] ?? variants[0];

  return (
    <div className="mt-8">
      <div className="mb-3 flex items-center justify-between">
        <Eyebrow>{optionLabel}</Eyebrow>
        <div className="text-xs text-muted-foreground">{selectedVariant.name}</div>
      </div>
      <div className="flex gap-2">
        {variants.map((variant, index) => (
          <button
            aria-label={`Select ${variant.name}`}
            className={cx(
              "relative size-10 rounded-full border-2 transition-all",
              swatchClasses[variant.color] ?? "bg-muted",
              index === selectedIndex ? "scale-110 border-primary" : "border-border",
              variant.inStock ? "" : "opacity-40",
            )}
            aria-pressed={index === selectedIndex}
            disabled={!variant.inStock}
            key={variant.id}
            onClick={() => onChange(index)}
            title={`${variant.name}${variant.inStock ? "" : " - sold out"}`}
            type="button"
          >
            <span className="sr-only">{variant.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

function ProductAccordion({ items }: { items: ProductAccordionItem[] }) {
  const [openItem, setOpenItem] = useState<string | null>(null);

  return (
    <div className="mt-6 border-t border-border">
      {items.map((item) => {
        const isOpen = openItem === item.value;
        const panelId = `product-accordion-${item.value}`;

        return (
          <div className="border-b border-border" key={item.value}>
            <h3 className="flex">
              <button
                aria-controls={panelId}
                aria-expanded={isOpen}
                className="flex flex-1 cursor-pointer items-center justify-between py-4 text-left text-sm font-medium transition-all hover:underline"
                onClick={() => setOpenItem(isOpen ? null : item.value)}
                type="button"
              >
                {item.title}
                <Icon
                  className={cx(
                    "h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200",
                    isOpen ? "rotate-180" : "",
                  )}
                  name="chevron-down"
                />
              </button>
            </h3>
            {isOpen ? (
              <div
                className={cx(
                  "animate-[fade-in_200ms_ease-out_both] pb-4 pt-0",
                  item.contentClassName,
                )}
                id={panelId}
              >
                {item.content}
              </div>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}

function getProductAccordionItems(product: Product): ProductAccordionItem[] {
  const items: ProductAccordionItem[] = [
    {
      value: "desc",
      title: "Description",
      content: product.description,
      contentClassName: "text-sm leading-relaxed text-muted-foreground",
    },
    {
      value: "ship",
      title: "Shipping & Returns",
      content:
        "Free discreet shipping on orders over $100. 30-day returns, no questions asked. All devices ship with a 10-year hardware warranty; batteries and accessories 1-year.",
      contentClassName: "text-sm leading-relaxed text-muted-foreground",
    },
  ];

  if (product.specs.length > 0) {
    items.splice(1, 0, {
      value: "specs",
      title: "Specifications",
      content: (
        <table className="w-full text-sm">
          <tbody className="divide-y divide-border">
            {product.specs.map((spec) => (
              <tr key={spec.label}>
                <td className="w-1/3 py-2 text-muted-foreground">{spec.label}</td>
                <td className="py-2">{spec.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ),
    });
  }

  if (product.inBox.length > 0) {
    items.splice(product.specs.length > 0 ? 2 : 1, 0, {
      value: "box",
      title: "What's in the box",
      content: (
        <ul className="space-y-1.5 text-sm">
          {product.inBox.map((item) => (
            <li className="text-muted-foreground" key={item}>
              {"\u00b7"} {item}
            </li>
          ))}
        </ul>
      ),
    });
  }

  return items;
}

function ProductFeatures({ product }: { product: Product }) {
  if (product.features.length === 0) {
    return null;
  }

  return (
    <section className="border-t border-border">
      {product.features.map((feature, index) => (
        <Container
          className={cx(
            "grid items-center gap-12 py-16 md:grid-cols-2 md:py-24",
            index % 2 ? "md:[&>*:first-child]:order-2" : "",
          )}
          key={feature.title}
        >
          <div>
            <Eyebrow>Feature {String(index + 1).padStart(2, "0")}</Eyebrow>
            <h3 className="mt-3 max-w-md font-display text-3xl tracking-tight md:text-4xl">
              {feature.title}
            </h3>
            <p className="mt-4 max-w-md leading-relaxed text-muted-foreground">
              {feature.body}
            </p>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-surface">
            <Image
              alt=""
              aria-hidden="true"
              className="object-cover"
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              src={product.images[index % product.images.length]}
            />
          </div>
        </Container>
      ))}
    </section>
  );
}

function ProductComparison({
  comparisonProducts,
  product,
}: {
  comparisonProducts: Product[];
  product: Product;
}) {
  return (
    <section className="border-t border-border">
      <Container className="py-20">
        <Eyebrow>Compare</Eyebrow>
        <h3 className="mt-3 font-display text-3xl tracking-tight md:text-4xl">
          {product.name} vs. the rest of the line.
        </h3>
        <div className="mt-10 overflow-x-auto">
          <table className="w-full min-w-[640px] text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="py-4 text-left font-normal text-muted-foreground" />
                {comparisonProducts.map((comparisonProduct) => (
                  <th
                    className="py-4 text-left font-medium"
                    key={comparisonProduct.handle}
                  >
                    {comparisonProduct.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {product.specs.slice(0, 4).map((spec) => (
                <tr key={spec.label}>
                  <td className="py-3 text-muted-foreground">{spec.label}</td>
                  {comparisonProducts.map((comparisonProduct) => {
                    const matchingSpec = comparisonProduct.specs.find(
                      (candidate) => candidate.label === spec.label,
                    );

                    return (
                      <td className="py-3" key={comparisonProduct.handle}>
                        {matchingSpec ? matchingSpec.value : "\u2014"}
                      </td>
                    );
                  })}
                </tr>
              ))}
              <tr>
                <td className="py-3 text-muted-foreground">Price</td>
                {comparisonProducts.map((comparisonProduct) => (
                  <td className="py-3 tabular-nums" key={comparisonProduct.handle}>
                    {comparisonProduct.priceDisplay}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </Container>
    </section>
  );
}

function ProductReviews({ product }: { product: Product }) {
  if (!product.rating || !product.reviewCount) {
    return null;
  }

  return (
    <section className="border-t border-border">
      <Container className="grid gap-12 py-20 md:grid-cols-[280px_1fr]">
        <div>
          <div className="text-5xl tabular-nums">{product.rating}</div>
          <StarRating className="mt-2" iconClassName="size-4" />
          <div className="mt-1 text-xs text-muted-foreground">
            {product.reviewCount} verified reviews
          </div>
          <Button className="mt-6 w-full" type="button" variant="secondary">
            Write a review
          </Button>
        </div>

        <div className="space-y-6">
          {product.reviews.length > 0 ? (
            product.reviews.map((review) => (
              <div className="border-b border-border pb-6" key={review.title}>
                <StarRating className="mb-2" iconClassName="size-3" />
                <h4 className="font-medium">{review.title}</h4>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {review.body}
                </p>
                <div className="mt-3 text-xs text-muted-foreground">
                  {"\u2014"} {review.author}, verified buyer
                </div>
              </div>
            ))
          ) : (
            <div className="rounded-lg border border-border bg-surface p-6 text-sm text-muted-foreground">
              Written reviews are not configured for this product yet.
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}

function RelatedProducts({ products }: { products: Product[] }) {
  return (
    <section className="border-t border-border">
      <Container className="py-20">
        <Eyebrow>You may also like</Eyebrow>
        <h3 className="mt-3 font-display text-3xl tracking-tight md:text-4xl">
          Pairs well with.
        </h3>
        <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
          {products.map((product, index) => (
            <ProductCard index={index} key={product.handle} product={product} />
          ))}
        </div>
      </Container>
    </section>
  );
}

function StarRating({
  className,
  iconClassName,
}: {
  className?: string;
  iconClassName?: string;
}) {
  return (
    <div className={cx("flex gap-0.5", className)}>
      {[0, 1, 2, 3, 4].map((star) => (
        <Icon
          className={cx("fill-primary text-primary", iconClassName)}
          key={star}
          name="star"
        />
      ))}
    </div>
  );
}

function TrustItem({ icon, label }: { icon: IconName; label: string }) {
  return (
    <div className="flex items-center gap-2">
      <Icon className="size-4 text-primary" name={icon} />
      <span>{label}</span>
    </div>
  );
}
