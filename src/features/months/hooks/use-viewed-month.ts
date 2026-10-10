"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { monthKeySchema } from "@/core/db/schema";
import { currentMonthKey } from "@/core/domain/dates";

/**
 * O mês visualizado vive na URL (?m=2026-10): voltar do navegador e links diretos funcionam.
 * Sem ?m (ou inválido), usa o mês atual.
 * Requer <Suspense> acima, por causa do useSearchParams.
 */
export function useViewedMonth() {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const parsed = monthKeySchema.safeParse(searchParams.get("m"));
    const monthKey = parsed.success ? parsed.data : currentMonthKey();

    const setMonthKey = useCallback(
        (next: string) => {
            const params = new URLSearchParams(searchParams.toString());
            params.set("m", next);
            router.replace(`${pathname}?${params.toString()}`, { scroll: false });
        },
        [pathname, router, searchParams],
    );

    return { monthKey, setMonthKey };
}
