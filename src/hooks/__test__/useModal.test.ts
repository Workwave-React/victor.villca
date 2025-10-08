import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useModal } from '../useModal';

describe('useModal', () => {
  it('should initialize with closed state', () => {
    const { result } = renderHook(() => useModal());
    
    expect(result.current.isOpen).toBe(false);
    expect(result.current.modalData).toBe(null);
  });

  it('should open modal with data', () => {
    const { result } = renderHook(() => useModal());
    const testData = {
      imageUrl: 'https://example.com/image.png',
      title: 'Test Pokemon',
    };

    act(() => {
      result.current.openModal(testData);
    });

    expect(result.current.isOpen).toBe(true);
    expect(result.current.modalData).toEqual(testData);
  });

  it('should close modal and clear data', () => {
    const { result } = renderHook(() => useModal());
    const testData = {
      imageUrl: 'https://example.com/image.png',
      title: 'Test Pokemon',
    };

    act(() => {
      result.current.openModal(testData);
    });

    act(() => {
      result.current.closeModal();
    });

    expect(result.current.isOpen).toBe(false);
    expect(result.current.modalData).toBe(null);
  });
});