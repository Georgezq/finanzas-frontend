"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { Transaccion } from "@/lib/types"
import { formatCurrency, formatDateShort } from "@/lib/utils/format"
import { ArrowUpRight, ArrowDownRight } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

interface RecentTransactionsProps {
  transactions: Transaccion[]
}

export function RecentTransactions({ transactions }: RecentTransactionsProps) {
  const recent = transactions.slice(0, 5)

  return (
    <Card className="animate-fade-in">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Transacciones Recientes</CardTitle>
        <Link href="/transactions">
          <Button variant="ghost" size="sm">
            Ver todas
          </Button>
        </Link>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {recent.map((transaction) => (
            <div
              key={transaction.id}
              className="flex items-center justify-between p-3 rounded-lg hover:bg-accent/50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    transaction.type === "ingreso" ? "bg-success/10" : "bg-destructive/10"
                  }`}
                >
                  {transaction.type === "ingreso" ? (
                    <ArrowUpRight className="w-5 h-5 text-success" />
                  ) : (
                    <ArrowDownRight className="w-5 h-5 text-destructive" />
                  )}
                </div>
                <div>
                  <p className="font-medium">{transaction.category?.name || "Sin categoría"}</p>
                  <p className="text-sm text-muted-foreground">
                    {transaction.description || formatDateShort(transaction.date)}
                  </p>
                </div>
              </div>
              <div className={`font-semibold ${transaction.type === "ingreso" ? "text-success" : "text-destructive"}`}>
                {transaction.type === "ingreso" ? "+" : "-"}
                {formatCurrency(transaction.amount)}
              </div>
            </div>
          ))}
          {recent.length === 0 && (
            <p className="text-center text-muted-foreground py-8">No hay transacciones recientes</p>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
