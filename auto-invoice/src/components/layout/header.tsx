"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="container flex h-16 md:h-20 max-w-screen-2xl items-center justify-between px-4 md:px-6 lg:px-8">
        <div className="flex items-center">
          <Link href="/" className="flex items-center">
            <span className="text-lg md:text-xl lg:text-2xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              Invoice Auto-Sender
            </span>
          </Link>
        </div>
        <div className="flex items-center space-x-1 md:space-x-2 lg:space-x-4">
          <nav className="hidden md:flex items-center space-x-1 md:space-x-2 lg:space-x-4">
            <Button asChild variant="ghost" className="px-2 md:px-4">
              <Link href="/dashboard">Dashboard</Link>
            </Button>
            <Button asChild variant="ghost" className="px-2 md:px-4">
              <Link href="/invoices">Invoices</Link>
            </Button>
          </nav>
          <Button
            asChild
            variant="default"
            className="hidden md:flex px-3 md:px-4 lg:px-6"
          >
            <Link href="/auth">Sign In</Link>
          </Button>

          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {isMenuOpen ? (
                <path d="M18 6 6 18M6 6l12 12" />
              ) : (
                <path d="M4 12h16M4 6h16M4 18h16" />
              )}
            </svg>
          </Button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-border/40 bg-background">
          <nav className="flex flex-col p-4 space-y-3">
            <Button asChild variant="ghost" className="justify-start">
              <Link href="/dashboard">Dashboard</Link>
            </Button>
            <Button asChild variant="ghost" className="justify-start">
              <Link href="/invoices">Invoices</Link>
            </Button>
            <Button asChild variant="default" className="mt-2">
              <Link href="/auth">Sign In</Link>
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}
