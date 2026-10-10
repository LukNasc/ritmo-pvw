import { useViewedMonth } from "@/features/months/hooks/use-viewed-month"
import { useGoalsOverview } from "../hooks/use-goals-overview"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Button } from "@/components/ui/button";
import { GoalFormDrawer } from "./goal-form-drawer";
import { Goal } from "@/core/db/schema";
import { useEffect, useState } from "react";

type GoalSelectorProps = {
    onChange?: (goal: Goal) => void;
}

export function GoalSelector({ onChange }: GoalSelectorProps) {
    const { monthKey } = useViewedMonth();
    const overview = useGoalsOverview(monthKey)

    const [selectedGoal, setSelectedGoal] = useState<Goal | null>(null);

    useEffect(() => {
        if (!overview.isLoading)
            onChange?.(selectedGoal ?? overview.goals[0].goal)
    }, [onChange, overview, selectedGoal])

    if (overview.isLoading) {
        return <p>Aguarde...</p>
    }

    return (
        <ToggleGroup variant="outline" value={[selectedGoal?.id ?? overview.goals[0].goal.id]}>
            {
                overview.goals.length > 1 && (
                    overview.goals.map((goal) => (
                        <ToggleGroupItem key={goal.goal.id} value={goal.goal.id} onClick={() => setSelectedGoal(goal.goal)} >
                            <p>{goal.goal.name}</p>
                        </ToggleGroupItem>
                    ))
                )
            }
            {
                overview.goals.length > 1 && (
                    <GoalFormDrawer monthKey={monthKey} trigger={<Button>+ Nova meta</Button>} />
                )
            }
        </ToggleGroup>
    )
}