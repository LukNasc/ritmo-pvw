/**
 * Dinheiro é sempre guardado em CENTAVOS (inteiros).
 * A conversão de/para texto acontece só nas bordas: formulário e exibição.
 */

const brl = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" });

export function formatBRL(cents: number): string {
    return brl.format(cents / 100);
}

/**
 * Converte texto no formato brasileiro para centavos.
 * Aceita "1.500,00", "R$ 1.500", "1500", "1500,5" e "1500.50".
 * Retorna null se não for um valor monetário válido (ou se for negativo).
 */
export function parseBRLToCents(input: string): number | null {
    const cleaned = input.replace(/R\$|\s/g, "");
    if (!cleaned) return null;

    let normalized = cleaned;
    if (cleaned.includes(",")) {
        // a vírgula é o separador decimal; os pontos são milhar
        normalized = cleaned.replace(/\./g, "").replace(",", ".");
    } else if (/^\d{1,3}(\.\d{3})+$/.test(cleaned)) {
        // "1.500" e "12.345.678" são milhares, não decimais
        normalized = cleaned.replace(/\./g, "");
    }

    if (!/^\d+(\.\d{1,2})?$/.test(normalized)) return null;

    const [reais, decimals = ""] = normalized.split(".");
    return Number(reais) * 100 + Number(decimals.padEnd(2, "0"));
}

/** Texto para preencher um <input> ao editar (150050 -> "1500,50"). */
export function centsToInputValue(cents: number): string {
    const reais = Math.floor(cents / 100);
    const rest = String(cents % 100).padStart(2, "0");
    return `${reais},${rest}`;
}
