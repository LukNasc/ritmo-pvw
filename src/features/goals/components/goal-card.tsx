"use client";

import { EditIcon, TrashIcon } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import type { Goal } from "@/core/db/schema";
import type { GoalProgress } from "@/core/domain/goal-progress";
import { formatBRL } from "@/core/domain/money";
import { formatPercent } from "@/core/domain/percent";
import { removeGoal } from "../goal-actions";
import { GoalFormDrawer } from "./goal-form-drawer";

type GoalCardProps = {
  goal: Goal;
  progress: GoalProgress;
  monthKey: string;
};

export function GoalCard({ goal, progress, monthKey }: GoalCardProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <p className="font-bold">{goal.name}</p>

          <div className="flex gap-2">
            <GoalFormDrawer
              monthKey={monthKey}
              goal={goal}
              trigger={
                <Button variant="outline" size="icon-lg" aria-label={`Editar meta ${goal.name}`}>
                  <EditIcon />
                </Button>
              }
            />

            <AlertDialog>
              <AlertDialogTrigger
                render={<Button variant="destructive" size="icon-lg" aria-label={`Excluir meta ${goal.name}`} />}
              >
                <TrashIcon />
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Excluir meta?</AlertDialogTitle>
                  <AlertDialogDescription>
                    A meta {goal.name} será removida deste mês. Essa ação não pode ser desfeita.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancelar</AlertDialogCancel>
                  <AlertDialogAction variant="destructive" onClick={() => removeGoal(goal.id)}>
                    Excluir
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex flex-col gap-2">
        <p className="text-sm text-muted-foreground">{formatBRL(goal.valueCents)}</p>
        <div
          className="w-full h-2 rounded-full bg-muted overflow-clip"
          role="progressbar"
          aria-label={`Progresso da meta ${goal.name}`}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={progress.pct}
        >
          <div className="h-full bg-primary transition-[width] duration-300" style={{ width: `${progress.pct}%` }} />
        </div>
      </CardContent>

      <CardFooter>
        <div className="flex w-full items-center justify-between gap-2">
          <p className="text-xs text-muted-foreground">
            {progress.reached
              ? "Meta batida"
              : `${progress.pct}% · faltam ${formatBRL(progress.missingCents)}`}
          </p>
          <p className="text-xs text-muted-foreground">
            {goal.commissionPct !== null ? `Comissão: ${formatPercent(goal.commissionPct)}` : "Sem comissão"}
          </p>
        </div>
      </CardFooter>
    </Card>
  );
}
