"use client";

import { EditIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Empty, EmptyDescription } from "@/components/ui/empty";
import { formatBRL } from "@/core/domain/money";
import { formatPercent } from "@/core/domain/percent";
import { CommissionDrawer } from "@/features/months/components/commission-drawer";
import { InitialBalanceDrawer } from "@/features/months/components/initial-balance-drawer";
import { MonthNav } from "@/features/months/components/month-nav";
import { SettingCard } from "@/features/months/components/setting-card";
import { useViewedMonth } from "@/features/months/hooks/use-viewed-month";
import { copyGoalsFromPreviousMonth } from "../goal-actions";
import { useGoalsOverview } from "../hooks/use-goals-overview";
import { GoalCard } from "./goal-card";
import { GoalFormDrawer } from "./goal-form-drawer";
import { GoalsSkeleton } from "./goals-skeleton";

export function GoalsScreen() {
  const { monthKey, setMonthKey } = useViewedMonth();
  const overview = useGoalsOverview(monthKey);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <p className="text-sm text-muted-foreground">Configurações</p>
        <h1 className="text-xl font-bold">Suas metas</h1>
      </div>

      <MonthNav monthKey={monthKey} onChange={setMonthKey} />

      {overview.isLoading ? (
        <GoalsSkeleton />
      ) : (
        <>
          <p className="text-sm text-muted-foreground">
            Vendido no mês:{" "}
            <span className="font-bold text-foreground">{formatBRL(overview.totalCents)}</span>
          </p>

          <SettingCard
            title="Comissão base"
            description={
              overview.month.baseCommissionPct > 0
                ? `${formatPercent(overview.month.baseCommissionPct)} sobre o valor total vendido`
                : "Não definida"
            }
            action={
              <CommissionDrawer
                monthKey={monthKey}
                current={overview.month.baseCommissionPct}
                trigger={
                  <Button size="icon-lg" variant="outline" aria-label="Editar comissão base">
                    <EditIcon />
                  </Button>
                }
              />
            }
          />

          <SettingCard
            title="Saldo inicial do mês"
            description={
              overview.month.baselineCents > 0
                ? formatBRL(overview.month.baselineCents)
                : "Nenhum saldo adicionado"
            }
            action={
              <InitialBalanceDrawer
                monthKey={monthKey}
                currentCents={overview.month.baselineCents}
                trigger={
                  <Button size="icon-lg" variant="outline" aria-label="Editar saldo inicial">
                    <EditIcon />
                  </Button>
                }
              />
            }
          />
      
          {overview.goals.length === 0 ? (
            <EmptyGoals monthKey={monthKey} />
          ) : (
            overview.goals.map(({ goal, progress }) => (
              <GoalCard key={goal.id} goal={goal} progress={progress} monthKey={monthKey} />
            ))
          )}

          <GoalFormDrawer monthKey={monthKey} trigger={<Button size="lg">Adicionar nova meta</Button>} />
        </>
      )}
    </div>
  );
}

function EmptyGoals({ monthKey }: { monthKey: string }) {
  return (
    <Card>
      <CardContent className="flex flex-col gap-4">
        <Empty>
          <EmptyDescription>Nenhuma meta definida neste mês</EmptyDescription>
        </Empty>
        <Button variant="outline" onClick={() => copyGoalsFromPreviousMonth(monthKey)}>
          Copiar metas do mês anterior
        </Button>
      </CardContent>
    </Card>
  );
}
