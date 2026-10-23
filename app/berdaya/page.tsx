import Image from "next/image";
import Link from "next/link";
import {
  AttackDemo,
  Benchmark,
  Faq,
  FindingBoard,
  HeroSwarm,
  PixelField,
  Reveal,
  SiteHeader,
  SwarmArt,
} from "./_components/interactive";

/* Parameter × MindFort, in light mode:
   Parameter → structure, mono [ labels ], findings console, coverage, safety, compare footer
   MindFort  → swarm narrative, ASCII art, sand + ink palette, prove-exploitability flow,
               attack-to-verified-fix, benchmarks, stats strip, black closing block */

function SectionLabel({ children }: { children: string }) {
  return (
    <p className="font-[family-name:var(--font-berdaya-mono)] text-[12px] uppercase leading-none tracking-[0.22em] text-[#1c1a15]/45 lg:text-[13px]">
      [ {children} ]
    </p>
  );
}

function PrimaryCta() {
  return (
    <span className="flex flex-col items-start gap-2">
      <Link
        href="#mulai"
        className="flex min-h-12 items-center gap-2 rounded-md bg-[#1c1a15] px-6 text-[15px] font-medium text-white transition-colors hover:bg-[#3a372f] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#1c1a15]"
      >
        Get started <span aria-hidden>→</span>
      </Link>
      <span className="font-[family-name:var(--font-berdaya-mono)] text-[11.5px] text-[#1c1a15]/45">
        First verified findings in &lt; 8 hours
      </span>
    </span>
  );
}

const HEADER_FOOTER_LINKS = [
  { label: "How it works", href: "#cara-kerja" },
  { label: "Product", href: "#produk" },
  { label: "Safety", href: "#kontrol" },
  { label: "FAQ", href: "#faq" },
];

const LOGOS = ["VAULTPAY", "Helix Health", "NORTHWIND", "Stackline", "CARELOOP", "Orbital", "Finara", "LOOMLY AI"];

const COVERAGE = [
  {
    tag: "/ pentesting",
    title: "Swarm Pentesting",
    desc: "Continuous, unsupervised pentesting of web apps and APIs — with a working proof-of-concept for every finding, not a scanner alert.",
  },
  {
    tag: "/ sentinel",
    title: "PR Sentinel",
    desc: "An AI reviewer on every pull request. Catches vulnerabilities and risky changes before they merge and reach production.",
  },
  {
    tag: "/ cloud",
    title: "Cloud Security",
    desc: "Continuous checks for cloud misconfigurations, exposed services, and account-takeover paths across your infrastructure.",
  },
  {
    tag: "/ watchtower",
    title: "Watchtower",
    desc: "Every asset you've exposed — subdomains, staging, forgotten services — mapped, watched, and folded into the swarm's scope.",
  },
  {
    tag: "/ supply-chain",
    title: "Secrets & Supply Chain",
    desc: "Leaked keys and credentials in repos and history, plus vulnerable dependencies — flagged only when actually reachable.",
  },
];

const SAFETY = [
  {
    icon: "◐",
    title: "Confirm and hold",
    desc: "Agents prove a vulnerability exists, then stop. No chaining or escalation without your explicit go-ahead.",
  },
  {
    icon: "◎",
    title: "Scoped, never stray",
    desc: "Agents stay inside the targets and rules of engagement you authorize. No wandering into systems that aren't in scope.",
  },
  {
    icon: "⬢",
    title: "No destructive actions",
    desc: "No dropped tables, no deleted data, no denial of service. Testing is safe against production by design.",
  },
  {
    icon: "≡",
    title: "Full audit trail",
    desc: "Every action an agent takes is logged and reviewable, so you can see exactly what happened — and show your auditor.",
  },
];

const INTEGRATIONS = ["GitHub", "GitLab", "Linear", "Jira", "Slack", "CI/CD", "API", "MCP"];

