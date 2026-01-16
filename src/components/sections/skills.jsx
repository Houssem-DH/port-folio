"use client";

import * as React from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Sparkles } from "lucide-react";

import Section from "@/components/section";
import FadeIn from "@/components/motion/fade-in";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { skills } from "@/lib/data";
import { cn } from "@/lib/utils";

export default function Skills() {
  const t = useTranslations("skills");
  const reduce = useReducedMotion();

  const groups = React.useMemo(() => skills.map((s) => s.group), []);
  const [active, setActive] = React.useState(groups[0]);

  const activeGroup = skills.find((s) => s.group === active) || skills[0];

  return (
    <Section id="skills" title={t("title")} eyebrow={t("eyebrow")} className="relative">
      {/* intro */}
      <div className="mb-10 max-w-2xl">
        <div className="inline-flex items-center gap-2 rounded-full border bg-background/60 px-3 py-1 text-xs text-muted-foreground backdrop-blur">
          <Sparkles className="h-4 w-4 text-rose-500" />
          {t("hint")}
        </div>
        <p className="mt-4 text-sm text-muted-foreground leading-relaxed">{t("intro")}</p>
      </div>

      {/* Modern layout: left navigation + right content */}
      <div className="grid gap-6 lg:grid-cols-12">
        {/* Left: category rail */}
        <FadeIn className="lg:col-span-4">
          <Card className="rounded-3xl border bg-background/55 backdrop-blur">
            <CardContent className="p-4 md:p-5">
              <div className="mb-3 px-2">
                <div className="text-sm font-semibold">{t("categories")}</div>
                <div className="text-xs text-muted-foreground">{t("categoriesHint")}</div>
              </div>

              <Tabs value={active} onValueChange={setActive} className="w-full">
                <TabsList className="grid h-auto grid-cols-1 gap-1 bg-transparent p-0">
                  {skills.map((g) => {
                    const label = t.has(`groups.${g.group}`) ? t(`groups.${g.group}`) : g.group;
                    const count = g.items.length;

                    return (
                      <TabsTrigger
                        key={g.group}
                        value={g.group}
                        className={cn(
                          "group relative justify-between rounded-2xl border bg-background/50 px-3 py-3 text-left",
                          "data-[state=active]:bg-background/70 data-[state=active]:border-foreground/10",
                          "hover:bg-background/70"
                        )}
                      >
                        <span className="flex flex-col gap-1">
                          <span className="text-sm font-semibold">{label}</span>
                          <span className="text-xs text-muted-foreground">
                            {count} {t("items")}
                          </span>
                        </span>

                        {/* active indicator */}
                        <span className="relative ml-3 inline-flex h-8 w-8 items-center justify-center rounded-xl border bg-background/60">
                          <span
                            className={cn(
                              "h-2.5 w-2.5 rounded-full transition",
                              g.group === active
                                ? "bg-gradient-to-r from-rose-500 via-fuchsia-500 to-indigo-500"
                                : "bg-muted-foreground/30 group-hover:bg-muted-foreground/40"
                            )}
                          />
                        </span>

                        {g.group === active ? (
                          <motion.span
                            layoutId="skills-active-rail"
                            className="absolute inset-0 -z-10 rounded-2xl bg-gradient-to-r from-rose-500/10 via-fuchsia-500/10 to-indigo-500/10"
                            transition={{ duration: 0.35, ease: "easeOut" }}
                          />
                        ) : null}
                      </TabsTrigger>
                    );
                  })}
                </TabsList>
              </Tabs>
            </CardContent>
          </Card>
        </FadeIn>

        {/* Right: animated skill wall */}
        <FadeIn className="lg:col-span-8" delay={reduce ? 0 : 0.06}>
          <Card className="rounded-3xl border bg-background/55 backdrop-blur">
            <CardContent className="p-6 md:p-7">
              <div className="flex flex-wrap items-end justify-between gap-3">
                <div>
                  <div className="text-xl font-semibold tracking-tight">
                    {t.has(`groups.${active}`) ? t(`groups.${active}`) : active}
                  </div>
                  <div className="mt-1 text-sm text-muted-foreground">
                    {t("panelHint")}
                  </div>
                </div>

                <div className="inline-flex items-center gap-2 rounded-full border bg-background/60 px-3 py-1 text-xs text-muted-foreground">
                  <span className="h-2 w-2 rounded-full bg-rose-500/70" />
                  {activeGroup.items.length} {t("items")}
                </div>
              </div>

              <div className="mt-6">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={active}
                    initial={reduce ? { opacity: 1 } : { opacity: 0, y: 10, filter: "blur(8px)" }}
                    animate={reduce ? { opacity: 1 } : { opacity: 1, y: 0, filter: "blur(0px)" }}
                    exit={reduce ? { opacity: 1 } : { opacity: 0, y: -10, filter: "blur(8px)" }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                    className="flex flex-wrap gap-2"
                  >
                    {activeGroup.items.map((item, i) => (
                      <SkillChip key={item} label={item} index={i} />
                    ))}
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* subtle footer */}
              <div className="mt-8 grid gap-3 md:grid-cols-3">
                <MicroCard title={t("microA.title")} desc={t("microA.desc")} />
                <MicroCard title={t("microB.title")} desc={t("microB.desc")} />
                <MicroCard title={t("microC.title")} desc={t("microC.desc")} />
              </div>
            </CardContent>
          </Card>
        </FadeIn>
      </div>
    </Section>
  );
}

/* --------- components --------- */

function SkillChip({ label, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: Math.min(index * 0.03, 0.25), duration: 0.35, ease: "easeOut" }}
    >
      <Badge
        variant="secondary"
        className={cn(
          "rounded-full border bg-background/60 px-3 py-1 text-sm",
          "transition-all hover:-translate-y-0.5 hover:bg-background/80 hover:shadow-[0_14px_40px_-30px_rgba(0,0,0,0.55)]"
        )}
      >
        <span className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-rose-500/70" />
        {label}
      </Badge>
    </motion.div>
  );
}

function MicroCard({ title, desc }) {
  return (
    <div className="rounded-2xl border bg-background/50 p-4">
      <div className="text-sm font-semibold">{title}</div>
      <div className="mt-1 text-xs text-muted-foreground">{desc}</div>
    </div>
  );
}
