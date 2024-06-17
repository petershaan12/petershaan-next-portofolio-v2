"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { MainNav } from "./main-nav";
import { MobileNav } from "./mobile-nav";
import { ModeToogle } from "./mode-toggle";
import { usePathname } from "next/navigation";

export function SiteHeader() {
  const pathname = usePathname();
  return (
    <header className="mt-10">
      <div className="container flex h-14 max-w-2xl items-center ">
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
                pathname === "/tools" ? "text-foreground" : "text-foreground/60"
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
