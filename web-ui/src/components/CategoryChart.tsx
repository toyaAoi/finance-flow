import { Legend, Pie, PieChart } from "recharts";

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

type Category = {
	name: string;
	amount: number;
	fill: string;
};

export function CategoryChart() {
	const {
		account: { expenseThisMonthByCategory },
	} = useAccountStore();

	if (!expenseThisMonthByCategory) {
		return;
	}

	const chartConfig = {} as ChartConfig;
	const chartData = [] as Category[];

	for (const category in expenseThisMonthByCategory) {
		chartConfig[category] = { label: category };

		const categoryData = expenseThisMonthByCategory[category];

		chartData.push({
			name: category,
			amount: categoryData.amount,
			fill: categoryData.color.toLowerCase(),
		});
	}

	return (
		<Card className="flex flex-col">
			<CardHeader className="pb-0">
				<CardTitle>Spending this month</CardTitle>
				<CardDescription>
					{new Date().toLocaleString(undefined, { month: "long" })}
				</CardDescription>
			</CardHeader>
			<CardContent className="flex-1 pb-0">
				<ChartContainer
					config={chartConfig}
					className="mx-auto aspect-square max-h-[300px] mb-4"
				>
					<PieChart>
						<ChartTooltip
							cursor={false}
							content={<ChartTooltipContent hideLabel />}
						/>
						<Pie data={chartData} dataKey="amount" nameKey="name" />
						<Legend />
					</PieChart>
				</ChartContainer>
			</CardContent>
		</Card>
	);
}
