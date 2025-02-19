import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import { CategoryChart } from "@/components/CategoryChart";
import { Chart } from "@/components/FinanceChart";
import { FinancialSummary } from "@/components/FinancialSummary";
import { TransactionList } from "@/components/TransactionList";

import authService from "@/services/auth";
import useUserStore from "@/stores/userStore";
import { TransactionDialog } from "@/components/TransactionFormDialog";
import { CategoryFormDialog } from "@/components/CategoryFormDialog";

function Dashboard() {
	const navigate = useNavigate();
	const { user, setUser } = useUserStore();

	const tokenLogin = useQuery({
		queryKey: ["login"],
		queryFn: authService.loginByToken,
		enabled: false,
		retry: false,
	});

	const username = user?.username;

	useEffect(() => {
		if (!username) {
			if (authService.isLoggedIn()) {
				tokenLogin.refetch().then(({ data }) => {
					setUser(data);
				});
			} else {
				navigate("/");
			}
		}
	});

	if (!username) {
		return null;
	}

	return (
		<div className="min-h-screen max-h-screen flex w-full max-w-screen-2xl mx-auto">
			<main className="flex-1 p-8 bg-background">
				<div className="h-20">
					<h1 className="text-4xl font-bold">Dashboard</h1>
				</div>

				{/* Main Content Grid */}
				<div className="grid grid-cols-3 gap-4 h-[calc(100%-4rem)] ">
					{/* Left Column */}
					<div className="col-span-2 space-y-4">
						<FinancialSummary />
						<TransactionList />
					</div>

					{/* Right Column */}
					<div className="col-span-1 space-y-4">
						<Chart />
						<CategoryChart />
					</div>
				</div>

				<TransactionDialog />
				<CategoryFormDialog />
			</main>
		</div>
	);
}

export default Dashboard;
