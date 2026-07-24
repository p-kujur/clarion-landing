import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { useSEO } from '../hooks/useSEO';

vi.mock('react', async () => {
  const actual = await vi.importActual<typeof import('react')>('react');
  return {
    ...actual,
    useEffect: (effect: () => void) => {
      effect();
    },
  };
});

function TestSEOComponent({ title, description }: { title: string; description: string }) {
  useSEO({ title, description });
  return React.createElement('div', { 'data-testid': 'seo-test' }, title);
}

describe('useSEO Hook empirical test suite', () => {
  let createdElements: Array<{ name?: string; content?: string; setAttribute: (k: string, v: string) => void }>;
  let currentTitle: string;

  beforeEach(() => {
    createdElements = [];
    currentTitle = '';

    const documentMock = {
      get title() {
        return currentTitle;
      },
      set title(val: string) {
        currentTitle = val;
      },
      head: {
        appendChild: vi.fn((elem: { name?: string; content?: string; setAttribute: (k: string, v: string) => void }) => {
          createdElements.push(elem);
        }),
      },
      querySelector: vi.fn((selector: string) => {
        if (selector === 'meta[name="description"]') {
          return createdElements.find((e) => e.name === 'description') || null;
        }
        return null;
      }),
      createElement: vi.fn((tag: string) => {
        const elem = {
          tag,
          name: '',
          content: '',
          setAttribute(k: string, v: string) {
            if (k === 'name') this.name = v;
            if (k === 'content') this.content = v;
          },
        };
        return elem;
      }),
    };

    (globalThis as unknown as { document: typeof documentMock }).document = documentMock;
  });

  afterEach(() => {
    delete (globalThis as unknown as { document?: unknown }).document;
  });

  it('1. Invokes useSEO hook within component render context and updates document title & meta description', () => {
    const title = 'Clarion Global | Strategic Consulting';
    const description = 'Empowering organizations through transformation.';

    renderToString(React.createElement(TestSEOComponent, { title, description }));

    expect(globalThis.document.title).toBe(title);
    expect(createdElements.length).toBe(1);
    expect(createdElements[0].name).toBe('description');
    expect(createdElements[0].content).toBe(description);
  });

  it('2. Updates existing meta description tag content when called with new props', () => {
    const initialTitle = 'Initial Title';
    const initialDesc = 'Initial Description';
    renderToString(React.createElement(TestSEOComponent, { title: initialTitle, description: initialDesc }));

    const newTitle = 'Updated Title';
    const newDesc = 'Updated Description';
    renderToString(React.createElement(TestSEOComponent, { title: newTitle, description: newDesc }));

    expect(globalThis.document.title).toBe(newTitle);
    expect(createdElements[0].content).toBe(newDesc);
  });
});
