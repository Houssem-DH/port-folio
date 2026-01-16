"use client";

import Link from "next/link";
import Lottie from "lottie-react";
import { motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import { ArrowRight, Download, Github, Linkedin, Twitter, MapPin, Sparkles, Zap, Shield, Rocket } from "lucide-react";

import { Button } from "@/components/ui/button";
import { profile } from "@/lib/data";
import devAnimation from "@/animations/dev.json";

export default function Hero() {
  const reduce = useReducedMotion();
  const t = useTranslations("hero");
  const ts = useTranslations("stack");

  const fadeUp = {
    hidden: reduce ? { opacity: 1 } : { opacity: 0, y: 14, filter: "blur(10px)" },
    show: reduce ? { opacity: 1 } : { opacity: 1, y: 0, filter: "blur(0px)" },
  };

  // Balanced groups (fewer, tighter)
  const groups = [
    { title: "Core", items: ["laravel", "react", "postgres", "rest"] },
    { title: "Infra", items: ["docker", "aws", "k8s", "git"] },
  ];

  return (
    <section id="home" className="relative overflow-hidden">
     
      <div className="container mx-auto max-w-6xl px-4 pt-10 pb-14 md:pt-16 md:pb-20">
        {/* key: items-stretch so the right card fills its column */}
        <div className="grid items-stretch gap-10 md:grid-cols-2">
          {/* LEFT */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            transition={{ duration: 0.85, ease: "easeOut" }}
            className="flex flex-col"
          >
            {/* status row */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-2 rounded-full border bg-background/60 px-3 py-1 text-xs text-muted-foreground backdrop-blur">
                <Sparkles className="h-4 w-4 text-rose-500" />
                {t("available")}
              </span>

              <span className="inline-flex items-center gap-2 rounded-full border bg-background/50 px-3 py-1 text-xs text-muted-foreground backdrop-blur">
                <MapPin className="h-4 w-4" />
                {profile.location}
              </span>
            </div>

            <h1 className="mt-6 text-4xl md:text-6xl font-extrabold tracking-tight leading-[1.02]">
              {t("headlineA")}{" "}
              <span className="bg-gradient-to-r from-rose-500 via-fuchsia-500 to-indigo-500 bg-clip-text text-transparent">
                {t("headlineB")}
              </span>{" "}
              {t("headlineC")}
            </h1>

            <p className="mt-5 text-lg text-muted-foreground leading-relaxed max-w-xl">
              {t("subA")} <span className="text-foreground font-semibold">{profile.name}</span>{" "}
              <span className="text-foreground font-semibold">{profile.role}</span> {t("subC")}
            </p>

            {/* NEW: Highlights strip (modern + balances height) */}
            <div className="mt-7 grid gap-3 sm:grid-cols-3">
              <Highlight icon={Zap} title="Fast shipping" desc="Clean delivery & iterations" />
              <Highlight icon={Shield} title="Production-ready" desc="Stable, secure patterns" />
              <Highlight icon={Rocket} title="Scalable systems" desc="APIs & deployments" />
            </div>

            {/* CTAs */}
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <Button asChild size="lg" className="rounded-full group">
                <Link href="#projects">
                  {t("ctaProjects")}
                  <ArrowRight className="ml-2 h-4 w-4 transition group-hover:translate-x-0.5" />
                </Link>
              </Button>

              <Button asChild size="lg" variant="outline" className="rounded-full">
                <a href="/resume.pdf" download>
                  <Download className="mr-2 h-4 w-4" />
                  {t("ctaCv")}
                </a>
              </Button>

              <div className="flex items-center gap-1">
                <IconBtn href={profile.linkedin} label="LinkedIn">
                  <Linkedin className="h-5 w-5" />
                </IconBtn>
                <IconBtn href={profile.github} label="GitHub">
                  <Github className="h-5 w-5" />
                </IconBtn>
                <IconBtn href={profile.x} label="X">
                  <Twitter className="h-5 w-5" />
                </IconBtn>
              </div>
            </div>

            {/* proof cards */}
            <div className="mt-8 grid grid-cols-2 gap-3 max-w-xl">
              <MiniCard title={t("deliveredTitle")} subtitle={t("deliveredSub")} />
              <MiniCard title={t("leetcodeTitle")} subtitle={t("leetcodeSub")} />
            </div>

            {/* Spacer so the left naturally fills (keeps alignment clean) */}
            <div className="flex-1" />
          </motion.div>

          {/* RIGHT */}
          <motion.div
            initial={reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
            whileInView={reduce ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.85, ease: "easeOut" }}
            className="relative"
          >
            <div className="absolute -inset-4 rounded-[34px] bg-gradient-to-r from-rose-500/14 via-fuchsia-500/14 to-indigo-500/14 blur-2xl" />

            {/* h-full is important for equal height */}
            <div className="relative h-full rounded-[34px] border bg-background/55 backdrop-blur p-4 shadow-[0_18px_60px_-28px_rgba(0,0,0,0.55)] flex flex-col">
              {/* top bar */}
              <div className="flex items-center justify-between px-2 pb-3">
                <div className="flex items-center gap-2">
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-2xl border bg-background/60">
                    <span className="h-2.5 w-2.5 rounded-full bg-gradient-to-r from-rose-500 via-fuchsia-500 to-indigo-500" />
                  </span>
                  <div className="leading-tight">
                    <div className="text-sm font-semibold">{profile.brand}</div>
                    <div className="text-xs text-muted-foreground">{t("cardTitle")}</div>
                  </div>
                </div>

                <div className="flex gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-red-500/70" />
                  <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/70" />
                  <span className="h-2.5 w-2.5 rounded-full bg-green-500/70" />
                </div>
              </div>

              {/* media (slightly smaller than before to match left) */}
              <div className="relative overflow-hidden rounded-3xl border bg-background/40">
                <div className="pointer-events-none absolute inset-0 opacity-55">
                  <div className="absolute -left-40 top-0 h-full w-64 -skew-x-12 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-[sheen_3.8s_ease-in-out_infinite]" />
                </div>
                <Lottie animationData={devAnimation} className="w-full h-[320px] md:h-[360px]" loop />
              </div>

              {/* specialties (compact + professional) */}
              <div className="mt-4 rounded-3xl border bg-background/40 p-4">
                <div className="flex items-center justify-between">
                  <div className="text-sm font-semibold text-foreground">
                    {t.has("specialties") ? t("specialties") : "Specialties"}
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {t.has("specialtiesHint") ? t("specialtiesHint") : "Focused stack"}
                  </span>
                </div>

                <div className="mt-3 grid gap-3">
                  {groups.map((g) => (
                    <div key={g.title} className="rounded-2xl border bg-background/50 p-3">
                      <div className="text-xs font-medium text-muted-foreground">{g.title}</div>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {g.items.map((k) => (
                          <SkillPill key={k} label={ts(k)} />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* stats pinned bottom */}
              <div className="mt-auto pt-4 grid grid-cols-3 gap-2 text-xs text-muted-foreground">
                <Stat title={t("statWebTitle")} subtitle={t("statWebSub")} />
                <Stat title={t("statApiTitle")} subtitle={t("statApiSub")} />
                <Stat title={t("statCloudTitle")} subtitle={t("statCloudSub")} />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ---------- small components ---------- */

function IconBtn({ href, label, children }) {
  return (
    <Button asChild variant="ghost" size="icon" className="rounded-full" aria-label={label}>
      <a href={href} target="_blank" rel="noreferrer">
        {children}
      </a>
    </Button>
  );
}

function MiniCard({ title, subtitle }) {
  return (
    <div className="rounded-2xl border bg-background/50 backdrop-blur p-4">
      <div className="text-foreground font-semibold text-lg">{title}</div>
      <div className="text-sm text-muted-foreground mt-1">{subtitle}</div>
    </div>
  );
}

function Stat({ title, subtitle }) {
  return (
    <div className="rounded-xl border bg-background/40 p-3">
      <div className="text-foreground font-semibold">{title}</div>
      <div className="mt-1">{subtitle}</div>
    </div>
  );
}

function SkillPill({ label }) {
  return (
    <span className="inline-flex items-center rounded-full border bg-background/60 px-3 py-1 text-xs text-muted-foreground">
      <span className="mr-2 h-1.5 w-1.5 rounded-full bg-rose-500/70" />
      <span className="font-medium text-foreground/90">{label}</span>
    </span>
  );
}

function Highlight({ icon: Icon, title, desc }) {
  return (
    <div className="rounded-2xl border bg-background/50 backdrop-blur p-4">
      <div className="flex items-center gap-2">
        <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl border bg-background/60">
          <Icon className="h-4 w-4 text-rose-500" />
        </span>
        <div className="leading-tight">
          <div className="text-sm font-semibold">{title}</div>
          <div className="text-xs text-muted-foreground">{desc}</div>
        </div>
      </div>
    </div>
  );
}
