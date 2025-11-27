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

import { useAppToast } from "@/components/ui/toastProvider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MovimientoTipoEnum } from "@/lib/enums/tipoMovimiento";
import {
  Categoria,
  CreateCategoriaDTO,
} from "@/lib/types/categorias/categorias";

const DEFAULT_COLORS = [
  "#10b981",
  "#f59e0b",
  "#3b82f6",
  "#ef4444",
  "#8b5cf6",
  "#ec4899",
];

const DEFAULT_ICONS = [
  "💰",
  "🏠",
  "🚗",
  "🍔",
  "🎮",
  "💼",
  "✈️",
  "🎓",
  "🏥",
  "🛒",
];

interface CategoryFormDialogProps {
  readonly open: boolean;
  readonly onOpenChange: (open: boolean) => void;
  readonly category?: Categoria;
  readonly onSubmit: (data: CreateCategoriaDTO) => Promise<void>;
}

export function CategoryFormDialog({
  open,
  onOpenChange,
  category,
  onSubmit,
}: CategoryFormDialogProps) {
  const [loading, setLoading] = useState(false);
  const { pushToast } = useAppToast();

  const [formData, setFormData] = useState<CreateCategoriaDTO>({
    name: "",
    icon: "📊",
    color: DEFAULT_COLORS[0],
    type: MovimientoTipoEnum.INGRESO,
  });

  useEffect(() => {
    if (category) {
      setFormData({
        name: category.name,
        icon: category.icon || "📊",
        color: category.color || DEFAULT_COLORS[0],
        type: category.type,
      });
    } else {
      setFormData({
        name: "",
        icon: "📊",
        color: DEFAULT_COLORS[0],
        type: MovimientoTipoEnum.INGRESO,
      });
    }
  }, [category]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await onSubmit(formData);
      onOpenChange(false);
      pushToast({
        type: "success",
        title: "Categoría creada",
        message: "La categoría fue creada exitosamente.",
      });
    } catch (error: any) {
      pushToast({
        type: "error",
        title: "Error al crear categoría",
        message: error?.message ?? "Inténtalo de nuevo.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{category ? "Editar" : "Nueva"} Categoría</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nombre</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              required
            />
          </div>

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
            <Label>Icono</Label>
            <div className="flex flex-wrap gap-2">
              {DEFAULT_ICONS.map((icon) => (
                <button
                  key={icon}
                  type="button"
                  onClick={() => setFormData({ ...formData, icon })}
                  className={`w-12 h-12 rounded-lg flex items-center justify-center text-2xl transition-all ${
                    formData.icon === icon
                      ? "ring-2 ring-primary scale-110"
                      : "hover:scale-105 bg-secondary"
                  }`}
                >
                  {icon}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label>Color</Label>
            <div className="flex flex-wrap gap-2">
              {DEFAULT_COLORS.map((color) => (
                <button
                  key={color}
                  type="button"
                  onClick={() => setFormData({ ...formData, color })}
                  className={`w-10 h-10 rounded-lg transition-all ${
                    formData.color === color
                      ? "ring-2 ring-primary scale-110"
                      : "hover:scale-105"
                  }`}
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
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
