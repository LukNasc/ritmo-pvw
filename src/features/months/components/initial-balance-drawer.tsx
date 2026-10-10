"use client";

import { toast } from "@/components/ui/toast";
import { centsToInputValue, parseBRLToCents } from "@/core/domain/money";
import { monthsRepo } from "@/core/repositories/months.repo";
import { ValueDrawer } from "./value-drawer";

type InitialBalanceDrawerProps = {
  monthKey: string;
  /** Saldo inicial atual do mês, em centavos (0 = nenhum). */
  currentCents: number;
  trigger: React.ReactElement;
};

export function InitialBalanceDrawer({ monthKey, currentCents, trigger }: InitialBalanceDrawerProps) {
  return (
    <ValueDrawer
      trigger={trigger}
      title="Saldo inicial do mês"
      description="Quanto você já vendeu antes de começar a registrar os dias. Entra no total do mês."
      label="Valor já vendido (R$)"
      placeholder="Ex: 1.200,00"
      initialValue={currentCents > 0 ? centsToInputValue(currentCents) : ""}
      onSubmit={async (raw) => {
        const cents = raw.trim() === "" ? 0 : parseBRLToCents(raw);
        if (cents === null) return "Informe um valor válido, ex: 1.200,00.";

        await monthsRepo.setBaseline(monthKey, cents);
        toast.add({ title: "Saldo inicial atualizado", type: "success" });
        return null;
      }}
    />
  );
}
