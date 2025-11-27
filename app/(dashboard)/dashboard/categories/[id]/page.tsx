"use client"

import { use, useState, useEffect, useMemo } from "react"
import { useRouter } from "next/navigation"
import { categoryRepository } from "@/lib/repositories/category-repository"
import { transactionRepository } from "@/lib/repositories/transaction-repository"
import type { Categoria, Transaccion } from "@/lib/types"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, TrendingDown, TrendingUp } from "lucide-react"
import { formatCurrency, formatDate } from "@/lib/utils/format"
import { DashboardSkeleton } from "@/components/skeletons/dashboard-skeleton"

export default function CategoryDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const router = useRouter()
  const [category, setCategory] = useState<Categoria | null>(null)
  const [transactions, setTransactions] = useState<Transaccion[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [categoryData, transactionsData] = await Promise.all([
          categoryRepository.getById(id),
          transactionRepository.getByCategory(id),
        ])
        setCategory(categoryData)
        setTransactions(transactionsData)
      } catch (error) {
        console.error("Error fetching category details:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [id])

  const stats = useMemo(() => {
    const total = transactions.reduce((sum, t) => sum + t.amount, 0)
    const income = transactions.filter((t) => t.type === "ingreso").reduce((sum, t) => sum + t.amount, 0)
    const expense = transactions.filter((t) => t.type === "gasto").reduce((sum, t) => sum + t.amount, 0)

    return { total, income, expense, count: transactions.length }
  }, [transactions])

  if (loading) {
    return <DashboardSkeleton />
  }

  if (!category) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">Categoría no encontrada</p>
      </div>
    )
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div className="flex items-center gap-3">
          <div
            className="w-12 h-12 rounded-lg flex items-center justify-center text-2xl"
            style={{ backgroundColor: category.color || "#10b981" }}
          >
            {category.icon || "📊"}
          </div>
          <div>
            <h1 className="text-3xl font-bold">{category.name}</h1>
            <p className="text-muted-foreground">{stats.count} transacciones</p>
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Transacciones</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.count}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Ingresos</CardTitle>
            <TrendingUp className="w-4 h-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">{formatCurrency(stats.income)}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Gastos</CardTitle>
            <TrendingDown className="w-4 h-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">{formatCurrency(stats.expense)}</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Transacciones de esta categoría</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {transactions.map((transaction) => (
              <div
                key={transaction.id}
                className="flex items-center justify-between p-3 rounded-lg hover:bg-accent/50 transition-colors"
              >
                <div>
                  <p className="font-medium">{transaction.description || "Sin descripción"}</p>
                  <p className="text-sm text-muted-foreground">{formatDate(transaction.date)}</p>
                </div>
                <div
                  className={`font-semibold ${transaction.type === "ingreso" ? "text-success" : "text-destructive"}`}
                >
                  {transaction.type === "ingreso" ? "+" : "-"}
                  {formatCurrency(transaction.amount)}
                </div>
              </div>
            ))}
            {transactions.length === 0 && (
              <p className="text-center text-muted-foreground py-8">No hay transacciones en esta categoría</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
