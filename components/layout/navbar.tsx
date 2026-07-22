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
    <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur-xl">
      <Container className="grid h-16 grid-cols-[auto_1fr_auto] items-center gap-6">
        <div className="flex items-center gap-8">
          <Logo />
          <nav className="hidden items-center gap-6 text-sm text-muted-foreground md:flex">
            {navItems.map((item) => (
              <Link
                className="transition-colors hover:text-foreground"
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
          <Button aria-label="Search" className="hidden md:inline-flex" type="button" variant="ghost">
            <Icon className="size-4" name="search" />
          </Button>
          <Button
            aria-label="Account"
            className="hidden md:inline-flex"
            type="button"
            variant="ghost"
          >
            <Icon className="size-4" name="user" />
          </Button>
          <ButtonLink
            aria-label={`Wishlist, ${wishlistCount} items`}
            className="relative"
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
            className="relative"
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
