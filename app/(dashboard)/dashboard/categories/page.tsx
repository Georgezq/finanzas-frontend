"use client";

import { useState } from "react";
import { useCategories } from "@/lib/hooks/use-categories";
import { CategoryGrid } from "@/components/categories/category-grid";
import { CategoryFormDialog } from "@/components/categories/category-form-dialog";
import { CategoryListSkeleton } from "@/components/skeletons/category-skeleton";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import {
  Categoria,
  CreateCategoriaDTO,
} from "@/lib/types/categorias/categorias";

export default function CategoriesPage() {
  const {
    categories,
    loading,
    createCategory,
    updateCategory,
    deleteCategory,
  } = useCategories();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<
    Categoria | undefined
  >();

  const handleSubmit = async (data: CreateCategoriaDTO) => {
    if (editingCategory) {
      await updateCategory(editingCategory.id, data);
    } else {
      await createCategory(data);
    }
    setEditingCategory(undefined);
  };

  const handleEdit = (category: Categoria) => {
    setEditingCategory(category);
    setDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm("¿Estás seguro de eliminar esta categoría?")) {
      await deleteCategory(id);
    }
  };

  const handleOpenChange = (open: boolean) => {
    setDialogOpen(open);
    if (!open) {
      setEditingCategory(undefined);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Categorías</h1>
          <p className="text-muted-foreground">Organiza tus transacciones</p>
        </div>
        <Button onClick={() => setDialogOpen(true)} className="gap-2">
          <Plus className="w-4 h-4" />
          Nueva Categoría
        </Button>
      </div>

      {loading ? (
        <CategoryListSkeleton />
      ) : (
        <CategoryGrid
          categories={categories}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}

      <CategoryFormDialog
        open={dialogOpen}
        onOpenChange={handleOpenChange}
        category={editingCategory}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
