"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, TrendingDown, Wallet } from "lucide-react"
import { formatCurrency } from "@/lib/utils/format"

interface BalanceCardProps {
  title: string
  amount: number
  type: "balance" | "income" | "expense"
  trend?: {
    value: number
    isPositive: boolean
  }
}

export function BalanceCard({ title, amount, type, trend }: BalanceCardProps) {
  const icons = {
    balance: Wallet,
    income: TrendingUp,
    expense: TrendingDown,
  }

  const Icon = icons[type]

  const colorClasses = {
    balance: "text-primary",
    income: "text-success",
    expense: "text-destructive",
  }

  return (
    <Card className="animate-fade-in">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
        <Icon className={cn("w-4 h-4", colorClasses[type])} />
      </CardHeader>
      <CardContent>
        <div className={cn("text-2xl font-bold", colorClasses[type])}>
          {type === "expense" && amount > 0 ? "-" : ""}
          {formatCurrency(amount)}
        </div>
        {trend && (
          <p className="text-xs text-muted-foreground mt-1">
            <span className={trend.isPositive ? "text-success" : "text-destructive"}>
              {trend.isPositive ? "+" : ""}
              {trend.value}%
            </span>{" "}
            desde el mes pasado
          </p>
        )}
      </CardContent>
    </Card>
  )
}

function cn(...classes: (string | undefined)[]) {
  return classes.filter(Boolean).join(" ")
}
