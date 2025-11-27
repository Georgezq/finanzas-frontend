"use client";

import { useState } from "react";
import { useTransactions } from "@/lib/hooks/use-transactions";
import { useCategories } from "@/lib/hooks/use-categories";
import { TransactionList } from "@/components/transactions/transaction-list";
import { TransactionFormDialog } from "@/components/transactions/transaction-form-dialog";
import { TransactionListSkeleton } from "@/components/skeletons/transaction-skeleton";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import {
  Transaccion,
  CreateTransaccionDTO,
} from "@/lib/types/transacciones/transacciones";

export default function TransactionsPage() {
  const {
    transactions,
    loading,
    createTransaction,
    updateTransaction,
    deleteTransaction,
  } = useTransactions();
  const { categories } = useCategories();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState<
    Transaccion | undefined
  >();

  const handleSubmit = async (data: CreateTransaccionDTO) => {
    if (editingTransaction) {
      await updateTransaction(editingTransaction.id, data);
    } else {
      await createTransaction(data);
    }
    setEditingTransaction(undefined);
  };

  const handleEdit = (transaction: Transaccion) => {
    setEditingTransaction(transaction);
    setDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm("¿Estás seguro de eliminar esta transacción?")) {
      await deleteTransaction(id);
    }
  };

  const handleOpenChange = (open: boolean) => {
    setDialogOpen(open);
    if (!open) {
      setEditingTransaction(undefined);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Transacciones</h1>
          <p className="text-muted-foreground">
            Gestiona tus ingresos y gastos
          </p>
        </div>
        <Button onClick={() => setDialogOpen(true)} className="gap-2">
          <Plus className="w-4 h-4" />
          Nueva Transacción
        </Button>
      </div>

      {loading ? (
        <TransactionListSkeleton />
      ) : (
        <TransactionList
          transactions={transactions}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}

      <TransactionFormDialog
        open={dialogOpen}
        onOpenChange={handleOpenChange}
        transaction={editingTransaction}
        categories={categories}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
