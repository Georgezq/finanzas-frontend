import type { Transaccion, CreateTransaccionDTO, UpdateTransaccionDTO } from "../types"
import { httpClient } from "../infrastructure/http-client"
import { API_CONFIG } from "../config"

export interface TransactionRepository {
  getAll(): Promise<Transaccion[]>
  getById(id: string): Promise<Transaccion>
  create(data: CreateTransaccionDTO): Promise<Transaccion>
  update(id: string, data: UpdateTransaccionDTO): Promise<Transaccion>
  delete(id: string): Promise<void>
  getByCategory(categoryId: string): Promise<Transaccion[]>
}

class HttpTransactionRepository implements TransactionRepository {
  async getAll(): Promise<Transaccion[]> {
    return httpClient.get<Transaccion[]>(API_CONFIG.endpoints.transactions)
  }

  async getById(id: string): Promise<Transaccion> {
    return httpClient.get<Transaccion>(`${API_CONFIG.endpoints.transactions}/${id}`)
  }

  async create(data: CreateTransaccionDTO): Promise<Transaccion> {
    return httpClient.post<Transaccion>(API_CONFIG.endpoints.transactions, data)
  }

  async update(id: string, data: UpdateTransaccionDTO): Promise<Transaccion> {
    return httpClient.put<Transaccion>(`${API_CONFIG.endpoints.transactions}/${id}`, data)
  }

  async delete(id: string): Promise<void> {
    await httpClient.delete(`${API_CONFIG.endpoints.transactions}/${id}`)
  }

  async getByCategory(categoryId: string): Promise<Transaccion[]> {
    return httpClient.get<Transaccion[]>(`${API_CONFIG.endpoints.transactions}?categoryId=${categoryId}`)
  }
}

export const transactionRepository = new HttpTransactionRepository()
