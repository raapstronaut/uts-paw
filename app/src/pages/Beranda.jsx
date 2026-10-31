import { Link } from 'react-router-dom'
import useKoleksi from '../hooks/useKoleksi.js'
import mahasiswa from '../../mahasiswa.json'
import RingkasanKoleksi from '../components/RingkasanKoleksi.jsx'

export default function Beranda() {
  const { items, loading } = useKoleksi()
  const jumlahKategori = new Set(items.map((item) => item.kategori)).size

  return (
    <section>
      <h1>Inventaris Laboratorium</h1>
      <p>Tema: {mahasiswa.tema}</p>
      {loading ? (
        <p>Memuat ringkasan...</p>
      ) : (
        <RingkasanKoleksi jumlahItem={items.length} jumlahKategori={jumlahKategori}/>
      )}
      <Link to="/koleksi">Lihat semua alat</Link>
    </section>
  )
}