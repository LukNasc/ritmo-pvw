import { EmptyGoals } from "./empty-goals"
import { GoalSelector } from "./goal-selector";
import { GoalProgressChart } from "./goal-progress-chart";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useState } from "react";
import { Goal } from "@/core/db/schema";
import { formatBRL } from "@/core/domain/money";
import { GoalWithProgress } from "../hooks/use-goals-overview";

type GoalsProgressSectionProps = {
    goals: GoalWithProgress[],
    monthKey: string;
}

export function GoalsProgressSection({ monthKey, goals }: GoalsProgressSectionProps) {
    const [selectedGoal, setSelectedGoal] = useState<Goal>({} as Goal);

    if (goals.length === 0) {
        return <EmptyGoals monthKey={monthKey} />
    }

    return (
        <div className="flex flex-col gap-4">
            <GoalSelector onChange={(goal) => setSelectedGoal(goal)} />
            <Card>
                <CardHeader>
                    <p className="flex gap-1">
                        <span className="font-bold">
                            {selectedGoal.name}:
                        </span>
                        {formatBRL(selectedGoal.valueCents)}
                    </p>
                </CardHeader>
                <CardContent>
                    <GoalProgressChart goal={selectedGoal} />
                </CardContent>
            </Card>
        </div>
    )
}