"use client";

import Link from "next/link";
import { useState } from "react";
import { navItems } from "@/lib/data";
import { Button, ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Icon } from "@/components/ui/icon";
import { Logo } from "@/components/layout/logo";

type NavbarProps = {
  cartCount: number;
  onCartOpen: () => void;
  wishlistCount: number;
};

export function Navbar({ cartCount, onCartOpen, wishlistCount }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur-2xl supports-[backdrop-filter]:bg-background/72">
      <Container className="grid h-[4.5rem] grid-cols-[auto_1fr_auto] items-center gap-6">
        <div className="flex items-center gap-8">
          <Logo />
          <nav className="hidden items-center gap-7 text-[0.72rem] font-medium uppercase tracking-[0.11em] text-muted-foreground md:flex">
            {navItems.map((item) => (
              <Link
                className="relative py-2 transition-colors after:absolute after:inset-x-0 after:bottom-0 after:h-px after:origin-left after:scale-x-0 after:bg-primary after:transition-transform hover:text-foreground hover:after:scale-x-100"
                href={item.href}
                key={item.href}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <div />

        <div className="flex items-center gap-1">
          <Button aria-label="Search" className="hidden rounded-full md:inline-flex" type="button" variant="ghost">
            <Icon className="size-4" name="search" />
          </Button>
          <Button
            aria-label="Account"
            className="hidden rounded-full md:inline-flex"
            type="button"
            variant="ghost"
          >
            <Icon className="size-4" name="user" />
          </Button>
          <ButtonLink className="ml-2 hidden px-4 py-2 text-xs uppercase tracking-[0.1em] md:inline-flex" href="/products">
            Shop now
          </ButtonLink>
          <ButtonLink
            aria-label={`Wishlist, ${wishlistCount} items`}
            className="relative rounded-full"
            href="/wishlist"
            variant="ghost"
          >
            <Icon className="size-4" name="heart" />
            <span className="text-xs tabular-nums">{wishlistCount}</span>
            {wishlistCount > 0 ? (
              <span className="absolute -right-0.5 -top-0.5 size-2 rounded-full bg-primary" />
            ) : null}
          </ButtonLink>
          <Button
            aria-label={`Cart, ${cartCount} items`}
            className="relative rounded-full"
            onClick={onCartOpen}
            type="button"
            variant="ghost"
          >
            <Icon className="size-4" name="shopping-bag" />
            <span className="text-xs tabular-nums">{cartCount}</span>
            {cartCount > 0 ? (
              <span className="absolute -right-0.5 -top-0.5 size-2 rounded-full bg-primary" />
            ) : null}
          </Button>
          <Button
            aria-expanded={menuOpen}
            aria-label="Menu"
            className="md:hidden"
            onClick={() => setMenuOpen((open) => !open)}
            type="button"
            variant="ghost"
          >
            <Icon className="size-4" name={menuOpen ? "x" : "menu"} />
          </Button>
        </div>
      </Container>

      {menuOpen ? (
        <nav className="border-t border-border py-4 md:hidden">
          <Container className="flex flex-col gap-3 text-sm">
            {navItems.map((item) => (
              <Link href={item.href} key={item.href} onClick={() => setMenuOpen(false)}>
                {item.label}
              </Link>
            ))}
            <Link href="/wishlist" onClick={() => setMenuOpen(false)}>
              Wishlist
            </Link>
          </Container>
        </nav>
      ) : null}
    </header>
  );
}
