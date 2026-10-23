import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="relative min-h-full flex-1">
      <main className="mx-auto w-full max-w-[38rem] px-5 pt-[16vh] pb-24 text-left text-[0.9375rem] leading-[1.7] text-[#26251e] sm:px-6 sm:text-[1.0625rem] sm:leading-[1.65]">
        <h1 className="sr-only">Small AI Lab</h1>
        <p>
          <em>Small AI Lab</em> is an applied research lab building AI
          agents for the future of work.
        </p>
        <p className="mt-7">Team inside Small AI Lab :</p>

        <Link
          href="/berdaya"
          aria-label="Berdaya AI — buka halaman Berdaya"
          className="group relative mt-7 flex size-11 items-center justify-center rounded-full outline-none focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-[#26251e]/40"
        >
          <Image
            src="/berdaya.ico"
            alt=""
            width={32}
            height={32}
            unoptimized
            className="size-8 opacity-55 mix-blend-multiply transition-opacity duration-300 group-hover:opacity-100 group-focus-within:opacity-100"
          />
          <span
            aria-hidden="true"
            className="berdaya-label pointer-events-none absolute top-1/2 left-[calc(100%+0.35rem)] -translate-x-1 -translate-y-1/2 text-[0.9375rem] whitespace-nowrap text-[#26251e] opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 group-focus-within:translate-x-0 group-focus-within:opacity-100"
          >
            Berdaya AI
          </span>
        </Link>
      </main>
    </div>
  );
}
