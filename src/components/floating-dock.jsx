"use client";

import * as React from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Download, Mail, Github, Linkedin, ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { profile } from "@/lib/data";

export default function FloatingDock() {
  const reduce = useReducedMotion();
  const [show, setShow] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 220);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (reduce) return null;

  return (
    <TooltipProvider>
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.98 }}
        animate={show ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 20, scale: 0.98 }}
        transition={{ duration: 0.25 }}
        className="fixed bottom-5 left-1/2 -translate-x-1/2 z-[60]"
      >
        <div className="flex items-center gap-2 rounded-full border bg-background/70 backdrop-blur px-2 py-2 shadow-lg">
          <DockBtn label="Back to top">
            <Button
              variant="outline"
              size="icon"
              className="rounded-full"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            >
              <ArrowUp className="h-4 w-4" />
            </Button>
          </DockBtn>

          <DockBtn label="Contact">
            <Button asChild variant="outline" size="icon" className="rounded-full">
              <Link href="#contact">
                <Mail className="h-4 w-4" />
              </Link>
            </Button>
          </DockBtn>

          <DockBtn label="Download CV">
            <Button asChild variant="outline" size="icon" className="rounded-full">
              <a href="/resume.pdf" download>
                <Download className="h-4 w-4" />
              </a>
            </Button>
          </DockBtn>

          <DockBtn label="GitHub">
            <Button asChild variant="outline" size="icon" className="rounded-full">
              <a href={profile.github} target="_blank" rel="noreferrer">
                <Github className="h-4 w-4" />
              </a>
            </Button>
          </DockBtn>

          <DockBtn label="LinkedIn">
            <Button asChild variant="outline" size="icon" className="rounded-full">
              <a href={profile.linkedin} target="_blank" rel="noreferrer">
                <Linkedin className="h-4 w-4" />
              </a>
            </Button>
          </DockBtn>
        </div>
      </motion.div>
    </TooltipProvider>
  );
}

function DockBtn({ label, children }) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>{children}</TooltipTrigger>
      <TooltipContent side="top">{label}</TooltipContent>
    </Tooltip>
  );
}
