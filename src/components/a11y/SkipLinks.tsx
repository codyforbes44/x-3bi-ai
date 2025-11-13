import { A11Y_CONFIG } from '@/config/a11y-config';

/**
 * Skip Links Component
 * Provides keyboard users quick navigation to main sections
 * Appears on focus (Tab key)
 */
export function SkipLinks() {
  return (
    <div className="skip-links-container">
      {A11Y_CONFIG.skipLinks.map((link) => (
        <a
          key={link.id}
          href={`#${link.id}`}
          className="skip-link"
        >
          {link.label}
        </a>
      ))}
    </div>
  );
}
