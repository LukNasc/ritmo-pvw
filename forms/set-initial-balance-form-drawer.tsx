import { Button } from "@/components/ui/button";
import { Drawer, DrawerClose, DrawerContent, DrawerFooter, DrawerHeader, DrawerTrigger } from "@/components/ui/drawer";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { DrawerRoot } from "@base-ui/react";

type SetInitialBalanceFormDrawerProps = {
    trigger: React.ReactElement,
    onConfirm?: (data: unknown) => void
} & DrawerRoot.Props

export function SetInitialBalanceFormDrawer({ trigger, onOpenChange, onConfirm, open }: SetInitialBalanceFormDrawerProps) {

    return (
        <Drawer swipeDirection="down" onOpenChange={onOpenChange} open={open}>
            <DrawerTrigger render={trigger} />
            <DrawerContent >
                <DrawerHeader>
                    <p className="font-bold text-lg">Comissão base</p>
                </DrawerHeader>
                <div className="px-4 pb-4 flex flex-col gap-4">
                    <p className="text-xs text-muted-foreground">
                        Use isso se você já vendeu algo em Outubro de 2026 antes de começar a registrar os dias individualmente. Esse valor entra no total do mês, mas não afeta sua média diária calculada a partir dos registros.
                    </p>
                    <Field>
                        <FieldLabel>Valor já vendido (R$)</FieldLabel>
                        <Input placeholder="Ex: R$ 1.200,00" type="text" />
                    </Field>
                </div>

                <DrawerFooter>
                    <div className="flex gap-2">
                        <DrawerClose render={<Button className={"flex-1"} size={"lg"} variant={"outline"}>Cancelar</Button>} />
                        <Button className={"flex-1"} size={"lg"} onClick={onConfirm}>
                            Salvar
                        </Button>
                    </div>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>

    )
}