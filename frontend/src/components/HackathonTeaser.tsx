import Link from "next/link";
import { hackathonInfo, site } from "@/data/content";
import Reveal from "@/components/Reveal";
import AnimatedCounter from "@/components/AnimatedCounter";

export default function HackathonTeaser() {
  return (
    <section id="hackathon" className="border-t border-mist-300/10 py-24">
      <div className="container-page">
        <Reveal>
          <div className="group relative overflow-hidden rounded-3xl border border-mist-300/10 bg-gradient-to-br from-violet-600/20 via-ink-900 to-bloom-600/10 p-8 sm:p-14">
            <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 animate-blob rounded-full bg-bloom-500/20 blur-[90px]" />
            <div className="pointer-events-none absolute -bottom-20 -left-10 h-56 w-56 animate-blob rounded-full bg-violet-500/20 blur-[90px] [animation-delay:3s]" />

            <div className="relative grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
              <div>
                <p className="eyebrow mb-4">THE HACKATHON</p>
                <h2 className="font-display text-4xl text-mist-100 sm:text-5xl">
                  Build something real with Qiskit
                </h2>
                <p className="mt-5 max-w-md text-base leading-relaxed text-mist-300">
                  Open to beginners and experienced hackers alike. Form a team of up to four and
                  ship a working quantum project - online prep on Oct 15-16, the challenge itself
                  on Oct 17 at IIT Indore.
                </p>
                <div className="mt-8 flex flex-wrap gap-4">
                  <Link href={site.hackathonUrl} className="btn-primary">
                    Register your team
                  </Link>
                  <Link href="/#program" className="btn-secondary">
                    See the schedule
                  </Link>
                </div>
              </div>

              <div className="space-y-4">
                <div className="card p-6">
                  <p className="font-mono text-[0.65rem] text-dawn-400">
                    <span className="mr-1.5 inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-dawn-400 align-middle" />
                    {hackathonInfo.status.toUpperCase()}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-mist-400">{hackathonInfo.body}</p>
                </div>

                <div className="card overflow-hidden p-6">
                  <p className="eyebrow mb-2">PRIZE POOL</p>
                  <p className="font-display text-4xl text-mist-100">
                    <AnimatedCounter
                      value={hackathonInfo.prizePool}
                      className="bg-gradient-to-r from-violet-400 via-bloom-400 to-dawn-400 bg-clip-text text-transparent"
                    />
                  </p>
                  <p className="mt-2 text-xs leading-relaxed text-mist-500">{hackathonInfo.prizeNote}</p>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
