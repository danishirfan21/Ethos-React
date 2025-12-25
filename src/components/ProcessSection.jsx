import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import './ProcessSection.css';

export const ProcessSection = ({
  number,
  title,
  image,
  children,
  reverse = false,
}) => {
  const sectionRef = useIntersectionObserver({ threshold: 0.3 });

  return (
    <section
      className="process-section"
      ref={sectionRef}
      style={{ direction: reverse ? 'rtl' : 'ltr' }}
    >
      <div className="section-image">
        <img src={image} alt={title} />
      </div>
      <div className="section-content" style={{ direction: 'ltr' }}>
        <span className="section-number">{number}</span>
        <h2>{title}</h2>
        {children}
      </div>
    </section>
  );
};
