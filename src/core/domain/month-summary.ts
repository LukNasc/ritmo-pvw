/** Total do mês = soma das vendas registradas + saldo inicial do mês. */
export function computeMonthTotalCents(
    entries: ReadonlyArray<{ valueCents: number }>,
    baselineCents: number,
): number {
    return entries.reduce((sum, entry) => sum + entry.valueCents, baselineCents);
}
