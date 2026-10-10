"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Drawer, DrawerClose, DrawerContent, DrawerFooter, DrawerHeader, DrawerTrigger } from "@/components/ui/drawer";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import type { Goal } from "@/core/db/schema";
import { formatMonthLabel } from "@/core/domain/dates";
import { saveGoal } from "../goal-actions";
import {
  goalFormSchema,
  goalToFormValues,
  type GoalFormInput,
  type GoalFormOutput,
} from "../goal-form.schema";

type GoalFormDrawerProps = {
  trigger: React.ReactElement;
  /** Mês ao qual a meta pertence ("YYYY-MM"). Vem da URL, não de um campo escondido. */
  monthKey: string;
  /** Com `goal` o drawer edita; sem, cria. */
  goal?: Goal;
};

export function GoalFormDrawer({ trigger, monthKey, goal }: GoalFormDrawerProps) {
  const [open, setOpen] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<GoalFormInput, unknown, GoalFormOutput>({
    resolver: zodResolver(goalFormSchema),
    defaultValues: goalToFormValues(goal),
    mode: "onTouched",
  });

  // O drawer fecha mas este componente continua montado: sem reset, o formulário
  // reabriria com o que sobrou da última vez.
  const handleOpenChange = (next: boolean) => {
    if (next) reset(goalToFormValues(goal));
    setOpen(next);
  };

  const onSubmit = async (data: GoalFormOutput) => {
    const result = await saveGoal({ monthKey, data, goalId: goal?.id });

    if (!result.ok) {
      setError(result.field, { message: result.message });
      return;
    }

    setOpen(false);
  };

  return (
    <Drawer open={open} onOpenChange={handleOpenChange} swipeDirection="down">
      <DrawerTrigger render={trigger} />
      <DrawerContent>
        <DrawerHeader>
          <p className="font-bold text-lg">
            {goal ? "Editar meta" : "Nova meta"} · {formatMonthLabel(monthKey)}
          </p>
        </DrawerHeader>

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="px-4 pb-4 flex flex-col gap-4">
            <Field>
              <FieldLabel>Nome da meta</FieldLabel>
              <Input {...register("name")} placeholder="Ex: Meta mínima" type="text" maxLength={30} autoComplete="off" />
              {errors.name && <span className="text-destructive text-xs">{errors.name.message}</span>}
            </Field>

            <Field>
              <FieldLabel>Valor da meta (R$)</FieldLabel>
              <Input {...register("value")} placeholder="Ex: 1.500,00" type="text" inputMode="decimal" autoComplete="off" />
              {errors.value && <span className="text-destructive text-xs">{errors.value.message}</span>}
            </Field>

            <Field>
              <FieldLabel>Comissão ao bater esta meta (%)</FieldLabel>
              <Input {...register("commission")} placeholder="Ex: 1,5" type="text" inputMode="decimal" autoComplete="off" />
              {errors.commission && <span className="text-destructive text-xs">{errors.commission.message}</span>}
              <p className="text-xs text-muted-foreground mt-2">
                Opcional. Em branco, esta meta não altera a comissão.
              </p>
            </Field>

            {errors.root && <span className="text-destructive text-xs">{errors.root.message}</span>}
          </div>

          <DrawerFooter>
            <div className="flex gap-2">
              <DrawerClose render={<Button className="flex-1" size="lg" variant="outline" type="button">Cancelar</Button>} />
              <Button className="flex-1" size="lg" type="submit" disabled={isSubmitting}>
                Salvar
              </Button>
            </div>
          </DrawerFooter>
        </form>
      </DrawerContent>
    </Drawer>
  );
}
