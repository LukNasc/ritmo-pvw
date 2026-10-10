import { toast } from "@/components/ui/toast";
import { shiftMonthKey } from "@/core/domain/dates";
import { goalsRepo } from "@/core/repositories/goals.repo";
import type { GoalFormOutput } from "./goal-form.schema";

/**
 * Casos de uso de metas: regra + persistência + feedback (toast).
 * Não são hooks: os repositórios são objetos de módulo, estáveis por natureza.
 */

export type SaveGoalResult =
    | { ok: true }
    | { ok: false; field: "name" | "root"; message: string };

export async function saveGoal(params: {
    monthKey: string;
    data: GoalFormOutput;
    goalId?: string;
}): Promise<SaveGoalResult> {
    const { monthKey, data, goalId } = params;

    if (await goalsRepo.existsWithName(monthKey, data.name, goalId)) {
        return { ok: false, field: "name", message: "Já existe uma meta com esse nome neste mês" };
    }
    const payload = {
        monthKey,
        name: data.name,
        valueCents: data.value,
        commissionPct: data.commission,
    };

    try {
        if (goalId) {
            await goalsRepo.update({ id: goalId, ...payload });
            toast.add({ title: "Meta editada", description: `A meta ${data.name} foi atualizada`, type: "success" });
        } else {
            await goalsRepo.create(payload);
            toast.add({ title: "Nova meta criada", description: `A meta ${data.name} foi criada`, type: "success" });
        }
        return { ok: true };
    } catch (error) {
        console.error("saveGoal", error);
        return { ok: false, field: "root", message: "Não foi possível salvar a meta. Tente novamente." };
    }
}

export async function removeGoal(id: string): Promise<void> {
    const goal = await goalsRepo.getById(id);

    if (!goal) {
        toast.add({ title: "Ops...", description: "Não encontramos essa meta", type: "error" });
        return;
    }

    await goalsRepo.remove(id);
    toast.add({ title: "Meta removida", description: `A meta ${goal.name} foi removida`, type: "success" });
}

export async function copyGoalsFromPreviousMonth(monthKey: string): Promise<void> {
    const copied = await goalsRepo.copyMonth(shiftMonthKey(monthKey, -1), monthKey);

    if (copied === 0) {
        toast.add({ title: "Nada para copiar", description: "O mês anterior não tem metas", type: "info" });
        return;
    }

    toast.add({
        title: "Metas copiadas",
        description: `${copied} ${copied === 1 ? "meta copiada" : "metas copiadas"} do mês anterior`,
        type: "success",
    });
}
