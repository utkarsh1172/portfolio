import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { GlobeLazy } from "@/components/visualizations/GlobeLazy";
import { LEARNING, profile } from "@/data/profile";
import styles from "./AboutSection.module.css";

const strengths = [
  {
    title: "Order automation",
    text: "Background workers and schedulers for order sync, procurement and courier booking.",
  },
  {
    title: "API integrations",
    text: "Marketplace, payment and courier APIs, with JWT, OAuth 2.0 and role-based access control.",
  },
  {
    title: "Performance and deployment",
    text: "Redis caching, background workers and Docker services, deployed through GitHub Actions.",
  },
  {
    title: "Team responsibilities",
    text: "Plan work for five developers, review code and work closely with product and operations.",
  },
];

export function AboutSection() {
  return (
    <Section id="about" className={styles.section}>
      <div className={styles.intro}>
        <h2 id="about-heading" className="h-section">
          About me
        </h2>
        <p className={styles.statement}>
          {profile.role} at Growve,
          <br />
          <span>based in Mumbai.</span>
        </p>
      </div>
      <div className={styles.biography}>
        <figure className={styles.portrait}>
          <div className={styles.image}>
            <Image
              src={profile.photo.src}
              alt={profile.photo.alt}
              fill
              sizes="(min-width: 1024px) 21rem, (min-width: 640px) 18rem, 85vw"
              className="object-cover"
            />
          </div>
          <figcaption>
            <span>{profile.name}</span>
            <span>
              Mumbai, India <ArrowUpRight size={12} aria-hidden />
            </span>
          </figcaption>
        </figure>
        <div className={styles.story}>
          <p className={styles.lead}>
            I work on CRM, logistics and e-commerce applications at Growve Retail and Management Services.
          </p>
          <p>
            My work includes Amazon order sync, purchase order automation, courier booking, shipment tracking, warehouse
            inventory and payment integrations.
          </p>
          <p>
            I also work on Redis caching, Docker deployments and GitHub Actions CI/CD. I plan tasks for five developers,
            review code and coordinate with product and operations.
          </p>
          <p>
            Previously, I worked on Linky Pro at ACE International and React Native fitness apps for AT&amp;T and
            SportzVillage at Fxgetactive.
          </p>
          <div className={styles.details}>
            <div>
              <span>Currently</span>
              <p>
                {profile.role}
                <br />
                Growve Retail and Management Services
              </p>
            </div>
            <div>
              <span>Exploring</span>
              <p>{LEARNING}</p>
            </div>
            <div>
              <span>Education</span>
              <p>
                Full Stack Development, Newton School
                <br />
                B.Com, Mumbai University
              </p>
            </div>
          </div>
          <a href={profile.links.linkedin} target="_blank" rel="noopener noreferrer" className={styles.link}>
            View LinkedIn profile <ArrowUpRight size={17} aria-hidden />
          </a>
        </div>
      </div>
      <div className={styles.principles}>
        {strengths.map((item) => (
          <div key={item.title}>
            <h3>{item.title}</h3>
            <p>{item.text}</p>
          </div>
        ))}
      </div>
      <figure className={styles.reach}>
        <div className={styles.globe}>
          <GlobeLazy />
        </div>
        <figcaption>
          <h3 className="h-section">Warehouse locations</h3>
          <p>
            The systems I work on manage stock in US and UAE warehouses and support shipments across India. Drag the
            globe to rotate it.
          </p>
          <span className={styles.mapNote}>Illustrative routes · US and UAE warehouses</span>
        </figcaption>
      </figure>
    </Section>
  );
}
