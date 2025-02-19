import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import { CategoryChart } from "@/components/CategoryChart";
import { Chart } from "@/components/FinanceChart";
import { FinancialSummary } from "@/components/FinancialSummary";
import { TransactionList } from "@/components/TransactionList";
import { TransactionDialog } from "@/components/TransactionFormDialog";
import { CategoryFormDialog } from "@/components/CategoryFormDialog";

import authService from "@/services/auth";
import useUserStore from "@/stores/userStore";

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
		<div className="min-h-screen  w-full max-w-screen-2xl mx-auto">
			<main className="flex-1 md:h-screen px-8  bg-background">
				<div className="py-2">
					<h1 className="text-2xl font-bold">Dashboard</h1>
				</div>

				{/* Main Content Grid */}
				<div className="grid grid-cols-3 grid-rows-4 gap-4 lg:h-[calc(100%-4rem)] lg:overflow-hidden">
					{/* Left Column */}
						<FinancialSummary />
						<TransactionList />

					{/* Right Column */}
						<Chart />
						<CategoryChart />
				</div>

				<TransactionDialog />
				<CategoryFormDialog />
			</main>
		</div>
	);
}

export default Dashboard;
