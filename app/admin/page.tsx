"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import type {
  HeroSection,
  SambutanSection,
  SejarahSection,
  VisiMisiSection,
  DemografiSection,
  PotensiItem,
  FasilitasItem,
  LembagaItem,
  GaleriItem,
} from "@/types/content";
import {
  defaultHero,
  defaultSambutan,
  defaultSejarah,
  defaultVisiMisi,
  defaultDemografi,
} from "@/types/content";
import {
  getHeroSection,
  saveHeroSection,
  getSambutanSection,
  saveSambutanSection,
  getSejarahSection,
  saveSejarahSection,
  getVisiMisiSection,
  saveVisiMisiSection,
  getDemografiSection,
  saveDemografiSection,
  getPotensiItems,
  syncPotensiItems,
  getFasilitasItems,
  syncFasilitasItems,
  getLembagaItems,
  syncLembagaItems,
  getGaleriItems,
  syncGaleriItems,
} from "@/lib/supabase/content";
import {
  TextField,
  RemoveButton,
  AddButton,
} from "@/components/admin/FormControls";
import { ImageUploader } from "@/components/admin/ImageUploader";

const ICON_HINT =
  "Nama ikon dari Google Material Symbols (Outlined), contoh: school, groups, agriculture.";

type SectionId =
  | "hero"
  | "sambutan"
  | "demografi"
  | "sejarah"
  | "visiMisi"
  | "potensi"
  | "fasilitas"
  | "lembaga"
  | "galeri";

const SECTIONS: { id: SectionId; label: string; icon: string }[] = [
  { id: "hero", label: "Hero (Halaman Utama)", icon: "home" },
  { id: "sambutan", label: "Sambutan Kepala Desa", icon: "person" },
  { id: "demografi", label: "Data Demografi & Wilayah", icon: "pie_chart" },
  { id: "sejarah", label: "Sejarah Desa", icon: "history_edu" },
  { id: "visiMisi", label: "Visi & Misi", icon: "flag" },
  { id: "potensi", label: "Potensi Unggulan Desa", icon: "agriculture" },
  { id: "fasilitas", label: "Fasilitas Umum", icon: "location_city" },
  { id: "lembaga", label: "Lembaga Kemasyarakatan", icon: "groups" },
  { id: "galeri", label: "Galeri Kegiatan", icon: "photo_library" },
];

function idsOf(items: { id?: number }[]): number[] {
  return items.filter((i) => i.id != null).map((i) => i.id as number);
}

