import { db } from "@/core/db/client";
import { goalSchema, type Goal, type NewGoal } from "@/core/db/schema";

const normalizeName = (name: string) => name.trim().toLocaleLowerCase("pt-BR");

export const goalsRepo = {
    /** Ordenadas por valor: a ordem natural das faixas de comissão. */
    listByMonth(monthKey: string): Promise<Goal[]> {
        return db.goals.where("monthKey").equals(monthKey).sortBy("valueCents");
    },

    getById(id: string): Promise<Goal | undefined> {
        return db.goals.get(id);
    },

    /** `excludeId` permite editar uma meta sem conflitar com o próprio nome. */
    async existsWithName(monthKey: string, name: string, excludeId?: string): Promise<boolean> {
        const wanted = normalizeName(name);
        const goals = await goalsRepo.listByMonth(monthKey);
        return goals.some((goal) => goal.id !== excludeId && normalizeName(goal.name) === wanted);
    },

    async create(input: NewGoal): Promise<Goal> {
        const goal = goalSchema.parse({ id: crypto.randomUUID(), ...input });
        await db.goals.add(goal);
        return goal;
    },

    async update(goal: Goal): Promise<void> {
        await db.goals.put(goalSchema.parse(goal));
    },

    remove(id: string): Promise<void> {
        return db.goals.delete(id);
    },

    /** Copia as metas de um mês para outro, pulando nomes que já existem no destino. */
    async copyMonth(fromKey: string, toKey: string): Promise<number> {
        const [source, existing] = await Promise.all([
            goalsRepo.listByMonth(fromKey),
            goalsRepo.listByMonth(toKey),
        ]);

        const taken = new Set(existing.map((goal) => normalizeName(goal.name)));
        const copies = source
            .filter((goal) => !taken.has(normalizeName(goal.name)))
            .map((goal) => ({ ...goal, id: crypto.randomUUID(), monthKey: toKey }));

        await db.goals.bulkAdd(copies);
        return copies.length;
    },
};
