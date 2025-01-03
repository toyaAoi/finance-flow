import { TrendingDown, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

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

export function FinancialSummary() {
  return (
    <div className="grid gap-4 md:grid-cols-7">
      <Card className="col-span-3">
        <CardHeader>
          <CardTitle>Total Balance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-4xl font-bold">$12,000</div>
          <div className="mt-4 flex gap-4 *:w-full">
            <Button>Add Income</Button>
            <Button variant={"secondary"}>Add Expense</Button>
          </div>
        </CardContent>
      </Card>

      <Card className="col-span-2">
        <CardHeader>
          <Icon icon={<TrendingUp />} variant="primary" />
          <CardTitle>Income</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-4xl font-bold">$5,000</div>
        </CardContent>
      </Card>

      <Card className="col-span-2">
        <CardHeader>
          <Icon icon={<TrendingDown />} variant="destructive" />
          <CardTitle>Expenses</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-4xl font-bold">$3,000</div>
        </CardContent>
      </Card>
    </div>
  );
}
