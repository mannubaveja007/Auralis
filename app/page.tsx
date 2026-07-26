'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useReducedMotion } from 'framer-motion';
import {
  ArrowRight,
  FileText,
  Network,
  PenLine,
  Sparkles,
  Tags,
} from 'lucide-react';
import PixelBlast from '@/components/PixelBlast';
import { useAuth } from '@/context/AuthContext';
import './SmartNotes.css';

const features = [
  {
    icon: FileText,
    title: 'Summaries that keep the point',
    description:
      'Turn a long note into a concise recap while the original stays exactly where you left it.',
  },
  {
    icon: Tags,
    title: 'Tags without the filing work',
    description:
      'Generate useful keywords on demand so related ideas are easier to recognize later.',
  },
  {
    icon: Network,
    title: 'Patterns across your notes',
    description:
      'Step back from a single page and surface the recurring themes across your collection.',
  },
];

const steps = [
  {
    title: 'Capture',
    description: 'Write the note in your own words, then pin what matters or add a sketch.',
  },
  {
    title: 'Understand',
    description: 'Ask Auralis for a focused summary and useful tags when you need them.',
  },
  {
    title: 'Connect',
    description: 'Open Insights to see the themes taking shape across your notes.',
  },
];

function AnimatedBackground({ reduceMotion }: { reduceMotion: boolean }) {
  return (
    <div className="home-background" aria-hidden="true">
      <PixelBlast
        variant="circle"
        pixelSize={3}
        color="#B19EEF"
        liquid={!reduceMotion}
        liquidStrength={0.15}
        enableRipples={!reduceMotion}
        rippleIntensityScale={3.5}
        rippleSpeed={0.25}
        rippleThickness={0.15}
        patternDensity={0.8}
        transparent={false}
        edgeFade={0}
        speed={reduceMotion ? 0 : 0.5}
        autoPauseOffscreen
      />
      <div className="home-background-scrim" />
    </div>
  );
}

export default function HomePage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const shouldReduceMotion = useReducedMotion() ?? false;

  useEffect(() => {
    if (!loading && user) {
      router.replace('/dashboard');
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <main className="home-page home-loading">
        <AnimatedBackground reduceMotion={shouldReduceMotion} />
        <div className="home-loading-content" role="status" aria-live="polite">
          <span className="home-brand-mark" aria-hidden="true">
            <Sparkles size={18} strokeWidth={1.8} />
          </span>
          <span>Opening Auralis…</span>
        </div>
      </main>
    );
  }

  if (user) {
    return null;
  }

  return (
    <main className="home-page">
      <AnimatedBackground reduceMotion={shouldReduceMotion} />

      <a className="home-skip-link" href="#main-content">
        Skip to content
      </a>

      <div className="home-content">
        <header className="home-header" aria-label="Primary navigation">
          <Link className="home-brand" href="/" aria-label="Auralis home">
            <span className="home-brand-mark" aria-hidden="true">
              <Sparkles size={18} strokeWidth={1.8} />
            </span>
            <span>Auralis</span>
          </Link>

          <nav className="home-nav" aria-label="Account">
            <Link className="home-nav-link" href="/login">
              Sign in
            </Link>
            <Link className="home-button home-button-compact" href="/signup">
              Get started
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </nav>
        </header>

        <div id="main-content">
          <section className="home-hero" aria-labelledby="home-title">
            <div className="home-hero-copy">
              <p className="home-kicker">
                <Sparkles size={15} aria-hidden="true" />
                AI clarity for your own notes
              </p>
              <h1 id="home-title">Your notes, organized and understood.</h1>
              <p className="home-hero-description">
                Capture the thought first. When you are ready, Auralis can summarize
                the note, suggest useful tags, and reveal themes across your collection.
              </p>

              <div className="home-hero-actions">
                <Link className="home-button" href="/signup">
                  Create your workspace
                  <ArrowRight size={18} aria-hidden="true" />
                </Link>
                <Link className="home-button home-button-secondary" href="/login">
                  I already have an account
                </Link>
              </div>

              <p className="home-hero-note">
                Write freely. Use AI when you choose.
              </p>
            </div>

            <div className="home-note-preview" aria-label="Auralis note workflow preview">
              <div className="home-preview-topline">
                <span className="home-preview-label">
                  <FileText size={16} aria-hidden="true" />
                  Research notes
                </span>
                <span className="home-preview-status">Saved</span>
              </div>

              <div className="home-preview-document">
                <span className="home-preview-line home-preview-line-title" />
                <span className="home-preview-line" />
                <span className="home-preview-line home-preview-line-short" />
              </div>

              <div className="home-preview-insight">
                <div className="home-preview-insight-title">
                  <Sparkles size={15} aria-hidden="true" />
                  Key idea
                </div>
                <p>
                  Related notes keep returning to attention, memory, and deliberate practice.
                </p>
              </div>

              <div className="home-preview-tags" aria-label="Example tags">
                <span>learning</span>
                <span>memory</span>
                <span>practice</span>
              </div>
            </div>
          </section>

          <section
            className="home-capabilities"
            id="features"
            aria-labelledby="features-title"
          >
            <div className="home-section-intro">
              <p className="home-section-kicker">A clearer second pass</p>
              <h2 id="features-title">Keep the note. Lose the noise.</h2>
              <p>
                Auralis adds structure after you write, so organizing never gets in the
                way of capturing the idea.
              </p>
            </div>

            <div className="home-feature-list">
              {features.map(({ icon: Icon, title, description }) => (
                <article className="home-feature" key={title}>
                  <span className="home-feature-icon" aria-hidden="true">
                    <Icon size={20} strokeWidth={1.8} />
                  </span>
                  <div>
                    <h3>{title}</h3>
                    <p>{description}</p>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section
            className="home-process"
            id="how-it-works"
            aria-labelledby="process-title"
          >
            <div className="home-process-heading">
              <p className="home-section-kicker">One simple rhythm</p>
              <h2 id="process-title">From quick capture to connected thinking.</h2>
            </div>

            <ol className="home-process-list">
              {steps.map((step, index) => (
                <li key={step.title}>
                  <span className="home-step-number" aria-hidden="true">
                    {index + 1}
                  </span>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </li>
              ))}
            </ol>
          </section>

          <section className="home-cta" aria-labelledby="cta-title">
            <div>
              <p className="home-section-kicker">Your next note can start here</p>
              <h2 id="cta-title">Make more sense of what you already know.</h2>
            </div>
            <Link className="home-button home-button-light" href="/signup">
              Start with Auralis
              <ArrowRight size={18} aria-hidden="true" />
            </Link>
          </section>
        </div>

        <footer className="home-footer">
          <Link className="home-brand" href="/" aria-label="Auralis home">
            <span className="home-brand-mark home-brand-mark-small" aria-hidden="true">
              <PenLine size={15} strokeWidth={1.8} />
            </span>
            <span>Auralis</span>
          </Link>
          <p>Personal notes, made easier to understand.</p>
          <p>© {new Date().getFullYear()} Auralis</p>
        </footer>
      </div>
    </main>
  );
}
