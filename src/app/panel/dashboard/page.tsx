'use client'

import { Suspense } from "react";
import DashboardScreen from "@/features/dashboard/components/dashboard-screen";
import { DashboardSkeleton } from "@/features/dashboard/components/dashboard-skeleton";

export default function Dashboard() {
    return (
        <Suspense fallback={<DashboardSkeleton />}>
            <DashboardScreen />
        </Suspense>
    )
}
