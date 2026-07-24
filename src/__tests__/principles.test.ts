import { describe, it, expect } from 'vitest';
import { homePrinciples, coreBeliefs } from '../data/principles';

describe('Principles Data', () => {
  it('should export homePrinciples as a non-empty array of strings', () => {
    expect(Array.isArray(homePrinciples)).toBe(true);
    expect(homePrinciples.length).toBeGreaterThan(0);
    homePrinciples.forEach((principle) => {
      expect(typeof principle).toBe('string');
      expect(principle.length).toBeGreaterThan(0);
    });
  });

  it('should export coreBeliefs with title and description', () => {
    expect(Array.isArray(coreBeliefs)).toBe(true);
    expect(coreBeliefs.length).toBeGreaterThan(0);
    coreBeliefs.forEach((belief) => {
      expect(belief).toHaveProperty('title');
      expect(belief).toHaveProperty('description');
      expect(typeof belief.title).toBe('string');
      expect(typeof belief.description).toBe('string');
    });
  });
});
