import type { SupabaseClient } from "@supabase/supabase-js";
import {
    type HeroSection,
    type SambutanSection,
    type SejarahSection,
    type VisiMisiSection,
    type ProfilCard,
    type PotensiItem,
    type FasilitasItem,
    type LembagaItem,
    type GaleriItem,
    defaultHero,
    defaultSambutan,
    defaultSejarah,
    defaultVisiMisi,
} from "@/types/content";

type Row = Record<string, any>;

async function getSingleton<T>(
    supabase: SupabaseClient,
    table: string,
    fallback: T,
    rowToT: (row: Row) => T
): Promise<T> {
    const { data, error } = await supabase
        .from(table)
        .select("*")
        .eq("id", 1)
        .maybeSingle();

    if (error || !data) return fallback;
    return rowToT(data as Row);
}

async function saveSingleton(
    supabase: SupabaseClient,
    table: string,
    row: Row
): Promise<{ error: string | null }> {
    const { error } = await supabase
        .from(table)
        .upsert({ id: 1, ...row, updated_at: new Date().toISOString() });

    return { error: error ? error.message : null };
}

async function getList<T>(
    supabase: SupabaseClient,
    table: string,
    rowToT: (row: Row) => T
): Promise<T[]> {
    const { data, error } = await supabase
        .from(table)
        .select("*")
        .order("sort_order", { ascending: true });

    if (error || !data) return [];
    return (data as Row[]).map(rowToT);
}

async function syncList<T extends { id?: number }>(
    supabase: SupabaseClient,
    table: string,
    originalIds: number[],
    items: T[],
    itemToRow: (item: T, index: number) => Row
): Promise<{ error: string | null }> {
    const currentIds = items
        .filter((i) => i.id != null)
        .map((i) => i.id as number);
    const removedIds = originalIds.filter((id) => !currentIds.includes(id));

    if (removedIds.length > 0) {
        const { error } = await supabase.from(table).delete().in("id", removedIds);
        if (error) return { error: error.message };
    }

    const newItems = items.filter((i) => i.id == null);
    if (newItems.length > 0) {
        const toInsert = newItems.map((item) =>
            itemToRow(item, items.indexOf(item))
        );
        const { error } = await supabase.from(table).insert(toInsert);
        if (error) return { error: error.message };
    }

    const existingItems = items.filter((i) => i.id != null);
    for (const item of existingItems) {
        const row = itemToRow(item, items.indexOf(item));
        const { error } = await supabase
            .from(table)
            .update(row)
            .eq("id", item.id as number);
        if (error) return { error: error.message };
    }

    return { error: null };
}

const nowRow = () => ({ updated_at: new Date().toISOString() });

export function getHeroSection(supabase: SupabaseClient) {
    return getSingleton<HeroSection>(supabase, "hero_section", defaultHero, (row) => ({
        title: row.title,
        subtitle: row.subtitle,
        ctaLabel: row.cta_label,
        backgroundImage: row.background_image,
    }));
}
export function saveHeroSection(supabase: SupabaseClient, hero: HeroSection) {
    return saveSingleton(supabase, "hero_section", {
        title: hero.title,
        subtitle: hero.subtitle,
        cta_label: hero.ctaLabel,
        background_image: hero.backgroundImage,
    });
}

export function getSambutanSection(supabase: SupabaseClient) {
    return getSingleton<SambutanSection>(
        supabase,
        "sambutan_section",
        defaultSambutan,
        (row) => ({
            badge: row.badge,
            heading: row.heading,
            quote: row.quote,
            body: row.body,
            name: row.name,
            role: row.role,
            photo: row.photo,
        })
    );
}
export function saveSambutanSection(supabase: SupabaseClient, s: SambutanSection) {
    return saveSingleton(supabase, "sambutan_section", { ...s });
}

export async function getSejarahSection(supabase: any): Promise<SejarahSection> {
    const { data } = await supabase
        .from("sejarah_section")
        .select("*")
        .eq("id", 1)
        .single();

    return {
        heading: data?.heading || "",
        body: data?.body || "", 
        image: data?.image || "",
    };
}

