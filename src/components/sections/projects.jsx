"use client";

import * as React from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ExternalLink, Github, Sparkles, Filter } from "lucide-react";

import Section from "@/components/section";
import FadeIn from "@/components/motion/fade-in";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { projects } from "@/lib/data";
import { cn } from "@/lib/utils";

/**
 * ✅ Add categories here anytime:
 * { id: "ai", match: (p) => p.category === "ai" }
 */
const CATEGORIES = [
  { id: "all", match: () => true },
  { id: "featured", match: (p) => Boolean(p.featured) },
  { id: "web", match: (p) => p.category === "web" },
  { id: "game", match: (p) => p.category === "game" },
  { id: "mobile", match: (p) => p.category === "mobile" },
];

export default function Projects() {
  const t = useTranslations("projects");
  const reduce = useReducedMotion();

  const [filter, setFilter] = React.useState("all");

  const featured = projects.filter((p) => p.featured);

  const filtered = React.useMemo(() => {
    const rule = CATEGORIES.find((c) => c.id === filter) || CATEGORIES[0];
    return projects.filter(rule.match);
  }, [filter]);

  function countFor(id) {
    const rule = CATEGORIES.find((c) => c.id === id) || CATEGORIES[0];
    return projects.filter(rule.match).length;
  }

  return (
    <Section id="projects" title={t("title")} eyebrow={t("eyebrow")} className="relative">
      {/* intro */}
      <div className="mb-10 max-w-2xl">
        <div className="inline-flex items-center gap-2 rounded-full border bg-background/60 px-3 py-1 text-xs text-muted-foreground backdrop-blur">
          <Sparkles className="h-4 w-4 text-rose-500" />
          {t("hint")}
        </div>
        <p className="mt-4 text-sm text-muted-foreground leading-relaxed">{t("intro")}</p>
      </div>

      {/* Featured case studies */}
      {featured.length ? (
        <div className="mb-8 grid gap-6 lg:grid-cols-2">
          {featured.slice(0, 2).map((p, idx) => (
            <FadeIn key={p.name} delay={idx * 0.06}>
              <FeaturedProjectCard project={p} t={t} />
            </FadeIn>
          ))}
        </div>
      ) : null}

      {/* Filter + Grid */}
      <div className="grid gap-6 lg:grid-cols-12">
        {/* Filters */}
        <FadeIn className="lg:col-span-4">
          <Card className="rounded-3xl border bg-background/55 backdrop-blur">
            <CardContent className="p-5">
              <div className="flex items-center gap-2">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border bg-background/60">
                  <Filter className="h-5 w-5 text-rose-500" />
                </span>
                <div>
                  <div className="text-sm font-semibold">{t("filtersTitle")}</div>
                  <div className="text-xs text-muted-foreground">{t("filtersHint")}</div>
                </div>
              </div>

              <div className="mt-5">
                <Tabs value={filter} onValueChange={setFilter}>
                  <TabsList className="grid h-auto grid-cols-1 gap-1 bg-transparent p-0">
                    {CATEGORIES.map((c) => (
                      <TabsTrigger
                        key={c.id}
                        value={c.id}
                        className={cn(
                          "relative justify-between rounded-2xl border bg-background/50 px-3 py-3 text-left",
                          "data-[state=active]:bg-background/70 data-[state=active]:border-foreground/10",
                          "hover:bg-background/70"
                        )}
                      >
                        <span className="text-sm font-semibold">{t(`filter.${c.id}`)}</span>
                        <span className="text-xs text-muted-foreground">
                          {countFor(c.id)} {t("items")}
                        </span>

                        {filter === c.id ? (
                          <motion.span
                            layoutId="projects-filter"
                            className="absolute inset-0 -z-10 rounded-2xl bg-gradient-to-r from-rose-500/10 via-fuchsia-500/10 to-indigo-500/10"
                            transition={{ duration: 0.35, ease: "easeOut" }}
                          />
                        ) : null}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                </Tabs>
              </div>

              
            </CardContent>
          </Card>
        </FadeIn>

        {/* Grid */}
        <FadeIn className="lg:col-span-8" delay={reduce ? 0 : 0.06}>
          <Card className="rounded-3xl border bg-background/55 backdrop-blur">
            <CardContent className="p-6 md:p-7">
              <div className="flex flex-wrap items-end justify-between gap-3">
                <div>
                  <div className="text-xl font-semibold tracking-tight">{t("gridTitle")}</div>
                  <div className="mt-1 text-sm text-muted-foreground">{t("gridHint")}</div>
                </div>

                <div className="inline-flex items-center gap-2 rounded-full border bg-background/60 px-3 py-1 text-xs text-muted-foreground">
                  <span className="h-2 w-2 rounded-full bg-rose-500/70" />
                  {filtered.length} {t("items")}
                </div>
              </div>

              <div className="mt-6">
                <AnimatePresence mode="popLayout">
                  <motion.div layout className="grid gap-4 md:grid-cols-2">
                    {filtered.map((p, i) => (
                      <motion.div
                        key={p.name}
                        layout
                        initial={reduce ? { opacity: 1 } : { opacity: 0, y: 10, filter: "blur(8px)" }}
                        animate={reduce ? { opacity: 1 } : { opacity: 1, y: 0, filter: "blur(0px)" }}
                        exit={reduce ? { opacity: 1 } : { opacity: 0, y: 10, filter: "blur(8px)" }}
                        transition={{ duration: 0.28, ease: "easeOut", delay: Math.min(i * 0.02, 0.15) }}
                      >
                        <TiltProjectCard project={p} t={t} />
                      </motion.div>
                    ))}
                  </motion.div>
                </AnimatePresence>
              </div>
            </CardContent>
          </Card>
        </FadeIn>
      </div>
    </Section>
  );
}

/* ---------------- Featured ---------------- */

function FeaturedProjectCard({ project, t }) {
  const hasDemo = Boolean(project?.links?.live);
  const hasRepo = Boolean(project?.links?.repo);

  return (
    <Card className="rounded-3xl border bg-background/55 backdrop-blur overflow-hidden group h-full">
      <div className="relative">
        <ProjectMedia project={project} className="h-[220px]" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/95 via-background/30 to-transparent" />
        <div className="absolute left-4 top-4">
          <Badge className="rounded-full">{t("featured")}</Badge>
        </div>
      </div>

      {/* ✅ flex + h-full to enforce same height */}
      <CardContent className="p-6 h-full flex flex-col">
        <div>
          <div className="text-xl font-semibold tracking-tight">{project.name}</div>
          <div className="mt-1 text-xs text-muted-foreground">{project.period}</div>

          {/* ✅ fixed lines */}
          <p className="mt-3 text-sm text-muted-foreground leading-relaxed line-clamp-3">
            {project.description}
          </p>

          <div className="mt-4 flex flex-wrap gap-2">
            {project.tech.map((tech) => (
              <Badge key={tech} variant="secondary" className="rounded-full bg-background/60">
                {tech}
              </Badge>
            ))}
          </div>
        </div>

        {/* ✅ pinned bottom */}
        <div className="mt-auto pt-5">
          {(hasDemo || hasRepo) ? (
            <div className="flex flex-wrap gap-2">
              {hasDemo ? (
                <Button asChild size="sm" className="rounded-full">
                  <a href={project.links.live} target="_blank" rel="noreferrer">
                    <ExternalLink className="mr-2 h-4 w-4" />
                    {t("demo")}
                  </a>
                </Button>
              ) : null}

              {hasRepo ? (
                <Button asChild size="sm" variant="outline" className="rounded-full">
                  <a href={project.links.repo} target="_blank" rel="noreferrer">
                    <Github className="mr-2 h-4 w-4" />
                    {t("code")}
                  </a>
                </Button>
              ) : null}
            </div>
          ) : (
            <div className="text-xs text-muted-foreground">{t("private")}</div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}


/* ---------------- Tilt Card ---------------- */

function TiltProjectCard({ project, t }) {
  const reduce = useReducedMotion();
  const hasDemo = Boolean(project?.links?.live);
  const hasRepo = Boolean(project?.links?.repo);

  const ref = React.useRef(null);
  const [tilt, setTilt] = React.useState({ rx: 0, ry: 0 });

  function onMove(e) {
    if (reduce || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;

    const dx = x / r.width - 0.5;
    const dy = y / r.height - 0.5;

    setTilt({ rx: (-dy * 6).toFixed(2), ry: (dx * 8).toFixed(2) });
  }

  function onLeave() {
    setTilt({ rx: 0, ry: 0 });
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{
        transformStyle: "preserve-3d",
        transform: reduce ? "none" : `perspective(900px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
      }}
      className="rounded-3xl h-full"
    >
      {/* ✅ h-full so grid can stretch */}
      <Card className="rounded-3xl border bg-background/55 backdrop-blur overflow-hidden group transition hover:bg-background/70 h-full flex flex-col">
        <div className="relative">
          <ProjectMedia project={project} className="h-[160px]" />
          <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition bg-gradient-to-t from-background/80 via-transparent to-transparent" />
        </div>

        {/* ✅ flex-col + mt-auto footer */}
        <CardContent className="p-5 flex flex-col flex-1">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <div className="text-lg font-semibold truncate">{project.name}</div>
              <div className="text-xs text-muted-foreground">{project.period}</div>
            </div>
            {project.featured ? <Badge className="rounded-full">{t("featured")}</Badge> : null}
          </div>

          {/* ✅ fixed lines => same height */}
          <p className="mt-2 text-sm text-muted-foreground leading-relaxed line-clamp-2">
            {project.description}
          </p>

          <div className="mt-3 flex flex-wrap gap-2">
            {project.tech.slice(0, 4).map((tech) => (
              <Badge key={tech} variant="secondary" className="rounded-full bg-background/60">
                {tech}
              </Badge>
            ))}
            {project.tech.length > 4 ? (
              <Badge variant="secondary" className="rounded-full bg-background/60">
                +{project.tech.length - 4}
              </Badge>
            ) : null}
          </div>

          {/* ✅ bottom pinned actions */}
          <div className="mt-auto pt-4">
            {(hasDemo || hasRepo) ? (
              <div className="flex flex-wrap gap-2">
                {hasDemo ? (
                  <Button asChild size="sm" variant="outline" className="rounded-full">
                    <a href={project.links.live} target="_blank" rel="noreferrer">
                      <ExternalLink className="mr-2 h-4 w-4" />
                      {t("demo")}
                    </a>
                  </Button>
                ) : null}

                {hasRepo ? (
                  <Button asChild size="sm" variant="outline" className="rounded-full">
                    <a href={project.links.repo} target="_blank" rel="noreferrer">
                      <Github className="mr-2 h-4 w-4" />
                      {t("code")}
                    </a>
                  </Button>
                ) : null}
              </div>
            ) : (
              <div className="text-xs text-muted-foreground">{t("private")}</div>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}


/* ---------------- Media (image + optional video) ---------------- */

function ProjectMedia({ project, className }) {
  const raw = project?.image;
  const src = typeof raw === "string" ? raw.trim() : "";
  const video = typeof project?.video === "string" ? project.video.trim() : "";

  if (!src) {
    return (
      <div className={cn("relative w-full", className)}>
        <div className="absolute inset-0 bg-gradient-to-br from-rose-500/15 via-fuchsia-500/10 to-indigo-500/15" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.10),transparent_50%)]" />
        <div className="absolute inset-0 border-b" />
        <div className="absolute left-4 bottom-4 rounded-full border bg-background/60 px-3 py-1 text-xs text-muted-foreground backdrop-blur">
          {project.name}
        </div>
      </div>
    );
  }

  const blurDataURL = shimmerBlurDataURL();

  return (
    <div className={cn("relative w-full overflow-hidden", className)}>
      {video ? (
        <video
          className="absolute inset-0 h-full w-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          src={video}
          muted
          loop
          playsInline
          autoPlay
        />
      ) : null}

      <Image
        src={src}
        alt={project.name}
        fill
        className={cn(
          "object-cover transition duration-500",
          video ? "group-hover:opacity-0" : "group-hover:scale-[1.03]"
        )}
        sizes="(max-width: 768px) 100vw, 50vw"
        priority={Boolean(project.featured)}
        placeholder="blur"
        blurDataURL={blurDataURL}
      />

      <div className="absolute inset-0 opacity-40 bg-gradient-to-br from-black/20 via-transparent to-black/35" />
    </div>
  );
}

function shimmerBlurDataURL() {
  const svg = `
  <svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
    <defs>
      <linearGradient id="g">
        <stop stop-color="rgba(255,255,255,0.06)" offset="20%"/>
        <stop stop-color="rgba(255,255,255,0.16)" offset="50%"/>
        <stop stop-color="rgba(255,255,255,0.06)" offset="70%"/>
      </linearGradient>
    </defs>
    <rect width="1200" height="630" fill="rgba(0,0,0,0.08)"/>
    <rect id="r" width="1200" height="630" fill="url(#g)"/>
    <animate xlink:href="#r" attributeName="x" from="-1200" to="1200" dur="1.2s" repeatCount="indefinite" />
  </svg>`.trim();

  return `data:image/svg+xml;base64,${btoa(svg)}`;
}
