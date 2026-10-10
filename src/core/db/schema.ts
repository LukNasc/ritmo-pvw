import { z } from "zod";

export const monthKeySchema = z.string().regex(/^\d{4}-(0[1-9]|1[0-2])$/, "Mês inválido");

/** Uma venda por dia: `date` ("YYYY-MM-DD") é a chave primária. */
export const entrySchema = z.object({
    date: z.iso.date(),
    hours: z.number().min(0).max(24),
    valueCents: z.number().int().min(0),
});

/** Metas pertencem a um mês: editar uma meta hoje não reescreve meses passados. */
export const goalSchema = z.object({
    id: z.uuid(),
    monthKey: monthKeySchema,
    name: z.string().trim().min(3).max(30),
    valueCents: z.number().int().positive(),
    commissionPct: z.number().min(0).max(100).nullable(),
});

/** Configurações do mês. Mês sem registro na tabela = valores padrão (ver months.repo). */
export const monthSchema = z.object({
    key: monthKeySchema,
    baselineCents: z.number().int().min(0).default(0),
    workDays: z.number().int().min(1).max(31).nullable().default(null),
    baseCommissionPct: z.number().min(0).max(100).default(0),
});

export type Entry = z.infer<typeof entrySchema>;
export type Goal = z.infer<typeof goalSchema>;
export type NewGoal = Omit<Goal, "id">;
export type Month = z.infer<typeof monthSchema>;
