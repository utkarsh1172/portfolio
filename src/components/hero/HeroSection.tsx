import { ArrowDown, ArrowUpRight, CodeXml, Download } from "lucide-react";
import Image from "next/image";
import { CAREER_START, profile } from "@/data/profile";
import { yearsSince } from "@/lib/experience";
import { SystemsCanvas } from "./SystemsCanvas";
import styles from "./HeroSection.module.css";

export function HeroSection() {
  const years = yearsSince(CAREER_START);
  return (
    <section id="top" aria-labelledby="hero-heading" className={styles.hero}>
      <div className={styles.stage}>
        <div className={styles.copy}>
          <h1 id="hero-heading" className={styles.title}>
            <span className={styles.line}>
              <span>Full-stack</span>
            </span>{" "}
            <span className={styles.line}>
              <span>software</span>
            </span>{" "}
            <span className={`${styles.line} ${styles.lastLine}`}>
              <span>
                developer<span className={styles.period}>.</span>
              </span>
            </span>
          </h1>
          <p className={styles.description}>
            <span className={styles.introName}>I’m {profile.name},</span> a software developer based in Mumbai. I build
            CRM, logistics, e-commerce and mobile applications.
          </p>
          <div className={styles.actions}>
            <a href="#work" className={styles.primary}>
              View projects{" "}
              <span>
                <ArrowDown size={18} aria-hidden />
              </span>
            </a>
            <a href={profile.resume.path} download={profile.resume.fileName} className={styles.secondary}>
              <Download size={16} aria-hidden /> Download resume
            </a>
          </div>
        </div>
        <div className={styles.visual}>
          <SystemsCanvas />
        </div>
        <div className={styles.identity}>
          <div className={styles.person}>
            <Image src={profile.photo.src} alt={profile.photo.alt} width={52} height={52} className={styles.avatar} />
            <div>
              <p>{profile.name}</p>
              <span>{profile.role} · Mumbai, India</span>
            </div>
          </div>
          <p className={styles.note}>
            {years} years of experience in
            <br className={styles.desktopBreak} /> web and mobile development.
          </p>
          <div className={styles.availability}>
            <span aria-hidden /> Open to senior roles
            <a
              href={profile.links.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Utkarsh Kamble on GitHub"
            >
              <CodeXml size={18} aria-hidden />
              <ArrowUpRight size={13} aria-hidden />
            </a>
          </div>
        </div>
      </div>
      <div className={styles.discipline} aria-label="Areas of practice">
        <div>
          <span>Full-stack development</span>
          <i aria-hidden />
          <span>API integrations</span>
          <i aria-hidden />
          <span>Web & mobile</span>
          <i aria-hidden />
          <span>Deployment & CI/CD</span>
          <i aria-hidden />
        </div>
        <a href="#work" aria-label="Scroll to selected work">
          <span>Scroll to explore</span>
          <ArrowDown size={15} aria-hidden />
        </a>
      </div>
    </section>
  );
}
