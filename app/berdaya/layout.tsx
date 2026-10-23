import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-berdaya-sans",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-berdaya-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Berdaya — Unsupervised AI Pentesting (PTaaS) | Small AI Lab",
  description:
    "Berdaya is Penetration Testing as a Service: unsupervised AI agent swarms that attack your live web apps, APIs, and cloud, prove every vulnerability with a working exploit, and retest your fixes — continuously.",
  keywords: [
    "PTaaS",
    "penetration testing as a service",
    "AI pentesting",
    "autonomous pentesting",
    "unsupervised AI agents",
    "agent swarm",
    "continuous penetration testing",
    "Berdaya",
    "Small AI Lab",
  ],
  openGraph: {
    title: "Berdaya — Offensive security, unsupervised",
    description:
      "AI agent swarms that pentest your live applications, prove exploitability, open the fix, and retest until it holds. First verified findings in hours.",
    type: "website",
    siteName: "Berdaya",
  },
};

export default function BerdayaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className={`${geist.variable} ${geistMono.variable} berdaya-root min-h-full flex-1`}
    >
      {children}
    </div>
  );
}
