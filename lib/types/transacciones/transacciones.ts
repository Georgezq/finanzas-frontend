import { MovimientoTipoEnum } from "@/lib/enums/tipoMovimiento";
import { Categoria } from "@/lib/types/categorias/categorias";

export interface Transaccion {
  id: string;
  userId: string;
  amount: number;
  type: MovimientoTipoEnum;
  categoryId: string;
  category: Categoria;
  description?: string;
  date: Date;
  createdAt: Date;
  updatedAt: Date;
  isDeleted: boolean;
}

export interface CreateTransaccionDTO {
  amount: number;
  type: MovimientoTipoEnum;
  categoryId: string;
  description?: string;
  date: Date;
}

export interface UpdateTransaccionDTO {
  amount?: number;
  type?: MovimientoTipoEnum;
  categoryId: string;
  description?: string;
  date?: Date;
}
