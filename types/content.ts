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

export type DemografiSection = {
    luasDesa: string;
    luasPertanian: string;
    luasPemukiman: string;
    pendudukTotal: string;
    pendudukLaki: string;
    pendudukPerempuan: string;
    kkTotal: string;
    kkLaki: string;
    kkPerempuan: string;
};

export type SejarahSection = {
    heading: string;
    body: string;
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


export const defaultHero: HeroSection = {
    title: "Selamat Datang di Website Resmi Desa Kanie",
    subtitle: "Melayani masyarakat dengan integritas, transparansi, dan komitmen untuk kemajuan berkelanjutan bagi seluruh warga Desa Kanie.",
    ctaLabel: "Profil Desa",
    backgroundImage: "",
};

export const defaultSambutan: SambutanSection = {
    badge: "Sambutan Hangat",
    heading: "Kepala Desa Kanie",
    quote: "",
    body: "",
    name: "",
    role: "Kepala Desa Kanie",
    photo: "",
};

export const defaultDemografi: DemografiSection = {
    luasDesa: "1.475",
    luasPertanian: "1.300",
    luasPemukiman: "175",
    pendudukTotal: "3.199",
    pendudukLaki: "1.581",
    pendudukPerempuan: "1.618",
    kkTotal: "1.032",
    kkLaki: "785",
    kkPerempuan: "247",
};

export const defaultSejarah: SejarahSection = {
    heading: "",
    body: "",
    image: "",
};

export const defaultVisiMisi: VisiMisiSection = {
    visi: "",
    misi: [],
};

export const staticNav: NavContent = {
    ctaLabel: "Hubungi Kami",
};

export const staticFooter: FooterContent = {
    address: "Jl. Raya Poros Bone No. 01, Kec. Bone, Kab. Bone, Sulawesi Selatan, 92711",
    phone: "(0481) 123-4567",
    email: "kontak@desakanie.go.id",
    copyright: "© 2024 Pemerintah Desa Kanie. Seluruh Hak Cipta Dilindungi.",
};