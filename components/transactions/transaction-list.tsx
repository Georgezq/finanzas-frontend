"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { formatCurrency, formatDate } from "@/lib/utils/format";
import { ArrowUpRight, ArrowDownRight, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreVertical } from "lucide-react";
import { MovimientoTipoEnum } from "@/lib/enums/tipoMovimiento";
import { Transaccion } from "@/lib/types/transacciones/transacciones";
import { MovimientoTipoAllEnum } from "@/lib/enums/tipoMovimientoAll";

interface TransactionListProps {
  readonly transactions: Transaccion[];
  readonly onEdit: (transaction: Transaccion) => void;
  readonly onDelete: (id: string) => void;
}

export function TransactionList({
  transactions,
  onEdit,
  onDelete,
}: TransactionListProps) {
  const [filter, setFilter] = useState<
    MovimientoTipoAllEnum | MovimientoTipoEnum
  >(MovimientoTipoAllEnum.ALL);

  const filtered = transactions.filter(
    (t) => filter === MovimientoTipoAllEnum.ALL || t.type === filter
  );

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Button
          variant={filter === MovimientoTipoAllEnum.ALL ? "default" : "outline"}
          onClick={() => setFilter(MovimientoTipoAllEnum.ALL)}
          size="sm"
        >
          Todas
        </Button>
        <Button
          variant={
            filter === MovimientoTipoAllEnum.INGRESO ? "default" : "outline"
          }
          onClick={() => setFilter(MovimientoTipoAllEnum.INGRESO)}
          size="sm"
        >
          Ingresos
        </Button>
        <Button
          variant={
            filter === MovimientoTipoAllEnum.GASTO ? "default" : "outline"
          }
          onClick={() => setFilter(MovimientoTipoAllEnum.GASTO)}
          size="sm"
        >
          Gastos
        </Button>
      </div>

      <div className="space-y-3">
        {filtered.map((transaction, index) => (
          <Card
            key={transaction.id}
            className="animate-slide-in-left"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 flex-1">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                      transaction.type === MovimientoTipoEnum.INGRESO
                        ? "bg-success/10"
                        : "bg-destructive/10"
                    }`}
                  >
                    {transaction.type === MovimientoTipoEnum.INGRESO ? (
                      <ArrowUpRight className="w-5 h-5 text-success" />
                    ) : (
                      <ArrowDownRight className="w-5 h-5 text-destructive" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">
                      {transaction.category?.name || "Sin categoría"}
                    </p>
                    <div className="flex flex-row items-center gap-4">
                      <p className="text-sm text-muted-foreground truncate">
                        {transaction.description || "Sin descripción"}
                      </p>
                      <p className="text-sm text-muted-foreground truncate">
                        {formatDate(transaction.date)}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div
                    className={`font-semibold text-right ${
                      transaction.type === MovimientoTipoEnum.INGRESO
                        ? "text-success"
                        : "text-destructive"
                    }`}
                  >
                    {transaction.type === MovimientoTipoEnum.INGRESO
                      ? "+"
                      : "-"}
                    {formatCurrency(transaction.amount)}
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => onEdit(transaction)}>
                        <Pencil className="h-4 w-4" />
                        Editar
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => onDelete(transaction.id)}
                        className="text-destructive focus:text-destructive"
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                        Eliminar
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
        {filtered.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No hay transacciones</p>
          </div>
        )}
      </div>
    </div>
  );
}
