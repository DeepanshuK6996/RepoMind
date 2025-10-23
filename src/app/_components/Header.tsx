"use client";

import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  NavbarButton,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from "@/components/ui/resizable-navbar";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export function Header() {
  const navItems = [
    { name: "Features", link: "#features" },
    { name: "How It Works", link: "#pricing" },
    { name: "Contact", link: "#contact" },
  ];

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="relative w-full rounded-2xl border-b-2 border-neutral-700 bg-black text-white">
      <Navbar className="border-b border-neutral-800 bg-black text-white">
        {/* Desktop Navigation */}
        <NavBody>
          {/* Logo */}
          <div className="flex items-center gap-2">
            <Image
              src="/icon.svg"
              width={30}
              height={30}
              alt="RepoMind icon"
              className="rounded-sm"
            />
            <h1 className="text-lg font-bold">RepoMind</h1>
          </div>

          {/* Nav Links */}
          <NavItems
            items={navItems.map((item) => ({
              ...item,
              className:
                "text-white hover:text-neutral-300 transition-colors duration-200",
            }))}
          />

          {/* Buttons */}
          <div className="flex items-center gap-3">
            <Link href={'/dashboard'}>
            <NavbarButton
              variant="primary"
              className="bg-white font-medium text-black transition hover:bg-neutral-200"
            >
              Get Started
            </NavbarButton>
            </Link>
          </div>
        </NavBody>

        {/* Mobile Navigation */}
        <MobileNav>
          <div className="flex w-full items-center justify-between gap-4 border-t border-neutral-800 bg-black px-4 py-4 text-white -mt-2">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <Image
                src="/icon.svg"
                width={25}
                height={25}
                alt="RepoMind icon"
                className="rounded-sm"
              />
              <h1 className="font-semibold text-white">RepoMind</h1>
            </div>

            {/* Nav Links */}
            <nav className="flex items-center gap-4">
              {navItems.map((item, idx) => (
                <Link
                  key={`mobile-link-${idx}`}
                  href={item.link}
                  className="text-sm font-medium text-white transition-colors hover:text-neutral-300"
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            {/* Buttons */}
            <div className="flex items-center gap-3">
              <Link href={'/dashboard'}>
              <NavbarButton
                variant="primary"
                className="w-fit bg-white text-black transition hover:bg-neutral-200"
              >
                Get Started!
              </NavbarButton>
              </Link>
            </div>
          </div>
        </MobileNav>
      </Navbar>
    </header>
  );
}
