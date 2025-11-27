"use client";

import type React from "react";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  type Transaccion,
  type CreateTransaccionDTO,
  type Categoria,
  MovimientoTipoEnum,
} from "@/lib/types";

interface TransactionFormDialogProps {
  readonly open: boolean;
  readonly onOpenChange: (open: boolean) => void;
  readonly transaction?: Transaccion;
  readonly categories: Categoria[];
  readonly onSubmit: (data: CreateTransaccionDTO) => Promise<void>;
}

export function TransactionFormDialog({
  open,
  onOpenChange,
  transaction,
  categories,
  onSubmit,
}: TransactionFormDialogProps) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<CreateTransaccionDTO>({
    amount: 0,
    type: MovimientoTipoEnum.INGRESO,
    categoryId: "",
    description: "",
    date: new Date(),
  });

  useEffect(() => {
    if (transaction) {
      setFormData({
        amount: transaction.amount,
        type: transaction.type,
        categoryId: transaction.categoryId,
        description: transaction.description || "",
        date: new Date(transaction.date),
      });
    } else {
      setFormData({
        amount: 0,
        type: MovimientoTipoEnum.INGRESO,
        categoryId: categories[0]?.id || "",
        description: "",
        date: new Date(),
      });
    }
  }, [transaction, categories]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await onSubmit(formData);
      setFormData({
        amount: 0,
        type: MovimientoTipoEnum.INGRESO,
        categoryId: "",
        description: "",
        date: new Date(),
      });
      onOpenChange(false);
    } catch (error) {
      console.error("Error submitting transaction:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {transaction ? "Editar" : "Nueva"} Transacción
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="type">Tipo</Label>
            <Select
              value={formData.type}
              onValueChange={(value: MovimientoTipoEnum) =>
                setFormData({ ...formData, type: value })
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={MovimientoTipoEnum.INGRESO}>
                  Ingreso
                </SelectItem>
                <SelectItem value={MovimientoTipoEnum.GASTO}>Gasto</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="amount">Monto</Label>
            <Input
              id="amount"
              type="number"
              step="0.01"
              value={formData.amount || ""}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  amount: Number.parseFloat(e.target.value),
                })
              }
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Categoría</Label>
            <Select
              value={formData.categoryId}
              onValueChange={(value) =>
                setFormData({ ...formData, categoryId: value })
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {categories
                  .filter((c) => c.type === formData.type)
                  .map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="date">Fecha</Label>
            <Input
              id="date"
              type="date"
              value={formData.date.toISOString().split("T")[0]}
              onChange={(e) =>
                setFormData({ ...formData, date: new Date(e.target.value) })
              }
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Descripción (opcional)</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              rows={3}
            />
          </div>

          <div className="flex gap-2 justify-end">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancelar
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Guardando..." : "Guardar"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
