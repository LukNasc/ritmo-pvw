"use client";

import { toast } from "@/components/ui/toast";
import { parsePercent, percentToInputValue } from "@/core/domain/percent";
import { monthsRepo } from "@/core/repositories/months.repo";
import { ValueDrawer } from "./value-drawer";

type CommissionDrawerProps = {
  monthKey: string;
  /** Comissão base atual do mês (0 = não definida). */
  current: number;
  trigger: React.ReactElement;
};

export function CommissionDrawer({ monthKey, current, trigger }: CommissionDrawerProps) {
  return (
    <ValueDrawer
      trigger={trigger}
      title="Comissão base"
      description="Percentual sobre o total vendido quando nenhuma meta com comissão é batida."
      label="Comissão base (%)"
      placeholder="Ex: 1,5"
      initialValue={current > 0 ? percentToInputValue(current) : ""}
      onSubmit={async (raw) => {
        const pct = raw.trim() === "" ? 0 : parsePercent(raw);
        if (pct === null) return "Informe um percentual entre 0 e 100.";

        await monthsRepo.setBaseCommission(monthKey, pct);
        toast.add({ title: "Comissão base atualizada", type: "success" });
        return null;
      }}
    />
  );
}
