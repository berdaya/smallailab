"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState, type ReactNode } from "react";

/* ---------------------------------- Reveal --------------------------------- */

export function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`berdaya-reveal ${visible ? "is-visible" : ""} ${className}`}
    >
      {children}
    </div>
  );
}

/* ---------------------------------- Header --------------------------------- */
/* MVP: no mega-menus — logo, a few in-page anchors, one CTA. */

const HEADER_LINKS = [
  { label: "How it works", href: "#cara-kerja" },
  { label: "Product", href: "#produk" },
  { label: "Safety", href: "#kontrol" },
  { label: "FAQ", href: "#faq" },
];

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 w-full border-b backdrop-blur-xl transition-colors ${
        scrolled
          ? "border-[#1c1a15]/10 bg-[#faf8f2]/92 shadow-[0_1px_0_rgba(28,26,21,0.04)]"
          : "border-[#1c1a15]/8 bg-[#faf8f2]/80"
      }`}
    >
      <a
        href="#konten"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-[60] focus:bg-[#1c1a15] focus:px-3 focus:py-2 focus:text-sm focus:text-white"
      >
        Skip to content
      </a>
      <div className="mx-auto flex h-[60px] w-full max-w-[1440px] items-center justify-between gap-3 px-4 sm:px-5 lg:px-20">
        <Link href="/berdaya" className="flex min-h-11 shrink-0 items-center gap-2.5 py-1" aria-label="Berdaya AI — home">
          <Image src="/berdaya.ico" alt="" width={28} height={28} unoptimized className="size-7 rounded-full" />
          <span className="text-[17px] font-medium leading-none tracking-[-0.03em] text-[#1c1a15]">Berdaya AI</span>
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-1 md:flex">
          {HEADER_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="flex min-h-11 items-center rounded-md px-3.5 text-[14px] text-[#1c1a15]/70 transition-colors hover:text-[#1c1a15] focus-visible:outline-2 focus-visible:outline-[#1c1a15]"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <Link
          href="#mulai"
          className="flex min-h-11 shrink-0 items-center gap-2 rounded-md bg-[#1c1a15] px-3.5 text-[13.5px] font-medium text-white transition-colors hover:bg-[#3a372f] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1c1a15] sm:px-4 sm:text-[14px]"
        >
          Book a demo <span aria-hidden>→</span>
        </Link>
      </div>

      {/* Mobile nav — second row, thumb-friendly, no hamburger needed for 4 links */}
      <nav aria-label="Mobile" className="border-t border-[#1c1a15]/8 md:hidden">
        <div className="mx-auto grid max-w-[1440px] grid-cols-4 px-2">
          {HEADER_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="flex min-h-11 items-center justify-center px-1 text-center text-[12.5px] font-medium text-[#1c1a15]/70 transition-colors hover:text-[#1c1a15] focus-visible:outline-2 focus-visible:outline-[#1c1a15]"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}

/* --------------------------------- Swarm art -------------------------------- */
/* MindFort's signature ASCII swarm, animated: waves travel through the
   character field and a "learning" band sweeps across it — each pass denser,
   echoing "each attack teaches the next". ~8 fps, tiny grid, cheap to run. */

const SWARM_CHARS = " ;:+*?%S#@";

function swarmChar(x: number, y: number, cols: number, rows: number, phase: number) {
  const nx = (x / cols - 0.5) * 2;
  const ny = (y / rows - 0.5) * 2;
  const d = Math.sqrt(nx * nx * 1.15 + ny * ny);
  // travelling waves (phase moves them through the field)
  const wave =
    Math.sin((x + y) * 0.55 - phase * 0.85) * 0.5 +
    Math.sin(x * 0.32 - y * 0.21 + phase * 0.55) * 0.5;
  const noise = Math.sin(x * 12.9898 + y * 78.233) * 43758.5453;
  const n = noise - Math.floor(noise);
  // a scan band that sweeps left → right, then loops
  const sweep = ((phase * 1.6) % (cols + 24)) - 12;
  const band = Math.exp(-Math.pow(x - sweep, 2) / 26) * 0.34;
  // the mass slowly breathes / grows with each sweep cycle
  const breathe = Math.sin(phase * 0.22) * 0.06;
  const density = Math.max(0, 1.18 - d + breathe) + wave * 0.16 + (n - 0.5) * 0.22 + band;
  const idx = Math.min(SWARM_CHARS.length - 1, Math.max(0, Math.floor(density * SWARM_CHARS.length)));
  return SWARM_CHARS[idx];
}

export function SwarmArt({ cols = 46, rows = 15, className = "" }: { cols?: number; rows?: number; className?: string }) {
  const [phase, setPhase] = useState(0);
  const artRef = useRef<HTMLPreElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let inView = true;
    const el = artRef.current;
    const io =
      el && "IntersectionObserver" in window
        ? new IntersectionObserver(([e]) => (inView = e.isIntersecting), { threshold: 0.05 })
        : null;
    if (el && io) io.observe(el);
    const id = window.setInterval(() => {
      if (inView && !document.hidden) setPhase((p) => p + 1);
    }, 125);
    return () => {
      window.clearInterval(id);
      io?.disconnect();
    };
  }, []);

  const lines: string[] = [];
  for (let y = 0; y < rows; y++) {
    let line = "";
    for (let x = 0; x < cols; x++) line += swarmChar(x, y, cols, rows, phase);
    lines.push(line);
  }
  return (
    <pre
      ref={artRef}
      aria-hidden
      className={`berdaya-swarm w-full select-none overflow-hidden font-[family-name:var(--font-berdaya-mono)] text-[8px] leading-[1.3] tracking-[0.06em] text-[#1c1a15]/55 min-[380px]:text-[9.5px] sm:text-[11px] sm:leading-[1.35] ${className}`}
    >
      {lines.map((line, i) => (
        <span key={i} className="block whitespace-pre">
          {line.split("").map((ch, j) => (
            <span
              key={j}
              style={{
                color:
                  ch === "@" || ch === "#"
                    ? "#1c1a15"
                    : ch === "S" || ch === "%"
                      ? "rgba(28,26,21,0.75)"
                      : undefined,
              }}
            >
              {ch}
            </span>
          ))}
        </span>
      ))}
    </pre>
  );
}

