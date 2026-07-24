import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import HeroSection from './HeroSection';

describe('HeroSection Component', () => {
  it('renders the main heading text properly', () => {
    render(<HeroSection />);
    
    // Mengecek teks heading utama
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent(/Tampil profesional di/i);
    expect(heading).toHaveTextContent(/dunia digital/i);
  });

  it('renders the primary Call-To-Action buttons', () => {
    render(<HeroSection />);
    
    // Mengecek ketersediaan tombol CTA
    const pricingButton = screen.getByRole('link', { name: /Lihat Paket Harga/i });
    const contactButton = screen.getByRole('link', { name: /Hubungi Kami/i });
    
    expect(pricingButton).toBeInTheDocument();
    expect(pricingButton).toHaveAttribute('href', '#pricing');
    
    expect(contactButton).toBeInTheDocument();
    expect(contactButton).toHaveAttribute('href', '#contact');
  });
});
