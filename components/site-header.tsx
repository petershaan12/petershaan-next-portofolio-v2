"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { MainNav } from "./main-nav";
import { MobileNav } from "./mobile-nav";
import { ModeToogle } from "./mode-toggle";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export function SiteHeader() {
  const pathname = usePathname();
  const [header, setHeader] = useState(false);
  const scrollHeader = () => {
    if (window.scrollY >= 20) {
      setHeader(true);
    } else {
      setHeader(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", scrollHeader);

    return () => {
      window.addEventListener("scroll", scrollHeader);
    };
  }, []);
  return (
    <header
      className={`${
        header ? "border-b border-border " : ""
      } sticky top-0 w-full bg-background/30 backdrop-blur-xl`}
    >
      <div className="container flex h-14 max-w-screen-2xl items-center ">
        <MainNav />
        <div className="flex flex-1 items-center justify-end ">
          <nav className="flex items-center  space-x-6">
            <Link
              href="/blog"
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary hidden sm:inline-flex",
                pathname === "/blog" ? "text-foreground" : "text-foreground/60"
              )}
            >
              blog
            </Link>
            <Link
              href="/projects"
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary hidden sm:inline-flex",
                pathname === "/projects"
                  ? "text-foreground"
                  : "text-foreground/60"
              )}
            >
              projects
            </Link>
            <Link
              href="/tools"
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary hidden sm:inline-flex",
                pathname === "/projects"
                  ? "text-foreground"
                  : "text-foreground/60"
              )}
            >
              tools
            </Link>
            <ModeToogle />
            <MobileNav />
          </nav>
        </div>
      </div>
    </header>
  );
}
