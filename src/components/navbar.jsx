"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { useTheme } from "next-themes";
import { Menu, ChevronDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { locales, defaultLocale } from "@/i18n/routing";

const NAV_IDS = ["home", "about", "skills", "experience", "projects", "contact"];

const LOCALE_META = {
  en: { label: "English", short: "EN" },
  fr: { label: "Français", short: "FR" },
  ar: { label: "العربية", short: "AR" }
};

export default function Navbar() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  const [active, setActive] = React.useState("home");
  const [scrolled, setScrolled] = React.useState(false);

  // Scroll shadow
  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Active section highlight
  React.useEffect(() => {
    const els = NAV_IDS.map((id) => document.getElementById(id)).filter(Boolean);

    const obs = new IntersectionObserver(
      (entries) => {
        const v = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (b.intersectionRatio || 0) - (a.intersectionRatio || 0))[0];
        if (v?.target?.id) setActive(v.target.id);
      },
      { threshold: [0.2, 0.35], rootMargin: "-25% 0px -65% 0px" }
    );

    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  function switchLocale(nextLocale) {
    // pathname is like /en or /en/anything
    const parts = pathname.split("/");
    // ["", "en", ...rest]
    if (locales.includes(parts[1])) parts[1] = nextLocale;
    else parts.splice(1, 0, nextLocale);

    const nextPath = parts.join("/") || `/${nextLocale}`;
    router.push(nextPath);
  }

  const links = [
    { id: "home", label: t("home"), href: "#home" },
    { id: "about", label: t("about"), href: "#about" },
    { id: "skills", label: t("skills"), href: "#skills" },
    { id: "experience", label: t("experience"), href: "#experience" },
    { id: "projects", label: t("projects"), href: "#projects" },
    { id: "contact", label: t("contact"), href: "#contact" }
  ];

  const NavLinks = ({ onClick }) => (
    <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-1">
      {links.map((n) => (
        <Link
          key={n.id}
          href={n.href}
          onClick={onClick}
          className={cn(
            "px-3 py-2 rounded-full text-sm font-medium transition",
            "hover:bg-accent hover:text-accent-foreground",
            active === n.id && "bg-accent text-accent-foreground"
          )}
        >
          {n.label}
        </Link>
      ))}
    </div>
  );

  return (
    <header className="sticky top-0 z-50">
      <div className="container mx-auto max-w-6xl px-4 pt-4">
        <div
          className={cn(
            "rounded-2xl border bg-background/70 backdrop-blur supports-[backdrop-filter]:bg-background/60",
            "transition-all",
            scrolled ? "shadow-lg" : "shadow-none"
          )}
        >
          <div className="h-16 px-3 md:px-4 flex items-center justify-between">
            {/* Brand */}
            <Link href={`/${locale}`} className="flex items-center gap-3">
              <span className="relative inline-flex h-9 w-9 items-center justify-center rounded-xl border bg-background/60 overflow-hidden">
                <span className="absolute inset-0 opacity-70 bg-gradient-to-br from-rose-500/70 via-fuchsia-500/60 to-indigo-500/70" />
                <span className="relative h-2.5 w-2.5 rounded-full bg-background" />
              </span>
              <div className="leading-tight">
                <div className="font-extrabold tracking-tight">Houssem.dev</div>
                <div className="hidden md:block text-xs text-muted-foreground">Full-stack Web Developer</div>
              </div>
            </Link>

            {/* Desktop links */}
            <nav className="hidden md:flex items-center gap-2">
              <NavLinks />
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-2">
              {/* Language switcher (modern) */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="rounded-full gap-2">
                    <span className="text-xs font-semibold">{LOCALE_META[locale]?.short ?? "EN"}</span>
                    <ChevronDown className="h-4 w-4 text-muted-foreground" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="min-w-[160px]">
                  {locales.map((l) => (
                    <DropdownMenuItem key={l} onClick={() => switchLocale(l)} className="flex items-center justify-between">
                      <span>{LOCALE_META[l].label}</span>
                      {l === locale ? <span className="text-xs text-muted-foreground">✓</span> : null}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Modern theme switch */}
              <ThemePill />

              {/* CTA */}
              <Button asChild className="hidden md:inline-flex rounded-full">
                <Link href="#contact">{t("cta")}</Link>
              </Button>

              {/* Mobile menu */}
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" className="md:hidden rounded-full" size="icon">
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="pt-10">
                  <div className="mt-2">
                    <NavLinks onClick={() => {}} />
                  </div>

                  <div className="mt-8 flex gap-2">
                    <Button variant="outline" className="rounded-full w-full" onClick={() => switchLocale("en")}>
                      EN
                    </Button>
                    <Button variant="outline" className="rounded-full w-full" onClick={() => switchLocale("fr")}>
                      FR
                    </Button>
                    <Button variant="outline" className="rounded-full w-full" onClick={() => switchLocale("ar")}>
                      AR
                    </Button>
                  </div>

                  <div className="mt-4">
                    <ThemePill className="w-full justify-center" />
                  </div>

                  <div className="mt-6">
                    <Button asChild className="w-full rounded-full">
                      <Link href="#contact">{t("cta")}</Link>
                    </Button>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

function ThemePill({ className }) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => setMounted(true), []);
  if (!mounted) return <div className={cn("h-10 w-[72px] rounded-full border", className)} />;

  const isDark = theme === "dark";

  return (
    <button
      type="button"
      aria-label="Toggle theme"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={cn(
        "relative h-10 w-[72px] rounded-full border bg-background/60 backdrop-blur transition",
        "hover:bg-accent",
        className
      )}
    >
      {/* track icons */}
      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs">☀️</span>
      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs">🌙</span>

      {/* thumb */}
      <span
        className={cn(
          "absolute top-1/2 -translate-y-1/2 h-8 w-8 rounded-full bg-foreground/10 border",
          "transition-all duration-300",
          isDark ? "left-[38px]" : "left-1"
        )}
      />
    </button>
  );
}