/* ------------------------------ Hero swarm visual ----------------------------- */
/* MindFort's ASCII swarm, modified: a living vortex of agents orbiting and
   probing the live app at the centre. Canvas-rendered, monochrome.
   - character field flows & breathes (density ring travelling around target)
   - agent dots orbit with trails; probe rings pulse from the target
   - respects prefers-reduced-motion, pauses off-screen / tab hidden */

const SWARM_MSGS = [
  { t: "09:41", msg: "swarm → app.yourcompany.com · 214 endpoints mapped", tone: "text-[#1c1a15]/70" },
  { t: "09:42", msg: "agent-023 → mapping auth roles & permissions", tone: "text-[#1c1a15]/70" },
  { t: "09:44", msg: "agent-012 → SQLi probe · GET /api/users?search=", tone: "text-[#1c1a15]" },
  { t: "09:44", msg: "agent-047 → IDOR candidate on /api/invoices/:id", tone: "text-[#1c1a15]/70" },
  { t: "09:45", msg: "EXPLOIT CONFIRMED · BRD-142 · proof captured ✓", tone: "font-semibold text-[#b42318]" },
  { t: "09:46", msg: "agent-089 → chaining findings · context shared to swarm", tone: "text-[#1c1a15]/70" },
];

export function HeroSwarm() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const [tick, setTick] = useState(0);

  /* rotating log window (3 lines visible) */
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => setTick((v) => v + 1), 2300);
    return () => window.clearInterval(id);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0;
    let h = 0;
    let raf = 0;
    let running = true;
    const resize = () => {
      const rect = wrap.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width = Math.max(1, Math.round(w * dpr));
      canvas.height = Math.max(1, Math.round(h * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(wrap);

    /* orbit agents */
    type Agent = { a: number; r: number; speed: number; wob: number; size: number };
    const agents: Agent[] = Array.from({ length: 64 }, (_, i) => ({
      a: Math.random() * Math.PI * 2,
      r: 0.24 + ((i * 37) % 40) / 100, // 0.24..0.63 of half-size
      speed: (0.12 + ((i * 53) % 30) / 160) * (i % 7 === 0 ? -0.55 : 1),
      wob: Math.random() * Math.PI * 2,
      size: i % 11 === 0 ? 2.6 : 1.6,
    }));
    const prev = new Map<number, { x: number; y: number }>();

    const CHARS = " ;:+*?%S#@";
    const cellNoise = (x: number, y: number) => {
      const n = Math.sin(x * 12.9898 + y * 78.233) * 43758.5453;
      return n - Math.floor(n);
    };

    let lastPulse = 0;
    const pulses: { r: number; alpha: number }[] = [];

    const draw = (now: number) => {
      const t = now / 1000;
      ctx.clearRect(0, 0, w, h);
      const cx = w / 2;
      const cy = h / 2;
      const half = Math.min(w, h) / 2;

      /* --- ASCII vortex field --- */
      const cell = w < 340 ? 12 : 14;
      const cols = Math.ceil(w / cell);
      const rows = Math.ceil(h / cell);
      ctx.font = `${cell - 2}px "JetBrains Mono", ui-monospace, monospace`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      const ringR = 0.55 + Math.sin(t * 0.6) * 0.06;
      for (let gy = 0; gy < rows; gy++) {
        for (let gx = 0; gx < cols; gx++) {
          const px = gx * cell + cell / 2;
          const py = gy * cell + cell / 2;
          const dx = (px - cx) / half;
          const dy = (py - cy) / (half * 0.94);
          const r = Math.sqrt(dx * dx + dy * dy);
          if (r < 0.34 || r > 1.12) continue; // keep a clear hole for the target
          const ang = Math.atan2(dy, dx);
          const ring = Math.exp(-Math.pow(r - ringR, 2) / 0.045);
          const swirl = 0.5 + 0.5 * Math.sin(ang * 3 + t * 1.3 - r * 5.5);
          const density = ring * (0.45 + swirl * 0.65) + (cellNoise(gx, gy) - 0.5) * 0.14;
          if (density < 0.16) continue;
          const idx = Math.min(CHARS.length - 1, Math.floor(density * CHARS.length * 1.15));
          const ch = CHARS[idx];
          if (!ch || ch === " ") continue;
          ctx.fillStyle = `rgba(28,26,21,${0.14 + density * 0.62})`;
          ctx.fillText(ch, px, py);
        }
      }

      /* --- probe rings from target --- */
      if (!reduced && now - lastPulse > 1900) {
        lastPulse = now;
        pulses.push({ r: 0.36, alpha: 0.5 });
      }
      for (let i = pulses.length - 1; i >= 0; i--) {
        const p = pulses[i];
        p.r += 0.006;
        p.alpha -= 0.008;
        if (p.alpha <= 0) {
          pulses.splice(i, 1);
          continue;
        }
        ctx.beginPath();
        ctx.arc(cx, cy, p.r * half, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(28,26,21,${p.alpha * 0.5})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      /* --- orbiting agents with trails --- */
      agents.forEach((ag, i) => {
        if (!reduced) ag.a += ag.speed * 0.016;
        const rr = (ag.r + Math.sin(t * 0.9 + ag.wob) * 0.035) * half * 1.55;
        const x = cx + Math.cos(ag.a) * rr;
        const y = cy + Math.sin(ag.a) * rr * 0.86;
        const p0 = prev.get(i);
        if (p0 && !reduced) {
          ctx.beginPath();
          ctx.moveTo(p0.x, p0.y);
          ctx.lineTo(x, y);
          ctx.strokeStyle = "rgba(28,26,21,0.28)";
          ctx.lineWidth = 1;
          ctx.stroke();
        }
        prev.set(i, { x, y });
        ctx.beginPath();
        ctx.arc(x, y, ag.size, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(28,26,21,0.88)";
        ctx.fill();
        if (ag.size > 2) {
          ctx.beginPath();
          ctx.arc(x, y, ag.size + 3.5, 0, Math.PI * 2);
          ctx.strokeStyle = "rgba(28,26,21,0.35)";
          ctx.stroke();
        }
      });
    };

    const loop = (now: number) => {
      if (running && !document.hidden) draw(now);
      raf = requestAnimationFrame(loop);
    };

    draw(performance.now()); // paint immediately, don't wait for first frame
    if (reduced) {
      draw(1200); // single static frame
    } else {
      raf = requestAnimationFrame(loop);
    }

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, []);

  const logWindow = [0, 1, 2].map((k) => SWARM_MSGS[(tick + k) % SWARM_MSGS.length]);

  return (
    <div className="relative mx-auto w-full max-w-[580px]">
      <figure
        className="relative overflow-hidden rounded-2xl border border-[#1c1a15]/10 bg-white shadow-[0_40px_90px_-48px_rgba(28,26,21,0.45)]"
        role="img"
        aria-label="Visualization: a swarm of 128 unsupervised AI agents orbiting and probing a live application, one exploit confirmed with proof"
      >
        {/* card header */}
        <div className="relative z-10 flex items-center justify-between border-b border-[#1c1a15]/8 bg-[#f5f1e6]/70 px-4 py-3 sm:px-5">
          <p className="font-[family-name:var(--font-berdaya-mono)] text-[10.5px] uppercase tracking-[0.16em] text-[#1c1a15]/50">
            Agent swarm · unsupervised
          </p>
          <span className="flex items-center gap-1.5 font-[family-name:var(--font-berdaya-mono)] text-[10.5px] uppercase text-[#1c1a15]">
            <span className="size-1.5 animate-pulse rounded-full bg-[#1c1a15]" /> 128 agents · live
          </span>
        </div>

        {/* swarm field */}
        <div ref={wrapRef} className="relative h-[290px] bg-[#faf8f2] min-[420px]:h-[320px] sm:h-[340px]">
          <canvas ref={canvasRef} aria-hidden className="absolute inset-0 h-full w-full" />

          {/* target — the live app at the centre */}
          <div className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2">
            <div className="berdaya-target-ring relative flex flex-col items-center rounded-2xl border border-[#1c1a15]/15 bg-white px-4 py-3 text-center shadow-[0_16px_40px_-16px_rgba(28,26,21,0.4)]">
              <Image src="/berdaya.ico" alt="" width={22} height={22} unoptimized className="size-[22px] rounded-full" />
              <p className="mt-1.5 whitespace-nowrap font-[family-name:var(--font-berdaya-mono)] text-[11px] font-medium text-[#1c1a15]">
                app.yourcompany.com
              </p>
              <p className="font-[family-name:var(--font-berdaya-mono)] text-[9px] uppercase tracking-[0.14em] text-[#1c1a15]/45">
                Your live app · target
              </p>
            </div>
          </div>

          {/* floating agent chips */}
          <p aria-hidden className="berdaya-float absolute left-3 top-3 hidden rounded-md border border-[#1c1a15]/10 bg-white/85 px-2 py-1 font-[family-name:var(--font-berdaya-mono)] text-[9.5px] text-[#1c1a15]/60 backdrop-blur-sm min-[420px]:block">
            agent-012 · probing auth
          </p>
          <p aria-hidden className="berdaya-float-late absolute bottom-3 right-3 hidden rounded-md border border-[#1c1a15]/10 bg-white/85 px-2 py-1 font-[family-name:var(--font-berdaya-mono)] text-[9.5px] text-[#1c1a15]/60 backdrop-blur-sm min-[420px]:block">
            agent-047 · testing IDOR
          </p>
          <p aria-hidden className="berdaya-float absolute bottom-3 left-3 hidden rounded-md border border-[#1c1a15]/10 bg-white/85 px-2 py-1 font-[family-name:var(--font-berdaya-mono)] text-[9.5px] text-[#1c1a15]/60 backdrop-blur-sm sm:block">
            agent-089 · retesting fix
          </p>
        </div>

        {/* rotating swarm log */}
        <div aria-hidden className="relative z-10 space-y-1.5 border-t border-[#1c1a15]/8 px-4 py-3.5 font-[family-name:var(--font-berdaya-mono)] text-[11px] leading-relaxed sm:px-5 sm:text-[11.5px]">
          {logWindow.map((row, i) => (
            <p key={tick + "-" + i} className="berdaya-log-in flex gap-2.5 sm:gap-3" style={{ animationDelay: `${i * 90}ms` }}>
              <span className="shrink-0 text-[#1c1a15]/35">{row.t}</span>
              <span className={`min-w-0 [overflow-wrap:anywhere] ${row.tone} ${i === 0 ? "opacity-45" : ""}`}>{row.msg}</span>
            </p>
          ))}
        </div>

        <div className="relative z-10 flex flex-wrap items-center justify-between gap-2 border-t border-[#1c1a15]/8 bg-[#faf8f2] px-4 py-3 font-[family-name:var(--font-berdaya-mono)] text-[11px] text-[#1c1a15]/45 sm:px-5">
          <span>Unsupervised · scoped · fully logged</span>
          <span className="font-medium text-[#1c1a15]">100% findings with exploit proof</span>
        </div>
      </figure>
      <p className="mt-3 flex flex-wrap justify-between gap-2 font-[family-name:var(--font-berdaya-mono)] text-[11px] text-[#1c1a15]/35">
        <span>fig. 01 — the swarm, at work</span>
        <span>powered by BRD-1</span>
      </p>
    </div>
  );
}

/* ------------------------------- Attack demo -------------------------------- */
/* Parameter 01/02/03 x MindFort Test → Prove → Verify-the-fix */

const STEPS = [
  {
    id: "connect",
    no: "01",
    title: "Connect",
    desc: "Point Berdaya at your live application — a URL and test credentials is all it takes. No weeks of scoping, no agents to install, source code optional.",
  },
  {
    id: "attack",
    no: "02",
    title: "Attack",
    desc: "An unsupervised swarm attacks the running app in parallel like a real adversary — across APIs, auth flows, and business logic. Each attack teaches the next.",
  },
  {
    id: "prove",
    no: "03",
    title: "Prove & retest",
    desc: "Every finding ships a working exploit and reproduction steps. Open the fix PR, deploy, and Berdaya repeats the attack to verify the fix holds.",
  },
] as const;

const SWARM_LOG = [
  { t: "09:41:02", msg: "swarm deployed · 128 agents · app.acme.com", tone: "text-[#1c1a15]/50" },
  { t: "09:41:19", msg: "recon complete · 214 endpoints · 3 auth roles mapped", tone: "text-[#1c1a15]/70" },
  { t: "09:43:51", msg: "agent-047 → IDOR candidate on /api/invoices/:id", tone: "text-[#1c1a15]/70" },
  { t: "09:44:03", msg: "agent-012 → SQLi probe on GET /api/users?search=", tone: "text-[#1c1a15]" },
  { t: "09:44:07", msg: "EXPLOIT CONFIRMED · cross-tenant data access · proof captured", tone: "font-semibold text-[#b42318]" },
  { t: "09:44:08", msg: "finding BRD-142 created · severity CRITICAL · CWE-89", tone: "text-[#1c1a15]/70" },
  { t: "09:44:09", msg: "swarm continues · no destructive action taken · all actions logged", tone: "text-[#1c1a15]/50" },
];

export function AttackDemo() {
  const [active, setActive] = useState<(typeof STEPS)[number]["id"]>("connect");
  const [target, setTarget] = useState("");
  const [deployed, setDeployed] = useState(false);

  return (
    <div className="grid w-full gap-10 lg:grid-cols-[1fr_1.08fr] lg:gap-16">
      <div>
        <div className="flex flex-col" role="tablist" aria-label="How Berdaya works">
          {STEPS.map((step) => {
            const isActive = active === step.id;
            return (
              <button
                key={step.id}
                role="tab"
                aria-selected={isActive}
                onClick={() => setActive(step.id)}
                className="group border-t border-[#1c1a15]/10 py-6 text-left last:border-b focus-visible:outline-2 focus-visible:outline-[#1c1a15]"
              >
                <span className="flex items-baseline gap-4 px-1 sm:px-3">
                  <span className={`font-[family-name:var(--font-berdaya-mono)] text-[13px] ${isActive ? "text-[#1c1a15]" : "text-[#1c1a15]/35"}`}>
                    {step.no}
                  </span>
                  <span className="flex-1">
                    <span
                      className={`block text-[22px] font-medium leading-tight tracking-[-0.03em] lg:text-[26px] ${
                        isActive ? "text-[#1c1a15]" : "text-[#1c1a15]/45 group-hover:text-[#1c1a15]/75"
                      }`}
                    >
                      {step.title}
                    </span>
                    {isActive && (
                      <span className="mt-2.5 block max-w-[48ch] text-[15px] leading-relaxed text-[#1c1a15]/60">{step.desc}</span>
                    )}
                  </span>
                  <span aria-hidden className={`text-lg ${isActive ? "text-[#1c1a15]" : "text-[#1c1a15]/25"}`}>
                    {isActive ? "—" : "+"}
                  </span>
                </span>
              </button>
            );
          })}
        </div>
        <p className="mt-5 px-1 font-[family-name:var(--font-berdaya-mono)] text-[12px] leading-relaxed text-[#1c1a15]/45 sm:px-3">
          From first deployment (&lt; 10 min) to verified findings (&lt; 8 hrs).
          <br />
          Traditional pentest: 2–6 weeks, then blind for 12 months.
        </p>
      </div>

      <div className="overflow-hidden rounded-2xl border border-[#1c1a15]/10 bg-white shadow-[0_32px_80px_-40px_rgba(28,26,21,0.35)]" aria-live="polite">
        <div className="flex items-center justify-between border-b border-[#1c1a15]/8 px-5 py-3.5">
          <span className="flex items-center gap-2 font-[family-name:var(--font-berdaya-mono)] text-[11px] uppercase tracking-[0.16em] text-[#1c1a15]/50">
            <span className={`size-2 rounded-full ${deployed || active !== "connect" ? "bg-[#1c1a15]" : "bg-[#1c1a15]/25"}`} />
            {active === "connect" ? "Connect a target" : active === "attack" ? "Swarm · live attack" : "Prove & retest"}
          </span>
          <span className="font-[family-name:var(--font-berdaya-mono)] text-[11px] text-[#1c1a15]/40">berdaya.app/console</span>
        </div>

        {active === "connect" && (
          <div className="p-5 sm:p-6">
            <label htmlFor="target-url" className="text-[13px] font-medium text-[#1c1a15]">
              Target URL
            </label>
            <div className="mt-2 flex flex-col gap-2 sm:flex-row">
              <input
                id="target-url"
                value={target}
                onChange={(e) => {
                  setTarget(e.target.value);
                  setDeployed(false);
                }}
                placeholder="https://app.yourcompany.com"
                inputMode="url"
                className="min-h-12 w-full min-w-0 flex-1 rounded-lg border border-[#1c1a15]/15 bg-[#faf8f2] px-3.5 font-[family-name:var(--font-berdaya-mono)] text-[16px] text-[#1c1a15] placeholder:text-[#1c1a15]/35 focus:border-[#1c1a15] focus:outline-none focus:ring-2 focus:ring-[#1c1a15]/25 sm:text-[14px]"
              />
              <button
                type="button"
                onClick={() => setDeployed(true)}
                className="min-h-12 shrink-0 rounded-lg bg-[#1c1a15] px-5 text-[14px] font-medium text-white hover:bg-[#3a372f] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1c1a15]"
              >
                Deploy swarm
              </button>
            </div>
            <ul className="mt-6 space-y-3">
              {[
                { label: "Live application & APIs", state: deployed ? "Reachable · 214 endpoints" : "Waiting for target" },
                { label: "Test accounts (3 roles)", state: deployed ? "Authenticated" : "Optional" },
                { label: "Source code repository", state: deployed ? "Linked · findings traced to code" : "Optional — not required" },
                { label: "Rules of engagement & scope", state: deployed ? "Locked · guardrails on" : "Set before first attack" },
              ].map((row) => (
                <li key={row.label} className="flex items-center justify-between gap-3 rounded-lg bg-[#f5f1e6] px-3.5 py-3 text-[14px]">
                  <span className="text-[#1c1a15]/80">{row.label}</span>
                  <span className={`shrink-0 font-[family-name:var(--font-berdaya-mono)] text-[11px] uppercase tracking-wide ${deployed ? "text-[#1c1a15]" : "text-[#1c1a15]/40"}`}>
                    {deployed ? "✓ " : ""}{row.state}
                  </span>
                </li>
              ))}
            </ul>
            {deployed && (
              <p className="mt-4 rounded-lg border border-[#1c1a15]/35 bg-[#1c1a15]/10 px-3.5 py-3 text-[13.5px] leading-relaxed text-[#1c1a15]">
                Swarm deploying against <strong>{target.trim() || "your target"}</strong> — watch it attack live in step “Attack” →
              </p>
            )}
          </div>
        )}

        {active === "attack" && (
          <div className="p-5 sm:p-6">
            <div className="flex items-center justify-between">
              <p className="font-[family-name:var(--font-berdaya-mono)] text-[11px] uppercase tracking-[0.14em] text-[#1c1a15]/45">
                Swarm log · unsupervised
              </p>
              <span className="flex items-center gap-1.5 font-[family-name:var(--font-berdaya-mono)] text-[11px] text-[#1c1a15]">
                <span className="size-1.5 animate-pulse rounded-full bg-[#1c1a15]" /> 128 AGENTS ACTIVE
              </span>
            </div>
            <ol className="mt-4 space-y-2.5 rounded-xl bg-[#f5f1e6] p-4 font-[family-name:var(--font-berdaya-mono)] text-[12px] leading-relaxed sm:text-[12.5px]">
              {SWARM_LOG.map((row) => (
                <li key={row.t + row.msg} className="flex gap-2.5 sm:gap-3">
                  <span className="shrink-0 text-[#1c1a15]/35">{row.t}</span>
                  <span className={`min-w-0 [overflow-wrap:anywhere] ${row.tone}`}>{row.msg}</span>
                </li>
              ))}
            </ol>
            <div className="mt-4 grid grid-cols-3 gap-2.5 text-center">
              {[
                { n: "214", l: "endpoints probed" },
                { n: "1,842", l: "attack attempts" },
                { n: "1", l: "exploit confirmed" },
              ].map((s) => (
                <div key={s.l} className="rounded-xl border border-[#1c1a15]/8 px-2 py-3">
                  <p className="text-[20px] font-medium tracking-tight">{s.n}</p>
                  <p className="mt-0.5 text-[11px] leading-tight text-[#1c1a15]/50">{s.l}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {active === "prove" && (
          <div className="p-5 sm:p-6">
            <p className="flex flex-wrap items-center gap-2">
              <span className="rounded bg-[#b42318] px-2 py-0.5 font-[family-name:var(--font-berdaya-mono)] text-[10.5px] font-semibold uppercase tracking-wide text-white">
                Critical · Proven
              </span>
              <span className="font-[family-name:var(--font-berdaya-mono)] text-[11.5px] text-[#1c1a15]/45">BRD-142 · CWE-89</span>
            </p>
            <p className="mt-3 text-[16px] font-medium leading-snug tracking-[-0.01em]">SQL injection in /api/users search param</p>
            <div className="mt-3 rounded-xl bg-[#f5f1e6] px-4 py-3 font-[family-name:var(--font-berdaya-mono)] text-[12.5px] leading-relaxed text-[#1c1a15]/80 [overflow-wrap:anywhere]">
              GET /api/users?search=&apos; OR &apos;1&apos;=&apos;1
              <span className="mt-1 block text-[#b42318]">→ 200 OK · returns all users across tenants</span>
            </div>
            <ol className="mt-4 space-y-2.5 text-[13.5px] text-[#1c1a15]/70">
              <li className="flex gap-2"><span className="text-[#1c1a15]">1.</span> Working exploit & steps to reproduce — attached.</li>
              <li className="flex gap-2"><span className="text-[#1c1a15]">2.</span> Root cause traced to <span className="font-[family-name:var(--font-berdaya-mono)] text-[12.5px]">users-repository.ts:42</span></li>
              <li className="flex gap-2"><span className="text-[#1c1a15]">3.</span> Fix PR opened → deployed → <strong className="text-[#1c1a15]">swarm retested: exploit no longer works ✓</strong></li>
            </ol>
            <div className="mt-5 flex flex-wrap gap-2">
              <button type="button" className="min-h-11 rounded-lg bg-[#1c1a15] px-4 text-[13.5px] font-medium text-white hover:bg-[#3a372f] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1c1a15]">
                Open fix PR
              </button>
              <button type="button" className="min-h-11 rounded-lg border border-[#1c1a15]/15 px-4 text-[13.5px] font-medium hover:bg-[#f5f1e6] focus-visible:outline-2 focus-visible:outline-[#1c1a15]">
                Retest now
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ------------------------------- Finding board ------------------------------ */
/* Parameter's Findings UI, light mode */

type Finding = {
  id: string;
  title: string;
  severity: "Critical" | "High" | "Medium" | "Low";
  severityClass: string;
  cwe: string;
  status: "Open" | "In Progress" | "Fixed · Retested";
  when: string;
  summary: string;
  repro: string;
  result: string;
  location: string;
};

const FINDINGS: Finding[] = [
  {
    id: "BRD-142",
    title: "SQL injection in /api/users search param",
    severity: "Critical",
    severityClass: "bg-[#b42318] text-white",
    cwe: "CWE-89",
    status: "Open",
    when: "Proven · 3d ago",
    summary:
      "The search parameter on GET /api/users is concatenated directly into a SQL query without parameterization. An attacker can inject arbitrary SQL to read or modify data belonging to other tenants.",
    repro: "GET /api/users?search=' OR '1'='1",
    result: "→ 200 OK · returns all users across tenants",
    location: "users-repository.ts:42",
  },
  {
    id: "BRD-136",
    title: "IDOR on invoice download endpoint",
    severity: "High",
    severityClass: "bg-[#1c1a15] text-white",
    cwe: "CWE-639",
    status: "Open",
    when: "Proven · Jul 12",
    summary:
      "Invoice IDs are sequential and not checked against the caller's tenant. Any authenticated user can download another customer's invoice, including pricing and billing details.",
    repro: "GET /api/invoices/104822/download  (as tenant B)",
    result: "→ 200 OK · invoice belonging to tenant A returned",
    location: "invoices-controller.ts:118",
  },
  {
    id: "BRD-138",
    title: "Stored XSS in comment rendering",
    severity: "High",
    severityClass: "bg-[#1c1a15] text-white",
    cwe: "CWE-79",
    status: "In Progress",
    when: "Fix PR opened · Jul 20",
    summary:
      "Comment bodies are rendered as raw HTML on the project page. A stored payload executes in the browser of every viewer, including workspace admins.",
    repro: "POST /api/comments  body: <img src=x onerror=…>",
    result: "→ payload executes for admin viewers · session token reachable",
    location: "CommentBody.tsx:27",
  },
  {
    id: "BRD-131",
    title: "Missing rate limiting on /auth/login",
    severity: "Medium",
    severityClass: "bg-amber-400 text-amber-950",
    cwe: "CWE-307",
    status: "Fixed · Retested",
    when: "Retested · exploit blocked ✓",
    summary:
      "The login endpoint accepted unlimited attempts with no lockout or throttling. The swarm confirmed credential stuffing at 400 attempts/minute before the fix.",
    repro: "POST /auth/login  ×400/min from swarm",
    result: "→ after fix: 429 after 5 attempts · retest passed",
    location: "auth-routes.ts:61",
  },
];

export function FindingBoard() {
  const [selected, setSelected] = useState<Finding>(FINDINGS[0]);

  return (
    <div className="overflow-hidden rounded-2xl border border-[#1c1a15]/10 bg-white text-left shadow-[0_40px_90px_-48px_rgba(28,26,21,0.4)]">
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 border-b border-[#1c1a15]/8 px-4 py-3 sm:px-5">
        <span className="flex gap-1.5" aria-hidden>
          <span className="size-2.5 rounded-full bg-[#1c1a15]/15" />
          <span className="size-2.5 rounded-full bg-[#1c1a15]/15" />
          <span className="size-2.5 rounded-full bg-[#1c1a15]" />
        </span>
        <p className="font-[family-name:var(--font-berdaya-mono)] text-[11.5px] text-[#1c1a15]/50">
          Findings <span className="text-[#1c1a15]/30">›</span> Acme API pentest <span className="text-[#1c1a15]/30">›</span>{" "}
          <span className="text-[#1c1a15]">{selected.id}</span>
        </p>
        <span className="ml-auto hidden items-center gap-1.5 font-[family-name:var(--font-berdaya-mono)] text-[11px] text-[#1c1a15] sm:flex">
          <span className="size-1.5 animate-pulse rounded-full bg-[#1c1a15]" /> SWARM ACTIVE · UNSUPERVISED
        </span>
      </div>

      <div className="grid lg:grid-cols-[1.02fr_1fr]">
        <div className="border-b border-[#1c1a15]/8 lg:border-b-0 lg:border-r">
          <div className="flex items-center justify-between px-4 pt-4 sm:px-5">
            <p className="text-[13px] font-medium">
              All findings <span className="text-[#1c1a15]/40">47</span>
              <span className="ml-3 hidden text-[#1c1a15]/40 sm:inline">Open 21 · In Progress 6 · Fixed 15 · Accepted Risk 5</span>
            </p>
            <p className="font-[family-name:var(--font-berdaya-mono)] text-[11px] text-[#1c1a15]/40">SEARCH ▾</p>
          </div>
          <ul className="p-2.5" role="listbox" aria-label="Findings list">
            {FINDINGS.map((f) => {
              const isSel = selected.id === f.id;
              return (
                <li key={f.id}>
                  <button
                    type="button"
                    role="option"
                    aria-selected={isSel}
                    onClick={() => setSelected(f)}
                    className={`w-full rounded-xl px-3 py-3 text-left transition-colors focus-visible:outline-2 focus-visible:outline-[#1c1a15] ${
                      isSel ? "bg-[#f5f1e6] ring-1 ring-inset ring-[#1c1a15]/10" : "hover:bg-[#faf8f2]"
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <span className="font-[family-name:var(--font-berdaya-mono)] text-[11px] text-[#1c1a15]/40">{f.id}</span>
                      <span className={`rounded px-1.5 py-0.5 font-[family-name:var(--font-berdaya-mono)] text-[10px] font-semibold uppercase tracking-wide ${f.severityClass}`}>
                        {f.severity}
                      </span>
                      <span className="font-[family-name:var(--font-berdaya-mono)] text-[11px] text-[#1c1a15]/40">{f.cwe}</span>
                      <span className="ml-auto shrink-0 text-[11.5px] text-[#1c1a15]/40">{f.status}</span>
                    </span>
                    <span className="mt-1.5 block text-[14.5px] font-medium leading-snug tracking-[-0.01em]">{f.title}</span>
                    <span className="mt-0.5 block text-[12.5px] text-[#1c1a15]/45">{f.when}</span>
                  </button>
                </li>
              );
            })}
          </ul>
          <p className="px-5 pb-4 font-[family-name:var(--font-berdaya-mono)] text-[11px] text-[#1c1a15]/35">
            Showing 4 of 47 findings · every one with a working proof-of-concept
          </p>
        </div>

        <div className="flex flex-col p-5 sm:p-6" aria-live="polite">
          <p className="flex flex-wrap items-center gap-2">
            <span className={`rounded px-1.5 py-0.5 font-[family-name:var(--font-berdaya-mono)] text-[10px] font-semibold uppercase tracking-wide ${selected.severityClass}`}>
              {selected.severity}
            </span>
            <span className="font-[family-name:var(--font-berdaya-mono)] text-[11px] text-[#1c1a15]/40">
              {selected.id} · {selected.cwe} · {selected.location}
            </span>
          </p>
          <h3 className="mt-2.5 text-[19px] font-medium leading-snug tracking-[-0.02em]">{selected.title}</h3>
          <p className="mt-2.5 text-[14px] leading-relaxed text-[#1c1a15]/65">{selected.summary}</p>

          <p className="mt-5 font-[family-name:var(--font-berdaya-mono)] text-[11px] uppercase tracking-[0.14em] text-[#1c1a15]/40">
            Reproduction · proof of exploit
          </p>
          <div className="mt-1.5 rounded-xl bg-[#f5f1e6] px-3.5 py-3 font-[family-name:var(--font-berdaya-mono)] text-[12.5px] leading-relaxed text-[#1c1a15]/80 [overflow-wrap:anywhere]">
            {selected.repro}
            <span className="mt-1 block text-[#b42318]">{selected.result}</span>
          </div>

          <dl className="mt-5 grid grid-cols-2 gap-3 text-[12.5px] min-[420px]:grid-cols-3">
            <div>
              <dt className="text-[#1c1a15]/40">Status</dt>
              <dd className="mt-0.5 font-medium">{selected.status}</dd>
            </div>
            <div>
              <dt className="text-[#1c1a15]/40">Severity</dt>
              <dd className="mt-0.5 font-medium">{selected.severity}</dd>
            </div>
            <div>
              <dt className="text-[#1c1a15]/40">CWE</dt>
              <dd className="mt-0.5 font-[family-name:var(--font-berdaya-mono)]">{selected.cwe}</dd>
            </div>
          </dl>

          <div className="mt-auto flex flex-wrap gap-2 pt-6">
            <button type="button" className="min-h-11 rounded-lg bg-[#1c1a15] px-4 text-[13.5px] font-medium text-white hover:bg-[#3a372f] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1c1a15]">
              Open fix PR
            </button>
            <button type="button" className="min-h-11 rounded-lg border border-[#1c1a15]/15 px-4 text-[13.5px] font-medium hover:bg-[#f5f1e6] focus-visible:outline-2 focus-visible:outline-[#1c1a15]">
              Create Linear issue
            </button>
            <button type="button" className="min-h-11 rounded-lg border border-[#1c1a15]/15 px-4 text-[13.5px] font-medium hover:bg-[#f5f1e6] focus-visible:outline-2 focus-visible:outline-[#1c1a15]">
              Copy AI instructions
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------- Benchmark --------------------------------- */

const BENCH = [
  { label: "OWASP Juice Shop", berdaya: 52, baseline: 27, note: "pass@1 · exploitable findings" },
  { label: "Unseen internal benchmark", berdaya: 39, baseline: 18, note: "pass@1 · held-out targets" },
  { label: "Business-logic flaws", berdaya: 44, baseline: 9, note: "pass@1 · scanners miss these" },
];

export function Benchmark() {
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref}>
      <div className="flex flex-wrap gap-x-8 gap-y-2 font-[family-name:var(--font-berdaya-mono)] text-[11px] uppercase tracking-[0.12em]">
        <span className="flex items-center gap-2 text-[#1c1a15]">
          <span className="inline-block h-2.5 w-6 bg-[#1c1a15]" /> Berdaya swarm
        </span>
        <span className="flex items-center gap-2 text-[#1c1a15]/50">
          <span className="inline-block h-2.5 w-6 bg-[#1c1a15]/20" /> Traditional scanner
        </span>
      </div>
      <div className="mt-7 space-y-7">
        {BENCH.map((row, i) => (
          <div key={row.label}>
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <p className="text-[14.5px] font-medium">{row.label}</p>
              <p className="font-[family-name:var(--font-berdaya-mono)] text-[11.5px] text-[#1c1a15]/45">{row.note}</p>
            </div>
            {[
              { v: row.berdaya, c: "bg-[#1c1a15]", t: "text-[#1c1a15]" },
              { v: row.baseline, c: "bg-[#1c1a15]/20", t: "text-[#1c1a15]/45" },
            ].map((bar, j) => (
              <div key={j} className="mt-2 flex items-center gap-3">
                <div className="h-[14px] flex-1 overflow-hidden rounded-sm bg-[#1c1a15]/6" role="img" aria-label={`${row.label}: ${bar.v}%`}>
                  <div
                    className={`h-full rounded-sm ${bar.c} transition-[width] duration-1000 ease-out`}
                    style={{ width: inView ? `${bar.v}%` : "0%", transitionDelay: `${i * 120 + j * 80}ms` }}
                  />
                </div>
                <span className={`w-10 font-[family-name:var(--font-berdaya-mono)] text-[13px] font-medium ${bar.t}`}>{bar.v}%</span>
              </div>
            ))}
          </div>
        ))}
      </div>
      <p className="mt-6 font-[family-name:var(--font-berdaya-mono)] text-[11px] leading-relaxed text-[#1c1a15]/40">
        Internal benchmarks, 2026 · measured on exploitable, manually verified findings — not scanner alerts.
      </p>
    </div>
  );
}

/* ------------------------------------ FAQ ----------------------------------- */

const FAQS = [
  {
    q: "What does “unsupervised” actually mean?",
    a: "The swarm plans, attacks, chains findings, and validates exploits on its own — no consultant driving it and no queue for a human pentester. You set the scope and guardrails once; Berdaya runs continuously inside them and only surfaces findings that are already proven.",
  },
  {
    q: "Is it safe to run against production?",
    a: "Yes, by design. Agents confirm a vulnerability exists, then stop — no chaining or escalation beyond what you authorized, no destructive actions, no denial of service. Every action is logged, rate-limited, and reviewable in a full audit trail.",
  },
  {
    q: "Do you need our source code?",
    a: "No. Berdaya attacks the live, running application the way an attacker would. Connect the repo optionally and each finding is traced back to the exact line of code that caused it, with a fix PR opened for you.",
  },
  {
    q: "How is this different from a scanner (DAST)?",
    a: "Scanners match signatures and produce alerts — often 30%+ false positives. Berdaya reasons about your app's logic, chains weaknesses together, and only reports what it could actually exploit, with a working proof-of-concept. Fewer than 1% of findings are false positives.",
  },
  {
    q: "What happens after a finding is fixed?",
    a: "Berdaya repeats the exact attack that worked before. The finding only closes when the exploit no longer works — so 'fixed' means verified, not assumed. New deploys are retested automatically.",
  },
  {
    q: "Can it provide compliance evidence?",
    a: "Yes. Continuous testing reports map to SOC 2, ISO 27001, PCI DSS (Req. 11.4), and HIPAA evidence requirements, so the pentest evidence your auditor asks for is always current — not a stale annual PDF.",
  },
];

export function Faq() {
  const [open, setOpen] = useState(0);
  return (
    <div className="w-full">
      {FAQS.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={item.q} className="border-t border-[#1c1a15]/10 last:border-b">
            <button
              type="button"
              aria-expanded={isOpen}
              aria-controls={`faq-panel-${i}`}
              onClick={() => setOpen(isOpen ? -1 : i)}
              className="flex min-h-14 w-full items-center gap-4 py-4 text-left focus-visible:outline-2 focus-visible:outline-[#1c1a15]"
            >
              <span className="font-[family-name:var(--font-berdaya-mono)] text-[12px] text-[#1c1a15]/35">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className={`flex-1 text-[16.5px] font-medium tracking-[-0.01em] ${isOpen ? "text-[#1c1a15]" : "text-[#1c1a15]/70"}`}>
                {item.q}
              </span>
              <span aria-hidden className={`text-xl leading-none ${isOpen ? "text-[#1c1a15]" : "text-[#1c1a15]/30"}`}>
                {isOpen ? "−" : "+"}
              </span>
            </button>
            {isOpen && (
              <div id={`faq-panel-${i}`} className="pb-6 pl-9 pr-4">
                <p className="max-w-[62ch] text-[15px] leading-relaxed text-[#1c1a15]/60">{item.a}</p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

/* ------------------------------- Pixel field -------------------------------- */

export function PixelField({ count = 48, accentEvery = 17 }: { count?: number; accentEvery?: number }) {
  return (
    <div aria-hidden className="flex flex-wrap gap-[5px]">
      {Array.from({ length: count }).map((_, i) => (
        <span
          key={i}
          className="berdaya-pixel size-[13px] rounded-[2px]"
          style={{
            animationDelay: `${(i % 24) * 0.14}s`,
            backgroundColor:
              i % accentEvery === 6
                ? "#1c1a15"
                : i % accentEvery === 11
                  ? "#8a8578"
                  : "rgba(28,26,21,0.08)",
          }}
        />
      ))}
    </div>
  );
}
