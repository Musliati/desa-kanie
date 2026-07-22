const AUTH_KEY = "desa_kanie_admin_auth";
const ADMIN_EMAIL = "admin@desakanie.go.id";
const ADMIN_PASSWORD = "admin123";

export function login(email: string, password: string): boolean {
    const ok = email === ADMIN_EMAIL && password === ADMIN_PASSWORD;
    if (ok) localStorage.setItem(AUTH_KEY, "true");
    return ok;
}

export function logout() {
    localStorage.removeItem(AUTH_KEY);
}

export function isLoggedIn(): boolean {
    if (typeof window === "undefined") return false;
    return localStorage.getItem(AUTH_KEY) === "true";
}
