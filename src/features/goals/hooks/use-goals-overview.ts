"use client";

import { useLiveQuery } from "dexie-react-hooks";
import { useMemo } from "react";
import type { Goal, Month } from "@/core/db/schema";
import { evaluateGoalProgress, type GoalProgress } from "@/core/domain/goal-progress";
import { computeMonthTotalCents } from "@/core/domain/month-summary";
import { entriesRepo } from "@/core/repositories/entries.repo";
import { goalsRepo } from "@/core/repositories/goals.repo";
import { monthsRepo } from "@/core/repositories/months.repo";

export type GoalWithProgress = { goal: Goal; progress: GoalProgress };

export type GoalsOverview =
    | { isLoading: true }
    | { isLoading: false; month: Month; totalCents: number; goals: GoalWithProgress[] };

/**
 * Única leitura da página de metas: metas + configurações do mês + vendas.
 * useLiveQuery reexecuta sozinho quando qualquer tabela lida muda,
 * então não existe estado local para manter em sincronia.
 */
export function useGoalsOverview(monthKey: string): GoalsOverview {
    const data = useLiveQuery(async () => {
        const [goals, month, entries] = await Promise.all([
            goalsRepo.listByMonth(monthKey),
            monthsRepo.getOrDefault(monthKey),
            entriesRepo.listByMonth(monthKey),
        ]);
        return { goals, month, entries };
    }, [monthKey]);

    return useMemo<GoalsOverview>(() => {
        if (!data) return { isLoading: true };

        const totalCents = computeMonthTotalCents(data.entries, data.month.baselineCents);

        return {
            isLoading: false,
            month: data.month,
            totalCents,
            goals: data.goals.map((goal) => ({
                goal,
                progress: evaluateGoalProgress(goal.valueCents, totalCents),
            })),
        };
    }, [data]);
}