export default function AdminPage() {
  const router = useRouter();

  const [checkingAuth, setCheckingAuth] = useState(true);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // State untuk pop up notifikasi
  const [notification, setNotification] = useState<{
    text: string;
    type: "success" | "error";
  } | null>(null);

  const [activeSection, setActiveSection] = useState<SectionId>("hero");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [hero, setHero] = useState<HeroSection>(defaultHero);
  const [sambutan, setSambutan] = useState<SambutanSection>(defaultSambutan);
  const [sejarah, setSejarah] = useState<SejarahSection>(defaultSejarah);
  const [visiMisi, setVisiMisi] = useState<VisiMisiSection>(defaultVisiMisi);
  const [demografi, setDemografi] = useState<DemografiSection>(defaultDemografi);

  const [potensi, setPotensi] = useState<PotensiItem[]>([]);
  const [originalPotensiIds, setOriginalPotensiIds] = useState<number[]>([]);

  const [fasilitas, setFasilitas] = useState<FasilitasItem[]>([]);
  const [originalFasilitasIds, setOriginalFasilitasIds] = useState<number[]>([]);

  const [lembaga, setLembaga] = useState<LembagaItem[]>([]);
  const [originalLembagaIds, setOriginalLembagaIds] = useState<number[]>([]);

  const [galeri, setGaleri] = useState<GaleriItem[]>([]);
  const [originalGaleriIds, setOriginalGaleriIds] = useState<number[]>([]);

  // Auto-dismiss untuk notifikasi
  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        setNotification(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  useEffect(() => {
    (async () => {
      const supabase = createClient();
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        router.replace("/admin/login");
        return;
      }
      setCheckingAuth(false);
    })();
  }, [router]);

  useEffect(() => {
    if (checkingAuth) return;

    (async () => {
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
      setOriginalPotensiIds(idsOf(potensiData));

      setFasilitas(fasilitasData);
      setOriginalFasilitasIds(idsOf(fasilitasData));

      setLembaga(lembagaData);
      setOriginalLembagaIds(idsOf(lembagaData));

      setGaleri(galeriData);
      setOriginalGaleriIds(idsOf(galeriData));

      setLoading(false);
    })();
  }, [checkingAuth]);

  function goTo(id: SectionId) {
    setActiveSection(id);
    setNotification(null);
    setSidebarOpen(false);
    if (typeof window !== "undefined") window.scrollTo({ top: 0 });
  }

  async function handleLogout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/admin/login");
    router.refresh();
  }

  async function handleSave() {
    setSaving(true);
    setNotification(null);

    const supabase = createClient();
    let error: string | null = null;

    switch (activeSection) {
      case "hero": {
        const res = await saveHeroSection(supabase, hero);
        error = res.error;
        break;
      }
      case "sambutan": {
        const res = await saveSambutanSection(supabase, sambutan);
        error = res.error;
        break;
      }
      case "demografi": {
        const res = await saveDemografiSection(supabase, demografi);
        error = res.error;
        break;
      }
      case "sejarah": {
        const res = await saveSejarahSection(supabase, sejarah);
        error = res.error;
        break;
      }
      case "visiMisi": {
        const res = await saveVisiMisiSection(supabase, visiMisi);
        error = res.error;
        break;
      }
      case "potensi": {
        const res = await syncPotensiItems(supabase, originalPotensiIds, potensi);
        error = res.error;
        if (!error) {
          const fresh = await getPotensiItems(supabase);
          setPotensi(fresh);
          setOriginalPotensiIds(idsOf(fresh));
        }
        break;
      }
      case "fasilitas": {
        const res = await syncFasilitasItems(supabase, originalFasilitasIds, fasilitas);
        error = res.error;
        if (!error) {
          const fresh = await getFasilitasItems(supabase);
          setFasilitas(fresh);
          setOriginalFasilitasIds(idsOf(fresh));
        }
        break;
      }
      case "lembaga": {
        const res = await syncLembagaItems(supabase, originalLembagaIds, lembaga);
        error = res.error;
        if (!error) {
          const fresh = await getLembagaItems(supabase);
          setLembaga(fresh);
          setOriginalLembagaIds(idsOf(fresh));
        }
        break;
      }
      case "galeri": {
        const res = await syncGaleriItems(supabase, originalGaleriIds, galeri);
        error = res.error;
        if (!error) {
          const fresh = await getGaleriItems(supabase);
          setGaleri(fresh);
          setOriginalGaleriIds(idsOf(fresh));
        }
        break;
      }
    }

    setSaving(false);

    if (error) {
      setNotification({ text: `Gagal menyimpan: ${error}`, type: "error" });
    } else {
      setNotification({ text: "Berhasil menyimpan perubahan!", type: "success" });
    }
  }

  if (checkingAuth || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-on-surface-variant">
        Memuat konten...
      </div>
    );
  }

  const activeLabel = SECTIONS.find((s) => s.id === activeSection)?.label ?? "";

  return (
    <div className="min-h-screen bg-surface-container-low flex relative">

      {notification && (
        <div
          className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-6 py-4 rounded-xl shadow-lg border transition-all duration-300 animate-in slide-in-from-bottom-5 ${notification.type === "success"
            ? "bg-green-100 border-green-300 text-green-800"
            : "bg-red-100 border-red-300 text-red-800"
            }`}
        >
          <span className="material-symbols-outlined font-bold">
            {notification.type === "success" ? "check_circle" : "error"}
          </span>
          <span className="font-semibold text-body-md">
            {notification.text}
          </span>
          <button
            onClick={() => setNotification(null)}
            className="ml-4 opacity-70 hover:opacity-100"
          >
            <span className="material-symbols-outlined text-sm">close</span>
          </button>
        </div>
      )}

      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={`fixed md:sticky top-0 left-0 h-screen w-72 shrink-0 bg-surface border-r border-outline-variant z-40 flex flex-col transition-transform duration-300 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"
          } md:translate-x-0`}
      >
        <div className="px-6 py-6 border-b border-outline-variant flex items-center gap-2">
          <span
            className="material-symbols-outlined text-primary"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            landscape
          </span>
          <div>
            <p className="font-headline-md text-primary leading-tight">
              Desa Kanie
            </p>
            <p className="text-label-md text-outline leading-tight">
              Panel Admin
            </p>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto py-3">
          {SECTIONS.map((s) => (
            <button
              key={s.id}
              onClick={() => goTo(s.id)}
              className={`w-full flex items-center gap-3 px-6 py-3 text-left text-body-md transition-colors border-l-4 ${activeSection === s.id
                ? "border-primary bg-primary/5 text-primary font-bold"
                : "border-transparent text-on-surface-variant hover:bg-surface-container-low"
                }`}
            >
              <span className="material-symbols-outlined text-xl">
                {s.icon}
              </span>
              {s.label}
            </button>
          ))}
        </nav>

        <div className="border-t border-outline-variant p-4 space-y-1">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-2 py-2 text-body-md text-on-surface-variant hover:text-primary transition-colors"
          >
            <span className="material-symbols-outlined text-xl">
              open_in_new
            </span>
            Lihat Situs
          </a>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-2 py-2 text-body-md text-error hover:opacity-80 transition-opacity"
          >
            <span className="material-symbols-outlined text-xl">logout</span>
            Keluar
          </button>
        </div>
      </aside>

      <div className="flex-1 min-w-0">
        <div className="sticky top-0 z-10 bg-surface border-b border-outline-variant shadow-sm">
          <div className="px-6 py-4 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 min-w-0">
              <button
                onClick={() => setSidebarOpen(true)}
                className="md:hidden text-primary shrink-0"
                aria-label="Buka menu"
              >
                <span className="material-symbols-outlined">menu</span>
              </button>
              <div className="min-w-0">
                <h1 className="font-headline-md text-headline-md text-primary truncate">
                  {activeLabel}
                </h1>
              </div>
            </div>
            <button
              onClick={handleSave}
              disabled={saving}
              className="shrink-0 bg-primary text-on-primary px-5 py-2 rounded-full font-label-md hover:opacity-90 transition-all disabled:opacity-50 flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-sm">
                {saving ? "sync" : "save"}
              </span>
              {saving ? "Menyimpan..." : "Simpan Bagian Ini"}
            </button>
          </div>
        </div>

        <div className="max-w-3xl mx-auto px-6 py-8">
          {/* Hero */}
          {activeSection === "hero" && (
            <div className="space-y-4">
              <TextField
                label="Judul"
                value={hero.title}
                onChange={(v) => setHero({ ...hero, title: v })}
              />
              <TextField
                label="Subjudul"
                multiline
                value={hero.subtitle}
                onChange={(v) => setHero({ ...hero, subtitle: v })}
              />
              <TextField
                label="Teks tombol"
                value={hero.ctaLabel}
                onChange={(v) => setHero({ ...hero, ctaLabel: v })}
              />
              <ImageUploader
                label="Gambar latar belakang"
                folder="hero"
                value={hero.backgroundImage}
                onChange={(url) => setHero({ ...hero, backgroundImage: url })}
              />
            </div>
          )}

          {/* Sambutan */}
          {activeSection === "sambutan" && (
            <div className="space-y-4">
              <TextField
                label="Label kecil"
                value={sambutan.badge}
                onChange={(v) => setSambutan({ ...sambutan, badge: v })}
              />
              <TextField
                label="Judul"
                value={sambutan.heading}
                onChange={(v) => setSambutan({ ...sambutan, heading: v })}
              />
              <TextField
                label="Kutipan pembuka"
                multiline
                value={sambutan.quote}
                onChange={(v) => setSambutan({ ...sambutan, quote: v })}
              />
              <TextField
                label="Isi sambutan"
                multiline
                value={sambutan.body}
                onChange={(v) => setSambutan({ ...sambutan, body: v })}
              />
              <TextField
                label="Nama Kepala Desa"
                value={sambutan.name}
                onChange={(v) => setSambutan({ ...sambutan, name: v })}
              />
              <TextField
                label="Jabatan"
                value={sambutan.role}
                onChange={(v) => setSambutan({ ...sambutan, role: v })}
              />
              <ImageUploader
                label="Foto Kepala Desa"
                folder="sambutan"
                value={sambutan.photo}
                onChange={(url) => setSambutan({ ...sambutan, photo: url })}
              />
            </div>
          )}

          {/* Demografi (Pengganti Profil Cards) */}
          {activeSection === "demografi" && (
            <div className="space-y-8">
              <div className="bg-surface border border-outline-variant rounded-lg p-6 space-y-4 shadow-sm">
                <h3 className="font-headline-md text-primary flex items-center gap-2 border-b pb-2">
                  <span className="material-symbols-outlined">map</span> Luas Wilayah (Hektar)
                </h3>
                <TextField label="Total Luas Desa" value={demografi.luasDesa} onChange={(v) => setDemografi({ ...demografi, luasDesa: v })} />
                <TextField label="Luas Pertanian" value={demografi.luasPertanian} onChange={(v) => setDemografi({ ...demografi, luasPertanian: v })} />
                <TextField label="Luas Pemukiman" value={demografi.luasPemukiman} onChange={(v) => setDemografi({ ...demografi, luasPemukiman: v })} />
              </div>

              <div className="bg-surface border border-outline-variant rounded-lg p-6 space-y-4 shadow-sm">
                <h3 className="font-headline-md text-primary flex items-center gap-2 border-b pb-2">
                  <span className="material-symbols-outlined">groups</span> Total Penduduk (Jiwa)
                </h3>
                <TextField label="Total Penduduk" value={demografi.pendudukTotal} onChange={(v) => setDemografi({ ...demografi, pendudukTotal: v })} />
                <TextField label="Laki - Laki" value={demografi.pendudukLaki} onChange={(v) => setDemografi({ ...demografi, pendudukLaki: v })} />
                <TextField label="Perempuan" value={demografi.pendudukPerempuan} onChange={(v) => setDemografi({ ...demografi, pendudukPerempuan: v })} />
              </div>

              <div className="bg-surface border border-outline-variant rounded-lg p-6 space-y-4 shadow-sm">
                <h3 className="font-headline-md text-primary flex items-center gap-2 border-b pb-2">
                  <span className="material-symbols-outlined">family_restroom</span> Kepala Keluarga (KK)
                </h3>
                <TextField label="Total Kepala Keluarga (KK)" value={demografi.kkTotal} onChange={(v) => setDemografi({ ...demografi, kkTotal: v })} />
                <TextField label="KK Laki - Laki" value={demografi.kkLaki} onChange={(v) => setDemografi({ ...demografi, kkLaki: v })} />
                <TextField label="KK Perempuan" value={demografi.kkPerempuan} onChange={(v) => setDemografi({ ...demografi, kkPerempuan: v })} />
              </div>
            </div>
          )}

          {/* Sejarah */}
          {activeSection === "sejarah" && (
            <div className="space-y-4">
              <TextField
                label="Judul"
                value={sejarah.heading}
                onChange={(v) => setSejarah({ ...sejarah, heading: v })}
              />
              <TextField
                label="Isi Sejarah Desa"
                multiline
                value={sejarah.body}
                onChange={(v) => setSejarah({ ...sejarah, body: v })}
              />
              <ImageUploader
                label="Gambar sejarah"
                folder="sejarah"
                value={sejarah.image}
                onChange={(url) => setSejarah({ ...sejarah, image: url })}
              />
            </div>
          )}

          {/* Visi Misi */}
          {activeSection === "visiMisi" && (
            <div className="space-y-4">
              <TextField
                label="Visi"
                multiline
                value={visiMisi.visi}
                onChange={(v) => setVisiMisi({ ...visiMisi, visi: v })}
              />
              <div className="space-y-3">
                <span className="block text-label-md text-on-surface-variant">
                  Misi
                </span>
                {visiMisi.misi.map((m, i) => (
                  <div key={i} className="flex gap-2 items-start">
                    <input
                      type="text"
                      value={m}
                      onChange={(e) => {
                        const next = [...visiMisi.misi];
                        next[i] = e.target.value;
                        setVisiMisi({ ...visiMisi, misi: next });
                      }}
                      className="flex-1 rounded-lg border border-outline-variant px-3 py-2 text-body-md focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    <RemoveButton
                      onClick={() =>
                        setVisiMisi({
                          ...visiMisi,
                          misi: visiMisi.misi.filter((_, idx) => idx !== i),
                        })
                      }
                    />
                  </div>
                ))}
                <AddButton
                  label="Tambah Misi"
                  onClick={() =>
                    setVisiMisi({ ...visiMisi, misi: [...visiMisi.misi, ""] })
                  }
                />
              </div>
            </div>
          )}

          {/* Potensi */}
          {activeSection === "potensi" && (
            <div className="space-y-6">
              {potensi.map((p, i) => (
                <div
                  key={i}
                  className="bg-surface border border-outline-variant rounded-lg p-4 space-y-3"
                >
                  <div className="flex justify-between items-center">
                    <span className="text-label-md text-outline">
                      Potensi #{i + 1}
                    </span>
                    <RemoveButton
                      onClick={() =>
                        setPotensi(potensi.filter((_, idx) => idx !== i))
                      }
                    />
                  </div>
                  <TextField
                    label="Judul"
                    value={p.title}
                    onChange={(v) => {
                      const next = [...potensi];
                      next[i] = { ...next[i], title: v };
                      setPotensi(next);
                    }}
                  />
                  <TextField
                    label="Deskripsi Paragraf"
                    multiline
                    value={p.items[0] || ""}
                    onChange={(v) => {
                      const next = [...potensi];
                      next[i] = { ...next[i], items: [v] };
                      setPotensi(next);
                    }}
                  />
                  <ImageUploader
                    label="Gambar"
                    folder="potensi"
                    value={p.image}
                    onChange={(url) => {
                      const next = [...potensi];
                      next[i] = { ...next[i], image: url };
                      setPotensi(next);
                    }}
                  />
                </div>
              ))}
              <AddButton
                label="Tambah Potensi"
                onClick={() =>
                  setPotensi([
                    ...potensi,
                    { icon: "", title: "Potensi Baru", items: [""], image: "" },
                  ])
                }
              />
            </div>
          )}

          {/* Fasilitas */}
          {activeSection === "fasilitas" && (
            <div className="space-y-6">
              {fasilitas.map((f, i) => (
                <div
                  key={i}
                  className="bg-surface border border-outline-variant rounded-lg p-4 space-y-3"
                >
                  <div className="flex justify-between items-center">
                    <span className="text-label-md text-outline">
                      Fasilitas #{i + 1}
                    </span>
                    <RemoveButton
                      onClick={() =>
                        setFasilitas(fasilitas.filter((_, idx) => idx !== i))
                      }
                    />
                  </div>
                  <TextField
                    label={`Ikon (${ICON_HINT})`}
                    value={f.icon}
                    onChange={(v) => {
                      const next = [...fasilitas];
                      next[i] = { ...next[i], icon: v };
                      setFasilitas(next);
                    }}
                  />
                  <TextField
                    label="Judul"
                    value={f.title}
                    onChange={(v) => {
                      const next = [...fasilitas];
                      next[i] = { ...next[i], title: v };
                      setFasilitas(next);
                    }}
                  />
                  <TextField
                    label="Deskripsi"
                    value={f.desc}
                    onChange={(v) => {
                      const next = [...fasilitas];
                      next[i] = { ...next[i], desc: v };
                      setFasilitas(next);
                    }}
                  />
                </div>
              ))}
              <AddButton
                label="Tambah Fasilitas"
                onClick={() =>
                  setFasilitas([
                    ...fasilitas,
                    { icon: "star", title: "Fasilitas Baru", desc: "" },
                  ])
                }
              />
            </div>
          )}

          {/* Lembaga */}
          {activeSection === "lembaga" && (
            <div className="space-y-6">
              {lembaga.map((l, i) => (
                <div
                  key={i}
                  className="bg-surface border border-outline-variant rounded-lg p-4 space-y-3"
                >
                  <div className="flex justify-between items-center">
                    <span className="text-label-md text-outline">
                      Lembaga #{i + 1}
                    </span>
                    <RemoveButton
                      onClick={() =>
                        setLembaga(lembaga.filter((_, idx) => idx !== i))
                      }
                    />
                  </div>
                  <TextField
                    label="Nama"
                    value={l.name}
                    onChange={(v) => {
                      const next = [...lembaga];
                      next[i] = { ...next[i], name: v };
                      setLembaga(next);
                    }}
                  />
                  <TextField
                    label="Deskripsi"
                    multiline
                    value={l.desc}
                    onChange={(v) => {
                      const next = [...lembaga];
                      next[i] = { ...next[i], desc: v };
                      setLembaga(next);
                    }}
                  />
                  <ImageUploader
                    label="Logo"
                    folder="lembaga"
                    value={l.logo}
                    onChange={(url) => {
                      const next = [...lembaga];
                      next[i] = { ...next[i], logo: url };
                      setLembaga(next);
                    }}
                  />
                  <ImageUploader
                    label="Badge kecil (opsional)"
                    folder="lembaga"
                    value={l.badge}
                    onChange={(url) => {
                      const next = [...lembaga];
                      next[i] = { ...next[i], badge: url };
                      setLembaga(next);
                    }}
                  />
                </div>
              ))}
              <AddButton
                label="Tambah Lembaga"
                onClick={() =>
                  setLembaga([
                    ...lembaga,
                    { name: "Lembaga Baru", desc: "", logo: "", badge: "" },
                  ])
                }
              />
            </div>
          )}

          {/* Galeri */}
          {activeSection === "galeri" && (
            <div className="space-y-6">
              {galeri.map((g, i) => (
                <div
                  key={i}
                  className="bg-surface border border-outline-variant rounded-lg p-4 space-y-3"
                >
                  <div className="flex justify-between items-center">
                    <span className="text-label-md text-outline">
                      Foto #{i + 1}
                    </span>
                    <RemoveButton
                      onClick={() =>
                        setGaleri(galeri.filter((_, idx) => idx !== i))
                      }
                    />
                  </div>
                  <ImageUploader
                    label="Foto"
                    folder="galeri"
                    value={g.src}
                    onChange={(url) => {
                      const next = [...galeri];
                      next[i] = { ...next[i], src: url };
                      setGaleri(next);
                    }}
                  />
                  <TextField
                    label="Keterangan (alt text)"
                    value={g.alt}
                    onChange={(v) => {
                      const next = [...galeri];
                      next[i] = { ...next[i], alt: v };
                      setGaleri(next);
                    }}
                  />
                  <label className="flex items-center gap-2 text-label-md text-on-surface-variant">
                    <input
                      type="checkbox"
                      checked={g.span}
                      onChange={(e) => {
                        const next = [...galeri];
                        next[i] = { ...next[i], span: e.target.checked };
                        setGaleri(next);
                      }}
                    />
                    Tampilkan lebar (2 kolom)
                  </label>
                </div>
              ))}
              <AddButton
                label="Tambah Foto"
                onClick={() =>
                  setGaleri([...galeri, { alt: "", src: "", span: false }])
                }
              />
            </div>
          )}

        </div>
      </div>
    </div>
  );
}