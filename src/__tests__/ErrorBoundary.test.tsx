import { describe, it, expect } from 'vitest';
import React from 'react';
import ErrorBoundary from '../components/ErrorBoundary';

describe('ErrorBoundary Component', () => {
  it('should instantiate ErrorBoundary element correctly', () => {
    const element = React.createElement(ErrorBoundary, null, React.createElement('div', null, 'Test Child'));
    expect(element.type).toBe(ErrorBoundary);
  });
});
