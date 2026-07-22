"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { login } from "@/lib/auth";

export default function AdminLoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const ok = login(email, password);

        setLoading(false);

        if (!ok) {
            setError("Email atau password salah.");
            return;
        }

        router.push("/admin");
        router.refresh();
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-surface-container-low px-gutter">
            <div className="w-full max-w-sm bg-surface p-8 rounded-lg shadow-xl border border-outline-variant">
                <h1 className="font-headline-md text-headline-md text-primary mb-1">
                    Admin Desa Bone
                </h1>
                <p className="text-body-md text-on-surface-variant mb-8">
                    Masuk untuk mengelola konten website.
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-label-md text-on-surface-variant mb-1">
                            Email
                        </label>
                        <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full rounded-lg border border-outline-variant px-4 py-2 text-body-md focus:outline-none focus:ring-2 focus:ring-primary"
                            placeholder="admin@desabone.go.id"
                        />
                    </div>
                    <div>
                        <label className="block text-label-md text-on-surface-variant mb-1">
                            Password
                        </label>
                        <input
                            type="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full rounded-lg border border-outline-variant px-4 py-2 text-body-md focus:outline-none focus:ring-2 focus:ring-primary"
                            placeholder="••••••••"
                        />
                    </div>

                    {error && (
                        <p className="text-error text-label-md" role="alert">
                            {error}
                        </p>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-primary text-on-primary rounded-full py-2.5 font-label-md hover:opacity-90 transition-all disabled:opacity-50"
                    >
                        {loading ? "Memproses..." : "Masuk"}
                    </button>
                </form>
            </div>
        </div>
    );
}