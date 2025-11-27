import { MovimientoTipoEnum } from "@/lib/enums/tipoMovimiento";

export interface Categoria {
  id: string;
  userId: string;
  name: string;
  icon?: string;
  color?: string;
  type: MovimientoTipoEnum;
  createdAt: Date;
  updatedAt: Date;
  isDeleted: boolean;
}

export interface CreateCategoriaDTO {
  name: string;
  icon?: string;
  color?: string;
  type: MovimientoTipoEnum;
}

export interface UpdateCategoriaDTO {
  name?: string;
  icon?: string;
  color?: string;
  type?: MovimientoTipoEnum;
}
