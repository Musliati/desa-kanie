"use client";

export function Section({
    title,
    children,
}: {
    title: string;
    children: React.ReactNode;
}) {
    return (
        <div className="bg-surface rounded-lg border border-outline-variant p-6 mb-6">
            <h2 className="font-headline-md text-headline-md text-primary mb-4">
                {title}
            </h2>
            <div className="space-y-4">{children}</div>
        </div>
    );
}

export function TextField({
    label,
    value,
    onChange,
    multiline,
}: {
    label: string;
    value: string;
    onChange: (value: string) => void;
    multiline?: boolean;
}) {
    return (
        <div>
            <label className="block text-label-md text-on-surface-variant mb-1">
                {label}
            </label>
            {multiline ? (
                <textarea
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    rows={3}
                    className="w-full rounded-lg border border-outline-variant px-3 py-2 text-body-md focus:outline-none focus:ring-2 focus:ring-primary"
                />
            ) : (
                <input
                    type="text"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    className="w-full rounded-lg border border-outline-variant px-3 py-2 text-body-md focus:outline-none focus:ring-2 focus:ring-primary"
                />
            )}
        </div>
    );
}

export function RemoveButton({ onClick }: { onClick: () => void }) {
    return (
        <button
            type="button"
            onClick={onClick}
            className="text-error text-label-md hover:underline"
        >
            Hapus
        </button>
    );
}

export function AddButton({
    label,
    onClick,
}: {
    label: string;
    onClick: () => void;
}) {
    return (
        <button
            type="button"
            onClick={onClick}
            className="text-primary font-label-md border border-primary rounded-full px-4 py-1.5 hover:bg-primary/5 transition-colors"
        >
            + {label}
        </button>
    );
}