"use client";

import { useTranslations } from "next-intl";
import FadeIn from "@/components/motion/fade-in";
import Section from "@/components/section";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GraduationCap, Trophy, Languages, UserRound } from "lucide-react";

import { education, activities, languages } from "@/lib/data";

export default function About() {
  const t = useTranslations("about");

  return (
    <Section
      id="about"
      title={t("title")}
      eyebrow={t("eyebrow")}
      // add small min-height so IntersectionObserver always catches it nicely
      className="min-h-[70vh]"
    >

      <div className="grid gap-6 md:grid-cols-12">
        {/* LEFT: Summary card */}
        <FadeIn className="md:col-span-5">
          <Card className="rounded-3xl border bg-background/55 backdrop-blur">
            <CardContent className="p-6">
              <div className="flex items-center gap-2">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border bg-background/60">
                  <UserRound className="h-5 w-5 text-rose-500" />
                </span>
                <div>
                  <div className="text-lg font-semibold">{t("headline")}</div>
                  <div className="text-sm text-muted-foreground">{t("subheadline")}</div>
                </div>
              </div>

              <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
                {t("bio")}
              </p>

              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                <MiniStat label={t("stats.projects")} value={t("stats.projectsValue")} />
                <MiniStat label={t("stats.leetcode")} value={t("stats.leetcodeValue")} />
                <MiniStat label={t("stats.focus")} value={t("stats.focusValue")} />
              </div>

              <div className="mt-6 flex flex-wrap gap-2">
                {t.raw("tags").map((tag) => (
                  <Badge key={tag} variant="secondary" className="rounded-full">
                    {tag}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </FadeIn>

        {/* RIGHT: Education + Activities + Languages */}
        <div className="md:col-span-7 grid gap-6">
          <FadeIn>
            <Card className="rounded-3xl border bg-background/55 backdrop-blur">
              <CardContent className="p-6">
                <Header icon={GraduationCap} title={t("educationTitle")} />
                <div className="mt-4 space-y-4">
                  {education.map((e) => (
                    <TimelineItem key={e.title} title={e.title} subtitle={e.place} meta={e.year} />
                  ))}
                </div>
              </CardContent>
            </Card>
          </FadeIn>

          <div className="grid gap-6 md:grid-cols-2">
            <FadeIn>
              <Card className="rounded-3xl border bg-background/55 backdrop-blur h-full">
                <CardContent className="p-6">
                  <Header icon={Trophy} title={t("activitiesTitle")} />
                  <div className="mt-4 space-y-3">
                    {activities.map((a) => (
                      <div key={a.title} className="flex gap-3">
                        <div className="text-xs mt-1 w-12 text-muted-foreground">{a.year}</div>
                        <div>
                          <div className="font-medium">{a.title}</div>
                          <div className="text-sm text-muted-foreground">{a.detail}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </FadeIn>

            <FadeIn>
              <Card className="rounded-3xl border bg-background/55 backdrop-blur h-full">
                <CardContent className="p-6">
                  <Header icon={Languages} title={t("languagesTitle")} />
                  <div className="mt-4 flex flex-wrap gap-2">
                    {languages.map((l) => (
                      <Badge key={l.name} className="rounded-full" variant="secondary">
                        {l.name}: {l.level}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </FadeIn>
          </div>
        </div>
      </div>
    </Section>
  );
}

/* ---- tiny UI helpers ---- */

function Header({ icon: Icon, title }) {
  return (
    <div className="flex items-center gap-2">
      <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border bg-background/60">
        <Icon className="h-5 w-5 text-rose-500" />
      </span>
      <div className="text-lg font-semibold">{title}</div>
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

function TimelineItem({ title, subtitle, meta }) {
  return (
    <div className="relative pl-5">
      <div className="absolute left-0 top-1.5 h-2 w-2 rounded-full bg-rose-500/80" />
      <div className="font-medium">{title}</div>
      <div className="text-sm text-muted-foreground">{subtitle}</div>
      <div className="text-xs text-muted-foreground">{meta}</div>
    </div>
  );
}
