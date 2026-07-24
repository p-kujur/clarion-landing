import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { renderToString } from 'react-dom/server';
import FlowField from '../components/FlowField';
import MoonlitRipple from '../components/MoonlitRipple';

describe('prefers-reduced-motion CSS & WebGL Canvas Fallback Test Suite', () => {
  beforeEach(() => {
    const matchMediaMock = vi.fn().mockImplementation((query: string) => ({
      matches: query.includes('prefers-reduced-motion: reduce'),
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }));

    (globalThis as unknown as { window: { matchMedia: typeof matchMediaMock } }).window = {
      matchMedia: matchMediaMock,
    };
  });

  afterEach(() => {
    delete (globalThis as unknown as { window?: unknown }).window;
  });

  it('1. Renders FlowField component without errors when reduced motion is preferred', () => {
    const html = renderToString(<FlowField />);
    expect(html).toContain('<canvas');
  });

  it('2. Renders MoonlitRipple component without errors when reduced motion is preferred', () => {
    const html = renderToString(<MoonlitRipple />);
    expect(html).toContain('<canvas');
  });
});
