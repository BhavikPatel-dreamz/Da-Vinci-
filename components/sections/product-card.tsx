import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/types/site";
import { ProductCardAddToCartButton } from "@/components/cart/product-card-add-to-cart-button";
import { Badge } from "@/components/ui/badge";
import { Icon } from "@/components/ui/icon";
import { Reveal } from "@/components/ui/reveal";
import { WishlistButton } from "@/components/wishlist/wishlist-button";

export function ProductCard({ index, product }: { index: number; product: Product }) {
  const [primaryImage, hoverImage] = product.images;
  const delay = ([0, 50, 100, 150] as const)[index % 4];

  return (
    <Reveal delay={delay}>
      <article className="group">
        <div className="relative aspect-[4/5] overflow-hidden rounded-xl border border-border bg-surface-elevated">
          <Link aria-label={`View ${product.name}`} className="block size-full" href={`/products/${product.handle}`}>
            <Image
              alt={product.name}
              className="object-cover transition-[opacity,transform] duration-700 group-hover:scale-[1.03] group-hover:opacity-0"
              fill
              sizes="(min-width: 768px) 25vw, 50vw"
              src={primaryImage}
            />
            {hoverImage ? (
              <Image
                alt=""
                aria-hidden="true"
                className="scale-105 object-cover opacity-0 transition-[opacity,transform] duration-700 group-hover:scale-100 group-hover:opacity-100"
                fill
                sizes="(min-width: 768px) 25vw, 50vw"
                src={hoverImage}
              />
            ) : null}
          </Link>
          {product.badge ? <Badge className="absolute left-3 top-3">{product.badge}</Badge> : null}
          <WishlistButton
            className="absolute right-3 top-3 size-9 rounded-full px-0 py-0"
            product={product}
          />
          <ProductCardAddToCartButton
            className="absolute right-3 top-14 size-9"
            product={product}
          />
        </div>
        <Link className="mt-5 grid grid-cols-[1fr_auto] gap-4" href={`/products/${product.handle}`}>
          <div className="min-w-0">
            <h3 className="truncate font-display text-base font-medium tracking-tight">{product.name}</h3>
            <p className="mt-1 truncate text-xs text-muted-foreground">{product.subtitle}</p>
            {product.rating && product.reviewCount ? (
              <div className="mt-2 flex items-center gap-1 text-xs text-muted-foreground">
                <Icon className="size-3 fill-primary text-primary" name="star" />
                <span className="tabular-nums">{product.rating}</span>
                <span>{"\u00b7"}</span>
                <span>{product.reviewCount} reviews</span>
              </div>
            ) : null}
          </div>
          <div className="text-right text-sm tabular-nums">
            {product.compareAt ? (
              <div className="text-xs text-muted-foreground line-through">
                {product.compareAtDisplay}
              </div>
            ) : null}
            <div>{product.priceDisplay}</div>
          </div>
        </Link>
      </article>
    </Reveal>
  );
}
