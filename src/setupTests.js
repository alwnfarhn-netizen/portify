import '@testing-library/jest-dom';
import { expect, afterEach, vi } from 'vitest';
import { cleanup } from '@testing-library/react';

// Cleanup setelah tiap tes selesai
afterEach(() => {
  cleanup();
});

const mockInsert = vi.fn().mockResolvedValue({ data: null, error: null });
const mockSelect = vi.fn().mockReturnValue({
  eq: vi.fn().mockReturnValue({
    order: vi.fn().mockResolvedValue({ data: [], error: null })
  })
});
const mockUpdate = vi.fn().mockReturnValue({
  eq: vi.fn().mockResolvedValue({ data: null, error: null })
});
const mockDelete = vi.fn().mockReturnValue({
  eq: vi.fn().mockResolvedValue({ data: null, error: null })
});

const mockFrom = vi.fn(() => ({
  insert: mockInsert,
  select: mockSelect,
  update: mockUpdate,
  delete: mockDelete,
}));

// Setup mock untuk supabase secara global
vi.mock('./lib/supabase', () => ({
  supabase: {
    from: mockFrom,

    auth: {
      signInWithPassword: vi.fn().mockResolvedValue({ data: { session: {} }, error: null }),
      signOut: vi.fn().mockResolvedValue({ error: null }),
    }
  }
}));

// Mock IntersectionObserver untuk framer-motion di jsdom
class IntersectionObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}
window.IntersectionObserver = IntersectionObserver;
