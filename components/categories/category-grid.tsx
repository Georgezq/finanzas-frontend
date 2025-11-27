"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MoreVertical, Pencil, Trash2, Eye } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { Categoria } from "@/lib/types/categorias/categorias";

interface CategoryGridProps {
  readonly categories: Categoria[];
  readonly onEdit: (category: Categoria) => void;
  readonly onDelete: (id: string) => void;
}

export function CategoryGrid({
  categories,
  onEdit,
  onDelete,
}: CategoryGridProps) {
  const ingresos = categories.filter((c) => c.type === "ingreso");
  const gastos = categories.filter((c) => c.type === "gasto");

  const Section = ({
    title,
    items,
  }: {
    title: string;
    items: typeof categories;
  }) => (
    <>
      <h2 className="text-xl font-semibold mt-6 mb-2">{title}</h2>

      {items.length === 0 ? (
        <p className="text-muted-foreground text-sm mb-6">
          No hay categorías de {title.toLowerCase()}
        </p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {items.map((category, index) => (
            <Card
              key={category.id}
              className="animate-fade-in hover:shadow-md transition-shadow"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div
                    className="w-12 h-12 rounded-lg flex items-center justify-center text-2xl"
                    style={{ backgroundColor: category.color || "#10b981" }}
                  >
                    {category.icon || "📊"}
                  </div>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent align="end">
                      <DropdownMenuItem asChild>
                        <Link href={`/dashboard/categories/${category.id}`}>
                          <Eye className="h-4 w-4" />
                          Ver detalle
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => onEdit(category)}>
                        <Pencil className="h-4 w-4" />
                        Editar
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => onDelete(category.id)}
                        className="text-destructive focus:text-destructive"
                      >
                        <Trash2 className=" h-4 w-4 text-destructive" />
                        Eliminar
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                <h3 className="font-semibold text-lg mb-1">{category.name}</h3>
                <p className="text-sm text-muted-foreground">
                  Creada{" "}
                  {new Date(category.createdAt).toLocaleDateString("es-ES")}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </>
  );

  return (
    <div>
      <Section title="Ingresos" items={ingresos} />
      <Section title="Gastos" items={gastos} />
    </div>
  );
}
