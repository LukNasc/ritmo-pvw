'use client'

import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { MonthCalendar } from "@/components/calendar/month-calendar";
import { FlagIcon, PlusIcon, SettingsIcon } from "lucide-react";
import { formatCurrency } from "@/utils/currency";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia } from "@/components/ui/empty";
import { MonthHeatmap } from "@/components/calendar/month-heatmap";
import { useState } from "react";
import { CreateSalesFormDrawer } from "@/forms/create-sales-form-drawer";
import { CreateGoalFormDrawer } from "@/forms/create-goal-form-drawer";
import { useUserProfile } from "@/context/UserProfileContext";

export default function Dashboard() {
    const { username } = useUserProfile();
    const [currentDate, setCurrentDate] = useState<Date>(new Date());

    return (
        <div className='flex flex-col gap-4'>
            <div className='flex flex-row items-center justify-between'>
                <div className='flex flex-col gap-1'>
                    <p className='text-sm text-muted-foreground'>
                        Olá, {username} · Outubro de 2026
                    </p>
                    <h1 className="text-xl font-bold">Seu Painel</h1>
                </div>
                <Button size="icon-lg" variant={"outline"}>
                    <SettingsIcon />
                </Button >
            </div>
            <MonthCalendar onChangeMonth={(date) => setCurrentDate(date)} />

            <Card>
                <CardHeader>
                    <p className="text-xs text-muted-foreground">Total vendido em Outubro de 2026 </p>
                </CardHeader>
                <CardContent className="flex flex-col gap-2">
                    <p className="text-4xl font-bold">
                        {formatCurrency(0)}
                    </p>
                </CardContent>
                <CardFooter>
                    <p className="text-xs">Dia 5 de 31 · 3 dia(s) registrado(s)</p>
                </CardFooter>

            </Card>
            <Button variant="ghost" size="sm" className="h-auto w-full justify-start text-left whitespace-normal text-primary hover:text-primary">
                + Já vendeu algo antes de começar a registrar? Adicionar saldo inicial
            </Button>
            <Button variant="ghost" size="sm" className="h-auto w-full justify-start text-left whitespace-normal text-primary hover:text-primary">
                + Definir dias de trabalho previstos (para cálculo da meta diária)
            </Button>
            <Card>
                <CardHeader className="flex justify-between">
                    <p className="text-xs text-muted-foreground">Comissão à receber</p>
                    <Badge variant="secondary">Sem bater meta</Badge>
                </CardHeader>
                <CardContent className="flex flex-col gap-2">
                    <div>
                        <p className="text-2xl font-bold">
                            {formatCurrency(0)}
                        </p>
                        <p className="text-xs text-muted-foreground">0% sobre o total vendido</p>
                    </div>
                </CardContent>
                <CardFooter>
                    <p className="text-xs">Defina a comissão base na aba de metas</p>
                </CardFooter>
            </Card>
            <Card>
                <Empty>
                    <EmptyHeader>
                        <EmptyMedia variant="icon">
                            <FlagIcon className="text-primary" />
                        </EmptyMedia>
                        <EmptyDescription>
                            Você ainda não tem nenhuma meta cadastrada.
                            Crie a primeira para começar a acompanhar seu progresso.
                        </EmptyDescription>
                    </EmptyHeader>
                    <EmptyContent>
                        <CreateGoalFormDrawer trigger={<Button size="lg" className="w-full">Criar minha primeira meta </Button>} />

                    </EmptyContent>
                </Empty>
            </Card>
            <h2 className="text-base font-bold">Histórico</h2>
            <Card>
                <Empty>
                    <EmptyContent>
                        <EmptyDescription>
                            Nenhum dia registrado ainda.
                            Toque no botão + para adicionar o primeiro.
                        </EmptyDescription>
                    </EmptyContent>
                </Empty>
            </Card>
            <h2 className="text-base font-bold">Mapa de calor</h2>
            <Card>
                <CardContent>
                    <MonthHeatmap currentDate={currentDate} />
                </CardContent>
                <CardFooter>
                    <p className="text-xs">Nenhum registro esse mês</p>
                </CardFooter>
            </Card>

            <CreateSalesFormDrawer
                trigger={<Button size="lg" className={"fixed bottom-17 right-2 flex items-center justify-center rounded-full h-15 w-15"}><PlusIcon /></Button>}
            />

        </div>
    );
}
