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
