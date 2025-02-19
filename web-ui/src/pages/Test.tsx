import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

import { useForm } from "react-hook-form";

export function Test() {
	const form = useForm<{ fruit: string }>();

	return (
		<form onSubmit={form.handleSubmit((data) => console.log(data))}>
			<Select onValueChange={(data) => form.setValue('fruit', data)}>
				<SelectTrigger className="w-[180px]">
					<SelectValue
						placeholder="Select a fruit"

						{...form.register("fruit")}
					/>
				</SelectTrigger>
				<SelectContent>
					<SelectItem value="apple">Apple</SelectItem>
					<SelectItem value="banana">Banana</SelectItem>
					<SelectItem value="blueberry">Blueberry</SelectItem>
					<SelectItem value="grapes">Grapes</SelectItem>
					<SelectItem value="pineapple">Pineapple</SelectItem>
				</SelectContent>
			</Select>
			<input type="submit" value="submit" />
		</form>
	);
}
