// Tipe & konstanta konten website.
// Section dengan 1 baris tetap (id=1 di DB): Hero, Sambutan, Sejarah, VisiMisi.
// Section berupa list (banyak baris, bisa tambah/hapus): ProfilCard, Potensi, Fasilitas, Lembaga, Galeri.
// Nav & Footer TIDAK disimpan di Supabase (tetap konstanta di kode).

export type HeroSection = {
    title: string;
    subtitle: string;
    ctaLabel: string;
    backgroundImage: string;
};

export type SambutanSection = {
    badge: string;
    heading: string;
    quote: string;
    body: string;
    name: string;
    role: string;
    photo: string;
};

export type ProfilCard = {
    id?: number;
    icon: string;
    title: string;
    desc: string;
};

export type SejarahSection = {
    heading: string;
    paragraphs: string[];
    image: string;
};

export type VisiMisiSection = {
    visi: string;
    misi: string[];
};

export type PotensiItem = {
    id?: number;
    icon: string;
    title: string;
    items: string[];
    image: string;
};

export type FasilitasItem = {
    id?: number;
    icon: string;
    title: string;
    desc: string;
};

export type LembagaItem = {
    id?: number;
    name: string;
    desc: string;
    logo: string;
    badge: string;
};

export type GaleriItem = {
    id?: number;
    alt: string;
    src: string;
    span: boolean;
};

export type NavContent = {
    ctaLabel: string;
};

export type FooterContent = {
    address: string;
    phone: string;
    email: string;
    copyright: string;
};

// ---------------------------------------------------------
// Nilai default/fallback -- dipakai kalau tabel masih kosong
// (belum diisi lewat admin panel), supaya halaman publik
// tetap tampil rapi, bukan blank.
// ---------------------------------------------------------

export const defaultHero: HeroSection = {
    title: "Selamat Datang di Website Resmi Desa Bone",
    subtitle:
        "Melayani masyarakat dengan integritas, transparansi, dan komitmen untuk kemajuan berkelanjutan bagi seluruh warga Desa Bone.",
    ctaLabel: "Profil Desa",
    backgroundImage: "",
};

export const defaultSambutan: SambutanSection = {
    badge: "Sambutan Hangat",
    heading: "Kepala Desa Bone",
    quote: "",
    body: "",
    name: "",
    role: "Kepala Desa Bone",
    photo: "",
};

export const defaultSejarah: SejarahSection = {
    heading: "Sejarah Desa Bone",
    paragraphs: [],
    image: "",
};

export const defaultVisiMisi: VisiMisiSection = {
    visi: "",
    misi: [],
};

// Nav & Footer: konstanta biasa, edit langsung di file ini kalau perlu berubah.
export const staticNav: NavContent = {
    ctaLabel: "Hubungi Kami",
};

export const staticFooter: FooterContent = {
    address: "Jl. Raya Poros Bone No. 01, Kec. Bone, Kab. Bone, Sulawesi Selatan, 92711",
    phone: "(0481) 123-4567",
    email: "kontak@desabone.go.id",
    copyright: "© 2024 Pemerintah Desa Bone. Seluruh Hak Cipta Dilindungi.",
};