export default function BerdayaPage() {
  return (
    <div className="min-h-full bg-[#faf8f2] font-[family-name:var(--font-berdaya-sans)] text-[#1c1a15]">
      <SiteHeader />

      <main id="konten">
        {/* -------------------------------- HERO -------------------------------- */}
        <section aria-labelledby="berdaya-hero" className="relative overflow-hidden">
          <div aria-hidden className="berdaya-grid pointer-events-none absolute inset-0" />
          <div
            aria-hidden
            className="pointer-events-none absolute -right-44 top-0 hidden size-[600px] rounded-full opacity-70 blur-3xl lg:block"
            style={{ background: "radial-gradient(closest-side, rgba(28,26,21,0.10), transparent)" }}
          />
          <div className="relative mx-auto w-full max-w-[1440px] px-4 pb-14 pt-10 sm:px-5 lg:px-20 lg:pb-16 lg:pt-[96px]">
            <div className="grid items-center gap-12 [&>*]:min-w-0 lg:grid-cols-[1.02fr_0.98fr] lg:gap-12">
              <div className="min-w-0">
                <Reveal>
                  <p className="inline-flex min-h-10 flex-wrap items-center gap-2.5 rounded-full border border-[#1c1a15]/12 bg-white py-1.5 pl-2 pr-3 shadow-[0_1px_2px_rgba(28,26,21,0.05)]">
                    <span className="flex -space-x-1.5" aria-hidden>
                      <Image src="/berdaya.ico" alt="" width={18} height={18} unoptimized className="size-[18px] rounded-full ring-2 ring-white" />
                      <span className="flex size-[18px] items-center justify-center rounded-full bg-[#1c1a15] font-[family-name:var(--font-berdaya-mono)] text-[8px] text-white ring-2 ring-white">AI</span>
                    </span>
                    <span className="text-[12.5px] tracking-[-0.01em] text-[#1c1a15]/60 lg:text-[13.5px]">
                      Backed by <span className="font-medium text-[#1c1a15]">Small AI Lab</span>
                    </span>
                    <span aria-hidden className="h-3 w-px bg-[#1c1a15]/15" />
                    <span className="font-[family-name:var(--font-berdaya-mono)] text-[10.5px] uppercase tracking-[0.12em] text-[#1c1a15]">
                      PTaaS
                    </span>
                  </p>
                </Reveal>

                <Reveal delay={70}>
                  <h1
                    id="berdaya-hero"
                    className="mt-7 max-w-[12ch] text-[clamp(2.05rem,11vw,2.625rem)] font-medium leading-[1.04] tracking-[-0.045em] [overflow-wrap:anywhere] sm:text-[54px] lg:text-[68px]"
                  >
                    Offensive security, <span className="underline decoration-[3px] underline-offset-[8px] sm:underline-offset-[10px]">unsupervised.</span>
                  </h1>
                </Reveal>

                <Reveal delay={140}>
                  <p className="mt-6 max-w-[56ch] text-[16.5px] leading-[1.6] tracking-[-0.01em] text-[#1c1a15]/65 lg:text-[18px]">
                    Berdaya is Penetration Testing as a Service. AI agent swarms attack
                    your live web apps, APIs, and cloud in parallel, prove every
                    vulnerability with a working exploit, and help you fix it —
                    continuously, not once a year.
                  </p>
                </Reveal>

                <Reveal delay={210}>
                  <div className="mt-8 flex flex-col items-stretch gap-4 min-[480px]:flex-row min-[480px]:flex-wrap min-[480px]:items-start min-[480px]:gap-x-7">
                    <PrimaryCta />
                    <Link
                      href="#cara-kerja"
                      className="flex min-h-12 items-center rounded-md border border-[#1c1a15]/15 bg-white px-6 text-[15px] font-medium transition-colors hover:border-[#1c1a15]/40 focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#1c1a15]"
                    >
                      See how it works
                    </Link>
                  </div>
                </Reveal>

                <Reveal delay={280}>
                  <dl className="mt-12 grid max-w-[580px] grid-cols-2 gap-y-6 border-y border-[#1c1a15]/10 py-5 sm:grid-cols-4">
                    {[
                      { v: "<8 hrs", l: "to verified findings" },
                      { v: "<10 min", l: "to first deployment" },
                      { v: "<1%", l: "false positives" },
                      { v: "24/7", l: "continuous coverage" },
                    ].map((s) => (
                      <div key={s.l} className="pr-3">
                        <dd className="text-[23px] font-medium leading-none tracking-[-0.03em] lg:text-[26px]">{s.v}</dd>
                        <dt className="mt-1.5 text-[11.5px] leading-tight text-[#1c1a15]/50">{s.l}</dt>
                      </div>
                    ))}
                  </dl>
                </Reveal>
              </div>

              {/* Hero visual — living agent swarm (MindFort ASCII, modified & animated) */}
              <Reveal delay={180}>
                <HeroSwarm />
              </Reveal>
            </div>
          </div>
        </section>

        {/* ----------------------------- TRUSTED BY ----------------------------- */}
        <section aria-label="Trusted by" className="border-y border-[#1c1a15]/8 bg-white">
          <div className="mx-auto w-full max-w-[1440px] px-4 py-10 sm:px-5 lg:px-20">
            <Reveal>
              <p className="text-center text-[13.5px] text-[#1c1a15]/45">Trusted by security &amp; engineering teams at</p>
            </Reveal>
            <div
              aria-hidden
              className="berdaya-marquee-wrap mt-6 overflow-hidden"
              style={{
                maskImage: "linear-gradient(to right, transparent, #000 12%, #000 88%, transparent)",
                WebkitMaskImage: "linear-gradient(to right, transparent, #000 12%, #000 88%, transparent)",
              }}
            >
              <div className="berdaya-marquee flex w-max items-center">
                {[...LOGOS, ...LOGOS].map((name, i) => (
                  <span key={`${name}-${i}`} className="shrink-0 pr-14 text-[17px] font-medium tracking-[-0.02em] text-[#1c1a15]/35">
                    {name}
                  </span>
                ))}
              </div>
            </div>
            <ul className="sr-only">
              {LOGOS.map((n) => (
                <li key={n}>{n}</li>
              ))}
            </ul>
          </div>
        </section>

        {/* ------------------------------ THE PROBLEM ------------------------------ */}
        <section id="masalah" aria-labelledby="masalah-judul" className="scroll-mt-24">
          <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-10 px-4 py-16 sm:px-5 lg:gap-14 lg:px-20 lg:py-[104px]">
            <Reveal>
              <div className="flex flex-col gap-6">
                <SectionLabel>the problem</SectionLabel>
                <h2 id="masalah-judul" className="max-w-[24ch] text-[26px] font-medium leading-[1.18] tracking-[-0.035em] lg:text-[44px]">
                  <span className="block text-[#1c1a15]/40">Software ships every day.</span>
                  <span className="block">Security testing hasn&apos;t kept up.</span>
                </h2>
              </div>
            </Reveal>

            <div className="grid gap-4 lg:grid-cols-2">
              <Reveal className="h-full">
                <article className="flex h-full flex-col rounded-[6px] border border-[#1c1a15]/10 bg-white p-5 sm:p-7 lg:p-8">
                  <p className="text-[17px] font-medium tracking-[-0.02em] lg:text-[20px]">Old Way</p>
                  <div className="py-6" aria-hidden>
                    <PixelField count={40} accentEvery={23} />
                  </div>
                  <ul className="mt-auto space-y-3.5">
                    {[
                      "Weeks to schedule and scope a single engagement.",
                      "Six figures per pentest, once a year.",
                      "A PDF that's already stale on arrival.",
                      "One snapshot, then blind for 12 months.",
                    ].map((t) => (
                      <li key={t} className="flex gap-2.5 text-[15px] leading-relaxed text-[#1c1a15]/60">
                        <span aria-hidden className="mt-0.5 text-[#1c1a15]/30">✕</span> {t}
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>

              <Reveal delay={100} className="h-full">
                <article className="relative flex h-full flex-col overflow-hidden rounded-[6px] border border-[#1c1a15]/40 bg-[#f5f1e6] p-5 sm:p-7 lg:p-8">
                  <p className="flex flex-wrap items-center justify-between gap-2 text-[17px] font-medium tracking-[-0.02em] lg:text-[20px]">
                    The Berdaya Way
                    <span className="font-[family-name:var(--font-berdaya-mono)] text-[11px] font-normal uppercase tracking-[0.14em] text-[#1c1a15]">
                      ● Swarm active
                    </span>
                  </p>
                  <ul className="mt-7 space-y-4">
                    {[
                      { b: "Point us at your app,", s: "deployed in minutes — easy scoping, no agents to install." },
                      { b: "Runs continuously & unsupervised,", s: "probing every hour, every day, as you ship." },
                      { b: "Every finding ships a working exploit,", s: "proven before it ever reaches you." },
                      { b: "Fixes are retested automatically,", s: "so “fixed” means verified, not assumed." },
                    ].map((row) => (
                      <li key={row.b} className="flex gap-2.5 text-[15px] leading-relaxed text-[#1c1a15]/65">
                        <span aria-hidden className="mt-0.5 text-[#1c1a15]">✓</span>
                        <span>
                          <strong className="font-medium text-[#1c1a15]">{row.b}</strong> {row.s}
                        </span>
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            </div>
          </div>
        </section>

        {/* --------------------- PROVES EXPLOITABILITY (MindFort) --------------------- */}
        <section aria-labelledby="bukti-judul" className="border-y border-[#1c1a15]/8 bg-white">
          <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-10 px-4 py-16 sm:px-5 lg:gap-14 lg:px-20 lg:py-[104px]">
            <Reveal>
              <div className="flex max-w-[860px] flex-col gap-6">
                <SectionLabel>proof, not alerts</SectionLabel>
                <h2 id="bukti-judul" className="text-[26px] font-medium leading-[1.18] tracking-[-0.035em] lg:text-[44px]">
                  Berdaya proves exploitability.
                </h2>
                <p className="max-w-[62ch] text-[16px] leading-relaxed text-[#1c1a15]/60">
                  Agents attack the running application the way an attacker would.
                  When you connect the repo, they trace each finding back to the code
                  that caused it — and deliver an exploit proof, or a patch.
                </p>
              </div>
            </Reveal>

            {/* Flow: code optional → swarm → live app → attack chains → proof/patch */}
            <Reveal delay={60}>
              <ol className="grid items-stretch gap-3 md:grid-cols-5" aria-label="How Berdaya proves exploitability">
                {[
                  { t: "Source code", s: "Optional", mono: "</> repo" },
                  { t: "Agent swarm", s: "Unsupervised · parallel", mono: "128 agents", accent: true },
                  { t: "Your live app", s: "Real defenses, real data flows", mono: "https://" },
                  { t: "Working attack chains", s: "Tested against your app", mono: "chain →" },
                  { t: "Exploit proof — or patch", s: "Then retested until it holds", mono: "proof ✓", accent: true },
                ].map((step, i) => (
                  <li key={step.t} className="relative">
                    <div
                      className={`flex h-full flex-col rounded-xl border p-4.5 ${
                        step.accent
                          ? "border-[#1c1a15]/45 bg-[#f5f1e6]"
                          : "border-[#1c1a15]/10 bg-[#faf8f2]"
                      }`}
                    >
                      <p className="font-[family-name:var(--font-berdaya-mono)] text-[11px] text-[#1c1a15]">{step.mono}</p>
                      <p className="mt-2 text-[15px] font-medium leading-snug tracking-[-0.01em]">{step.t}</p>
                      <p className="mt-1 text-[12.5px] leading-snug text-[#1c1a15]/55">{step.s}</p>
                    </div>
                    {i < 4 && (
                      <span aria-hidden className="absolute -right-3 top-1/2 z-10 hidden -translate-y-1/2 text-[#1c1a15]/30 md:block">
                        →
                      </span>
                    )}
                  </li>
                ))}
              </ol>
            </Reveal>

            {/* MindFort bento */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  h: "Results in hours",
                  body: "Verified findings, not a PDF six weeks later. First deployment in under 10 minutes, first proven findings in under 8 hours.",
                  foot: "<8 hrs · vs 2–6 weeks traditional",
                },
                {
                  h: "Swarms that scale",
                  body: "Hundreds of security agents run in parallel as one swarm. Coverage scales with your attack surface, not your headcount.",
                  foot: "128+ agents per target",
                },
                {
                  h: "Validated findings",
                  body: "Agents validate every finding with a working exploit and steps to reproduce — so your team never chases ghosts.",
                  foot: "<1% false positives · 100% with proof",
                },
                {
                  h: "MCP & integrations",
                  body: "Start tests from CI/CD, push findings to your tracker, and drive the swarm through API and MCP — no UI needed.",
                  foot: INTEGRATIONS.join(" · "),
                },
              ].map((card, i) => (
                <Reveal key={card.h} delay={i * 60} className="h-full">
                  <article className="flex h-full flex-col rounded-[6px] border border-[#1c1a15]/10 bg-[#faf8f2] p-6 transition-all hover:-translate-y-0.5 hover:border-[#1c1a15]/50 hover:shadow-[0_18px_40px_-28px_rgba(28,26,21,0.4)]">
                    <h3 className="text-[17px] font-medium tracking-[-0.02em]">{card.h}</h3>
                    <p className="mt-2 flex-1 text-[14px] leading-relaxed text-[#1c1a15]/60">{card.body}</p>
                    <p className="mt-5 border-t border-[#1c1a15]/8 pt-3 font-[family-name:var(--font-berdaya-mono)] text-[11px] leading-relaxed text-[#1c1a15]/70">
                      {card.foot}
                    </p>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ------------------------------ HOW IT WORKS ------------------------------ */}
        <section id="cara-kerja" aria-labelledby="cara-kerja-judul" className="scroll-mt-24 border-b border-[#1c1a15]/8 bg-[#f5f1e6]">
          <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-10 px-4 py-16 sm:px-5 lg:gap-14 lg:px-20 lg:py-[104px]">
            <Reveal>
              <div className="flex flex-col gap-6">
                <SectionLabel>how it works</SectionLabel>
                <h2 id="cara-kerja-judul" className="max-w-[26ch] text-[26px] font-medium leading-[1.18] tracking-[-0.035em] lg:text-[44px]">
                  From attack <span className="text-[#1c1a15]/40">to verified fix.</span>
                </h2>
              </div>
            </Reveal>
            <Reveal delay={80}>
              <AttackDemo />
            </Reveal>
          </div>
        </section>

        {/* ------------------------------- THE PRODUCT ------------------------------- */}
        <section id="produk" aria-labelledby="produk-judul" className="scroll-mt-24">
          <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-10 px-4 py-16 sm:px-5 lg:gap-14 lg:px-20 lg:py-[104px]">
            <div className="flex flex-wrap items-end justify-between gap-8">
              <Reveal>
                <div className="flex flex-col gap-6">
                  <SectionLabel>the product</SectionLabel>
                  <h2 id="produk-judul" className="max-w-[28ch] text-[26px] font-medium leading-[1.18] tracking-[-0.035em] lg:text-[44px]">
                    Findings you can act on.{" "}
                    <span className="text-[#1c1a15]/40">Validated, prioritized, and ready to assign.</span>
                  </h2>
                </div>
              </Reveal>
              <Reveal delay={100}>
                <PrimaryCta />
              </Reveal>
            </div>

            <Reveal delay={80}>
              <FindingBoard />
            </Reveal>
            <Reveal>
              <p className="text-center font-[family-name:var(--font-berdaya-mono)] text-[11.5px] text-[#1c1a15]/35">
                Select a finding on the left — every detail, reproduction, and fix action is real product UI.
              </p>
            </Reveal>
          </div>
        </section>

        {/* --------------------------- LEARNS + BENCHMARK --------------------------- */}
        <section id="benchmark" aria-labelledby="benchmark-judul" className="scroll-mt-24 border-y border-[#1c1a15]/8 bg-white">
          <div className="mx-auto grid w-full max-w-[1440px] gap-12 px-4 py-16 sm:px-5 lg:grid-cols-2 lg:gap-16 lg:px-20 lg:py-[104px]">
            <Reveal>
              <div className="flex flex-col gap-6">
                <SectionLabel>agent context</SectionLabel>
                <h2 id="benchmark-judul" className="text-[26px] font-medium leading-[1.18] tracking-[-0.035em] lg:text-[44px]">
                  Each attack teaches the next.
                </h2>
                <p className="max-w-[54ch] text-[16px] leading-relaxed text-[#1c1a15]/60">
                  Agents build on what they learn about your application — its
                  permissions, data flows, and defenses. Each run starts with that
                  context, so coverage compounds instead of resetting to zero like
                  an annual pentest.
                </p>
                <div aria-hidden className="max-w-[440px] pt-2 opacity-80">
                  <SwarmArt rows={8} cols={40} />
                </div>
              </div>
            </Reveal>
            <Reveal delay={100}>
              <div className="rounded-2xl border border-[#1c1a15]/10 bg-[#faf8f2] p-4 min-[420px]:p-6 lg:p-8">
                <p className="font-[family-name:var(--font-berdaya-mono)] text-[11px] uppercase tracking-[0.16em] text-[#1c1a15]/45">
                  Berdaya performance · internal benchmarks (2026)
                </p>
                <div className="mt-6">
                  <Benchmark />
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* -------------------------------- COVERAGE -------------------------------- */}
        <section id="cakupan" aria-labelledby="cakupan-judul" className="scroll-mt-24">
          <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-10 px-4 py-16 sm:px-5 lg:gap-14 lg:px-20 lg:py-[104px]">
            <Reveal>
              <div className="flex max-w-[840px] flex-col gap-6">
                <SectionLabel>coverage</SectionLabel>
                <h2 id="cakupan-judul" className="text-[26px] font-medium leading-[1.18] tracking-[-0.035em] lg:text-[44px]">
                  One platform. <span className="text-[#1c1a15]/40">Every layer of your security.</span>
                </h2>
                <p className="max-w-[62ch] text-[16px] leading-relaxed text-[#1c1a15]/60">
                  Berdaya runs continuously across your code, cloud, and dependencies —
                  and puts everything it finds in one place.
                </p>
              </div>
            </Reveal>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {COVERAGE.map((card, i) => (
                <Reveal key={card.tag} delay={i * 60} className="h-full">
                  <article className="group flex h-full flex-col rounded-[6px] border border-[#1c1a15]/10 bg-white p-6 transition-all hover:-translate-y-0.5 hover:border-[#1c1a15]/50 hover:shadow-[0_18px_40px_-28px_rgba(28,26,21,0.4)] lg:p-7">
                    <p className="font-[family-name:var(--font-berdaya-mono)] text-[11.5px] text-[#1c1a15]">{card.tag}</p>
                    <h3 className="mt-3 text-[19px] font-medium tracking-[-0.02em] lg:text-[21px]">{card.title}</h3>
                    <p className="mt-2 flex-1 text-[14.5px] leading-relaxed text-[#1c1a15]/60">{card.desc}</p>
                  </article>
                </Reveal>
              ))}
              <Reveal delay={300} className="h-full">
                <Link
                  href="#mulai"
                  className="flex h-full min-h-[190px] flex-col justify-between rounded-[6px] bg-[#1c1a15] p-6 text-white transition-colors hover:bg-[#3a372f] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#1c1a15] lg:p-7"
                >
                  <p className="font-[family-name:var(--font-berdaya-mono)] text-[11.5px] uppercase tracking-[0.14em] text-white/60">
                    Keep testing as you ship
                  </p>
                  <div>
                    <p className="text-[19px] font-medium leading-snug tracking-[-0.02em] lg:text-[21px]">
                      New features create new ways in. Test every release →
                    </p>
                    <p className="mt-3 font-[family-name:var(--font-berdaya-mono)] text-[11px] text-white/55">
                      FIRST RESULTS: HOURS · SETUP: MINUTES
                    </p>
                  </div>
                </Link>
              </Reveal>
            </div>

            {/* MindFort stats strip */}
            <Reveal>
              <dl className="grid grid-cols-2 gap-y-6 rounded-[6px] border border-[#1c1a15]/10 bg-white px-6 py-7 lg:grid-cols-4 lg:px-8">
                {[
                  { v: "Hours", l: "First results" },
                  { v: "24/7", l: "Coverage" },
                  { v: "<1%", l: "False positives" },
                  { v: "Minutes", l: "Setup" },
                ].map((s) => (
                  <div key={s.l} className="text-center lg:text-left">
                    <dd className="text-[24px] font-medium tracking-[-0.03em] lg:text-[28px]">{s.v}</dd>
                    <dt className="mt-1 font-[family-name:var(--font-berdaya-mono)] text-[11px] uppercase tracking-[0.14em] text-[#1c1a15]/45">
                      {s.l}
                    </dt>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </section>

        {/* --------------------------------- SAFETY --------------------------------- */}
        <section id="kontrol" aria-labelledby="kontrol-judul" className="scroll-mt-24 border-t border-[#1c1a15]/8 bg-white">
          <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-10 px-4 py-16 sm:px-5 lg:gap-14 lg:px-20 lg:py-[104px]">
            <Reveal>
              <div className="flex flex-wrap items-end justify-between gap-6">
                <div className="flex max-w-[760px] flex-col gap-6">
                  <SectionLabel>safety</SectionLabel>
                  <h2 id="kontrol-judul" className="text-[26px] font-medium leading-[1.18] tracking-[-0.035em] lg:text-[44px]">
                    Aggressive testing. <span className="text-[#1c1a15]/40">Zero blast radius.</span>
                  </h2>
                  <p className="max-w-[58ch] text-[16px] leading-relaxed text-[#1c1a15]/60">
                    All the findings of a real attack, none of the fallout. Unsupervised
                    never means uncontrolled — guardrails, SSO, and audit trails are built in.
                  </p>
                </div>
              </div>
            </Reveal>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {SAFETY.map((card, i) => (
                <Reveal key={card.title} delay={i * 60} className="h-full">
                  <article className="h-full rounded-[6px] border border-[#1c1a15]/10 bg-[#faf8f2] p-6 lg:p-7">
                    <span aria-hidden className="flex size-11 items-center justify-center rounded-full bg-[#1c1a15]/8 text-[18px] text-[#1c1a15]">
                      {card.icon}
                    </span>
                    <h3 className="mt-5 text-[17px] font-medium leading-snug tracking-[-0.02em]">{card.title}</h3>
                    <p className="mt-2 text-[14px] leading-relaxed text-[#1c1a15]/60">{card.desc}</p>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ---------------------------------- FAQ ---------------------------------- */}
        <section id="faq" aria-labelledby="faq-judul" className="scroll-mt-24 border-t border-[#1c1a15]/8">
          <div className="mx-auto grid w-full max-w-[1440px] gap-10 px-4 py-16 sm:px-5 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16 lg:px-20 lg:py-[104px]">
            <Reveal>
              <div className="flex flex-col gap-6 lg:sticky lg:top-24">
                <SectionLabel>faq</SectionLabel>
                <h2 id="faq-judul" className="text-[26px] font-medium leading-[1.18] tracking-[-0.035em] lg:text-[40px]">
                  Questions, <span className="text-[#1c1a15]/40">answered.</span>
                </h2>
                <p className="max-w-[46ch] text-[15.5px] leading-relaxed text-[#1c1a15]/60">
                  How unsupervised agents stay safe, why source code is optional, and
                  how Berdaya differs from a scanner.
                </p>
                <Link href="#mulai" className="flex min-h-11 items-center gap-2 text-[14.5px] font-medium text-[#1c1a15]">
                  Talk to the Berdaya team <span aria-hidden>→</span>
                </Link>
              </div>
            </Reveal>
            <Reveal delay={80}>
              <Faq />
            </Reveal>
          </div>
        </section>

        {/* ------------------------- FINAL CTA + FOOTER (MindFort block) ------------------------- */}
        <section id="mulai" aria-labelledby="mulai-judul" className="scroll-mt-24 px-3 pb-3 sm:px-4">
          <div className="overflow-hidden rounded-xl bg-[#1c1a15] text-white">
            <div className="mx-auto flex w-full max-w-[1440px] flex-col items-center px-4 pb-16 pt-14 text-center sm:px-5 lg:pt-[88px]">
              <Reveal>
                <div aria-hidden className="mb-8 flex justify-center opacity-70">
                  <PixelField count={30} accentEvery={11} />
                </div>
              </Reveal>
              <Reveal delay={60}>
                <h2 id="mulai-judul" className="max-w-[22ch] text-[clamp(1.7rem,8.5vw,1.875rem)] font-medium leading-[1.12] tracking-[-0.04em] lg:text-[48px]">
                  Find your next vulnerability before an attacker does.
                </h2>
              </Reveal>
              <Reveal delay={120}>
                <p className="mt-5 max-w-[54ch] text-[16px] leading-relaxed text-white/70">
                  Start testing today — a URL and credentials is all it takes.
                  First proven findings land within hours, not weeks.
                </p>
              </Reveal>
              <Reveal delay={180}>
                <div className="mt-8 flex flex-wrap justify-center gap-3">
                  <Link
                    href="mailto:halo@smallailab.id?subject=Berdaya%20—%20Get%20started"
                    className="flex min-h-12 items-center gap-2 rounded-md bg-white px-7 text-[15px] font-medium text-[#1c1a15] transition-transform hover:scale-[1.02] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-white"
                  >
                    Get started <span aria-hidden>→</span>
                  </Link>
                </div>
              </Reveal>
            </div>

            <footer className="border-t border-white/15">
              <div className="mx-auto w-full max-w-[1440px] px-4 pb-8 pt-12 sm:px-5 lg:px-20">
                <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
                <div>
                  <Link href="/berdaya" className="flex min-h-11 items-center gap-2.5 py-1" aria-label="Berdaya AI — back to top">
                    <Image src="/berdaya.ico" alt="" width={28} height={28} unoptimized className="size-7 rounded-full bg-white" />
                    <span className="text-[16px] font-medium tracking-[-0.03em]">Berdaya AI</span>
                    <span className="font-[family-name:var(--font-berdaya-mono)] text-[10px] uppercase tracking-[0.12em] text-white/55">
                      Powered by BRD-1
                    </span>
                  </Link>
                  <p className="mt-3 max-w-[42ch] text-[13.5px] leading-relaxed text-white/55">
                    Unsupervised AI pentesting as a service — by Small AI Lab.
                  </p>
                </div>
                <nav aria-label="Footer" className="flex flex-wrap gap-x-2 gap-y-1">
                  {HEADER_FOOTER_LINKS.map((link) => (
                    <Link
                      key={link.href + link.label}
                      href={link.href}
                      className="flex min-h-10 items-center rounded-md px-3 font-[family-name:var(--font-berdaya-mono)] text-[11px] uppercase tracking-[0.1em] text-white/60 transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-white"
                    >
                      {link.label}
                    </Link>
                  ))}
                </nav>
              </div>

                <div className="mt-12 flex flex-col gap-4 border-t border-white/15 pt-6 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-[12.5px] text-white/50">© 2026 Berdaya · Small AI Lab</p>
                  <p className="flex flex-wrap items-center gap-x-5 gap-y-2 font-[family-name:var(--font-berdaya-mono)] text-[10.5px] uppercase tracking-[0.08em] text-white/55">
                    <span>Always On</span>
                    <span aria-hidden className="hidden h-3 w-px bg-white/25 sm:inline-block" />
                    <span className="flex items-center gap-1.5">
                      <span className="size-1.5 rounded-full bg-white" /> All Systems Operational
                    </span>
                    <span aria-hidden className="hidden h-3 w-px bg-white/25 sm:inline-block" />
                    <Link href="/" className="flex min-h-10 items-center underline-offset-4 hover:text-white hover:underline">
                      ← Small AI Lab
                    </Link>
                  </p>
                </div>
              </div>
            </footer>
          </div>
        </section>
      </main>
    </div>
  );
}
