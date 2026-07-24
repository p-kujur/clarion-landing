import { describe, it, expect } from 'vitest';
import { timelineItems } from '../data/timeline';

describe('Timeline Data', () => {
  it('should export timelineItems as an array of structured items', () => {
    expect(Array.isArray(timelineItems)).toBe(true);
    expect(timelineItems.length).toBeGreaterThan(0);
    timelineItems.forEach((item) => {
      expect(item.year).toBeDefined();
      expect(item.title).toBeDefined();
      expect(item.description).toBeDefined();
    });
  });
});
