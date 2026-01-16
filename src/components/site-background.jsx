export default function SiteBackground() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-50 overflow-hidden">
      {/* base */}
      <div className="absolute inset-0 bg-background" />

      {/* subtle grid */}
      <div className="absolute inset-0 opacity-[0.10] dark:opacity-[0.07] bg-[linear-gradient(to_right,hsl(var(--border))_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border))_1px,transparent_1px)] bg-[size:88px_88px]" />

      {/* primary blobs */}
      <div className="absolute -top-48 left-1/2 h-[720px] w-[1100px] -translate-x-1/2 rounded-full blur-3xl opacity-25 bg-gradient-to-r from-rose-500 via-fuchsia-500 to-indigo-500" />
      <div className="absolute -bottom-56 right-[-240px] h-[620px] w-[620px] rounded-full blur-3xl opacity-18 bg-gradient-to-r from-indigo-500 via-cyan-500 to-emerald-500" />

      {/* vignette / depth */}
      <div className="absolute inset-0 [mask-image:radial-gradient(70%_55%_at_50%_18%,black,transparent)] bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.10),transparent_60%)] dark:bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.06),transparent_60%)]" />
    </div>
  );
}
