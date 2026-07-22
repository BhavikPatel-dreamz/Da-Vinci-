"use client";

import { ProductCard } from "@/components/sections/product-card";
import { Button, ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Icon } from "@/components/ui/icon";
import { Eyebrow } from "@/components/ui/section-title";
import { useWishlist } from "@/components/wishlist/wishlist-provider";

export function WishlistPage() {
  const { clearWishlist, count, items } = useWishlist();

  return (
    <>
      <section>
        <Container className="pb-8 pt-16">
          <Eyebrow>Wishlist</Eyebrow>
          <h1 className="mt-3 font-display text-5xl tracking-tight md:text-6xl">
            Saved for later.
          </h1>
          <p className="mt-4 max-w-xl text-muted-foreground">
            Your wishlist is stored locally in this browser. Sign-in sync can be added later if the backend exposes it.
          </p>
        </Container>
      </section>

      <section>
        <Container className="py-10">
          {count === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-lg border border-border bg-surface px-6 py-24 text-center">
              <Icon className="size-8 text-muted-foreground" name="heart" />
              <h2 className="mt-5 font-display text-2xl tracking-tight">
                Nothing saved yet
              </h2>
              <p className="mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">
                Tap the heart on any product to keep it here for a later session.
              </p>
              <ButtonLink className="mt-6" href="/products">
                Browse products
              </ButtonLink>
            </div>
          ) : (
            <>
              <div className="mb-8 flex items-center justify-between gap-4">
                <p className="text-sm text-muted-foreground">
                  {count} saved {count === 1 ? "product" : "products"}
                </p>
                <Button onClick={clearWishlist} type="button" variant="secondary">
                  Clear wishlist
                </Button>
              </div>
              <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6 lg:grid-cols-4">
                {items.map((product, index) => (
                  <ProductCard index={index} key={product.id} product={product} />
                ))}
              </div>
            </>
          )}
        </Container>
      </section>
    </>
  );
}
