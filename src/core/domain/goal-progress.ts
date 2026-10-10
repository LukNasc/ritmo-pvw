export type GoalProgress = {
    /** 0–100, arredondado para BAIXO: 99,9% aparece como 99% até a meta ser batida de verdade. */
    pct: number;
    missingCents: number;
    reached: boolean;
};

export function evaluateGoalProgress(goalValueCents: number, totalCents: number): GoalProgress {
    const reached = totalCents >= goalValueCents;
    const missingCents = Math.max(0, goalValueCents - totalCents);
    const pct = reached ? 100 : Math.floor((totalCents / goalValueCents) * 100);

    return { pct, missingCents, reached };
}
