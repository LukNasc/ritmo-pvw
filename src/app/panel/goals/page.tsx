import { Suspense } from "react";
import { GoalsScreen } from "@/features/goals/components/goals-screen";
import { GoalsSkeleton } from "@/features/goals/components/goals-skeleton";


export default function GoalsPage() {
    return (
        <Suspense fallback={<GoalsSkeleton />}>
            <GoalsScreen />
        </Suspense>
    );
}
