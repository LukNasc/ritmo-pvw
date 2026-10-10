/** Mês é identificado por "YYYY-MM". Datas de venda são strings "YYYY-MM-DD" (sem fuso). */

export function toMonthKey(date: Date): string {
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
}

export function currentMonthKey(now: Date = new Date()): string {
    return toMonthKey(now);
}

export function shiftMonthKey(monthKey: string, delta: number): string {
    const [year, month] = monthKey.split("-").map(Number);
    return toMonthKey(new Date(year, month - 1 + delta, 1));
}

/** "2026-10" -> "Outubro de 2026" */
export function formatMonthLabel(monthKey: string): string {
    const [year, month] = monthKey.split("-").map(Number);
    const label = new Date(year, month - 1, 1).toLocaleDateString("pt-BR", {
        month: "long",
        year: "numeric",
    });
    return label.charAt(0).toLocaleUpperCase("pt-BR") + label.slice(1);
}
