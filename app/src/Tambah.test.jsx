import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { beforeEach, expect, test, vi } from 'vitest'
import App from './App.jsx'

const DATA = [
    { id: "1", judul: "Kabel LAN", kategori: "Perangkat Praktikum", kodeAlat: "LAB-001", jumlah: 20, kondisi: "baik" },
    { id: "7", judul: "Monitor", kategori: "Perangkat LAB", kodeAlat: "LAB-007", jumlah: 50, kondisi: "perlu servis" }
]

beforeEach(() => {
  vi.stubGlobal('fetch', vi.fn(async () => new Response(JSON.stringify(DATA))))
})

function buka(path) {
  render(
    <MemoryRouter initialEntries={[path]}>
      <App />
    </MemoryRouter>,
  )
}

test('menampilkan Kabel LAN dihalaman koleksi', async () => {
    buka('/koleksi')
    expect(await screen.findByText('Kabel LAN')).toBeInTheDocument()
})

test('hide monitor ketika searching kabel LAN',async () => {
    buka('/koleksi')
    await screen.findByText('Monitor')
    await userEvent.type(screen.getByRole('searchbox'), 'Kabel LAN')
    expect(screen.queryByText('Monitor')).not.toBeInTheDocument()
})

test('menampilkan alert jika isi form tidak sesuai', async () => {
    buka('/tambah')
    await userEvent.click(screen.getByRole('button', { name: 'Simpan' }))
    expect(screen.getByRole('alert')).toHaveTextContent('Judul wajib diisi, minimal 3 karakter')
})

test('menampilkan kategori pada tabel statistika', async () => {
    buka('/statistik')
    await screen.findAllByRole('table')
    expect(screen.getByText('Perangkat LAB')).toBeInTheDocument()
    expect(screen.getByText('Perangkat Praktikum')).toBeInTheDocument()
})