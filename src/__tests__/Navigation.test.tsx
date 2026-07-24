import { describe, it, expect, vi } from 'vitest';
import React from 'react';
import { renderToString } from 'react-dom/server';
import Navigation from '../components/Navigation';

vi.mock('react-router', () => ({
  Link: ({
    to,
    children,
    className,
    'aria-label': ariaLabel,
  }: {
    to: string;
    children: React.ReactNode;
    className?: string;
    'aria-label'?: string;
  }) => (
    <a href={to} className={className} aria-label={ariaLabel}>
      {children}
    </a>
  ),
  useLocation: () => ({ pathname: '/' }),
}));

describe('Navigation Component empirical accessibility test suite', () => {
  it('1. Renders navigation bar with correct accessibility attributes and brand link', () => {
    const html = renderToString(<Navigation />);
    expect(html).toContain('aria-label="Clarion Global"');
    expect(html).toContain('aria-controls="mobile-menu"');
    expect(html).toContain('aria-expanded="false"');
  });

  it('2. Contains desktop navigation links for all key pages', () => {
    const html = renderToString(<Navigation />);
    expect(html).toContain('Home');
    expect(html).toContain('About Us');
    expect(html).toContain('Key Areas');
    expect(html).toContain('Contact');
  });

  it('3. Mobile menu button has proper ARIA attributes when rendered', () => {
    const html = renderToString(<Navigation />);
    expect(html).toContain('aria-label="Open menu"');
  });
});
