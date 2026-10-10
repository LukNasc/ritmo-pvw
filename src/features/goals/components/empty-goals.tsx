import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia } from "@/components/ui/empty";
import { FlagIcon } from "lucide-react";
import { GoalFormDrawer } from "./goal-form-drawer";

type EmptyGoalsProps = {
    monthKey: string
}

export function EmptyGoals({ monthKey }: EmptyGoalsProps) {
    return (
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
                    <GoalFormDrawer monthKey={monthKey} trigger={<Button size="lg" className="w-full">Criar minha primeira meta </Button>} />
                </EmptyContent>
            </Empty>
        </Card>
    )
}