import { Categoria } from "@/lib/types/categorias/categorias";
import type { IPaginatedResponse } from "../interfaces/IPaginatedResponse";
import { Transaccion } from "@/lib/types/transacciones/transacciones";

export interface CategoryDetailsResponse extends IPaginatedResponse {
  category: Categoria;
  transactions: Transaccion[];
}
