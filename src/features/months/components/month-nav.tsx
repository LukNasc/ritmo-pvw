"use client";

import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatMonthLabel, shiftMonthKey } from "@/core/domain/dates";

type MonthNavProps = {
  monthKey: string;
  onChange: (monthKey: string) => void;
};

export function MonthNav({ monthKey, onChange }: MonthNavProps) {
  return (
    <div className="flex items-center justify-between">
      <Button
        variant="outline"
        size="icon-lg"
        aria-label="Mês anterior"
        onClick={() => onChange(shiftMonthKey(monthKey, -1))}
      >
        <ChevronLeftIcon />
      </Button>

      <p className="font-bold" aria-live="polite">
        {formatMonthLabel(monthKey)}
      </p>

      <Button
        variant="outline"
        size="icon-lg"
        aria-label="Próximo mês"
        onClick={() => onChange(shiftMonthKey(monthKey, 1))}
      >
        <ChevronRightIcon />
      </Button>
    </div>
  );
}
