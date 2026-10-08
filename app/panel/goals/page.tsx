'use client';

import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Empty, EmptyDescription } from "@/components/ui/empty";
import { toast } from "@/components/ui/toast";
import { useGoal } from "@/context/GoalsContext";
import { CreateGoalFormDrawer } from "@/forms/create-goal-form-drawer";
import { SetComissionFormDrawer } from "@/forms/set-comission-form-drawer";
import { SetInitialBalanceFormDrawer } from "@/forms/set-initial-balance-form-drawer";
import { formatCurrency } from "@/utils/currency";
import { EditIcon, PlusIcon, TrashIcon } from "lucide-react";

export default function GoalsPage() {
    const { goals, removeGoal, findGoalById } = useGoal();

    const handleRemoveGoal = (id: string) => {
        const goalToRemove = findGoalById(id);
        toast.add({
            title: 'Meta removida',
            description: `Meta ${goalToRemove.name} foi removida com sucesso`,
            type: 'success',
        })
        removeGoal(id)
    }

    return (
        <div className="flex flex-col gap-4">
            <div className='flex flex-row items-center justify-between'>
                <div className='flex flex-col gap-1'>
                    <p className='text-sm text-muted-foreground'>
                        Configurações · Outubro de 2026
                    </p>
                    <h1 className="text-xl font-bold">Suas metas</h1>
                </div>
                <Button variant="outline" size="icon-lg">
                    <PlusIcon />
                </Button>
            </div>
            <Card>
                <CardHeader>
                    <p className="font-bold">Saldo inicial do mês</p>
                </CardHeader>
                <CardContent>
                    <div className="flex justify-between items-center">
                        <p className="text-sm text-muted-foreground">Nenhum saldo adicionado</p>
                        <SetInitialBalanceFormDrawer trigger={<Button size="icon-lg" variant={"outline"}>
                            <EditIcon />
                        </Button>} />

                    </div>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <p className="font-bold">Comissão base</p>
                </CardHeader>
                <CardContent>
                    <div className="flex justify-between items-center">
                        <p className="text-sm text-muted-foreground">Não definida</p>
                        <SetComissionFormDrawer trigger={<Button size="icon-lg" variant={"outline"}>
                            <EditIcon />
                        </Button>} />

                    </div>
                </CardContent>
            </Card>
            {
                goals.length <= 0 ? (
                    <Card>
                        <CardContent>
                            <Empty>
                                <EmptyDescription>
                                    Nenhume meta definida ainda
                                </EmptyDescription>
                            </Empty>
                        </CardContent>
                    </Card>
                ) : (goals.map(goal => (
                    <Card key={goal.id}>
                        <CardHeader>
                            <div className="flex justify-between items-center">
                                <p className="font-bold">{goal.name}</p>
                                <div className="flex gap-2">
                                    <Button variant={"outline"} size={"icon-lg"}>
                                        <EditIcon />
                                    </Button>
                                    <AlertDialog>
                                        <AlertDialogTrigger render={<Button variant={"destructive"} size={"icon-lg"} />}>
                                            <TrashIcon />
                                        </AlertDialogTrigger>
                                        <AlertDialogContent>
                                            <AlertDialogHeader>
                                                <AlertDialogTitle>Você tem certeza?</AlertDialogTitle>
                                                <AlertDialogDescription>
                                                    Tem certeza que deseja excluir essa meta?
                                                </AlertDialogDescription>
                                            </AlertDialogHeader>
                                            <AlertDialogFooter>
                                                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                                <AlertDialogAction onClick={() => handleRemoveGoal(goal.id)} variant={"destructive"}>Confirmar</AlertDialogAction>
                                            </AlertDialogFooter>
                                        </AlertDialogContent>
                                    </AlertDialog>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="flex flex-col gap-2">
                            <p className="text-sm text-muted-foreground">{formatCurrency(goal.value, 'BRL')}</p>
                            <div className="w-full h-2 rounded-full bg-muted overflow-clip">
                                <div className="h-full bg-primary" style={{
                                    width: "50%"
                                }}>

                                </div>
                            </div>
                        </CardContent>
                        <CardFooter>
                            <div className="flex justify-between items-center w-full">
                                <p className="text-xs text-muted-foreground">1% · faltam R$ 37.620,00</p>
                                <p className="text-xs text-muted-foreground">Comissão: {goal.comission}%</p>
                            </div>
                        </CardFooter>
                    </Card>
                )))
            }

            <CreateGoalFormDrawer trigger={<Button size={"lg"} >Adicionar nova meta</Button>} />
        </div>
    )
}