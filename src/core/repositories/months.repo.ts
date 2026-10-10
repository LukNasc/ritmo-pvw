import { db } from "@/core/db/client";
import { monthSchema, type Month } from "@/core/db/schema";

export const monthsRepo = {
    /** Mês sem registro devolve os valores padrão; não é preciso "criar" o mês. */
    async getOrDefault(key: string): Promise<Month> {
        return (await db.months.get(key)) ?? monthSchema.parse({ key });
    },

    async update(key: string, patch: Partial<Omit<Month, "key">>): Promise<void> {
        const current = await monthsRepo.getOrDefault(key);
        await db.months.put(monthSchema.parse({ ...current, ...patch }));
    },

    setBaseCommission(key: string, pct: number): Promise<void> {
        return monthsRepo.update(key, { baseCommissionPct: pct });
    },

    setBaseline(key: string, cents: number): Promise<void> {
        return monthsRepo.update(key, { baselineCents: cents });
    },
};
