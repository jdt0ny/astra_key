import { useEffect, useState } from 'react';

/**
 * Tracks which content section owns the current reading position.
 * The provided section list must be stable for the lifetime of the component.
 */
export function useActiveSection(sections: readonly string[]): string {
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;

      const readingLine = window.innerHeight * 0.38;
      let current = '';

      for (const id of sections) {
        const element = document.getElementById(id);

        if (element && element.getBoundingClientRect().top <= readingLine) {
          current = id;
        }
      }

      setActiveSection((previous) => (previous === current ? previous : current));
    };

    const requestUpdate = () => {
      if (frame === 0) {
        frame = window.requestAnimationFrame(update);
      }
    };

    update();
    window.addEventListener('scroll', requestUpdate, { passive: true });
    window.addEventListener('resize', requestUpdate);

    return () => {
      window.removeEventListener('scroll', requestUpdate);
      window.removeEventListener('resize', requestUpdate);

      if (frame !== 0) {
        window.cancelAnimationFrame(frame);
      }
    };
  }, [sections]);

  return activeSection;
}
