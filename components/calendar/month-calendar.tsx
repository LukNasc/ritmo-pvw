"use client";

import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { addMonths, format, isAfter, isBefore, startOfMonth } from "date-fns";
import { ptBR } from "date-fns/locale";
import { IconButton } from "../ui/icon-button";

type MonthCalendarProps = {
    onChangeMonth?: (currentDate: Date) => void;
}

export function MonthCalendar({ onChangeMonth }: MonthCalendarProps) {
    const [month, setMonth] = useState(() => startOfMonth(new Date()));
    const currentMonth = startOfMonth(new Date());
    const isCurrentMonthOrLater = !isBefore(month, currentMonth);
    const monthName = format(month, "LLLL yyyy", { locale: ptBR });
    const label = `${monthName.charAt(0).toLocaleUpperCase("pt-BR")}${monthName.slice(1)}`;

    useEffect(() => {
        onChangeMonth?.(month)
    }, [month, onChangeMonth])

    function changeMonth(offset: number) {
        setMonth((currentMonth) => {
            const nextMonth = addMonths(currentMonth, offset);
            const exceedsCurrentMonth = isAfter(nextMonth, startOfMonth(new Date()));

            return offset > 0 && exceedsCurrentMonth ? currentMonth : nextMonth;
        });
    }



    return (
        <div className="flex items-center justify-between gap-3">
            <IconButton
                type="button"
                aria-label="Mês anterior"
                onClick={() => changeMonth(-1)}
            >
                <ChevronLeft aria-hidden="true" className="size-5" />
            </IconButton>
            <time
                dateTime={format(month, "yyyy-MM")}
                className="text-center text-sm font-semibold capitalize"
            >
                {label}
            </time>
            <IconButton
                type="button"
                aria-label="Próximo mês"
                disabled={isCurrentMonthOrLater}
                onClick={() => changeMonth(1)}
            >
                <ChevronRight aria-hidden="true" className="size-5" />
            </IconButton>
        </div>
    );
}