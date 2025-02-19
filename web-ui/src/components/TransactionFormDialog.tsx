import { useForm } from "react-hook-form";
import { format } from "date-fns";
// import { useMutation } from "@tanstack/react-query";

import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

// import transactionService from "@/services/transactions";
import useAccountStore from "@/stores/accountStore";
import useFormStore, { type TransactionForm } from "@/stores/formStore";
import { useCallback, useEffect } from "react";

export const TransactionDialog = () => {
	const { account, addTransaction } = useAccountStore();
	const {
		forms: { transactionForm },
		openForm,
		closeForm,
	} = useFormStore();

	const getFormValues = useCallback(
		() => ({
			type: transactionForm.data.type || "expense",
			amount: transactionForm.data.amount || 0,
			category: transactionForm.data.category || "Uncategorized",
			time: transactionForm.data.time || format(new Date(), "yyyy-MM-dd"),
			notes: transactionForm.data.notes || "",
		}),
		[transactionForm.data],
	); 

	const form = useForm<TransactionForm["data"]>({
		defaultValues: getFormValues(),
	});

	useEffect(() => {
		if (transactionForm.active) {
			form.reset(getFormValues());
		}
	}, [form, getFormValues, transactionForm.active]);

	// const isEdit = transactionForm.data.amount !== undefined;
	// console.log("don't mind me", isEdit);

	// const createTransactionMutation = useMutation({
	//   mutationFn: transactionService.create,
	//   onSuccess: (data) => {
	//     console.log(data);
	//   },
	// });

	function handleFormSubmit(data: TransactionForm["data"]) {
		// console.log("don't mind me", typeof data.amount);
		// createTransactionMutation.mutate({ ...data, accountId: account.id });
		// should be after await
		closeForm("transactionForm");
		addTransaction({
			...data,
			amount: Number(data.amount),
			id: "2342308342",
			category: { name: data.category, color: "red", id: "9923" },
			time: new Date(data.time),
		});
	}

	// account data is fetched while Dashboard renders
	// Refer to Dashboard.tsx
	if (!account.transactionCategories) {
		return;
	}

	return (
		<Dialog
			open={transactionForm.active}
			onOpenChange={() => closeForm("transactionForm")}
		>
			<DialogContent className="sm:max-w-[450px] pb-2">
				<DialogHeader>
					<DialogTitle>Edit profile</DialogTitle>
					<DialogDescription>Add details</DialogDescription>
				</DialogHeader>
				<form
					className="grid gap-4 py-4"
					onSubmit={form.handleSubmit(handleFormSubmit)}
				>
					<div className="grid grid-cols-4 items-center gap-4">
						<Label className="text-right">Type</Label>
						<Select
							defaultValue={transactionForm.data.type}
							onValueChange={(data: "income" | "expense") =>
								form.setValue("type", data)
							}
							required
						>
							<SelectTrigger className="h-12 col-span-3">
								<SelectValue />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="income">Income</SelectItem>
								<SelectItem value="expense">Expense</SelectItem>
							</SelectContent>
						</Select>
					</div>

					<div className="grid grid-cols-4 items-center gap-4">
						<Label className="text-right">Amount</Label>
						<Input
							required
							type="number"
							{...form.register("amount")}
							className="col-span-3"
						/>
					</div>

					<div className="grid grid-cols-4 items-center gap-4">
						<Label className="text-right">Category</Label>
						<Select
							defaultValue={form.getValues("category")}
							onValueChange={(data) => form.setValue("category", data)}
						>
							<SelectTrigger className={"h-12 col-span-2 "}>
								<SelectValue />
							</SelectTrigger>
							<SelectContent side="bottom" sideOffset={-100} className="h-52">
								<SelectGroup>
									{account.transactionCategories.map((category) => (
										<SelectItem value={category.name} key={category.name}>
											{category.name}
										</SelectItem>
									))}
									<SelectItem value="Uncategorized">Uncategorized</SelectItem>
								</SelectGroup>
							</SelectContent>
						</Select>
						<Button
							variant="outline"
							type="button"
							onClick={() => openForm("transactionCategoryForm")}
						>
							+ New
						</Button>
					</div>

					<div className="grid grid-cols-4 items-center gap-4">
						<Label className="text-right">Date</Label>
						<Input
							type="date"
							defaultValue={form.getValues("time")}
							{...form.register("time")}
							className="col-span-3"
						/>
					</div>

					<div className="grid grid-cols-4 items-center gap-4">
						<Label className="text-right">Notes</Label>
						<Textarea
							{...form.register("notes")}
							className="col-span-3"
							placeholder="Add some notes here..."
						/>
					</div>

					<Button type="submit">Save</Button>
				</form>
			</DialogContent>
		</Dialog>
	);
};
