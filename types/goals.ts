import z from "zod";

export const createGoalSchema = z.object({
    name: z.string().min(3, "O nome da meta precisa ter no mínimo 3 caracteres"),
    value: z.string().transform(value => value.replaceAll('R$', '')).transform(value => Number(value)),
    comission: z.coerce.number().transform(value => !value ? 0 : value)
})

export type CreateGoalType = z.infer<typeof createGoalSchema>;

export type Goal = {
    id: string;
} & CreateGoalType