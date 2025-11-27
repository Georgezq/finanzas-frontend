"use client"

import { useTransactions } from "@/lib/hooks/use-transactions"
import { BalanceCard } from "@/components/dashboard/balance-card"
import { RecentTransactions } from "@/components/dashboard/recent-transactions"
import { DashboardSkeleton } from "@/components/skeletons/dashboard-skeleton"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useMemo } from "react"

export default function DashboardPage() {
  const { transactions, loading } = useTransactions()

  const stats = useMemo(() => {
    const income = transactions.filter((t) => t.type === "ingreso").reduce((sum, t) => sum + t.amount, 0)

    const expense = transactions.filter((t) => t.type === "gasto").reduce((sum, t) => sum + t.amount, 0)

    const balance = income - expense

    return { income, expense, balance }
  }, [transactions])

  if (loading) {
    return <DashboardSkeleton />
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">Resumen de tus finanzas</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <BalanceCard
          title="Balance Total"
          amount={stats.balance}
          type="balance"
          trend={{ value: 12.5, isPositive: true }}
        />
        <BalanceCard title="Ingresos" amount={stats.income} type="income" trend={{ value: 8.3, isPositive: true }} />
        <BalanceCard title="Gastos" amount={stats.expense} type="expense" trend={{ value: 4.2, isPositive: false }} />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <RecentTransactions transactions={transactions} />

        <Card>
          <CardHeader>
            <CardTitle>Gráfica de Gastos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] flex items-center justify-center text-muted-foreground">
              <p>Gráfica próximamente</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
