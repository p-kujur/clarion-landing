import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { renderToString } from 'react-dom/server';
import WorkModal from '../components/WorkModal';
import type { WorkItem } from '../types/content';

vi.mock('react', async () => {
  const actual = await vi.importActual<typeof import('react')>('react');
  return {
    ...actual,
    useEffect: (effect: () => void) => {
      effect();
    },
  };
});

const mockWork: WorkItem = {
  id: 'test-work',
  title: 'Test Work Title',
  category: 'Infrastructure',
  description: 'Short description for testing',
  longDescription: 'Long description for testing WorkModal accessibility',
  tags: ['Education', 'Testing'],
  impact: ['Impact line 1', 'Impact line 2'],
};

describe('WorkModal Accessibility & Logic empirical test suite', () => {
  beforeEach(() => {
    const mockBody = {
      style: { overflow: '' },
    };

    const documentMock = {
      body: mockBody,
      activeElement: null,
      querySelector: vi.fn(),
      querySelectorAll: vi.fn().mockReturnValue([]),
    };

    const windowMock = {
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    };

    (globalThis as unknown as { document: typeof documentMock }).document = documentMock;
    (globalThis as unknown as { window: typeof windowMock }).window = windowMock;
  });

  afterEach(() => {
    delete (globalThis as unknown as { document?: unknown }).document;
    delete (globalThis as unknown as { window?: unknown }).window;
  });

  it('1. Renders WorkModal component HTML with correct ARIA dialog attributes', () => {
    const onCloseSpy = vi.fn();
    const html = renderToString(<WorkModal work={mockWork} onClose={onCloseSpy} />);
    expect(html).toContain('role="dialog"');
    expect(html).toContain('aria-modal="true"');
    expect(html).toContain('aria-labelledby="work-modal-title"');
    expect(html).toContain('aria-label="Close details modal"');
  });

  it('2. Renders work item title, category, long description, and impact list', () => {
    const onCloseSpy = vi.fn();
    const html = renderToString(<WorkModal work={mockWork} onClose={onCloseSpy} />);
    expect(html).toContain('Test Work Title');
    expect(html).toContain('Infrastructure');
    expect(html).toContain('Long description for testing WorkModal accessibility');
    expect(html).toContain('Impact line 1');
    expect(html).toContain('Impact line 2');
  });

  it('3. Sets body overflow hidden on mount effect', () => {
    const onCloseSpy = vi.fn();
    renderToString(<WorkModal work={mockWork} onClose={onCloseSpy} />);
    expect(globalThis.document.body.style.overflow).toBe('hidden');
  });
});
