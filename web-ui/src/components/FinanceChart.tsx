"use client";

import { Area, AreaChart, CartesianGrid, Legend, XAxis } from "recharts";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	type ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from "@/components/ui/chart";

import useAccountStore from "@/stores/accountStore";

const chartConfig = {
	income: {
		label: "Income",
		color: "hsl(var(--chart-1))",
	},
	expense: {
		label: "Expense",
		color: "hsl(var(--chart-2))",
	},
} satisfies ChartConfig;

export function Chart() {
	const {
		account: { transactionsThisMonthByDay },
	} = useAccountStore();

	if (!transactionsThisMonthByDay?.incomes) {
		return null;
	}

	const today = new Date().getDate();
	const data = generateChartData(transactionsThisMonthByDay, today);

	return (
		<Card className="col-start-3 row-start-1 row-span-2">
			<CardHeader>
				<CardTitle>Overview</CardTitle>
				<CardDescription>Daily</CardDescription>
			</CardHeader>
			<CardContent>
				<ChartContainer config={chartConfig}>
					<AreaChart data={data} margin={{}}>
						<CartesianGrid vertical={false} />
						<XAxis
							dataKey="day"
							tickLine={false}
							axisLine={false}
							tickFormatter={() => ""}
							height={10}
						/>
						<ChartTooltip cursor={false} content={<ChartTooltipContent />} />
						<defs>{renderGradients()}</defs>
						<Area
							dataKey="expense"
							type="monotone"
							fill="url(#fillMobile)"
							fillOpacity={0.4}
							stroke="var(--color-expense)"
						/>
						<Area
							dataKey="income"
							type="monotone"
							fill="url(#fillDesktop)"
							fillOpacity={0.4}
							stroke="var(--color-income)"
						/>
						<Legend verticalAlign="bottom" />
					</AreaChart>
				</ChartContainer>
			</CardContent>
		</Card>
	);
}

function generateChartData(
	transactions: { incomes: number[]; expenses: number[] },
	today: number,
) {
	const data = [];
	const { incomes, expenses } = transactions;

	for (let i = 0; i < today; i++) {
		data.push({
			day: i + 1,
			income: incomes[i],
			expense: expenses[i],
		});
	}

	for (let i = today; i < incomes.length; i++) {
		data.push({
			day: i + 1,
			income: null,
			expense: null,
		});
	}

	return data;
}

function renderGradients() {
	return (
		<>
			<linearGradient id="fillDesktop" x1="0" y1="0" x2="0" y2="1">
				<stop offset="0%" stopColor="var(--color-income)" stopOpacity={0.8} />
				<stop offset="95%" stopColor="var(--color-income)" stopOpacity={0.1} />
			</linearGradient>
			<linearGradient id="fillMobile" x1="0" y1="0" x2="0" y2="1">
				<stop offset="0%" stopColor="var(--color-expense)" stopOpacity={0.8} />
				<stop offset="95%" stopColor="var(--color-expense)" stopOpacity={0.1} />
			</linearGradient>
		</>
	);
}