export async function saveSejarahSection(supabase: any, payload: SejarahSection) {
    const { error } = await supabase
        .from("sejarah_section")
        .upsert({
            id: 1,
            heading: payload.heading,
            body: payload.body, 
            image: payload.image,
        });

    return { error: error?.message || null };
}
export function getVisiMisiSection(supabase: SupabaseClient) {
    return getSingleton<VisiMisiSection>(
        supabase,
        "visi_misi_section",
        defaultVisiMisi,
        (row) => ({
            visi: row.visi,
            misi: (row.misi as string[]) ?? [],
        })
    );
}
export function saveVisiMisiSection(supabase: SupabaseClient, s: VisiMisiSection) {
    return saveSingleton(supabase, "visi_misi_section", {
        visi: s.visi,
        misi: s.misi,
    });
}

export function getProfilCards(supabase: SupabaseClient) {
    return getList<ProfilCard>(supabase, "profil_cards", (row) => ({
        id: row.id,
        icon: row.icon,
        title: row.title,
        desc: row.desc,
    }));
}
export function syncProfilCards(
    supabase: SupabaseClient,
    originalIds: number[],
    items: ProfilCard[]
) {
    return syncList(supabase, "profil_cards", originalIds, items, (item, index) => ({
        icon: item.icon,
        title: item.title,
        desc: item.desc,
        sort_order: index,
        ...nowRow(),
    }));
}

export function getPotensiItems(supabase: SupabaseClient) {
    return getList<PotensiItem>(supabase, "potensi_items", (row) => ({
        id: row.id,
        icon: row.icon,
        title: row.title,
        items: (row.items as string[]) ?? [],
        image: row.image,
    }));
}
export function syncPotensiItems(
    supabase: SupabaseClient,
    originalIds: number[],
    items: PotensiItem[]
) {
    return syncList(supabase, "potensi_items", originalIds, items, (item, index) => ({
        icon: item.icon,
        title: item.title,
        items: item.items,
        image: item.image,
        sort_order: index,
        ...nowRow(),
    }));
}

export function getFasilitasItems(supabase: SupabaseClient) {
    return getList<FasilitasItem>(supabase, "fasilitas_items", (row) => ({
        id: row.id,
        icon: row.icon,
        title: row.title,
        desc: row.desc,
    }));
}
export function syncFasilitasItems(
    supabase: SupabaseClient,
    originalIds: number[],
    items: FasilitasItem[]
) {
    return syncList(supabase, "fasilitas_items", originalIds, items, (item, index) => ({
        icon: item.icon,
        title: item.title,
        desc: item.desc,
        sort_order: index,
        ...nowRow(),
    }));
}

export function getLembagaItems(supabase: SupabaseClient) {
    return getList<LembagaItem>(supabase, "lembaga_items", (row) => ({
        id: row.id,
        name: row.name,
        desc: row.desc,
        logo: row.logo,
        badge: row.badge,
    }));
}
export function syncLembagaItems(
    supabase: SupabaseClient,
    originalIds: number[],
    items: LembagaItem[]
) {
    return syncList(supabase, "lembaga_items", originalIds, items, (item, index) => ({
        name: item.name,
        desc: item.desc,
        logo: item.logo,
        badge: item.badge,
        sort_order: index,
        ...nowRow(),
    }));
}

export function getGaleriItems(supabase: SupabaseClient) {
    return getList<GaleriItem>(supabase, "galeri_items", (row) => ({
        id: row.id,
        alt: row.alt,
        src: row.src,
        span: row.span,
    }));
}
export function syncGaleriItems(
    supabase: SupabaseClient,
    originalIds: number[],
    items: GaleriItem[]
) {
    return syncList(supabase, "galeri_items", originalIds, items, (item, index) => ({
        alt: item.alt,
        src: item.src,
        span: item.span,
        sort_order: index,
        ...nowRow(),
    }));
}
