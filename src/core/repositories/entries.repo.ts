import { db } from "@/core/db/client";
import type { Entry } from "@/core/db/schema";

export const entriesRepo = {
    /** Vendas do mês ("YYYY-MM"), pelo prefixo da data. */
    listByMonth(monthKey: string): Promise<Entry[]> {
        return db.entries.where("date").startsWith(monthKey).toArray();
    },
};
