export default function FilterKategori({ kategori, daftarKategori, onUbah}) {
    return (
        <select aria-label="kategori" value={kategori} onChange={(e) => onUbah(e.target.value)}
        >{daftarKategori.map((k) => (
            <option key={k} value={k}>{k}</option>
        ))}
        </select>
    )
}