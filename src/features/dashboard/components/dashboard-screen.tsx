'use client'

import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { PlusIcon, SettingsIcon } from "lucide-react";
import { formatCurrency } from "@/utils/currency";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Empty, EmptyContent, EmptyDescription } from "@/components/ui/empty";
import { CreateSalesFormDrawer } from "@/forms/create-sales-form-drawer";
import { useUserProfile } from "@/context/UserProfileContext";
import { MonthNav } from "@/features/months/components/month-nav";
import { useViewedMonth } from "@/features/months/hooks/use-viewed-month";
import { MonthHeatmap } from "@/features/months/components/month-heatmap";
import { GoalsProgressSection } from "@/features/goals/components/goals-progress-section";
import { useGoalsOverview } from "@/features/goals/hooks/use-goals-overview";
import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardScreen() {
    const { username } = useUserProfile();
    const { monthKey, setMonthKey } = useViewedMonth();
    const overview = useGoalsOverview(monthKey);


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
            <MonthNav monthKey={monthKey} onChange={setMonthKey} />

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
            {
                overview.isLoading ? (
                    <Skeleton className="w-full h-50" />
                ) : (
                    <GoalsProgressSection monthKey={monthKey} goals={overview.goals} />
                )
            }

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
                    <MonthHeatmap />
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
