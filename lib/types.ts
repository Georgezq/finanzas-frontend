export enum MovimientoTipoEnum {
  INGRESO = "ingreso",
  GASTO = "gasto",
}

export interface Usuario {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  phone?: string;
  birthDate?: Date;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  isDeleted: boolean;
}

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

export interface UserLogin {
  email: string;
  password: string;
}

export interface UserRegister {
  email: string;
  password: string;
}
