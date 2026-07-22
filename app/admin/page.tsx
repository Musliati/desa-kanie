"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { defaultContent, type SiteContent } from "@/types/content";
import {
  TextField,
  RemoveButton,
  AddButton,
} from "@/components/admin/FormControls";
import { ImageUploader } from "@/components/admin/ImageUploader";

const ICON_HINT =
  "Nama ikon dari Google Material Symbols (Outlined), contoh: school, groups, agriculture.";

type SectionId =
  | "nav"
  | "hero"
  | "sambutan"
  | "profilCards"
  | "sejarah"
  | "visiMisi"
  | "potensi"
  | "fasilitas"
  | "lembaga"
  | "galeri"
  | "footer";

const SECTIONS: { id: SectionId; label: string; icon: string }[] = [
  { id: "nav", label: "Navigasi", icon: "menu" },
  { id: "hero", label: "Hero (Halaman Utama)", icon: "home" },
  { id: "sambutan", label: "Sambutan Kepala Desa", icon: "person" },
  { id: "profilCards", label: "Mengenal Desa Kami (4 kartu)", icon: "grid_view" },
  { id: "sejarah", label: "Sejarah Desa", icon: "history_edu" },
  { id: "visiMisi", label: "Visi & Misi", icon: "flag" },
  { id: "potensi", label: "Potensi Unggulan Desa", icon: "agriculture" },
  { id: "fasilitas", label: "Fasilitas Umum", icon: "location_city" },
  { id: "lembaga", label: "Lembaga Kemasyarakatan", icon: "groups" },
  { id: "galeri", label: "Galeri Kegiatan", icon: "photo_library" },
  { id: "footer", label: "Kontak & Footer", icon: "call" },
];

