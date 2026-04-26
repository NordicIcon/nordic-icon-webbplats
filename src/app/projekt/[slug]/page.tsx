import { notFound } from 'next/navigation';
import styles from './page.module.css';

const projects: Record<string, { name: string; industry: string; city: string }> = {
  koppar:         { name: 'Koppar',        industry: 'Specialty Coffee', city: 'Halmstad' },
  havets:         { name: 'Havets',        industry: 'Fine Dining',      city: 'Göteborg' },
  'strand-studio':{ name: 'Strand Studio', industry: 'Salong',           city: 'Stockholm' },
  'lindqvist-vvs':{ name: 'Lindqvist VVS', industry: 'VVS',              city: 'Karlstad' },
};

export function generateStaticParams() {
  return Object.keys(projects).map(slug => ({ slug }));
}

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const project = projects[slug];
  if (!project) notFound();

  return (
    <div className={styles.root}>
      <nav className={styles.bar}>
        <a href="/projekt" className={styles.back}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
            <path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Projekt
        </a>
        <span className={styles.title}>
          {project.name}
          <span className={styles.meta}>{project.industry} · {project.city}</span>
        </span>
        <a href={`/projects/${slug}/index.html`} target="_blank" rel="noopener" className={styles.open}>
          Öppna i nytt fönster
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
            <path d="M5 2H2v8h8V7M7 2h3v3M10 2L5.5 6.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </a>
      </nav>
      <iframe
        src={`/projects/${slug}/index.html`}
        className={styles.frame}
        title={project.name}
        loading="lazy"
      />
    </div>
  );
}
