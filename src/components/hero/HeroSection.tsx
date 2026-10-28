import { ArrowDown, ArrowUpRight, Download } from "lucide-react";
import Image from "next/image";
import type { CSSProperties } from "react";
import { ButtonLink } from "@/components/ui/Button";
import { CAREER_START, profile } from "@/data/profile";
import { cn } from "@/lib/cn";
import { yearsSince } from "@/lib/experience";
import { HeroLight } from "./HeroLight";
import { Waybill } from "./Waybill";

const delay = (d: number) => ({ "--d": `${d}s` }) as CSSProperties;

/**
 * Waybill hero: the name runs behind the photo with a faint reflection, the
 * photo fades into the page, and a shipping label of real facts sits on it.
 */
export function HeroSection() {
  const years = yearsSince(CAREER_START);
  const { github, linkedin } = profile.links;
  const words = profile.name.split(" ");

  return (
    <section
      id="top"
      aria-labelledby="hero-heading"
      className="relative isolate overflow-hidden pt-24 pb-16 sm:pt-28 lg:pb-24"
    >
      <HeroLight />

      <div className="relative mx-auto grid max-w-page px-5 sm:px-8 lg:grid-cols-12 lg:grid-rows-[auto_1fr] lg:gap-x-6">
        {/* Name and tagline */}
        <div className="lg:col-span-7 lg:col-start-1 lg:row-start-1 lg:pt-4">
          <p className="relative z-20 mb-5 hero-fade font-semi text-[1rem] font-semibold text-muted" style={delay(0)}>
            {profile.role} at Growve, Mumbai
          </p>

          <h1
            id="hero-heading"
            className="display relative z-0 mb-[0.35em] hero-fade text-[clamp(3.5rem,18vw,5.5rem)] leading-[0.92] sm:text-[clamp(5rem,13vw,7rem)] lg:text-[clamp(5.5rem,8.6vw,8.25rem)]"
            style={delay(0.04)}
          >
            {words.map((word, i) => (
              <span key={word} className={cn("block lg:whitespace-nowrap", i === words.length - 1 && "reflect")}>
                {word}
              </span>
            ))}
          </h1>

          <p
            className="text-accent-gradient relative z-20 mt-6 max-w-[18ch] hero-fade font-display text-[clamp(1.9rem,7.4vw,2.6rem)] leading-[1.02] font-semibold tracking-[-0.02em] lg:mt-8 lg:max-w-[24ch] lg:text-[clamp(2rem,2.9vw,2.75rem)]"
            style={delay(0.08)}
          >
            I build the software between the order and the doorstep.
          </p>
        </div>

        {/* Photo, route and waybill */}
        <figure className="relative z-10 mx-auto mt-10 w-full max-w-[26rem] sm:max-w-[30rem] lg:col-span-5 lg:col-start-7 lg:row-span-2 lg:row-start-1 lg:mt-0 lg:-ml-14 lg:max-w-none lg:self-start">
          <svg
            viewBox="0 0 400 500"
            className="pointer-events-none absolute -inset-x-[8%] -top-[4%] -z-10 hidden h-[108%] w-[116%] text-accent lg:block"
            fill="none"
            aria-hidden
          >
            <path d="M190 260 C 250 170, 300 90, 372 40" stroke="currentColor" strokeWidth="2" className="route-line" />
            <circle cx="372" cy="40" r="5" fill="currentColor" />
          </svg>

          <div className="relative">
            <div className="relative aspect-[4/5] overflow-hidden">
              <Image
                src={profile.photo.src}
                alt={profile.photo.alt}
                fill
                preload
                sizes="(min-width: 1024px) 34rem, (min-width: 640px) 30rem, 92vw"
                quality={82}
                className="photo-fade object-cover object-[50%_32%]"
              />
            </div>

            <Waybill
              years={years}
              className="relative z-10 mx-3 -mt-24 hero-fade [--d:0.12s] sm:mx-6 lg:absolute lg:top-[70%] lg:-right-24 lg:mx-0 lg:mt-0 lg:w-[20.5rem] lg:[--tilt:2deg] xl:-right-32"
            />
          </div>
          <figcaption className="sr-only">
            Photo of {profile.name}, with a summary card styled as a shipping label.
          </figcaption>
        </figure>

        {/* Supporting copy and actions */}
        <div className="relative z-20 mt-10 lg:col-span-8 lg:col-start-1 lg:row-start-2 lg:mt-7">
          <p className="lede hero-fade" style={delay(0.12)}>
            Full-stack engineer with {years} years of shipping production software. At Growve I build the CRM, logistics
            platform and storefront behind a cross-border retail business: Amazon order sync, automated purchasing,
            courier booking and live shipment tracking.
          </p>

          <div className="mt-8 flex hero-fade flex-wrap gap-3" style={delay(0.16)}>
            <ButtonLink href="#work" variant="primary" className="w-full sm:w-auto">
              Explore my work <ArrowDown size={18} className="nudge-d" aria-hidden />
            </ButtonLink>
            <ButtonLink href={profile.resume.path} download={profile.resume.fileName} className="w-full sm:w-auto">
              <Download size={18} aria-hidden /> Download resume
            </ButtonLink>
            {github && (
              <ButtonLink href={github} target="_blank" rel="noopener noreferrer" variant="link">
                View GitHub <ArrowUpRight size={18} className="nudge-r" aria-hidden />
              </ButtonLink>
            )}
            {linkedin && (
              <ButtonLink href={linkedin} target="_blank" rel="noopener noreferrer" variant="link">
                Connect on LinkedIn <ArrowUpRight size={18} className="nudge-r" aria-hidden />
              </ButtonLink>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
