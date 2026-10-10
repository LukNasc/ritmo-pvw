import { Skeleton } from "@/components/ui/skeleton";

export function DashboardSkeleton() {
    return (
        <div className="flex flex-col gap-4" aria-busy="true" aria-label="Carregando dashboard">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-32 w-full" />
        </div>
    );
}
