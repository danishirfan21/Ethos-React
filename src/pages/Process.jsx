import { ProcessSection } from '../components/ProcessSection';
import './Process.css';

export const Process = () => {
  return (
    <main>
      <section className="process-hero">
        <div className="hero-content">
          <h1>How We Build</h1>
          <p>
            Every product begins with a simple question: what would make the
            ritual better? From that starting point, we pursue precision through
            iteration, material honesty, and an uncompromising attention to
            detail.
          </p>
        </div>
      </section>

      <ProcessSection
        number="01 — Design Philosophy"
        title="Form Follows Function"
        image="https://images.unsplash.com/photo-1498804103079-a6351b050096?auto=format&fit=crop&q=80&w=1200"
      >
        <p>
          We design from the inside out. Every curve, every angle, every
          material choice serves the extraction. Aesthetics emerge naturally
          from engineering decisions made in pursuit of better coffee.
        </p>
        <p>
          Our studio collaborates with baristas, roasters, and material
          scientists to understand the physics of brewing at a fundamental
          level. Only then do we begin sketching.
        </p>
      </ProcessSection>

      <ProcessSection
        number="02 — Materials & Craft"
        title="Honest Materials"
        image="https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&q=80&w=1200"
        reverse={true}
      >
        <p>
          We source borosilicate glass from Germany, aerospace-grade aluminum
          from Japan, and stainless steel from Sweden. Each material is chosen
          for its thermal properties, durability, and ability to age gracefully.
        </p>
        <p>
          Our manufacturing partners are small workshops that have been
          perfecting their craft for generations. They share our obsession with
          precision and our refusal to compromise.
        </p>
      </ProcessSection>

      <ProcessSection
        number="03 — Precision Engineering"
        title="Measured in Microns"
        image="https://images.unsplash.com/photo-1537462715879-360eeb61a0ad?auto=format&fit=crop&q=80&w=1200"
      >
        <p>
          Temperature stability within 0.5°C. Flow rates calculated to three
          decimal places. Tolerances measured in microns. These aren't marketing
          claims—they're engineering requirements.
        </p>
        <p>
          We prototype extensively, testing each iteration with professional
          baristas and measuring extraction consistency across hundreds of
          brews. A product only enters production when we can't improve it
          further.
        </p>
      </ProcessSection>

      <ProcessSection
        number="04 — Quality Control"
        title="Inspected by Hand"
        image="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=1200"
        reverse={true}
      >
        <p>
          Every piece that leaves our facility is individually inspected. We
          check for surface imperfections invisible to the naked eye, test
          thermal performance against specification, and verify that each
          product meets our exacting standards.
        </p>
        <p>
          It's slower. It's more expensive. But it's the only way to ensure that
          what arrives at your door performs exactly as intended, every single
          time.
        </p>
      </ProcessSection>

      <section className="closing-statement">
        <h2>
          The result is coffee gear that disappears, leaving only clarity in the
          cup.
        </h2>
        <p>
          This is what we mean by precision. Not perfection for its own sake,
          but in service of a better ritual, a better morning, a better cup.
        </p>
      </section>
    </main>
  );
};
