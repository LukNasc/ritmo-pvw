export type CurrencyCode = "USD" | "EUR" | "BRL";

const currencyLocales: Record<CurrencyCode, string> = {
    USD: "en-US",
    EUR: "de-DE",
    BRL: "pt-BR",
};

export function formatCurrency(value: number | string, currency: CurrencyCode = 'BRL'): string {
    const amount =
        typeof value === "number"
            ? value
            : value.trim() === ""
                ? Number.NaN
                : Number(value);

    if (!Number.isFinite(amount)) {
        throw new TypeError("O valor monetário deve ser um número finito.");
    }

    return new Intl.NumberFormat(currencyLocales[currency], {
        style: "currency",
        currency,
    }).format(amount);
}