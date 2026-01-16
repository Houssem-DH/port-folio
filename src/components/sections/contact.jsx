"use client";

import Section from "@/components/section";
import FadeIn from "@/components/motion/fade-in";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { profile } from "@/lib/data";

export default function Contact() {
  return (
    <Section id="contact" title="Contact" eyebrow="Let’s build something">
      <div className="grid gap-6 md:grid-cols-2">
        <FadeIn>
          <Card className="rounded-2xl">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold">Get in touch</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Want to collaborate or hire me? Send a message and I’ll reply as soon as possible.
              </p>

              <div className="mt-5 space-y-2 text-sm">
                <div className="text-muted-foreground">Phone</div>
                <div className="font-medium">{profile.phone}</div>

                <div className="mt-3 text-muted-foreground">Website</div>
                <a className="font-medium underline underline-offset-4" href={profile.website} target="_blank" rel="noreferrer">
                  {profile.website}
                </a>
              </div>

              <div className="mt-6">
                <Button asChild className="w-full">
                  <a href={`mailto:${profile.email}?subject=Portfolio%20Contact`}>Email me</a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </FadeIn>

        <FadeIn delay={0.1}>
          <Card className="rounded-2xl">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold">Quick message</h3>
              <form
                className="mt-4 space-y-3"
                onSubmit={(e) => {
                  e.preventDefault();
                  alert("Connect this form to Resend/EmailJS later and it will send.");
                }}
              >
                <Input placeholder="Your name" required />
                <Input type="email" placeholder="Your email" required />
                <Textarea placeholder="Tell me about your project..." rows={5} required />
                <Button type="submit" className="w-full">
                  Send
                </Button>
              </form>
              <p className="mt-3 text-xs text-muted-foreground">
                Tip: connect to Resend + Server Action for real sending.
              </p>
            </CardContent>
          </Card>
        </FadeIn>
      </div>
    </Section>
  );
}
