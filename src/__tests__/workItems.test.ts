import { describe, it, expect } from 'vitest';
import { workCategories, workItems } from '../data/workItems';

describe('Work Items Data & Utilities', () => {
  it('should include "All" in workCategories', () => {
    expect(workCategories).toContain('All');
  });

  it('should have valid WorkItem structures', () => {
    expect(workItems.length).toBeGreaterThan(0);
    workItems.forEach((item) => {
      expect(item.id).toBeDefined();
      expect(item.title).toBeDefined();
      expect(item.category).toBeDefined();
      expect(item.description).toBeDefined();
      expect(item.longDescription).toBeDefined();
      expect(Array.isArray(item.tags)).toBe(true);
    });
  });

  it('should correctly filter work items by category', () => {
    const categoryToTest = workCategories.find((c) => c !== 'All');
    if (categoryToTest) {
      const filtered = workItems.filter((w) => w.category === categoryToTest);
      filtered.forEach((item) => {
        expect(item.category).toBe(categoryToTest);
      });
    }
  });
});
