import { Button } from "@/components/ui/button";
import { Drawer, DrawerClose, DrawerContent, DrawerFooter, DrawerHeader, DrawerTrigger } from "@/components/ui/drawer";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { DrawerRoot } from "@base-ui/react";

type CreateSalesFormDrawerProps = {
    trigger: React.ReactElement,
    onConfirm?: (data: unknown) => void
} & DrawerRoot.Props

export function CreateSalesFormDrawer({ trigger, onOpenChange, onConfirm, open }: CreateSalesFormDrawerProps) {

    return (
        <Drawer swipeDirection="down" onOpenChange={onOpenChange} open={open}>
            <DrawerTrigger render={trigger} />
            <DrawerContent>
                <DrawerHeader>
                    <p className="font-bold text-lg">Registrar dia de vendas</p>
                </DrawerHeader>
                <div className="px-4 pb-4 flex flex-col gap-4">
                    <Field>
                        <FieldLabel>Data</FieldLabel>
                        <Input className="h-12.5" type="date" />
                    </Field>
                    <Field>
                        <FieldLabel>Horas trabalhadas</FieldLabel>
                        <Input className="h-12.5" type="number" />
                    </Field>
                    <Field>
                        <FieldLabel>Valor vendido</FieldLabel>
                        <Input className="h-12.5" type="number" />
                    </Field>
                </div>
                <DrawerFooter>
                    <div className="flex gap-2">
                        <DrawerClose render={<Button className={"flex-1"} size={"lg"} variant={"outline"}>Cancelar</Button>} />
                        <Button className={"flex-1"} size={"lg"} onClick={onConfirm}>
                            Registrar venda
                        </Button>
                    </div>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>

    )
}