import { Button } from "@/components/ui/button";
import { Drawer, DrawerClose, DrawerContent, DrawerFooter, DrawerHeader, DrawerTrigger } from "@/components/ui/drawer";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/toast";
import { useGoal } from "@/context/GoalsContext";
import { createGoalSchema, CreateGoalType } from "@/types/goals";
import { DrawerRoot } from "@base-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMemo, useRef } from "react";

import { useForm, useWatch } from 'react-hook-form';

type CreateGoalFormDrawerProps = {
    trigger: React.ReactElement,
} & DrawerRoot.Props


export function CreateGoalFormDrawer({ trigger, onOpenChange, open }: CreateGoalFormDrawerProps) {
    const drawerActionsRef = useRef<DrawerRoot.Actions>(null);
    const { register, handleSubmit, control, formState: { errors } } = useForm({
        resolver: zodResolver(createGoalSchema)
    })
    const { addGoal } = useGoal();
    const name = useWatch({ control, name: "name" });
    const value = useWatch({ control, name: "value" });

    const hasErrors: boolean = useMemo(() => {
        return !!(errors.comission || errors.name || errors.value)
    }, [errors])
    const hasEmptyRequiredFields = !name?.trim() || !value?.trim();

    const handleAddGoal = (data: CreateGoalType) => {
        addGoal(data);
        toast.add({
            title: 'Nova meta criada',
            description: 'A meta ' + data.name + " foi criada com sucesso",
            type: 'success',
        })
        drawerActionsRef.current?.close();
    }

    return (
        <Drawer actionsRef={drawerActionsRef} swipeDirection="down" onOpenChange={onOpenChange} open={open}>
            <DrawerTrigger render={trigger} />
            <DrawerContent >
                <DrawerHeader>
                    <p className="font-bold text-lg">Nova meta</p>
                </DrawerHeader>
                <div className="px-4 pb-4 flex flex-col gap-4">
                    <Field>
                        <FieldLabel>Nome da meta</FieldLabel>
                        <Input {...register('name')} placeholder="Ex: Meta mínima" type="text" />
                        {errors.name && <span className="text-destructive text-xs">{errors.name.message}</span>}
                    </Field>
                    <Field>
                        <FieldLabel>Valor da meta (R$)</FieldLabel>
                        <Input {...register('value')} placeholder="Ex: R$ 1.000,00" type="text" />
                        {errors.value && <span className="text-destructive text-xs">{errors.value.message}</span>}

                    </Field>
                    <Field>
                        <FieldLabel>Comissão ao bater esta meta (%)</FieldLabel>
                        <Input {...register('comission')} placeholder="Ex: 1.5%" type="number" />
                        {errors.comission && <span className="text-destructive text-xs">{errors.comission.message}</span>}

                    </Field>
                </div>
                <p className="text-xs text-muted-foreground my-4 px-4">
                    Opcional. Em branco, esta meta não altera a comissão. A meta é sempre avaliada com base nas vendas do mês atual.Opcional. Em branco, esta meta não altera a comissão. A meta é sempre avaliada com base nas vendas do mês atual.
                </p>
                <DrawerFooter>
                    <div className="flex gap-2">
                        <DrawerClose render={<Button className={"flex-1"} size={"lg"} variant={"outline"}>Cancelar</Button>} />
                        <Button className={"flex-1"} size={"lg"} disabled={hasErrors || hasEmptyRequiredFields} onClick={(event) => { void handleSubmit(handleAddGoal)(event); }}>
                            Salvar
                        </Button>
                    </div>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>

    )
}