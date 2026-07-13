import Link from 'next/link';

import ThemePortrait from './ThemePortrait';

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-content">
        <div className="hero-avatar">
          <ThemePortrait width={160} height={160} priority />
        </div>

        <h1 className="hero-title">
          <span className="hero-name">Uguudei Bayaraa</span>
        </h1>

        <p className="hero-tagline">
          <span className="hero-highlight">Fullstack developer</span> and{' '}
          <span className="hero-highlight">AI engineer</span> based in
          Ulaanbaatar.
          <br />I build web and mobile products, and lately I&apos;m going deep
          on agentic AI.
        </p>

        <div className="hero-chips">
          <span className="hero-chip">Fullstack</span>
          <span className="hero-chip">Agentic AI</span>
          <span className="hero-chip">TypeScript · Python</span>
        </div>

        <div className="hero-cta">
          <Link href="/projects" className="button">
            View Projects
          </Link>
          <Link href="/about" className="button button-secondary">
            About Me
          </Link>
        </div>
      </div>

      <div className="hero-bg" aria-hidden="true">
        <div className="hero-gradient" />
      </div>
    </section>
  );
}
