import { z } from "zod";
import type { Goal } from "@/core/db/schema";
import { centsToInputValue, parseBRLToCents } from "@/core/domain/money";
import { parsePercent, percentToInputValue } from "@/core/domain/percent";

/**
 * Schema do FORMULÁRIO: o que o usuário digita (strings) -> o que o domínio entende.
 * O schema da ENTIDADE (o que vai para o disco) fica em core/db/schema.ts.
 */
export const goalFormSchema = z.object({
    name: z
        .string()
        .trim()
        .min(3, "O nome da meta precisa ter no mínimo 3 caracteres")
        .max(30, "O nome da meta pode ter no máximo 30 caracteres"),

    value: z
        .string()
        .trim()
        .min(1, "Informe o valor da meta")
        .transform((text, ctx) => {
            const cents = parseBRLToCents(text);
            if (cents === null || cents <= 0) {
                ctx.addIssue({ code: "custom", message: "Informe um valor válido, ex: 1.500,00" });
                return z.NEVER;
            }
            return cents;
        }),

    // em branco = esta meta não altera a comissão
    commission: z
        .string()
        .trim()
        .transform((text, ctx) => {
            if (text === "") return null;
            const pct = parsePercent(text);
            if (pct === null) {
                ctx.addIssue({ code: "custom", message: "Informe um percentual entre 0 e 100" });
                return z.NEVER;
            }
            return pct;
        }),
});

export type GoalFormInput = z.input<typeof goalFormSchema>;
export type GoalFormOutput = z.output<typeof goalFormSchema>;

export function goalToFormValues(goal?: Goal): GoalFormInput {
    return {
        name: goal?.name ?? "",
        value: goal ? centsToInputValue(goal.valueCents) : "",
        commission: goal?.commissionPct != null ? percentToInputValue(goal.commissionPct) : "",
    };
}
