import Section from "@/components/section";
import FadeIn from "@/components/motion/fade-in";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github } from "lucide-react";
import { projects } from "@/lib/data";

export default function Projects() {
  const featured = projects.filter((p) => p.featured);
  const rest = projects.filter((p) => !p.featured);

  return (
    <Section id="projects" title="Projects" eyebrow="Selected work">
      <div className="grid gap-6">
        <div className="grid gap-6 md:grid-cols-2">
          {featured.map((p, idx) => (
            <FadeIn key={p.name} delay={idx * 0.05}>
              <Card className="rounded-2xl overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="text-xl font-semibold">{p.name}</div>
                      <div className="text-xs text-muted-foreground">{p.period}</div>
                    </div>
                    <Badge className="rounded-full">Featured</Badge>
                  </div>

                  <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{p.description}</p>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {p.tech.map((t) => (
                      <Badge key={t} variant="secondary" className="rounded-full">
                        {t}
                      </Badge>
                    ))}
                  </div>

                  <div className="mt-5 flex gap-2">
                    {p.links.live ? (
                      <Button asChild variant="outline" size="sm">
                        <a href={p.links.live} target="_blank" rel="noreferrer">
                          <ExternalLink className="mr-2 h-4 w-4" />
                          Live
                        </a>
                      </Button>
                    ) : null}

                    {p.links.repo ? (
                      <Button asChild variant="outline" size="sm">
                        <a href={p.links.repo} target="_blank" rel="noreferrer">
                          <Github className="mr-2 h-4 w-4" />
                          Code
                        </a>
                      </Button>
                    ) : null}
                  </div>
                </CardContent>
              </Card>
            </FadeIn>
          ))}
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {rest.map((p, idx) => (
            <FadeIn key={p.name} delay={idx * 0.03}>
              <Card className="rounded-2xl">
                <CardContent className="p-6">
                  <div>
                    <div className="text-lg font-semibold">{p.name}</div>
                    <div className="text-xs text-muted-foreground">{p.period}</div>
                  </div>

                  <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{p.description}</p>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {p.tech.map((t) => (
                      <Badge key={t} variant="secondary" className="rounded-full">
                        {t}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </FadeIn>
          ))}
        </div>
      </div>
    </Section>
  );
}
