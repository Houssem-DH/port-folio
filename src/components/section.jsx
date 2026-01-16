import { cn } from "@/lib/utils";

export default function Section({ id, title, eyebrow, children, className }) {
  return (
    <section
      id={id}
      className={cn(
        // consistent spacing + scroll offset for sticky navbar
        "relative scroll-mt-24 py-16 md:py-20",
        className
      )}
    >
      <div className="mx-auto w-full max-w-6xl px-4">
        <div className="mb-10">
          {eyebrow ? <p className="text-sm font-medium text-muted-foreground">{eyebrow}</p> : null}
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">{title}</h2>
        </div>

        {children}
      </div>
    </section>
  );
}
