import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import PricingCard from './PricingCard';

describe('PricingCard Component', () => {
  it('renders all three pricing packages', () => {
    render(<PricingCard />);
    
    // Mengecek nama-nama paket
    expect(screen.getByText('Starter (Basic Portfolio)')).toBeInTheDocument();
    expect(screen.getByText('Pro (Professional Portfolio)')).toBeInTheDocument();
    expect(screen.getByText('Solusi Lengkap')).toBeInTheDocument();
  });

  it('highlights the popular package', () => {
    render(<PricingCard />);
    
    // Mengecek apakah badge "Recommended" muncul di paket yang populer
    const badge = screen.getByText('Recommended');
    expect(badge).toBeInTheDocument();
  });

  it('renders correct call-to-action buttons', () => {
    render(<PricingCard />);
    
    const starterBtn = screen.getByRole('link', { name: /Pilih Starter/i });
    const proBtn = screen.getByRole('link', { name: /Pilih Pro/i });
    const premiumBtn = screen.getByRole('link', { name: /Konsultasi Gratis/i });

    expect(starterBtn).toHaveAttribute('href', '/order');
    expect(proBtn).toHaveAttribute('href', '/order');
    expect(premiumBtn).toHaveAttribute('href', '/order'); // Sesuai kode, non-premium href adalah /order
  });
});
