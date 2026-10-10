/** Converte "1,5", "1.5" ou "1,5%" em número. Retorna null se inválido ou fora de 0–100. */
export function parsePercent(input: string): number | null {
    const normalized = input.replace(/[%\s]/g, "").replace(",", ".");
    if (!/^\d+(\.\d+)?$/.test(normalized)) return null;

    const value = Number(normalized);
    return value <= 100 ? value : null;
}

export function formatPercent(value: number): string {
    return `${value.toLocaleString("pt-BR", { maximumFractionDigits: 2 })}%`;
}

/** Texto para preencher um <input> ao editar (1.5 -> "1,5"). */
export function percentToInputValue(value: number): string {
    return String(value).replace(".", ",");
}
