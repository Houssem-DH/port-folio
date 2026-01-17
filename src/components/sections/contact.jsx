"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useReducedMotion } from "framer-motion";
import { Mail, Phone, Globe, Sparkles, ArrowRight } from "lucide-react";

import Section from "@/components/section";
import FadeIn from "@/components/motion/fade-in";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { profile } from "@/lib/data";

const FORMSPREE_ENDPOINT = "https://formspree.io/f/xpqqqdlb";

export default function Contact() {
  const t = useTranslations("contact");
  const reduce = useReducedMotion();

  const [sending, setSending] = useState(false);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setSuccess(false);
    setSending(true);

    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });

      if (res.ok) {
        form.reset();
        setSuccess(true);
      } else {
        alert(t("error"));
      }
    } catch (err) {
      alert(t("error"));
    } finally {
      setSending(false);
    }
  }

  return (
    <Section id="contact" title={t("title")} eyebrow={t("eyebrow")} className="relative">
      {/* intro */}
      <div className="mb-10 max-w-2xl">
        <div className="inline-flex items-center gap-2 rounded-full border bg-background/60 px-3 py-1 text-xs text-muted-foreground backdrop-blur">
          <Sparkles className="h-4 w-4 text-rose-500" />
          {t("hint")}
        </div>
        <p className="mt-4 text-sm text-muted-foreground leading-relaxed">{t("intro")}</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 items-stretch">
        {/* LEFT — contact details */}
        <FadeIn>
          <Card className="rounded-3xl border bg-background/55 backdrop-blur h-full">
            <CardContent className="p-6 flex flex-col h-full">
              <div>
                <h3 className="text-xl font-semibold tracking-tight">{t("cardInfoTitle")}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{t("cardInfoDesc")}</p>

                <div className="mt-6 space-y-4 text-sm">
                  <InfoRow icon={Phone} label={t("phone")} value={profile.phone} />
                  <InfoRow
                    icon={Globe}
                    label={t("website")}
                    value={
                      <a
                        href={profile.website}
                        target="_blank"
                        rel="noreferrer"
                        className="underline underline-offset-4"
                      >
                        {profile.website}
                      </a>
                    }
                  />
                  <InfoRow icon={Mail} label={t("email")} value={profile.email} />
                </div>
              </div>

              {/* CTA pinned bottom */}
              <div className="mt-auto pt-6">
                <Button asChild size="lg" className="w-full rounded-full group">
                  <a href={`mailto:${profile.email}?subject=Portfolio%20Contact`}>
                    {t("emailCta")}
                    <ArrowRight className="ml-2 h-4 w-4 transition group-hover:translate-x-0.5" />
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </FadeIn>

        {/* RIGHT — form */}
        <FadeIn delay={reduce ? 0 : 0.08}>
          <Card className="rounded-3xl border bg-background/55 backdrop-blur h-full">
            <CardContent className="p-6 flex flex-col h-full">
              <div>
                <h3 className="text-xl font-semibold tracking-tight">{t("cardFormTitle")}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{t("cardFormDesc")}</p>

                <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
                  <Input name="name" placeholder={t("name")} required />
                  <Input name="email" type="email" placeholder={t("emailPlaceholder")} required />
                  <Textarea name="message" placeholder={t("message")} rows={5} required />

                  {/* Subject in your inbox */}
                  <input type="hidden" name="_subject" value="New message from portfolio" />

                  {/* Honeypot anti-spam (free) */}
                  <input type="text" name="_gotcha" className="hidden" tabIndex="-1" autoComplete="off" />

                  <Button type="submit" size="lg" className="w-full rounded-full" disabled={sending}>
                    {sending ? t("sending") : t("send")}
                  </Button>

                  {success ? (
                    <div className="rounded-2xl border bg-background/60 px-4 py-3 text-sm">
                      <span className="font-semibold">{t("successTitle")}</span>
                      <div className="text-muted-foreground">{t("success")}</div>
                    </div>
                  ) : null}
                </form>
              </div>

              
            </CardContent>
          </Card>
        </FadeIn>
      </div>
    </Section>
  );
}

/* ---------- small piece ---------- */

function InfoRow({ icon: Icon, label, value }) {
  return (
    <div className="flex items-start gap-3">
      <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl border bg-background/60">
        <Icon className="h-4 w-4 text-rose-500" />
      </span>
      <div>
        <div className="text-xs text-muted-foreground">{label}</div>
        <div className="font-medium text-foreground break-all">{value}</div>
      </div>
    </div>
  );
}
