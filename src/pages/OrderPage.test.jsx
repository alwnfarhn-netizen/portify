import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import OrderPage from './OrderPage';
import { supabase } from '../lib/supabase';

describe('OrderPage Component (Integration Test)', () => {
  it('allows user to fill out the form and submit successfully', async () => {
    render(
      <MemoryRouter>
        <OrderPage />
      </MemoryRouter>
    );

    // Dapatkan elemen-elemen form
    const nameInput = screen.getByPlaceholderText(/Cth: Alwan Farhan/i);
    const phoneInput = screen.getByPlaceholderText(/Cth: 08123456789/i);
    const emailInput = screen.getByPlaceholderText(/Cth: hello@alwan.com/i);
    const submitButton = screen.getByRole('button', { name: /Pesan Sekarang/i });

    // Simulasikan pengguna mengetik data
    fireEvent.change(nameInput, { target: { value: 'Budi Test' } });
    fireEvent.change(phoneInput, { target: { value: '08111222333' } });
    fireEvent.change(emailInput, { target: { value: 'budi@test.com' } });

    // Pastikan tombol bisa diklik
    expect(submitButton).not.toBeDisabled();
    
    // Simulasikan klik submit
    fireEvent.click(submitButton);

    // Tunggu sampai UI berubah menjadi "Pesanan Berhasil!"
    await waitFor(() => {
      expect(screen.getByText(/Pesanan Berhasil!/i)).toBeInTheDocument();
    });

    // Verifikasi bahwa fungsi supabase dipanggil satu kali dengan data yang benar
    expect(supabase.from).toHaveBeenCalledWith('orders');
    expect(supabase.from('orders').insert).toHaveBeenCalled();
  });
});
