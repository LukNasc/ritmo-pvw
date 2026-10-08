'use client'

import { eachDayOfInterval, endOfWeek, getDaysInMonth, startOfWeek, format, startOfMonth, getDay } from "date-fns";
import { ptBR } from 'date-fns/locale'
import { useEffect } from "react";

type MonthHeatmapProps = {
    currentDate?: Date
}

function getWeekdayLabels(weekStartsOn: 0 | 1 = 0) {
    const now = new Date();
    return eachDayOfInterval({
        start: startOfWeek(now, { weekStartsOn }),
        end: endOfWeek(now, { weekStartsOn })
    }).map((d) => format(d, 'EEE', { locale: ptBR }))
}

export function MonthHeatmap({ currentDate = new Date() }: MonthHeatmapProps) {

    const daysInMonth = getDaysInMonth(currentDate);
    const first = getDay(startOfMonth(currentDate))

    return (
        <div className="flex flex-col gap-4">
            <div className="grid grid-cols-7 gap-1">
                {getWeekdayLabels().map(item => (
                    <div key={item} className="text-center text-xs text-muted-foreground">{item.substring(0, 3)}</div>
                ))}
                {
                    Array.from({ length: first }).map((_, index) => (
                        <div key={index + 'prev-month'} className="flex items-center  justify-center aspect-[1] rounded-md" />
                    ))
                }
                {Array.from({ length: daysInMonth }).map((_, index) => (
                    <div key={index} className="flex items-center  justify-center aspect-[1] rounded-md border border-dashed border-border">{index + 1}</div>
                ))}
            </div>
            <div className="flex flex-col">
                <div className="w-full h-1.5 bg-linear-to-r to-red-500 from-blue-500 rounded-full" />
                <div className="flex justify-between">
                    <p className="text-xs mt-2 text-muted-foreground">pior</p>
                    <p className="text-xs mt-2 text-muted-foreground">melhor</p>
                </div>
            </div>

        </div>

    )
}