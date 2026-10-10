import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { formatCurrency } from "@/utils/currency";
import { CartesianGrid, Line, LineChart, TooltipPayload, TooltipPayloadEntry, XAxis, YAxis } from "recharts";
import { NameType, ValueType } from "recharts/types/component/DefaultTooltipContent";
import { Goal } from "@/core/db/schema";
import { formatBRL } from "@/core/domain/money";
import { Separator } from "@/components/ui/separator";

type GoalProgressChartProps = {
    goal: Goal
}

const chartConfig = {
    value: {
        label: "Valor",
        color: "var(--color-emerald-400)",
    },
    goal: {
        label: "Meta",
        color: "var(--color-gray-500)",
    },
    trend: {
        label: "Tendência",
        color: "var(--chart-1)",
    },
} satisfies ChartConfig

function handleTickFormat(value: number) {
    if (value === 0) {
        return String(0)
    }
    return `${formatBRL(value).split('.')[0]}k`
}

export function GoalProgressChart({ goal }: GoalProgressChartProps) {

    const chartData = [{
        date: '1',
        value: 228600,
        goal: goal.valueCents
    },
    {
        date: '2',
        value: 278300,
        goal: goal.valueCents
    },
    {
        date: '3',
        value: 438900,
        goal: goal.valueCents
    },
    {
        date: '4',
        value: 438900,
        goal: goal.valueCents
    },
    {
        date: '5',
        value: 458800,
        goal: goal.valueCents
    },
    {
        date: '6',
        value: 505600,
        goal: goal.valueCents
    },
    {
        date: '7',
        value: 561200,
        goal: goal.valueCents
    },
    {
        date: '8',
        value: 642800,
        goal: goal.valueCents
    },
    {
        date: '9',
        value: 711900,
        goal: goal.valueCents
    },
    {
        date: '10',
        value: 955900,
        trend: 955900,
        goal: goal.valueCents
    },
    {
        date: '11',
        trend: 1300000,
        goal: goal.valueCents
    },
    {
        date: '12',
        trend: 1400000,
        goal: goal.valueCents
    },
    {
        date: '13',
        trend: 1500000,
        goal: goal.valueCents
    },
    {
        date: '14',
        trend: 1600000,
        goal: goal.valueCents
    },
    {
        date: '15',
        trend: 1700000,
        goal: goal.valueCents
    },
    {
        date: '16',
        trend: 1800000,
        goal: goal.valueCents
    },
    {
        date: '17',
        trend: 1900000,
        goal: goal.valueCents
    },
    {
        date: '18',
        trend: 2000000,
        goal: goal.valueCents
    },
    {
        date: '19',
        trend: 2200000,
        goal: goal.valueCents
    },
    {
        date: '20',
        trend: 2500000,
        goal: goal.valueCents
    },]

    return (
        <div className="flex flex-col gap-2">

            <ChartContainer config={chartConfig}>
                <LineChart
                    accessibilityLayer
                    data={chartData}
                >
                    <CartesianGrid vertical={false} />
                    <XAxis dataKey='date' interval={3} axisLine={false} />
                    <YAxis width={50} tickMargin={0} dataKey='value' domain={[0, goal.valueCents + 550000]} tick={{ fontSize: 12 }} tickLine={false} axisLine={false} />
                    <YAxis width={50} tickMargin={0} dataKey='goal' domain={[0, goal.valueCents + 550000]} tickFormatter={handleTickFormat} tick={{ fontSize: 12 }} tickLine={false} axisLine={false} />
                    <ChartTooltip cursor={false} content={<ChartTooltipContent formatter={(value, name, item) => (<TooltipContent value={value} name={name} item={item} />)} />} />
                    <Line dataKey={"goal"} dot={false} stroke="var(--color-goal)" strokeDasharray={"2 2"} />
                    <Line dataKey={"value"} dot={false} stroke="var(--color-value)" strokeWidth={3} />
                    <Line dataKey={"trend"} dot={false} stroke="var(--color-trend)" strokeDasharray={"4 4"} />
                </LineChart>
            </ChartContainer>
            <Separator />

            <div className="flex items-center gap-2 pt-2">
                {
                    Object.values(chartConfig).map(item => (
                        <div key={item.label} className="flex gap-1 items-center">
                            <div className="w-2 h-2" style={{ backgroundColor: item.color }}></div>
                            <p className="text-muted-foreground text-xs">{item.label}</p>
                        </div>
                    ))
                }
            </div>


        </div>

    )
}

function TooltipContent({ value, name, item }: { value: ValueType | undefined, name: NameType | undefined, item: TooltipPayloadEntry }) {
    const label = typeof name === 'string' ? chartConfig[name as keyof typeof chartConfig]?.label ?? name : name;

    return (
        <div className="flex items-center gap-1">
            <div className="w-2.5 h-2.5" style={{ backgroundColor: item.color }}></div>
            <p className="text-xs">{label}</p>
            <p className="text-xs font-bold">{formatBRL(Number(value))}</p>
        </div>
    )
}