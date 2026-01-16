"use client";

import * as React from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Briefcase, ChevronDown, Sparkles } from "lucide-react";

import Section from "@/components/section";
import FadeIn from "@/components/motion/fade-in";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";
import { experience } from "@/lib/data";

export default function Experience() {
  const t = useTranslations("experience");
  const reduce = useReducedMotion();

  const [openIndex, setOpenIndex] = React.useState(0);

  return (
    <Section id="experience" title={t("title")} eyebrow={t("eyebrow")} className="relative">
      {/* top hint strip */}
      <div className="mb-10 max-w-2xl">
        <div className="inline-flex items-center gap-2 rounded-full border bg-background/60 px-3 py-1 text-xs text-muted-foreground backdrop-blur">
          <Sparkles className="h-4 w-4 text-rose-500" />
          {t("hint")}
        </div>
        <p className="mt-4 text-sm text-muted-foreground leading-relaxed">{t("intro")}</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-12">
        {/* Left: timeline rail */}
        <FadeIn className="lg:col-span-4">
          <Card className="rounded-3xl border bg-background/55 backdrop-blur">
            <CardContent className="p-5">
              <div className="flex items-center gap-2">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border bg-background/60">
                  <Briefcase className="h-5 w-5 text-rose-500" />
                </span>
                <div>
                  <div className="text-sm font-semibold">{t("railTitle")}</div>
                  <div className="text-xs text-muted-foreground">{t("railHint")}</div>
                </div>
              </div>

              <div className="mt-5 relative">
                {/* rail line */}
                <div className="absolute left-[13px] top-1 bottom-1 w-px bg-border/70" />

                <div className="space-y-2">
                  {experience.map((e, i) => (
                    <button
                      key={`${e.title}-${i}`}
                      type="button"
                      onClick={() => setOpenIndex(i)}
                      className={cn(
                        "group w-full text-left rounded-2xl border bg-background/50 px-3 py-3 transition",
                        "hover:bg-background/70",
                        i === openIndex && "bg-background/70 border-foreground/10"
                      )}
                    >
                      <div className="flex items-start gap-3">
                        <span className="relative mt-1 inline-flex h-7 w-7 items-center justify-center">
                          {i === openIndex ? (
                            <motion.span
                              layoutId="exp-dot"
                              className="h-2.5 w-2.5 rounded-full bg-gradient-to-r from-rose-500 via-fuchsia-500 to-indigo-500"
                              transition={{ duration: 0.35, ease: "easeOut" }}
                            />
                          ) : (
                            <span className="h-2.5 w-2.5 rounded-full bg-muted-foreground/30 group-hover:bg-muted-foreground/40" />
                          )}
                        </span>

                        <div className="min-w-0">
                          <div className="text-sm font-semibold truncate">{e.title}</div>
                          <div className="text-xs text-muted-foreground truncate">{e.company}</div>
                        </div>

                        <span className="ml-auto shrink-0 text-[11px] text-muted-foreground">
                          {e.period}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </FadeIn>

        {/* Right: expandable detail cards */}
        <FadeIn className="lg:col-span-8" delay={reduce ? 0 : 0.06}>
          <div className="space-y-4">
            {experience.map((e, i) => {
              const open = i === openIndex;

              return (
                <motion.div key={`${e.title}-panel`} layout transition={{ duration: 0.25 }}>
                  <Card className="rounded-3xl border bg-background/55 backdrop-blur">
                    <CardContent className="p-6">
                      <Collapsible open={open} onOpenChange={() => setOpenIndex(i)}>
                        <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                          <div className="min-w-0">
                            <div className="flex flex-wrap items-center gap-2">
                              <div className="text-xl font-semibold tracking-tight">{e.title}</div>
                              {open ? (
                                <Badge className="rounded-full">{t("active")}</Badge>
                              ) : (
                                <Badge variant="secondary" className="rounded-full">
                                  {t("view")}
                                </Badge>
                              )}
                            </div>

                            <div className="mt-1 text-sm text-muted-foreground">{e.company}</div>
                          </div>

                          <div className="flex items-center justify-between gap-3 md:justify-end">
                            <div className="text-sm text-muted-foreground">{e.period}</div>

                            <CollapsibleTrigger
                              className={cn(
                                "inline-flex items-center gap-2 rounded-full border bg-background/60 px-3 py-2 text-xs text-muted-foreground",
                                "hover:bg-background/80 transition"
                              )}
                            >
                              {open ? t("collapse") : t("expand")}
                              <ChevronDown className={cn("h-4 w-4 transition", open && "rotate-180")} />
                            </CollapsibleTrigger>
                          </div>
                        </div>

                        <AnimatePresence initial={false}>
                          {open ? (
                            <CollapsibleContent forceMount asChild>
                              <motion.div
                                initial={reduce ? { opacity: 1 } : { opacity: 0, y: 10, filter: "blur(8px)" }}
                                animate={reduce ? { opacity: 1 } : { opacity: 1, y: 0, filter: "blur(0px)" }}
                                exit={reduce ? { opacity: 1 } : { opacity: 0, y: 10, filter: "blur(8px)" }}
                                transition={{ duration: 0.32, ease: "easeOut" }}
                              >
                                <div className="mt-5 grid gap-4 md:grid-cols-2">
                                  {e.points.map((p) => (
                                    <Point key={p} text={p} />
                                  ))}
                                </div>

                                <div className="mt-5 rounded-2xl border bg-background/50 p-4">
                                  <div className="text-xs text-muted-foreground">{t("outcomeTitle")}</div>
                                  <div className="mt-1 text-sm text-muted-foreground leading-relaxed">
                                    {t("outcomeText")}
                                  </div>
                                </div>
                              </motion.div>
                            </CollapsibleContent>
                          ) : null}
                        </AnimatePresence>
                      </Collapsible>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </FadeIn>
      </div>
    </Section>
  );
}

/* ---------- pieces ---------- */

function Point({ text }) {
  return (
    <div className="rounded-2xl border bg-background/50 p-4">
      <div className="flex items-start gap-3">
        <span className="mt-1 h-2 w-2 rounded-full bg-rose-500/70" />
        <p className="text-sm text-muted-foreground leading-relaxed">{text}</p>
      </div>
    </div>
  );
}
