"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import {
  getHeroSection,
  getSambutanSection,
  getDemografiSection,
  getSejarahSection,
  getVisiMisiSection,
  getPotensiItems,
  getFasilitasItems,
  getLembagaItems,
  getGaleriItems,
} from "@/lib/supabase/content";
import type {
  HeroSection,
  SambutanSection,
  DemografiSection,
  SejarahSection,
  VisiMisiSection,
  PotensiItem,
  FasilitasItem,
  LembagaItem,
  GaleriItem,
} from "@/types/content";
import {
  defaultHero,
  defaultSambutan,
  defaultDemografi,
  defaultSejarah,
  defaultVisiMisi,
} from "@/types/content";

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const mainRef = useRef<HTMLDivElement>(null);

  const [loading, setLoading] = useState(true);
  const [hero, setHero] = useState<HeroSection>(defaultHero);
  const [sambutan, setSambutan] = useState<SambutanSection>(defaultSambutan);
  const [demografi, setDemografi] = useState<DemografiSection>(defaultDemografi);
  const [sejarah, setSejarah] = useState<SejarahSection>(defaultSejarah);
  const [visiMisi, setVisiMisi] = useState<VisiMisiSection>(defaultVisiMisi);
  const [potensi, setPotensi] = useState<PotensiItem[]>([]);
  const [fasilitas, setFasilitas] = useState<FasilitasItem[]>([]);
  const [lembaga, setLembaga] = useState<LembagaItem[]>([]);
  const [galeri, setGaleri] = useState<GaleriItem[]>([]);

  useEffect(() => {
    async function loadContent() {
      const supabase = createClient();
      const [
        heroData,
        sambutanData,
        demografiData,
        sejarahData,
        visiMisiData,
        potensiData,
        fasilitasData,
        lembagaData,
        galeriData,
      ] = await Promise.all([
        getHeroSection(supabase),
        getSambutanSection(supabase),
        getDemografiSection(supabase),
        getSejarahSection(supabase),
        getVisiMisiSection(supabase),
        getPotensiItems(supabase),
        getFasilitasItems(supabase),
        getLembagaItems(supabase),
        getGaleriItems(supabase),
      ]);

      setHero(heroData);
      setSambutan(sambutanData);
      setDemografi(demografiData);
      setSejarah(sejarahData);
      setVisiMisi(visiMisiData);
      setPotensi(potensiData);
      setFasilitas(fasilitasData);
      setLembaga(lembagaData);
      setGaleri(galeriData);

      setLoading(false);
    }

    loadContent();
  }, []);

  useEffect(() => {
    if (loading) return;

    const sections = mainRef.current?.querySelectorAll("section");
    if (!sections) return;

    sections.forEach((section) => section.classList.add("reveal-section"));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("reveal-visible");
          }
        });
      },
      { threshold: 0.1 }
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, [loading]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-primary font-body-lg">
        Memuat Halaman Desa...
      </div>
    );
  }

  return (
    <div ref={mainRef}>
      {/* 1. TopNavBar */}
      <nav className="fixed w-full top-0 z-50 bg-surface/90 backdrop-blur-md shadow-sm">
        <div className="flex justify-between items-center px-gutter py-4 max-w-container-max mx-auto">
          <div className="font-headline-md text-headline-md font-bold text-primary flex items-center gap-2">
            <span
              className="material-symbols-outlined"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              landscape
            </span>
            <span>Desa Kanie</span>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8 font-body-md text-body-md">
            <a
              className="text-primary border-b-2 border-secondary font-bold pb-1 transition-colors"
              href="#home"
            >
              Beranda
            </a>
            <a
              className="text-on-surface-variant hover:text-primary transition-colors"
              href="#profil"
            >
              Profil
            </a>
            <a
              className="text-on-surface-variant hover:text-primary transition-colors"
              href="#potensi"
            >
              Potensi Desa
            </a>
            <a
              className="text-on-surface-variant hover:text-primary transition-colors"
              href="#galeri"
            >
              Galeri
            </a>
            <a
              className="text-on-surface-variant hover:text-primary transition-colors"
              href="#kontak"
            >
              Kontak
            </a>
          </div>

          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/admin/login"
              className="inline-flex items-center justify-center w-10 h-10 rounded-full text-on-surface-variant hover:text-primary hover:bg-surface-container transition-colors"
              title="Login Admin"
              aria-label="Login Admin"
            >
              <span className="material-symbols-outlined">
                admin_panel_settings
              </span>
            </Link>
            <a
              className="bg-primary text-on-primary px-6 py-2 rounded-full font-label-md hover:opacity-90 transition-all shadow-md"
              href="#kontak"
            >
              Hubungi Kami
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-primary"
            onClick={() => setMobileMenuOpen((open) => !open)}
            aria-label="Buka menu"
          >
            <span className="material-symbols-outlined">
              {mobileMenuOpen ? "close" : "menu"}
            </span>
          </button>
        </div>

        {/* Mobile Menu Panel */}
        {mobileMenuOpen && (
          <div className="md:hidden flex flex-col gap-1 px-gutter pb-4 font-body-md text-body-md bg-surface">
            <a
              className="py-2 text-primary font-bold"
              href="#home"
              onClick={() => setMobileMenuOpen(false)}
            >
              Beranda
            </a>
            <a
              className="py-2 text-on-surface-variant"
              href="#profil"
              onClick={() => setMobileMenuOpen(false)}
            >
              Profil
            </a>
            <a
              className="py-2 text-on-surface-variant"
              href="#potensi"
              onClick={() => setMobileMenuOpen(false)}
            >
              Potensi Desa
            </a>
            <a
              className="py-2 text-on-surface-variant"
              href="#galeri"
              onClick={() => setMobileMenuOpen(false)}
            >
              Galeri
            </a>
            <a
              className="py-2 text-on-surface-variant"
              href="#kontak"
              onClick={() => setMobileMenuOpen(false)}
            >
              Kontak
            </a>
            <a
              className="mt-2 inline-block bg-primary text-on-primary px-6 py-2 rounded-full font-label-md text-center"
              href="#kontak"
              onClick={() => setMobileMenuOpen(false)}
            >
              Hubungi Kami
            </a>
            <Link
              href="/admin/login"
              className="py-2 text-on-surface-variant flex items-center gap-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="material-symbols-outlined text-lg">
                admin_panel_settings
              </span>
              Login Admin
            </Link>
          </div>
        )}
      </nav>

      {/* 2. Hero Section */}
      <header
        className="relative h-screen flex items-center justify-center overflow-hidden"
        id="home"
      >
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 hero-gradient z-10" />
          <div
            className="w-full h-full bg-cover bg-center"
            style={{
              backgroundImage: `url('${hero.backgroundImage || "/fallback-hero.jpg"}')`,
            }}
          />
        </div>
        <div className="relative z-20 text-center px-gutter max-w-4xl">
          <h1 className="font-display-lg text-display-lg text-white drop-shadow-2xl mb-8 md:text-6xl">
            {hero.title}
          </h1>
          <p className="text-white/90 text-body-lg mb-10 max-w-2xl mx-auto whitespace-pre-wrap">
            {hero.subtitle}
          </p>
          <a
            className="inline-flex items-center gap-2 bg-secondary-container text-on-secondary-container px-8 py-4 rounded-lg font-headline-md hover:scale-105 transition-transform shadow-xl"
            href="#profil"
          >
            {hero.ctaLabel || "Pelajari Lebih Lanjut"}
            <span className="material-symbols-outlined">arrow_forward</span>
          </a>
        </div>
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 animate-bounce text-white">
          <span className="material-symbols-outlined text-4xl">
            keyboard_double_arrow_down
          </span>
        </div>
      </header>

      {/* 3. Sambutan Kepala Desa */}
      <section className="py-section-padding px-gutter max-w-container-max mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="relative group">
            <div className="absolute -inset-4 bg-secondary/20 rounded-full blur-2xl group-hover:bg-secondary/30 transition-all" />
            <div className="relative w-80 h-80 md:w-112.5 md:h-112.5 mx-auto rounded-full overflow-hidden border-8 border-surface shadow-xl">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className="w-full h-full object-cover"
                alt={`Foto ${sambutan.name}`}
                src={sambutan.photo || "/fallback-avatar.jpg"}
              />
            </div>
          </div>
          <div className="space-y-6">
            <span className="text-secondary font-label-md uppercase tracking-wider">
              {sambutan.badge}
            </span>
            <h2 className="font-headline-lg text-headline-lg text-primary accent-underline">
              {sambutan.heading}
            </h2>
            <p className="text-body-lg text-on-surface-variant italic whitespace-pre-wrap text-justify">
              {sambutan.quote}
            </p>
            <p className="text-body-md text-on-surface-variant leading-relaxed whitespace-pre-wrap text-justify">
              {sambutan.body}
            </p>
            <div className="pt-4 text-left">
              <p className="font-bold text-primary">{sambutan.name}</p>
              <p className="text-label-md text-outline">{sambutan.role}</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Demografi & Wilayah */}
      <section className="py-section-padding bg-surface-container-low" id="profil">
        <div className="max-w-container-max mx-auto px-gutter">
          <div className="text-center mb-16">
            <h2 className="font-headline-lg text-headline-lg text-primary accent-underline inline-block">
              Data Demografi & Wilayah
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Luas Wilayah */}
            <div className="bg-surface p-8 rounded-2xl border-t-4 border-secondary shadow-sm hover:-translate-y-1 transition-transform">
              <div className="w-14 h-14 bg-secondary/10 text-secondary rounded-xl flex items-center justify-center mb-6">
                <span className="material-symbols-outlined text-3xl">map</span>
              </div>
              <h3 className="font-headline-md text-primary mb-4">Luas Wilayah</h3>
              <div className="flex items-baseline gap-2 mb-6">
                <span className="text-4xl md:text-5xl text-secondary font-bold">{demografi.luasDesa}</span>
                <span className="text-body-lg text-on-surface-variant font-medium">Hektar</span>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center py-2 border-b border-outline-variant/50">
                  <span className="text-body-md text-on-surface-variant">Area Pertanian</span>
                  <span className="font-bold text-primary">{demografi.luasPertanian} Ha</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-body-md text-on-surface-variant">Area Pemukiman</span>
                  <span className="font-bold text-primary">{demografi.luasPemukiman} Ha</span>
                </div>
              </div>
            </div>

            {/* Total Penduduk */}
            <div className="bg-surface p-8 rounded-2xl border-t-4 border-primary shadow-sm hover:-translate-y-1 transition-transform">
              <div className="w-14 h-14 bg-primary/10 text-primary rounded-xl flex items-center justify-center mb-6">
                <span className="material-symbols-outlined text-3xl">groups</span>
              </div>
              <h3 className="font-headline-md text-primary mb-4">Total Penduduk</h3>
              <div className="flex items-baseline gap-2 mb-6">
                <span className="text-4xl md:text-5xl text-primary font-bold">{demografi.pendudukTotal}</span>
                <span className="text-body-lg text-on-surface-variant font-medium">Jiwa</span>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center py-2 border-b border-outline-variant/50">
                  <span className="text-body-md text-on-surface-variant">Laki-laki</span>
                  <span className="font-bold text-primary">{demografi.pendudukLaki} Jiwa</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-body-md text-on-surface-variant">Perempuan</span>
                  <span className="font-bold text-primary">{demografi.pendudukPerempuan} Jiwa</span>
                </div>
              </div>
            </div>

            {/* Kepala Keluarga */}
            <div className="bg-surface p-8 rounded-2xl border-t-4 border-tertiary shadow-sm hover:-translate-y-1 transition-transform">
              <div className="w-14 h-14 bg-tertiary/10 text-tertiary rounded-xl flex items-center justify-center mb-6">
                <span className="material-symbols-outlined text-3xl">family_restroom</span>
              </div>
              <h3 className="font-headline-md text-primary mb-4">Kepala Keluarga</h3>
              <div className="flex items-baseline gap-2 mb-6">
                <span className="text-4xl md:text-5xl text-tertiary font-bold">{demografi.kkTotal}</span>
                <span className="text-body-lg text-on-surface-variant font-medium">KK</span>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center py-2 border-b border-outline-variant/50">
                  <span className="text-body-md text-on-surface-variant">KK Laki-laki</span>
                  <span className="font-bold text-primary">{demografi.kkLaki} KK</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-body-md text-on-surface-variant">KK Perempuan</span>
                  <span className="font-bold text-primary">{demografi.kkPerempuan} KK</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Sejarah Desa */}
      <section className="py-section-padding px-gutter max-w-container-max mx-auto overflow-hidden">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="order-2 md:order-1">
            <h2 className="font-headline-lg text-headline-lg text-primary accent-underline mb-8">
              {sejarah.heading}
            </h2>
            <p className="text-body-md text-on-surface-variant leading-relaxed text-justify whitespace-pre-wrap">
              {sejarah.body}
            </p>
          </div>
          <div className="order-1 md:order-2">
            <div className="relative">
              <div className="absolute -top-4 -right-4 w-full h-full bg-secondary-container/20 rounded-lg -z-10" />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className="w-full h-100 object-cover rounded-lg shadow-xl"
                alt="Sejarah Desa"
                src={sejarah.image || "/fallback-sejarah.jpg"}
              />
            </div>
          </div>
        </div>
      </section>

      {/* 6. Visi & Misi */}
      <section className="py-section-padding bg-primary text-on-primary">
        <div className="max-w-container-max mx-auto px-gutter">
          <div className="grid md:grid-cols-2 gap-12 md:gap-0">
            <div className="md:pr-12">
              <div className="flex items-center gap-4 mb-8">
                <span className="material-symbols-outlined text-4xl text-secondary-container">
                  visibility
                </span>
                <h2 className="font-display-lg text-white">Visi</h2>
              </div>
              <p className="text-body-lg text-primary-fixed leading-relaxed whitespace-pre-wrap text-justify">
                {visiMisi.visi}
              </p>
            </div>
            <div className="md:border-l border-primary-fixed/30 md:pl-12">
              <div className="flex items-center gap-4 mb-8">
                <span className="material-symbols-outlined text-4xl text-secondary-container">
                  rocket_launch
                </span>
                <h2 className="font-display-lg text-white">Misi</h2>
              </div>
              <ul className="space-y-4">
                {visiMisi.misi.map((item, idx) => (
                  <li key={idx} className="flex gap-3">
                    <span className="material-symbols-outlined text-secondary-container shrink-0">
                      check_circle
                    </span>
                    <span className="text-body-md text-primary-fixed text-justify">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Potensi Desa */}
      <section
        className="py-section-padding px-gutter max-w-container-max mx-auto"
        id="potensi"
      >
        <div className="text-center mb-16">
          <h2 className="font-headline-lg text-headline-lg text-primary accent-underline inline-block">
            Potensi Unggulan Desa
          </h2>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          {potensi.map((p, idx) => (
            <div
              key={idx}
              className="bg-surface border border-outline-variant rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col"
            >
              <div className="w-full h-72 overflow-hidden bg-surface-container">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  alt={`Potensi ${p.title}`}
                  src={p.image || "/fallback-potensi.jpg"}
                />
              </div>

              <div className="p-8 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-headline-md text-primary mb-4">{p.title}</h3>
                  <p className="text-body-md text-on-surface-variant text-justify whitespace-pre-wrap">
                    {p.items.join("\n\n")}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 8. Fasilitas Umum */}
      <section className="py-section-padding bg-surface-container-high">
        <div className="max-w-container-max mx-auto px-gutter text-center">
          <h2 className="font-headline-lg text-headline-lg text-primary accent-underline inline-block mb-16">
            Fasilitas Umum
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {fasilitas.map((facility, idx) => (
              <div
                key={idx}
                className="bg-surface p-10 rounded-xl bento-card flex flex-col items-center"
              >
                <div className="w-16 h-16 bg-primary-container/20 text-primary rounded-full flex items-center justify-center mb-6">
                  <span className="material-symbols-outlined text-4xl">
                    {facility.icon}
                  </span>
                </div>
                <h4 className="font-headline-md text-primary text-center">
                  {facility.title}
                </h4>
                <p className="text-label-md text-outline mt-2 whitespace-pre-wrap text-center">
                  {facility.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. Lembaga Desa */}
      <section className="py-section-padding bg-[#f0f7fa]">
        <div className="max-w-container-max mx-auto px-gutter">
          <div className="text-center mb-16">
            <h2 className="font-headline-lg text-headline-lg text-primary accent-underline inline-block">
              Lembaga Kemasyarakatan
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {lembaga.map((org, idx) => (
              <div
                key={idx}
                className="bg-surface p-8 rounded-lg shadow-sm border border-outline-variant flex flex-col items-center"
              >
                <div className="w-24 h-24 rounded-full overflow-hidden mb-6 bg-white p-2 shadow-inner border border-outline-variant">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    className="w-full h-full object-contain"
                    alt={`Logo ${org.name}`}
                    src={org.logo || "/fallback-logo.png"}
                  />
                </div>
                <h3 className="font-headline-md text-primary mb-4 text-center">
                  {org.name}
                </h3>
                <p className="text-body-md text-on-surface-variant mb-8 whitespace-pre-wrap text-justify">
                  {org.desc}
                </p>
                {org.badge && (
                  <div className="mt-auto pt-6 border-t border-outline-variant w-full flex justify-center">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      className="h-8 object-contain opacity-50 grayscale hover:grayscale-0 transition-all"
                      alt={`Badge ${org.name}`}
                      src={org.badge}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 10. Galeri Kegiatan */}
      <section
        className="py-section-padding px-gutter max-w-container-max mx-auto"
        id="galeri"
      >
        <div className="text-center mb-16">
          <h2 className="font-headline-lg text-headline-lg text-primary accent-underline inline-block">
            Galeri Kegiatan
          </h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {galeri.map((photo, idx) => (
            <div
              key={idx}
              className={`overflow-hidden rounded-lg group cursor-pointer shadow-sm h-64 ${photo.span ? "md:col-span-2" : ""
                }`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                alt={photo.alt}
                src={photo.src || "/fallback-galeri.jpg"}
              />
            </div>
          ))}
        </div>
      </section>

      {/* 11. Kontak Kami / Footer */}
      <footer className="bg-primary text-on-primary pt-section-padding" id="kontak">
        <div className="max-w-container-max mx-auto px-gutter">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-16 mb-16">
            <div>
              <h2 className="font-headline-md mb-8 text-secondary-fixed">
                Desa Kanie
              </h2>
              <p className="text-body-md text-primary-fixed/80 mb-8 text-justify">
                Pusat pemerintahan dan pelayanan warga Desa Kanie. Hubungi kami
                untuk informasi lebih lanjut mengenai program desa, perizinan,
                atau kemitraan.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <span className="material-symbols-outlined text-secondary-fixed shrink-0">
                    location_on
                  </span>
                  <p className="text-body-md text-justify">
                    Jl. Raya Poros Bone No. 01, Kec. Bone, Kab. Bone, Sulawesi
                    Selatan, 92711
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="material-symbols-outlined text-secondary-fixed shrink-0">
                    call
                  </span>
                  <p className="text-body-md">(0481) 123-4567</p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="material-symbols-outlined text-secondary-fixed shrink-0">
                    mail
                  </span>
                  <p className="text-body-md">kontak@desabone.go.id</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-headline-md mb-8 text-secondary-fixed">
                Tautan Cepat
              </h3>
              <ul className="grid grid-cols-1 gap-4">
                <li>
                  <a
                    className="text-primary-fixed/80 hover:text-secondary-fixed transition-colors"
                    href="#home"
                  >
                    Beranda
                  </a>
                </li>
                <li>
                  <a
                    className="text-primary-fixed/80 hover:text-secondary-fixed transition-colors"
                    href="#profil"
                  >
                    Profil Desa
                  </a>
                </li>
                <li>
                  <a
                    className="text-primary-fixed/80 hover:text-secondary-fixed transition-colors"
                    href="#potensi"
                  >
                    Potensi &amp; Ekonomi
                  </a>
                </li>
                <li>
                  <a
                    className="text-primary-fixed/80 hover:text-secondary-fixed transition-colors"
                    href="#galeri"
                  >
                    Galeri Foto
                  </a>
                </li>
                <li>
                  <a
                    className="text-primary-fixed/80 hover:text-secondary-fixed transition-colors"
                    href="#"
                  >
                    Kebijakan Privasi
                  </a>
                </li>
                <li>
                  <a
                    className="text-primary-fixed/80 hover:text-secondary-fixed transition-colors"
                    href="#"
                  >
                    Peta Situs
                  </a>
                </li>
              </ul>
            </div>

            <div className="h-64 md:h-auto rounded-lg overflow-hidden bg-on-primary-fixed-variant">
              <div className="w-full h-full grayscale hover:grayscale-0 transition-all opacity-80 hover:opacity-100">
                <div className="w-full h-full flex items-center justify-center bg-primary-container/30">
                  <span className="material-symbols-outlined text-6xl text-secondary-fixed/50">
                    map
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-primary-container py-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-label-md text-primary-fixed/60 text-center md:text-left">
              © 2024 Pemerintah Desa Kanie. Seluruh Hak Cipta Dilindungi.
            </p>
            <div className="flex gap-6 justify-center">
              <a
                className="text-primary-fixed/60 hover:text-secondary-fixed transition-colors"
                href="#"
              >
                <span className="material-symbols-outlined">face_nod</span>
              </a>
              <a
                className="text-primary-fixed/60 hover:text-secondary-fixed transition-colors"
                href="#"
              >
                <span className="material-symbols-outlined">share</span>
              </a>
              <a
                className="text-primary-fixed/60 hover:text-secondary-fixed transition-colors"
                href="#"
              >
                <span className="material-symbols-outlined">public</span>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}