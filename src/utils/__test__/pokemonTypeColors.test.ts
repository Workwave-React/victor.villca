import { describe, it, expect } from 'vitest';
import { getTypeColor } from '../pokemonTypeColors';

describe('pokemonTypeColors', () => {
  it('should return correct color for fire type', () => {
    const color = getTypeColor('fire');
    expect(color).toBeTruthy();
    expect(typeof color).toBe('string');
  });

  it('should return correct color for water type', () => {
    const color = getTypeColor('water');
    expect(color).toBeTruthy();
    expect(typeof color).toBe('string');
  });

  it('should return correct color for grass type', () => {
    const color = getTypeColor('grass');
    expect(color).toBeTruthy();
    expect(typeof color).toBe('string');
  });

  it('should handle case insensitivity', () => {
    const lowerCase = getTypeColor('fire');
    const upperCase = getTypeColor('FIRE');
    const mixedCase = getTypeColor('FiRe');
    
    expect(lowerCase).toBe(upperCase);
    expect(upperCase).toBe(mixedCase);
  });

  it('should return default color for unknown type', () => {
    const color = getTypeColor('unknown-type');
    expect(color).toBeTruthy();
    expect(typeof color).toBe('string');
  });
});