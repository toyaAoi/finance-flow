import { useForm } from "react-hook-form";

import {
	Dialog,
	DialogHeader,
	DialogContent,
	DialogTitle,
} from "@/components/ui/dialog";
import type { TransactionCategory } from "@/stores/accountStore";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

import useFormStore from "@/stores/formStore";
import useAccountStore from "@/stores/accountStore";
import { toast } from "sonner";

export function CategoryFormDialog() {
	const {
		forms: { transactionCategoryForm },
		closeForm,
	} = useFormStore();
	const {
		account: { transactionCategories },
		addNewCategory,
	} = useAccountStore();

	const form = useForm<TransactionCategory>();

	function handleFormSubmit(data: TransactionCategory) {
		console.log(data);

		const isCategoryExist = transactionCategories.some(
			(e) => e.name.toLowerCase() === data.name.toLowerCase(),
		);

		// should be after await
		if (isCategoryExist) {
			toast.error("Category already exist");
			return;
		}
		addNewCategory(data);
		closeForm("transactionCategoryForm");
		form.reset();
	}

	return (
		<Dialog
			open={transactionCategoryForm.active}
			onOpenChange={() => closeForm("transactionCategoryForm")}
		>
			<DialogContent className="sm:max-w-[400px] pb-2">
				<DialogHeader>
					<DialogTitle>Add New Category</DialogTitle>
				</DialogHeader>
				<form
					className=" grid gap-4 py-4"
					onSubmit={form.handleSubmit(handleFormSubmit)}
				>
					<div className="grid grid-cols-4 items-center gap-4">
						<Label className="text-right">Category</Label>

						<div className="h-12 col-span-3 relative *:absolute *:left-0 *:top-0">
							<Input className="pl-12" {...form.register("name")} required />
							<Input
								className="w-8"
								type="color"
								{...form.register("color")}
								required
							/>
						</div>
					</div>

					<Button type="submit">Add</Button>
				</form>
			</DialogContent>
		</Dialog>
	);
}
