import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { cn } from "@/lib/utils";

import { TrendingDown, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import useUserStore from "@/stores/userStore";
import useAccountStore from "@/stores/accountStore";

import accountService from "@/services/accounts";
import useFormStore from "@/stores/formStore";

function Icon({
	icon,
	variant = "default",
	className,
}: {
	icon: React.ReactNode;
	variant?: "default" | "primary" | "secondary" | "destructive";
	className?: string;
}) {
	const variants = {
		default: "shadow-accent",
		primary: "text-primary-foreground shadow-primary",
		secondary: "text-secondary-foreground shadow-secondary",
		destructive: "text-destructive shadow-destructive",
	};

	const baseStyles =
		"flex h-10 w-10 p-1.5 items-center justify-center rounded-full shadow-sm mb-4";

	return (
		<div className={cn(baseStyles, variants[variant], className)}>{icon}</div>
	);
}

const FinancialCard = ({
	icon,
	title,
	amount,
	variant,
}: {
	icon: React.ReactNode;
	title: string;
	amount: number;
	variant: "primary" | "destructive";
}) => (
	<Card className="col-span-2 px-6 py-0">
		<CardHeader className="pt-4 pb-2 px-0">
			<Icon icon={icon} variant={variant} />
			<CardTitle>{title}</CardTitle>
		</CardHeader>
		<CardContent className="py-0 px-0">
			<div className="text-4xl font-bold">${amount.toLocaleString()}</div>
		</CardContent>
	</Card>
);

export function FinancialSummary() {
	const { user } = useUserStore();
	const { account, setAccount } = useAccountStore();
	const { openForm, setFormData } = useFormStore();

	const accountQuery = useQuery({
		queryKey: ["account", user.accounts[0]],
		queryFn: accountService.fetchAccount,
		staleTime: Number.POSITIVE_INFINITY,
		enabled: false,
	});

	useEffect(() => {
		if (!account?.id) {
			accountQuery.refetch().then(({ data }) => {
				setAccount(data);
			});
		}
	});

	if (!accountQuery.isSuccess) {
		return;
	}

	const openTransactionForm = (type: "income" | "expense") => {
		setFormData("transactionForm", { type });
		openForm("transactionForm");
	};

	return (
		<div className="col-span-2 grid gap-4 md:grid-cols-7">
			<Card className="col-span-3 px-6 py-4">
				<CardHeader className="pt-0 pb-2 px-0">
					<CardTitle>Total Balance</CardTitle>
				</CardHeader>
				<CardContent className="py-0 px-0">
					<div className="text-4xl font-bold">
						${account.balance.toLocaleString()}
					</div>
					<div className="mt-4 flex gap-4 *:w-full">
						<Button type="button" onClick={() => openTransactionForm("income")}>
							Add Income
						</Button>
						<Button
							type="button"
							variant="secondary"
							onClick={() => openTransactionForm("expense")}
						>
							Add Expence
						</Button>
					</div>
				</CardContent>
			</Card>

			<FinancialCard
				icon={<TrendingUp />}
				title="Income"
				amount={account.incomeThisMonth}
				variant="primary"
			/>

			<FinancialCard
				icon={<TrendingDown />}
				title="Expenses"
				amount={account.expenseThisMonth}
				variant="destructive"
			/>
		</div>
	);
}
