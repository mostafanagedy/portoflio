import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { usePagination } from './usePagination';

describe('usePagination', () => {
  const createData = (count: number) =>
    Array.from({ length: count }, (_, i) => ({ id: i, name: `Item ${i}` }));

  beforeEach(() => {
    vi.useFakeTimers();
  });

  it('should return first page of data', () => {
    const data = createData(25);
    const { result } = renderHook(() => usePagination({ data, itemsPerPage: 10 }));

    expect(result.current.currentPage).toBe(1);
    expect(result.current.totalPages).toBe(3);
    expect(result.current.paginatedData).toHaveLength(10);
    expect(result.current.hasNext).toBe(true);
    expect(result.current.hasPrev).toBe(false);
  });

  it('should paginate correctly', () => {
    const data = createData(25);
    const { result } = renderHook(() => usePagination({ data, itemsPerPage: 10 }));

    act(() => {
      result.current.goToPage(2);
    });

    expect(result.current.currentPage).toBe(2);
    expect(result.current.paginatedData).toHaveLength(10);
    expect(result.current.paginatedData[0]!.name).toBe('Item 10');
  });

  it('should clamp page within bounds', () => {
    const data = createData(25);
    const { result } = renderHook(() => usePagination({ data, itemsPerPage: 10 }));

    act(() => {
      result.current.goToPage(100);
    });

    expect(result.current.currentPage).toBe(3);
    expect(result.current.hasNext).toBe(false);
  });

  it('should handle next and prev', () => {
    const data = createData(25);
    const { result } = renderHook(() => usePagination({ data, itemsPerPage: 10 }));

    act(() => {
      result.current.nextPage();
    });
    expect(result.current.currentPage).toBe(2);

    act(() => {
      result.current.prevPage();
    });
    expect(result.current.currentPage).toBe(1);
  });

  it('should default itemsPerPage to 10', () => {
    const data = createData(25);
    const { result } = renderHook(() => usePagination({ data }));

    expect(result.current.itemsPerPage).toBe(10);
    expect(result.current.totalPages).toBe(3);
  });

  it('should handle empty data', () => {
    const data: { id: number; name: string }[] = [];
    const { result } = renderHook(() => usePagination({ data, itemsPerPage: 10 }));

    expect(result.current.totalPages).toBe(1);
    expect(result.current.paginatedData).toHaveLength(0);
    expect(result.current.hasNext).toBe(false);
  });
});
