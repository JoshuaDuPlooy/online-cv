import Hero from "@/components/Hero";
import Nav from "@/components/Nav";
import Portfolio from "@/components/Portfolio";
import Reveal from "@/components/Reveal";
import RichText from "@/components/RichText";
import Section from "@/components/Section";
import { ProfessionalSkills, SoftSkills } from "@/components/Skills";
import Timeline from "@/components/Timeline";
import { getEntries, getEntry, getProfessionalSkills, getProjects, getSoftSkills } from "@/lib/content";

export default function Home() {
  const profile = getEntry("profile.txt").meta;
  const story = getEntry("backstory.txt");
  const experience = getEntries("experience.txt");
  const education = getEntries("education.txt");
  const sport = getEntries("sport.txt");
  const softSkills = getSoftSkills();
  const proSkills = getProfessionalSkills();
  const projects = getProjects();
  const name = profile.name ?? "Your Name";

  return (
    <>
      <Reveal />
      <Nav name={name} />
      <main>
        <Hero profile={profile} />

        <Section id="story" eyebrow="About me" title={story.meta.heading || "My Story"}>
          <div className="grid gap-10 md:grid-cols-[1fr_280px]">
            <RichText text={story.body} className="max-w-3xl text-[1.05rem]" />
            <aside className="h-fit rounded-2xl border border-border bg-surface p-6 shadow-sm">
              <p className="mb-4 font-mono text-xs font-semibold uppercase tracking-[0.2em] text-accent">At a glance</p>
              <dl className="space-y-3 text-sm">
                {profile.title && (
                  <div>
                    <dt className="text-muted">Currently</dt>
                    <dd className="font-medium">{profile.title}</dd>
                  </div>
                )}
                {profile.location && (
                  <div>
                    <dt className="text-muted">Based in</dt>
                    <dd className="font-medium">{profile.location}</dd>
                  </div>
                )}
                {education[0]?.meta.institution && (
                  <div>
                    <dt className="text-muted">Studying at</dt>
                    <dd className="font-medium">{education[0].meta.institution}</dd>
                  </div>
                )}
                {profile.availability && (
                  <div>
                    <dt className="text-muted">Availability</dt>
                    <dd className="font-medium">{profile.availability}</dd>
                  </div>
                )}
                {profile.languages && (
                  <div>
                    <dt className="text-muted">Languages</dt>
                    <dd className="font-medium">{profile.languages}</dd>
                  </div>
                )}
                {profile.interests && (
                  <div>
                    <dt className="text-muted">Interests</dt>
                    <dd className="font-medium">{profile.interests}</dd>
                  </div>
                )}
                {projects.length > 0 && (
                  <div>
                    <dt className="text-muted">Portfolio</dt>
                    <dd className="font-medium">
                      {projects.length} project{projects.length === 1 ? "" : "s"}
                    </dd>
                  </div>
                )}
              </dl>
            </aside>
          </div>
        </Section>

        <Section id="experience" eyebrow="Work experience" title="Where I've worked" muted>
          <Timeline
            entries={experience}
            headlineKey="role"
            subKey="company"
            emptyMessage="Add entries to content/experience.txt."
          />
        </Section>

        <Section id="education" eyebrow="Education" title="Where I've studied">
          <Timeline
            entries={education}
            headlineKey="qualification"
            subKey="institution"
            emptyMessage="Add entries to content/education.txt."
          />
        </Section>

        <Section id="sport" eyebrow="Sport" title="At the table" muted>
          <Timeline entries={sport} headlineKey="sport" subKey="team" emptyMessage="Add entries to content/sport.txt." />
        </Section>

        <Section id="soft-skills" eyebrow="Soft skills" title="How I work">
          <SoftSkills skills={softSkills} />
        </Section>

        <Section id="skills" eyebrow="Professional skills" title="What I bring to the table" muted>
          <ProfessionalSkills groups={proSkills} />
        </Section>

        <Section
          id="portfolio"
          eyebrow="Portfolio"
          title="Projects & varsity work"
          intro="A selection of academic and personal projects. Click a card for a brief summary or the full project."
        >
          <Portfolio projects={projects} />
        </Section>
      </main>

      <footer className="bg-navy py-12 text-white/60">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-5 text-sm sm:flex-row sm:px-8">
          <p>
            © {new Date().getFullYear()} {name}
          </p>
          <div className="flex gap-5">
            {profile.email && (
              <a className="hover:text-white" href={`mailto:${profile.email}`}>
                Email
              </a>
            )}
            {profile.linkedin && (
              <a className="hover:text-white" href={profile.linkedin} target="_blank" rel="noreferrer">
                LinkedIn
              </a>
            )}
            {profile.github && (
              <a className="hover:text-white" href={profile.github} target="_blank" rel="noreferrer">
                GitHub
              </a>
            )}
            <a className="hover:text-white" href="#top">
              Back to top ↑
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}
