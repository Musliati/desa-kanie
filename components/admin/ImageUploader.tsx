"use client";

import { useRef, useState } from "react";
import { createClient } from "@/lib/supabase/client";

function extFromFileName(name: string): string {
    const idx = name.lastIndexOf(".");
    return idx >= 0 ? name.slice(idx + 1).toLowerCase() : "jpg";
}

export function ImageUploader({
    label,
    value,
    onChange,
    folder = "misc",
}: {
    label: string;
    value: string;
    onChange: (url: string) => void;
    /** Sub-folder di dalam bucket "site-images", contoh: "hero", "sambutan", "galeri" */
    folder?: string;
}) {
    const inputRef = useRef<HTMLInputElement>(null);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploading(true);
        setError(null);

        try {
            const supabase = createClient();
            const path = `${folder}/${crypto.randomUUID()}.${extFromFileName(file.name)}`;

            const { error: uploadError } = await supabase.storage
                .from("site-images")
                .upload(path, file, {
                    cacheControl: "3600",
                    upsert: false,
                });

            if (uploadError) throw uploadError;

            const { data } = supabase.storage.from("site-images").getPublicUrl(path);
            onChange(data.publicUrl);
        } catch (err) {
            setError(
                err instanceof Error ? err.message : "Gagal upload gambar."
            );
        } finally {
            setUploading(false);
            if (inputRef.current) inputRef.current.value = "";
        }
    }

    return (
        <div>
            <label className="block text-label-md text-on-surface-variant mb-1">
                {label}
            </label>
            <div className="flex items-center gap-4">
                {value ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                        src={value}
                        alt={label}
                        className="w-20 h-20 object-cover rounded-lg border border-outline-variant"
                    />
                ) : (
                    <div className="w-20 h-20 rounded-lg border border-dashed border-outline-variant flex items-center justify-center text-outline text-label-md">
                        Kosong
                    </div>
                )}
                <div>
                    <button
                        type="button"
                        onClick={() => inputRef.current?.click()}
                        disabled={uploading}
                        className="text-primary font-label-md border border-primary rounded-full px-4 py-1.5 hover:bg-primary/5 transition-colors disabled:opacity-50"
                    >
                        {uploading ? "Mengunggah..." : "Ganti Gambar"}
                    </button>
                    <input
                        ref={inputRef}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleFileChange}
                    />
                    {error && (
                        <p className="text-error text-label-md mt-1">{error}</p>
                    )}
                </div>
            </div>
        </div>
    );
}
