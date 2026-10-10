import { Skeleton } from "@/components/ui/skeleton";

export function GoalsSkeleton() {
  return (
    <div className="flex flex-col gap-4" aria-busy="true" aria-label="Carregando metas">
      <Skeleton className="h-10 w-full" />
      <Skeleton className="h-24 w-full" />
      <Skeleton className="h-24 w-full" />
      <Skeleton className="h-32 w-full" />
    </div>
  );
}
