import { Button } from "@/components/ui/button";
import { Drawer, DrawerClose, DrawerContent, DrawerFooter, DrawerHeader, DrawerTrigger } from "@/components/ui/drawer";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { DrawerRoot } from "@base-ui/react";

type SetComissionFormDrawerProps = {
    trigger: React.ReactElement,
    onConfirm?: (data: unknown) => void
} & DrawerRoot.Props

export function SetComissionFormDrawer({ trigger, onOpenChange, onConfirm, open }: SetComissionFormDrawerProps) {

    return (
        <Drawer swipeDirection="down" onOpenChange={onOpenChange} open={open}>
            <DrawerTrigger render={trigger} />
            <DrawerContent >
                <DrawerHeader>
                    <p className="font-bold text-lg">Comissão base</p>
                </DrawerHeader>
                <div className="px-4 pb-4 flex flex-col gap-4">
                    <p className="text-xs text-muted-foreground">
                        Percentual aplicado sobre o total vendido no mês enquanto nenhuma meta com comissão for atingida.
                    </p>
                    <Field>
                        <FieldLabel>
                            Comissão (%)
                        </FieldLabel>
                        <Input placeholder="Ex: 1%" type="text" />
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