export default function AdminPage() {
  const router = useRouter();
  const [content, setContent] = useState<SiteContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState<SectionId>("hero");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    (async () => {
      const supabase = createClient();
      const { data, error } = await supabase
        .from("site_content")
        .select("content")
        .eq("id", 1)
        .single();

      if (error || !data) {
        setContent(defaultContent);
      } else {
        setContent(data.content as SiteContent);
      }
      setLoading(false);
    })();
  }, []);

  function goTo(id: SectionId) {
    setActiveSection(id);
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
    if (!content) return;
    setSaving(true);
    setMessage(null);

    const supabase = createClient();
    const { error } = await supabase
      .from("site_content")
      .update({ content, updated_at: new Date().toISOString() })
      .eq("id", 1);

    setSaving(false);
    setMessage(error ? `Gagal menyimpan: ${error.message}` : "Tersimpan.");
  }

  if (loading || !content) {
    return (
      <div className="min-h-screen flex items-center justify-center text-on-surface-variant">
        Memuat konten...
      </div>
    );
  }

  const activeLabel =
    SECTIONS.find((s) => s.id === activeSection)?.label ?? "";

  return (
    <div className="min-h-screen bg-surface-container-low flex">
      {/* Mobile backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
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
              Desa Bone
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
      </aside >

    {/* Main content */ }
    < div className = "flex-1 min-w-0" >
      {/* Top bar */ }
      < div className = "sticky top-0 z-10 bg-surface border-b border-outline-variant shadow-sm" >
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
              {message && (
                <p className="text-label-md text-on-surface-variant">
                  {message}
                </p>
              )}
            </div>
          </div>
          <button
            onClick={handleSave}
            disabled={saving}
            className="shrink-0 bg-primary text-on-primary px-5 py-2 rounded-full font-label-md hover:opacity-90 transition-all disabled:opacity-50"
          >
            {saving ? "Menyimpan..." : "Simpan Semua Perubahan"}
          </button>
        </div>
        </div >

    <div className="max-w-3xl mx-auto px-6 py-8">
      {/* Navigasi */}
      {activeSection === "nav" && (
        <div className="space-y-4">
          <TextField
            label="Teks tombol 'Hubungi Kami'"
            value={content.nav.ctaLabel}
            onChange={(v) =>
              setContent({
                ...content,
                nav: { ...content.nav, ctaLabel: v },
              })
            }
          />
        </div>
      )}

      {/* Hero */}
      {activeSection === "hero" && (
        <div className="space-y-4">
          <TextField
            label="Judul"
            value={content.hero.title}
            onChange={(v) =>
              setContent({
                ...content,
                hero: { ...content.hero, title: v },
              })
            }
          />
          <TextField
            label="Subjudul"
            multiline
            value={content.hero.subtitle}
            onChange={(v) =>
              setContent({
                ...content,
                hero: { ...content.hero, subtitle: v },
              })
            }
          />
          <TextField
            label="Teks tombol"
            value={content.hero.ctaLabel}
            onChange={(v) =>
              setContent({
                ...content,
                hero: { ...content.hero, ctaLabel: v },
              })
            }
          />
          <ImageUploader
            label="Gambar latar belakang"
            value={content.hero.backgroundImage}
            onChange={(url) =>
              setContent({
                ...content,
                hero: { ...content.hero, backgroundImage: url },
              })
            }
          />
        </div>
      )}

      {/* Sambutan */}
      {activeSection === "sambutan" && (
        <div className="space-y-4">
          <TextField
            label="Label kecil"
            value={content.sambutan.badge}
            onChange={(v) =>
              setContent({
                ...content,
                sambutan: { ...content.sambutan, badge: v },
              })
            }
          />
          <TextField
            label="Judul"
            value={content.sambutan.heading}
            onChange={(v) =>
              setContent({
                ...content,
                sambutan: { ...content.sambutan, heading: v },
              })
            }
          />
          <TextField
            label="Kutipan pembuka"
            multiline
            value={content.sambutan.quote}
            onChange={(v) =>
              setContent({
                ...content,
                sambutan: { ...content.sambutan, quote: v },
              })
            }
          />
          <TextField
            label="Isi sambutan"
            multiline
            value={content.sambutan.body}
            onChange={(v) =>
              setContent({
                ...content,
                sambutan: { ...content.sambutan, body: v },
              })
            }
          />
          <TextField
            label="Nama Kepala Desa"
            value={content.sambutan.name}
            onChange={(v) =>
              setContent({
                ...content,
                sambutan: { ...content.sambutan, name: v },
              })
            }
          />
          <TextField
            label="Jabatan"
            value={content.sambutan.role}
            onChange={(v) =>
              setContent({
                ...content,
                sambutan: { ...content.sambutan, role: v },
              })
            }
          />
          <ImageUploader
            label="Foto Kepala Desa"
            value={content.sambutan.photo}
            onChange={(url) =>
              setContent({
                ...content,
                sambutan: { ...content.sambutan, photo: url },
              })
            }
          />
        </div>
      )}

      {/* Profil Cards */}
      {activeSection === "profilCards" && (
        <div className="space-y-6">
          {content.profilCards.map((card, i) => (
            <div
              key={i}
              className="bg-surface border border-outline-variant rounded-lg p-4 space-y-3"
            >
              <div className="flex justify-between items-center">
                <span className="text-label-md text-outline">
                  Kartu #{i + 1}
                </span>
                <RemoveButton
                  onClick={() =>
                    setContent({
                      ...content,
                      profilCards: content.profilCards.filter(
                        (_, idx) => idx !== i
                      ),
                    })
                  }
                />
              </div>
              <TextField
                label={`Ikon (${ICON_HINT})`}
                value={card.icon}
                onChange={(v) => {
                  const next = [...content.profilCards];
                  next[i] = { ...next[i], icon: v };
                  setContent({ ...content, profilCards: next });
                }}
              />
              <TextField
                label="Judul"
                value={card.title}
                onChange={(v) => {
                  const next = [...content.profilCards];
                  next[i] = { ...next[i], title: v };
                  setContent({ ...content, profilCards: next });
                }}
              />
              <TextField
                label="Deskripsi"
                multiline
                value={card.desc}
                onChange={(v) => {
                  const next = [...content.profilCards];
                  next[i] = { ...next[i], desc: v };
                  setContent({ ...content, profilCards: next });
                }}
              />
            </div>
          ))}
          <AddButton
            label="Tambah Kartu"
            onClick={() =>
              setContent({
                ...content,
                profilCards: [
                  ...content.profilCards,
                  { icon: "star", title: "Judul Baru", desc: "" },
                ],
              })
            }
          />
        </div>
      )}

      {/* Sejarah */}
      {activeSection === "sejarah" && (
        <div className="space-y-4">
          <TextField
            label="Judul"
            value={content.sejarah.heading}
            onChange={(v) =>
              setContent({
                ...content,
                sejarah: { ...content.sejarah, heading: v },
              })
            }
          />
          <div className="space-y-3">
            <span className="block text-label-md text-on-surface-variant">
              Paragraf
            </span>
            {content.sejarah.paragraphs.map((p, i) => (
              <div key={i} className="flex gap-2 items-start">
                <textarea
                  value={p}
                  rows={3}
                  onChange={(e) => {
                    const next = [...content.sejarah.paragraphs];
                    next[i] = e.target.value;
                    setContent({
                      ...content,
                      sejarah: { ...content.sejarah, paragraphs: next },
                    });
                  }}
                  className="flex-1 rounded-lg border border-outline-variant px-3 py-2 text-body-md focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <RemoveButton
                  onClick={() =>
                    setContent({
                      ...content,
                      sejarah: {
                        ...content.sejarah,
                        paragraphs: content.sejarah.paragraphs.filter(
                          (_, idx) => idx !== i
                        ),
                      },
                    })
                  }
                />
              </div>
            ))}
            <AddButton
              label="Tambah Paragraf"
              onClick={() =>
                setContent({
                  ...content,
                  sejarah: {
                    ...content.sejarah,
                    paragraphs: [...content.sejarah.paragraphs, ""],
                  },
                })
              }
            />
          </div>
          <ImageUploader
            label="Gambar sejarah"
            value={content.sejarah.image}
            onChange={(url) =>
              setContent({
                ...content,
                sejarah: { ...content.sejarah, image: url },
              })
            }
          />
        </div>
      )}

      {/* Visi Misi */}
      {activeSection === "visiMisi" && (
        <div className="space-y-4">
          <TextField
            label="Visi"
            multiline
            value={content.visiMisi.visi}
            onChange={(v) =>
              setContent({
                ...content,
                visiMisi: { ...content.visiMisi, visi: v },
              })
            }
          />
          <div className="space-y-3">
            <span className="block text-label-md text-on-surface-variant">
              Misi
            </span>
            {content.visiMisi.misi.map((m, i) => (
              <div key={i} className="flex gap-2 items-start">
                <input
                  type="text"
                  value={m}
                  onChange={(e) => {
                    const next = [...content.visiMisi.misi];
                    next[i] = e.target.value;
                    setContent({
                      ...content,
                      visiMisi: { ...content.visiMisi, misi: next },
                    });
                  }}
                  className="flex-1 rounded-lg border border-outline-variant px-3 py-2 text-body-md focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <RemoveButton
                  onClick={() =>
                    setContent({
                      ...content,
                      visiMisi: {
                        ...content.visiMisi,
                        misi: content.visiMisi.misi.filter(
                          (_, idx) => idx !== i
                        ),
                      },
                    })
                  }
                />
              </div>
            ))}
            <AddButton
              label="Tambah Misi"
              onClick={() =>
                setContent({
                  ...content,
                  visiMisi: {
                    ...content.visiMisi,
                    misi: [...content.visiMisi.misi, ""],
                  },
                })
              }
            />
          </div>
        </div>
      )}

      {/* Potensi */}
      {activeSection === "potensi" && (
        <div className="space-y-6">
          {content.potensi.map((p, i) => (
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
                    setContent({
                      ...content,
                      potensi: content.potensi.filter(
                        (_, idx) => idx !== i
                      ),
                    })
                  }
                />
              </div>
              <TextField
                label={`Ikon (${ICON_HINT})`}
                value={p.icon}
                onChange={(v) => {
                  const next = [...content.potensi];
                  next[i] = { ...next[i], icon: v };
                  setContent({ ...content, potensi: next });
                }}
              />
              <TextField
                label="Judul"
                value={p.title}
                onChange={(v) => {
                  const next = [...content.potensi];
                  next[i] = { ...next[i], title: v };
                  setContent({ ...content, potensi: next });
                }}
              />
              <div className="space-y-2">
                <span className="block text-label-md text-on-surface-variant">
                  Daftar poin
                </span>
                {p.items.map((item, j) => (
                  <div key={j} className="flex gap-2 items-start">
                    <input
                      type="text"
                      value={item}
                      onChange={(e) => {
                        const next = [...content.potensi];
                        const nextItems = [...next[i].items];
                        nextItems[j] = e.target.value;
                        next[i] = { ...next[i], items: nextItems };
                        setContent({ ...content, potensi: next });
                      }}
                      className="flex-1 rounded-lg border border-outline-variant px-3 py-2 text-body-md focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    <RemoveButton
                      onClick={() => {
                        const next = [...content.potensi];
                        next[i] = {
                          ...next[i],
                          items: next[i].items.filter(
                            (_, idx) => idx !== j
                          ),
                        };
                        setContent({ ...content, potensi: next });
                      }}
                    />
                  </div>
                ))}
                <AddButton
                  label="Tambah Poin"
                  onClick={() => {
                    const next = [...content.potensi];
                    next[i] = {
                      ...next[i],
                      items: [...next[i].items, ""],
                    };
                    setContent({ ...content, potensi: next });
                  }}
                />
              </div>
              <ImageUploader
                label="Gambar"
                value={p.image}
                onChange={(url) => {
                  const next = [...content.potensi];
                  next[i] = { ...next[i], image: url };
                  setContent({ ...content, potensi: next });
                }}
              />
            </div>
          ))}
          <AddButton
            label="Tambah Potensi"
            onClick={() =>
              setContent({
                ...content,
                potensi: [
                  ...content.potensi,
                  {
                    icon: "star",
                    title: "Sektor Baru",
                    items: [],
                    image: "",
                  },
                ],
              })
            }
          />
        </div>
      )}

      {/* Fasilitas */}
      {activeSection === "fasilitas" && (
        <div className="space-y-6">
          {content.fasilitas.map((f, i) => (
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
                    setContent({
                      ...content,
                      fasilitas: content.fasilitas.filter(
                        (_, idx) => idx !== i
                      ),
                    })
                  }
                />
              </div>
              <TextField
                label={`Ikon (${ICON_HINT})`}
                value={f.icon}
                onChange={(v) => {
                  const next = [...content.fasilitas];
                  next[i] = { ...next[i], icon: v };
                  setContent({ ...content, fasilitas: next });
                }}
              />
              <TextField
                label="Judul"
                value={f.title}
                onChange={(v) => {
                  const next = [...content.fasilitas];
                  next[i] = { ...next[i], title: v };
                  setContent({ ...content, fasilitas: next });
                }}
              />
              <TextField
                label="Deskripsi"
                value={f.desc}
                onChange={(v) => {
                  const next = [...content.fasilitas];
                  next[i] = { ...next[i], desc: v };
                  setContent({ ...content, fasilitas: next });
                }}
              />
            </div>
          ))}
          <AddButton
            label="Tambah Fasilitas"
            onClick={() =>
              setContent({
                ...content,
                fasilitas: [
                  ...content.fasilitas,
                  { icon: "star", title: "Fasilitas Baru", desc: "" },
                ],
              })
            }
          />
        </div>
      )}

      {/* Lembaga */}
      {activeSection === "lembaga" && (
        <div className="space-y-6">
          {content.lembaga.map((l, i) => (
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
                    setContent({
                      ...content,
                      lembaga: content.lembaga.filter(
                        (_, idx) => idx !== i
                      ),
                    })
                  }
                />
              </div>
              <TextField
                label="Nama"
                value={l.name}
                onChange={(v) => {
                  const next = [...content.lembaga];
                  next[i] = { ...next[i], name: v };
                  setContent({ ...content, lembaga: next });
                }}
              />
              <TextField
                label="Deskripsi"
                multiline
                value={l.desc}
                onChange={(v) => {
                  const next = [...content.lembaga];
                  next[i] = { ...next[i], desc: v };
                  setContent({ ...content, lembaga: next });
                }}
              />
              <ImageUploader
                label="Logo"
                value={l.logo}
                onChange={(url) => {
                  const next = [...content.lembaga];
                  next[i] = { ...next[i], logo: url };
                  setContent({ ...content, lembaga: next });
                }}
              />
              <ImageUploader
                label="Badge kecil (opsional)"
                value={l.badge}
                onChange={(url) => {
                  const next = [...content.lembaga];
                  next[i] = { ...next[i], badge: url };
                  setContent({ ...content, lembaga: next });
                }}
              />
            </div>
          ))}
          <AddButton
            label="Tambah Lembaga"
            onClick={() =>
              setContent({
                ...content,
                lembaga: [
                  ...content.lembaga,
                  { name: "Lembaga Baru", desc: "", logo: "", badge: "" },
                ],
              })
            }
          />
        </div>
      )}

      {/* Galeri */}
      {activeSection === "galeri" && (
        <div className="space-y-6">
          {content.galeri.map((g, i) => (
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
                    setContent({
                      ...content,
                      galeri: content.galeri.filter((_, idx) => idx !== i),
                    })
                  }
                />
              </div>
              <ImageUploader
                label="Foto"
                value={g.src}
                onChange={(url) => {
                  const next = [...content.galeri];
                  next[i] = { ...next[i], src: url };
                  setContent({ ...content, galeri: next });
                }}
              />
              <TextField
                label="Keterangan (alt text)"
                value={g.alt}
                onChange={(v) => {
                  const next = [...content.galeri];
                  next[i] = { ...next[i], alt: v };
                  setContent({ ...content, galeri: next });
                }}
              />
              <label className="flex items-center gap-2 text-label-md text-on-surface-variant">
                <input
                  type="checkbox"
                  checked={g.span}
                  onChange={(e) => {
                    const next = [...content.galeri];
                    next[i] = { ...next[i], span: e.target.checked };
                    setContent({ ...content, galeri: next });
                  }}
                />
                Tampilkan lebar (2 kolom)
              </label>
            </div>
          ))}
          <AddButton
            label="Tambah Foto"
            onClick={() =>
              setContent({
                ...content,
                galeri: [
                  ...content.galeri,
                  { alt: "", src: "", span: false },
                ],
              })
            }
          />
        </div>
      )}

      {/* Footer */}
      {activeSection === "footer" && (
        <div className="space-y-4">
          <TextField
            label="Alamat"
            multiline
            value={content.footer.address}
            onChange={(v) =>
              setContent({
                ...content,
                footer: { ...content.footer, address: v },
              })
            }
          />
          <TextField
            label="Telepon"
            value={content.footer.phone}
            onChange={(v) =>
              setContent({
                ...content,
                footer: { ...content.footer, phone: v },
              })
            }
          />
          <TextField
            label="Email"
            value={content.footer.email}
            onChange={(v) =>
              setContent({
                ...content,
                footer: { ...content.footer, email: v },
              })
            }
          />
          <TextField
            label="Teks hak cipta"
            value={content.footer.copyright}
            onChange={(v) =>
              setContent({
                ...content,
                footer: { ...content.footer, copyright: v },
              })
            }
          />
        </div>
      )}

      <div className="flex justify-end mt-8">
        <button
          onClick={handleSave}
          disabled={saving}
          className="bg-primary text-on-primary px-8 py-3 rounded-full font-label-md hover:opacity-90 transition-all disabled:opacity-50"
        >
          {saving ? "Menyimpan..." : "Simpan Semua Perubahan"}
        </button>
      </div>
    </div>
      </div >
    </div >
  );
}