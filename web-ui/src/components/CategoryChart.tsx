import { Pie, PieChart, Legend } from "recharts";
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
		return null;
	}

	const { chartConfig, chartData } = prepareChartData(
		expenseThisMonthByCategory,
	);

	return (
		<Card className="row-span-2 flex flex-col">
			<CardHeader className="pb-0">
				<CardTitle>Spending this month</CardTitle>
				<CardDescription>
					{new Date().toLocaleString(undefined, { month: "long" })}
				</CardDescription>
			</CardHeader>
			<CardContent className="flex-1 pb-2">
				<ChartContainer
					config={chartConfig}
					className="mx-auto aspect-square w-full h-full max-h-[300px] mb-4"
				>
					<PieChart>
						<ChartTooltip
							cursor={false}
							content={<ChartTooltipContent hideLabel />}
						/>
						<Pie data={chartData} dataKey="amount" nameKey="name" />
						<Legend
							layout="vertical"
							verticalAlign="middle"
							align="right"
							wrapperStyle={{ paddingLeft: "20px" }}
						/>
					</PieChart>
				</ChartContainer>
			</CardContent>
		</Card>
	);
}

function prepareChartData(
	expenseData: Record<string, { amount: number; color: string }>,
) {
	const chartConfig: ChartConfig = {};
	const chartData: Category[] = [];

	for (const category in expenseData) {
		chartConfig[category] = { label: category };

		const { amount, color } = expenseData[category];

		chartData.push({
			name: category,
			amount,
			fill: color.toLowerCase(),
		});
	}

	return { chartConfig, chartData };
}
