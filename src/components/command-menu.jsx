"use client";

import * as React from "react";
import Link from "next/link";
import { Command } from "cmdk";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Search, ArrowUpRight } from "lucide-react";
import { profile } from "@/lib/data";

const items = [
  { type: "section", label: "Home", href: "#home" },
  { type: "section", label: "About", href: "#about" },
  { type: "section", label: "Skills", href: "#skills" },
  { type: "section", label: "Experience", href: "#experience" },
  { type: "section", label: "Projects", href: "#projects" },
  { type: "section", label: "Contact", href: "#contact" },
  { type: "link", label: "GitHub", href: profile.github },
  { type: "link", label: "LinkedIn", href: profile.linkedin },
  { type: "link", label: "Website", href: profile.website },
];

export default function CommandMenu() {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  React.useEffect(() => {
    const onKeyDown = (e) => {
      const isCmdK = (e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k";
      if (isCmdK) {
        e.preventDefault();
        setOpen((v) => !v);
      }
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const run = (it) => {
    setOpen(false);
    setValue("");
    if (it.href.startsWith("#")) {
      document.querySelector(it.href)?.scrollIntoView({ behavior: "smooth" });
    } else {
      window.open(it.href, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <>
      {/* Subtle hint in UI (optional) */}
      <button
        onClick={() => setOpen(true)}
        className="hidden md:flex items-center gap-2 rounded-full border bg-background/60 px-3 py-2 text-xs text-muted-foreground hover:text-foreground transition"
      >
        <Search className="h-4 w-4" />
        Search…
        <span className="ml-2 rounded border px-2 py-0.5 text-[10px]">Ctrl K</span>
      </button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="p-0 overflow-hidden">
          <DialogHeader className="p-4 pb-0">
            <DialogTitle className="text-sm font-semibold">Quick Actions</DialogTitle>
          </DialogHeader>

          <div className="p-3 pt-2">
            <Command className="w-full">
              <div className="flex items-center gap-2 rounded-xl border bg-background px-3 py-2">
                <Search className="h-4 w-4 text-muted-foreground" />
                <Command.Input
                  value={value}
                  onValueChange={setValue}
                  placeholder="Jump to a section or open a link…"
                  className="w-full bg-transparent text-sm outline-none"
                />
              </div>

              <Command.List className="mt-3 max-h-[320px] overflow-auto">
                <Command.Empty className="p-3 text-sm text-muted-foreground">
                  No results.
                </Command.Empty>

                {items.map((it) => (
                  <Command.Item
                    key={it.label}
                    value={it.label}
                    onSelect={() => run(it)}
                    className="flex cursor-pointer items-center justify-between rounded-xl px-3 py-2 text-sm aria-selected:bg-accent"
                  >
                    <span className="flex items-center gap-2">
                      <span className="text-muted-foreground text-xs w-16">
                        {it.type === "section" ? "Section" : "Link"}
                      </span>
                      <span className="font-medium">{it.label}</span>
                    </span>
                    {!it.href.startsWith("#") ? <ArrowUpRight className="h-4 w-4 text-muted-foreground" /> : null}
                  </Command.Item>
                ))}
              </Command.List>
            </Command>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
