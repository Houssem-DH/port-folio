"use client";

import { useTranslations } from "next-intl";
import { motion, useReducedMotion } from "framer-motion";
import FadeIn from "@/components/motion/fade-in";
import Section from "@/components/section";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GraduationCap, Trophy, Languages, UserRound, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

import { education, activities, languages } from "@/lib/data";

export default function About() {
  const t = useTranslations("about");
  const reduce = useReducedMotion();

  return (
    <Section id="about" title={t("title")} eyebrow={t("eyebrow")} className="relative">
      {/* premium hint chip (matches other sections) */}
      <div className="mb-10 max-w-2xl">
        <div className="inline-flex items-center gap-2 rounded-full border bg-background/60 px-3 py-1 text-xs text-muted-foreground backdrop-blur">
          <Sparkles className="h-4 w-4 text-rose-500" />
          {t("hint")}
        </div>
        <p className="mt-4 text-sm text-muted-foreground leading-relaxed">{t("intro")}</p>
      </div>

      <div className="grid gap-6 md:grid-cols-12 items-stretch">
        {/* LEFT: Summary */}
        <FadeIn className="md:col-span-5">
          <PremiumCard className="h-full">
            <CardContent className="p-6 flex flex-col h-full">
              <div className="flex items-center gap-3">
                <IconBadge icon={UserRound} />
                <div>
                  <div className="text-lg font-semibold tracking-tight">{t("headline")}</div>
                  <div className="text-sm text-muted-foreground">{t("subheadline")}</div>
                </div>
              </div>

              <p className="mt-4 text-sm text-muted-foreground leading-relaxed">{t("bio")}</p>

              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                <MiniStat label={t("stats.projects")} value={t("stats.projectsValue")} />
                <MiniStat label={t("stats.leetcode")} value={t("stats.leetcodeValue")} />
                <MiniStat label={t("stats.focus")} value={t("stats.focusValue")} />
              </div>

              <div className="mt-6 flex flex-wrap gap-2">
                {(t.raw("tags") || []).map((tag) => (
                  <Badge
                    key={tag}
                    variant="secondary"
                    className="rounded-full bg-background/60 border border-foreground/5"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>

              {/* soft bottom accent (like premium cards) */}
              <div className="mt-auto pt-6">
                <div className="rounded-2xl border bg-background/50 p-4 text-sm text-muted-foreground leading-relaxed">
                  <span className="font-semibold text-foreground">{t("principlesTitle")}</span>
                  <div className="mt-1">{t("principles")}</div>
                </div>
              </div>
            </CardContent>
          </PremiumCard>
        </FadeIn>

        {/* RIGHT: Education + Activities + Languages */}
        <div className="md:col-span-7 grid gap-6">
          {/* Education (timeline) */}
          <FadeIn>
            <PremiumCard>
              <CardContent className="p-6">
                <Header icon={GraduationCap} title={t("educationTitle")} subtitle={t("educationHint")} />

                <div className="mt-5 relative">
                  {/* vertical line */}
                  <div className="absolute left-[12px] top-0 bottom-0 w-px bg-border/70" />

                  <div className="space-y-5">
                    {education.map((e, idx) => (
                      <TimelineItem
                        key={e.title}
                        title={e.title}
                        subtitle={e.place}
                        meta={e.year}
                        delay={reduce ? 0 : idx * 0.04}
                      />
                    ))}
                  </div>
                </div>
              </CardContent>
            </PremiumCard>
          </FadeIn>

          <div className="grid gap-6 md:grid-cols-2 items-stretch">
            {/* Activities */}
            <FadeIn>
              <PremiumCard className="h-full">
                <CardContent className="p-6 flex flex-col h-full">
                  <Header icon={Trophy} title={t("activitiesTitle")} subtitle={t("activitiesHint")} />

                  <div className="mt-5 space-y-4">
                    {activities.map((a, idx) => (
                      <motion.div
                        key={a.title}
                        initial={reduce ? { opacity: 1 } : { opacity: 0, y: 10, filter: "blur(8px)" }}
                        whileInView={reduce ? { opacity: 1 } : { opacity: 1, y: 0, filter: "blur(0px)" }}
                        viewport={{ once: true, amount: 0.4 }}
                        transition={{ duration: 0.35, ease: "easeOut", delay: reduce ? 0 : idx * 0.04 }}
                        className="rounded-2xl border bg-background/50 p-4"
                      >
                        <div className="flex items-start gap-3">
                          <span className="mt-1 w-12 text-xs text-muted-foreground">{a.year}</span>
                          <div>
                            <div className="font-medium">{a.title}</div>
                            <div className="text-sm text-muted-foreground">{a.detail}</div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  <div className="mt-auto pt-6 text-xs text-muted-foreground">
                    {t("activitiesFooter")}
                  </div>
                </CardContent>
              </PremiumCard>
            </FadeIn>

            {/* Languages */}
            <FadeIn delay={reduce ? 0 : 0.06}>
              <PremiumCard className="h-full">
                <CardContent className="p-6 flex flex-col h-full">
                  <Header icon={Languages} title={t("languagesTitle")} subtitle={t("languagesHint")} />

                  <div className="mt-5 space-y-3">
                    {languages.map((l) => (
                      <LanguageRow key={l.name} name={l.name} level={l.level} />
                    ))}
                  </div>

                  <div className="mt-auto pt-6">
                    <div className="rounded-2xl border bg-background/50 p-4 text-xs text-muted-foreground">
                      {t("languagesFooter")}
                    </div>
                  </div>
                </CardContent>
              </PremiumCard>
            </FadeIn>
          </div>
        </div>
      </div>
    </Section>
  );
}

/* ---------------- helpers ---------------- */

function PremiumCard({ className, children }) {
  return (
    <Card
      className={cn(
        "rounded-3xl border bg-background/55 backdrop-blur relative overflow-hidden",
        "transition will-change-transform hover:-translate-y-0.5",
        className
      )}
    >
      {/* subtle gradient edge */}
      <div className="pointer-events-none absolute inset-0 opacity-0 hover:opacity-100 transition duration-300">
        <div className="absolute -inset-24 bg-gradient-to-r from-rose-500/12 via-fuchsia-500/12 to-indigo-500/12 blur-2xl" />
      </div>
      {children}
    </Card>
  );
}

function IconBadge({ icon: Icon }) {
  return (
    <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border bg-background/60">
      <Icon className="h-5 w-5 text-rose-500" />
    </span>
  );
}

function Header({ icon, title, subtitle }) {
  const Icon = icon;
  return (
    <div className="flex items-center gap-3">
      <IconBadge icon={Icon} />
      <div className="leading-tight">
        <div className="text-lg font-semibold">{title}</div>
        {subtitle ? <div className="text-sm text-muted-foreground">{subtitle}</div> : null}
      </div>
    </div>
  );
}

function MiniStat({ label, value }) {
  return (
    <div className="rounded-2xl border bg-background/50 p-4">
      <div className="text-xs text-muted-foreground">{label}</div>
      <div className="mt-1 text-sm font-semibold">{value}</div>
    </div>
  );
}

function TimelineItem({ title, subtitle, meta, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.35, ease: "easeOut", delay }}
      className="relative pl-10"
    >
      {/* dot */}
      <span className="absolute left-[8px] top-[6px] h-3 w-3 rounded-full bg-rose-500/80 shadow-[0_0_0_4px_rgba(225,29,72,0.12)]" />
      <div className="rounded-2xl border bg-background/50 p-4">
        <div className="font-medium">{title}</div>
        <div className="text-sm text-muted-foreground">{subtitle}</div>
        <div className="text-xs text-muted-foreground mt-1">{meta}</div>
      </div>
    </motion.div>
  );
}

function LanguageRow({ name, level }) {
  const strength = toStrength(level);

  return (
    <div className="rounded-2xl border bg-background/50 p-4">
      <div className="flex items-center justify-between gap-3">
        <div className="font-medium">{name}</div>
        <Badge variant="secondary" className="rounded-full bg-background/60 border border-foreground/5">
          {level}
        </Badge>
      </div>

      <div className="mt-3 h-2 w-full rounded-full bg-background/60 border overflow-hidden">
        <div
          className="h-full rounded-full bg-gradient-to-r from-rose-500/70 via-fuchsia-500/60 to-indigo-500/60"
          style={{ width: `${strength}%` }}
        />
      </div>
    </div>
  );
}

function toStrength(level) {
  const v = String(level).toLowerCase();
  if (v.includes("native")) return 100;
  if (v.includes("professional")) return 80;
  if (v.includes("limited")) return 55;
  if (v.includes("basic")) return 40;
  return 65;
}
