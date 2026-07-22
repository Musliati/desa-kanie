"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
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
  }, []);

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
              backgroundImage:
                "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDnRohpHBjzey40d86rdylkyFmt1ZFtMRNzAQ5a6DVL3pQF7Owxa3Gww_Y_cMj0iNxdhOSmi2STW5mWb-5DZml7Xzg0-5PqB3PRQ7n_FpWlS828_PM4qrOh0PTHimDC7GlErYtU7N9hQDWi99GJQj9T41xM96WkRFKeWkH5Vhcz_fwIupRoL87S_p-01GTy-xGnloQ1KkNvqBsjl2oSVFqT-5vOh8vLAy57w7b3bofh6lgnNA0X-Grbew')",
            }}
          />
        </div>
        <div className="relative z-20 text-center px-gutter max-w-4xl">
          <h1 className="font-display-lg text-display-lg text-white drop-shadow-2xl mb-8 md:text-6xl">
            Selamat Datang di Website Resmi Desa Kanie
          </h1>
          <p className="text-white/90 text-body-lg mb-10 max-w-2xl mx-auto">
            Melayani masyarakat dengan integritas, transparansi, dan komitmen
            untuk kemajuan berkelanjutan bagi seluruh warga Desa Kanie.
          </p>
          <a
            className="inline-flex items-center gap-2 bg-secondary-container text-on-secondary-container px-8 py-4 rounded-lg font-headline-md hover:scale-105 transition-transform shadow-xl"
            href="#profil"
          >
            Profil Desa
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
                alt="Kepala Desa Kanie"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuA0bassw3c6YKdGcDPad0Gl-wuWAnK6cWsmSffrJZMRHE7oKykN_3E1u9MNmXcEgKe-6FUUAz4Yz2X1geVigaRDqF9KxCh0Jzvcjn5j6WcktGeIC8fanXSi2mqdPS37J3wKg-GH_eQsy2cxcKSRALepN13LqPCrFSqi6lLeE_Bj4qogXQ5u3t52SJpXT4LN4AASh4yWT21LE7zVxQKvWRl6uj6a7HnfVyw28qFCLelAgtujmgjCE5U0Qg"
              />
            </div>
          </div>
          <div className="space-y-6">
            <span className="text-secondary font-label-md uppercase tracking-wider">
              Sambutan Hangat
            </span>
            <h2 className="font-headline-lg text-headline-lg text-primary accent-underline">
              Kepala Desa Kanie
            </h2>
            <p className="text-body-lg text-on-surface-variant italic">
              &ldquo;Assalamualaikum Warahmatullahi Wabarakatuh, Salam
              Sejahtera untuk kita semua.&rdquo;
            </p>
            <p className="text-body-md text-on-surface-variant leading-relaxed">
              Selamat datang di portal informasi digital Desa Kanie. Website
              ini merupakan wujud komitmen kami dalam mewujudkan tata kelola
              pemerintahan desa yang transparan dan akuntabel. Kami mengundang
              seluruh elemen masyarakat dan pengunjung untuk menjelajahi
              potensi, sejarah, serta program pembangunan yang sedang kami
              laksanakan. Semoga platform ini bermanfaat bagi kemajuan kita
              bersama.
            </p>
            <div className="pt-4">
              <p className="font-bold text-primary">Drs. H. M. Yusuf Ibrahim</p>
              <p className="text-label-md text-outline">Kepala Desa Kanie</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Profil Kami (Cards) */}
      <section className="py-section-padding bg-surface-container-low" id="profil">
        <div className="max-w-container-max mx-auto px-gutter">
          <div className="text-center mb-16">
            <h2 className="font-headline-lg text-headline-lg text-primary accent-underline inline-block">
              Mengenal Desa Kami
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: "history_edu",
                title: "Sejarah Desa",
                desc: "Menelusuri jejak leluhur dan asal-usul terbentuknya komunitas Desa Kanie.",
              },
              {
                icon: "target",
                title: "Visi Misi",
                desc: "Arah kebijakan dan target pembangunan desa untuk 5 tahun ke depan.",
              },
              {
                icon: "account_tree",
                title: "Struktur",
                desc: "Bagan organisasi pemerintahan desa yang bertugas melayani warga.",
              },
              {
                icon: "groups",
                title: "Perangkat",
                desc: "Profil para pelayan publik yang berdedikasi tinggi di Desa Kanie.",
              },
            ].map((card) => (
              <div
                key={card.title}
                className="bento-card bg-surface p-8 rounded-lg border-t-4 border-primary"
              >
                <div className="w-12 h-12 bg-secondary/10 text-secondary rounded-lg flex items-center justify-center mb-6">
                  <span className="material-symbols-outlined text-3xl">
                    {card.icon}
                  </span>
                </div>
                <h3 className="font-headline-md text-primary mb-3">
                  {card.title}
                </h3>
                <p className="text-body-md text-on-surface-variant mb-6">
                  {card.desc}
                </p>
                <a
                  className="text-secondary font-label-md flex items-center gap-1 hover:gap-3 transition-all"
                  href="#"
                >
                  Selengkapnya{" "}
                  <span className="material-symbols-outlined text-sm">
                    arrow_forward
                  </span>
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Sejarah Desa */}
      <section className="py-section-padding px-gutter max-w-container-max mx-auto overflow-hidden">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="order-2 md:order-1">
            <h2 className="font-headline-lg text-headline-lg text-primary accent-underline mb-8">
              Sejarah Desa Kanie
            </h2>
            <div className="space-y-4 text-body-md text-on-surface-variant leading-relaxed">
              <p>
                Desa Kanie memiliki akar sejarah yang kuat, bermula dari
                pemukiman agraris kecil di pesisir lembah hijau. Nama
                &ldquo;Bone&rdquo; sendiri dalam bahasa lokal merujuk pada
                kekayaan alam dan keteguhan masyarakatnya dalam menjaga
                harmoni dengan alam.
              </p>
              <p>
                Seiring berjalannya waktu, Desa Kanie berkembang menjadi pusat
                perdagangan hasil bumi yang vital bagi wilayah sekitarnya.
                Transformasi dari pemukiman tradisional menuju desa modern
                yang berbasis teknologi tidak melunturkan nilai-nilai gotong
                royong yang telah diwariskan turun-temurun.
              </p>
              <p>
                Hari ini, Desa Kanie berdiri sebagai simbol kemajuan desa
                mandiri yang tetap menjunjung tinggi kearifan lokal dan
                keberlanjutan lingkungan.
              </p>
            </div>
          </div>
          <div className="order-1 md:order-2">
            <div className="relative">
              <div className="absolute -top-4 -right-4 w-full h-full bg-secondary-container/20 rounded-lg -z-10" />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className="w-full h-100 object-cover rounded-lg shadow-xl"
                alt="Sejarah Desa Kanie"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuA-ART8iTYu-1qVOqrgBNMxnpdbCGFRotCXpxLhsvhXS6JlwRBcUTp9134-oZDVMz5V90XxVWh6nWxBuzr1UvXnPo8JfAE6Q0umJ3oyd1rQVtI7412Pkev0p1AwVfD6ABPkgiNf7hWNYs9Heqh0TOk1kf-CTyL4cjy0Mgq8hbx-OR2g0v7ZxQgi11ErQ8iXdCWGmN2lzLLVBWyfEoCxSzjKCbAGD2uOOqB7FxJK30nnTdRO5BSnHuUTwg"
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
              <p className="text-body-lg text-primary-fixed leading-relaxed">
                &ldquo;Terwujudnya Desa Kanie yang Mandiri, Sejahtera, dan
                Inovatif melalui Pengelolaan Sumber Daya Alam yang
                Berkelanjutan dan Pelayanan Publik yang Prima Berbasis
                Teknologi.&rdquo;
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
                {[
                  "Meningkatkan kualitas SDM melalui program pendidikan dan kesehatan desa.",
                  "Optimalisasi potensi pertanian dan peternakan sebagai pilar ekonomi warga.",
                  "Membangun infrastruktur desa yang merata dan berkelanjutan.",
                  "Mewujudkan tata kelola pemerintahan yang transparan dan digital.",
                ].map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="material-symbols-outlined text-secondary-container">
                      check_circle
                    </span>
                    <span className="text-body-md text-primary-fixed">
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
          {/* Pertanian */}
          <div className="bg-surface border border-outline-variant rounded-lg p-1 flex flex-col md:flex-row shadow-sm hover:shadow-md transition-shadow">
            <div className="flex-1 p-8">
              <div className="flex items-center gap-3 mb-4">
                <span className="material-symbols-outlined text-primary">
                  agriculture
                </span>
                <h3 className="font-headline-md text-primary">
                  Sektor Pertanian
                </h3>
              </div>
              <ul className="space-y-3 mb-6 text-on-surface-variant">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-secondary rounded-full" />{" "}
                  Padi Organik Varietas Unggul
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-secondary rounded-full" />{" "}
                  Perkebunan Sayuran Dataran Rendah
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-secondary rounded-full" />{" "}
                  Produksi Buah Tropis (Mangga &amp; Jeruk)
                </li>
              </ul>
              <button className="text-primary font-label-md flex items-center gap-1 group">
                Info Detail{" "}
                <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">
                  arrow_right_alt
                </span>
              </button>
            </div>
            <div className="md:w-48 h-64 md:h-auto overflow-hidden rounded-r-lg">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className="w-full h-full object-cover"
                alt="Sektor Pertanian Desa Kanie"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAd5sToa00HLXnq6ZqB5Bl9i876UxGEUGde-OPS6haFU48xNg-Z7-gLXWnfIOh4R1HL0RL9tUaLzTSnCFxlTtk_RXfMSqDLA6IBBpAwZag6C5EsQ9TsOOgFkDPkXY1kHprlZEIb8jZ5o3rmslphDQZnImdxoPa-eMFUoGs_ORyhuQ5qakUNbESEN6YIRSzjzhykvd0Q2EdLMC7NDOsCJxmCQmj-pGL0VxQsayFNTBhfSyATBx-BnVmOAA"
              />
            </div>
          </div>

          {/* Peternakan */}
          <div className="bg-surface border border-outline-variant rounded-lg p-1 flex flex-col md:flex-row shadow-sm hover:shadow-md transition-shadow">
            <div className="flex-1 p-8">
              <div className="flex items-center gap-3 mb-4">
                <span className="material-symbols-outlined text-primary">
                  pets
                </span>
                <h3 className="font-headline-md text-primary">
                  Sektor Peternakan
                </h3>
              </div>
              <ul className="space-y-3 mb-6 text-on-surface-variant">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-secondary rounded-full" />{" "}
                  Budidaya Sapi Potong Modern
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-secondary rounded-full" />{" "}
                  Peternakan Ayam Petelur Komunal
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-secondary rounded-full" />{" "}
                  Produksi Pakan Ternak Mandiri
                </li>
              </ul>
              <button className="text-primary font-label-md flex items-center gap-1 group">
                Info Detail{" "}
                <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">
                  arrow_right_alt
                </span>
              </button>
            </div>
            <div className="md:w-48 h-64 md:h-auto overflow-hidden rounded-r-lg">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className="w-full h-full object-cover"
                alt="Sektor Peternakan Desa Kanie"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBLVO5jq7IoOVk2qvxyQ6Cqb4D_Y5_BDzuqIAgUjH4v5ozssnJnwk8yVWyT2h8g4q87pvmQoiR8CMA4uR5iKxGXDHdG00Zh4xCC57ytAajIS_gtadreYwLZPBO38XSyHvob1Et8kgV0DQ92WJt_nitZtSZ8O3Ux0b8PfZCpNcFL5Npczp6yYHmae2ha9OTtBN3_3QxfdliCLr5LK1V70CQE4TB8CdO4URBy93xzimQm6DtUTcuMcN9X1g"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 8. Fasilitas Umum */}
      <section className="py-section-padding bg-surface-container-high">
        <div className="max-w-container-max mx-auto px-gutter text-center">
          <h2 className="font-headline-lg text-headline-lg text-primary accent-underline inline-block mb-16">
            Fasilitas Umum
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: "school", title: "Sekolah", desc: "Pendidikan Berkualitas" },
              {
                icon: "medical_services",
                title: "Puskesmas",
                desc: "Layanan Kesehatan 24/7",
              },
              {
                icon: "location_city",
                title: "Balai Desa",
                desc: "Pusat Administrasi",
              },
              { icon: "mosque", title: "Ibadah", desc: "Sarana Ibadah Nyaman" },
            ].map((facility) => (
              <div
                key={facility.title}
                className="bg-surface p-10 rounded-xl bento-card flex flex-col items-center"
              >
                <div className="w-16 h-16 bg-primary-container/20 text-primary rounded-full flex items-center justify-center mb-6">
                  <span className="material-symbols-outlined text-4xl">
                    {facility.icon}
                  </span>
                </div>
                <h4 className="font-headline-md text-primary">{facility.title}</h4>
                <p className="text-label-md text-outline mt-2">{facility.desc}</p>
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
            {[
              {
                name: "TP. PKK Desa Kanie",
                desc: "Pemberdayaan Kesejahteraan Keluarga untuk mewujudkan keluarga yang mandiri, berakhlak mulia, dan sehat sejahtera.",
                logo: "https://lh3.googleusercontent.com/aida-public/AB6AXuBs9R0EPe2qVtD7b5VPtW1m2lDea2Ry-iiI1Aif1jPADithgALMpD8XpLIsFpEbxvHKNeBfqAdvNjPSjCgb66168h0D3ceAQ1ZO8aXEGicR6wTFQD5HV4GQdwBGjm-AZmK7SmvpADRdHMISpFMy7qkbYeXsAQ3srk2cmLRnKX-uQgj2SLItDasCvQQUTqpB5HAH9q8LgBN8fw_xcexZ-pVGaZtTcuANaJlEFmiLv_F6LQXfe8CClO0Gfw",
                badge: "https://lh3.googleusercontent.com/aida-public/AB6AXuCkWsyKmKnvvUkHMHZIyAdvNTxFFHca0_eVSfvqIOBQRmpWiIDZSy683LttxVPng293z9xTBiJkptQdmaJBuWwTGPQ1TIvduL_fvPJ0S9_7k34Ird7Ir-q76Wli2tNfd1xu52s0icjkRFcPzwV6HNc_YLM-n1yaQRdUdxd2KLli4UenaLNiAOw2fJ2YaZNKj9-6fmKDGWBZwOu5q1NcrKEKLmwA8IpJtRS-3SumYmOQPmKu2GJobKU-uQ",
              },
              {
                name: "Karang Taruna",
                desc: "Wadah pengembangan generasi muda yang kreatif, aktif, dan berkontribusi nyata dalam pembangunan sosial masyarakat.",
                logo: "https://lh3.googleusercontent.com/aida-public/AB6AXuDSeyMtDXzAcMiiwTuS3Em46JeRj6lZhDzSK0HUI6qHcPwt2eUoxZJ_ND2jZe1ub6gCmejQGcZ-q0YEP_plZoC94yEonRco4AVNekdksgpsDa-eaB_VCDLjSBTmZsGawPqrSB61o-nVrJQdtTm-iXv4xRycwe3Japd8CtBLabXS51Hr-3iJt0hpAJ9Mpw9RSXolMn3zAbTL-wzyOJRep2EwnofKQFSe8TirgR8icTmWB5i_XM9AVu2kiQ",
                badge: "https://lh3.googleusercontent.com/aida-public/AB6AXuDXwFcagl1HB8gTUhXCg6_pivYXZtKcCS0QAxGIZjH3SgILEAq97IeqOk1rMJo_dMrnxpdoitEr182AuTgQKpKa_NZCfjBJ9QO7_7HAcSvV3C_oaO05VFM9kigmEj86CKkibp4eX3u582-m0x7Tocx8g2hL7vnVoQEzlNK-ZVDdI9ZR-c2toq0mPeSMkzTEB3h5cIBMxQ5yptAfGxZXsxW1mXkq6U2OtBaaZ6scETlyFkja0rV2EgPFPw",
              },
              {
                name: "Kelompok Tani",
                desc: "Sinergi para petani dalam meningkatkan produktivitas hasil bumi melalui inovasi teknologi dan kolaborasi mandiri.",
                logo: "https://lh3.googleusercontent.com/aida-public/AB6AXuAgbonX6YpwuH4leALmpX5yOwG6TGw8KWb2tN5poBwUt7dbQkcQd_RXXBRlyFFifbV-hwUynaBtS_FtVhyltHUWm9eaMFQiaA6P4eZ9UrZ9TnvUWbitJFzJJfSNfR_SkubYxPQJ0waVLIHwgBCaM6qTkwAvokMx7_BC2I3seKTA5MS4mTbXUjgwxK0dDWoF6dJG-it28aOKkcqagyLL5ziNMJrHxwi5lVW24c_xWtvDyXF7RCbiy_ZHEw",
                badge: "https://lh3.googleusercontent.com/aida-public/AB6AXuCBP7tokT4UQpSZopZ7f1Yu2n44HCq3aBGEHpEKWH1KH7EI4VOuFDOJ5tYTlTrxlLlAI60NpCqUslR3exMfjSkh2qd61vH1KmuudOunAUabp9NGR-4CJevdt7F2MPrUAIsdixum8N34j9KH_HuGbB-vXSsxewqucxZZjrt9eZgIF20t43lThhD4WpF7qv8zESlNBq3ug_tuVrNaJVaSxulmE7FImAs5M1UMUosMjqvlJED0aihChVItcA",
              },
            ].map((org) => (
              <div
                key={org.name}
                className="bg-surface p-8 rounded-lg shadow-sm border border-outline-variant flex flex-col items-center text-center"
              >
                <div className="w-24 h-24 rounded-full overflow-hidden mb-6 bg-white p-2 shadow-inner border border-outline-variant">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    className="w-full h-full object-contain"
                    alt={`Logo ${org.name}`}
                    src={org.logo}
                  />
                </div>
                <h3 className="font-headline-md text-primary mb-4">{org.name}</h3>
                <p className="text-body-md text-on-surface-variant mb-8">
                  {org.desc}
                </p>
                <div className="mt-auto pt-6 border-t border-outline-variant w-full flex justify-center">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    className="h-8 object-contain opacity-50 grayscale hover:grayscale-0 transition-all"
                    alt={`Badge ${org.name}`}
                    src={org.badge}
                  />
                </div>
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
          {[
            {
              alt: "Gotong royong warga desa",
              src: "https://lh3.googleusercontent.com/aida-public/AB6AXuALmOT7ffU1DwSVjhKVS5meViIFIHoWpBPa7IYwwVBj5BuDXRZWzUsGWZT-MMEuehRm44W5WlAo4RyBGgjewKHnIXrQpejh3usyreR5pytBvdpCeS8G0HfuiMyq1C-JSv7xhGOrzJsDqh_7V8J80gf_fhrc1mJRU7G_s0UGA8iAmMii0ma2L2uk6_70caogRia_VXv14SvRly4xeRzD_i4uyFcSZ5WCcUPzz0d-KrSSm8ZiXOaWf1S06A",
              span: false,
            },
            {
              alt: "Festival budaya tradisional desa",
              src: "https://lh3.googleusercontent.com/aida-public/AB6AXuD3HJpPaYTI3MBa4tYZpRrvi6y4nnQ7xS4m_O2BUw9dx0XjHQgAeRyKjnxgf3D-vcoe6KV06PObmzHtsuOiosmMvoKXftvIQeVHSA4_nByvg9UlLe-jLLrS0btudTwAt5QWGJGSix1FshN0YM6sdmMcpl0bFGT340ZC6_-a_jM1mYeGQZxHcniIaihA7vmcn06_QxL8UThrMyNZ8KQ5u0rcFbiH0N-boER01AxR1_jiPF1-fFR7u6_Hmw",
              span: false,
            },
            {
              alt: "Pelatihan pertanian modern dengan drone",
              src: "https://lh3.googleusercontent.com/aida-public/AB6AXuAqR-YpUZ1KIRvW2lnmGVnVLIHZ1lvfXrIBsccCS_cp-qaYR3m5T8O5IUWLXVss9x51UhqY2NkNe7IgzgfnhvsA0Ex4KEZI8wgKXr_rzNw1gOHlwpVWOLZ2vuKUBCjWWFvIuT0I5YVaqVDXtyVnjSqz1t-hzBd_yX-YiwewvyQNJ-D_jkFXSyPjbfr-pN7b3uqU2lEiTRnScuSJTmqmdhXFXamClo2WWv03i3gt7pIevRzpB-RsLoNyHA",
              span: false,
            },
            {
              alt: "Kegiatan belajar anak-anak di sekolah desa",
              src: "https://lh3.googleusercontent.com/aida-public/AB6AXuDAzTO9AFsPB3X4TmHmmXP-VbFs2heBx7HHiYWv9qjiIFFcbu0vH3qE_H5czx4d2HTQb7OAXTJoP3GcBMD8N31OzicU6PgYvmhmcZ9Ht2PKuwxtxnHAyr2yQPvyY7U5KxDPrmxHQIXt7tRFUxkrof-RC_T46eIykt4hI7rIjA-NcUSrPhWCo1YZWWTZ2TP59Z5_3MVjKTqRKl5oeA1sCDsVquYfW6gRPlw2Y7nq0Wid5qvEKD0hKDtbfQ",
              span: false,
            },
            {
              alt: "Panorama matahari terbit di sawah desa",
              src: "https://lh3.googleusercontent.com/aida-public/AB6AXuC2fTg5kAI-NmRNhbHcl9dbkCQBvywSDHfj1VoeRWlIkrULFiTN4kQGqsEbcNVRsJAqaCZ4xn7HPQWCsyV-f3tSplo9AOndobILUz8wB93SG_dBNkF293s46rLJ_fp3rHAtlbiF6E4K7huVJIc2bH8EpNEXcSPRyJ-6UCOK-kOj2n-_-wF_31-fzYi9t1VxO8qa1ZleASBZ5OnFw9CYXnjPnM1t4zJA0XWiQskY0B6frAzB3VAjy0C1cA",
              span: true,
            },
            {
              alt: "Kerajinan tenun tradisional",
              src: "https://lh3.googleusercontent.com/aida-public/AB6AXuCH5Y1oRqj27grlJz80JQ2rhmQWamVw8dqfTfJ2LIIa-URTyeKvGSoNEiuUItPcadxmSBvYjtYEJ8i0ZwmElVfN_OiI1SZxfht_feBpoIhfJU8Hmg9l1Uq0ta7zRSTJ5tKiqmZMWGCdohr1VCFVPPnLfgef77NvDdLv0jzjn-r4OUjg_ca4O-seewWIN9qPIa5lopY0r4BLcYPWlHQlkiEoE0-8XE12AhpA_Nov1eZHQRpXEAwXjHzUcw",
              span: false,
            },
            {
              alt: "Pembangunan infrastruktur jalan desa",
              src: "https://lh3.googleusercontent.com/aida-public/AB6AXuDJkFSm9wAArI2J5BrziqCmphZ2HiZW82Tj4cWNO-VRgKyWOlAk3bfuf6Vxl-3Ycb7Clh0vo49Wog05sZQwWlsYvzHE0H-b48ej0UQH7aLB72mqhOHTY6v0FBUhkyQ6Wb1eW8yzMPRehl_o-cCjRKutt2_aQbChsvpV-_4OxBPPStIHyYJF0p_3z1_GCyfNv98i5ClY6z1aIdqRbou5MjuPfl3jlJJhftvfTe3wf2M7YupuVQMfTKu6LA",
              span: false,
            },
          ].map((photo) => (
            <div
              key={photo.src}
              className={`overflow-hidden rounded-lg group cursor-pointer shadow-sm h-64 ${photo.span ? "md:col-span-2" : ""
                }`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                alt={photo.alt}
                src={photo.src}
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
              <p className="text-body-md text-primary-fixed/80 mb-8">
                Pusat pemerintahan dan pelayanan warga Desa Kanie. Hubungi kami
                untuk informasi lebih lanjut mengenai program desa, perizinan,
                atau kemitraan.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <span className="material-symbols-outlined text-secondary-fixed">
                    location_on
                  </span>
                  <p className="text-body-md">
                    Jl. Raya Poros Bone No. 01, Kec. Bone, Kab. Bone, Sulawesi
                    Selatan, 92711
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="material-symbols-outlined text-secondary-fixed">
                    call
                  </span>
                  <p className="text-body-md">(0481) 123-4567</p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="material-symbols-outlined text-secondary-fixed">
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
            <p className="text-label-md text-primary-fixed/60">
              © 2024 Pemerintah Desa Kanie. Seluruh Hak Cipta Dilindungi.
            </p>
            <div className="flex gap-6">
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