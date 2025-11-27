import type { Categoria, CreateCategoriaDTO, UpdateCategoriaDTO } from "../types"
import { httpClient } from "../infrastructure/http-client"
import { API_CONFIG } from "../config"

export interface CategoryRepository {
  getAll(): Promise<Categoria[]>
  getById(id: string): Promise<Categoria>
  create(data: CreateCategoriaDTO): Promise<Categoria>
  update(id: string, data: UpdateCategoriaDTO): Promise<Categoria>
  delete(id: string): Promise<void>
}

class HttpCategoryRepository implements CategoryRepository {
  async getAll(): Promise<Categoria[]> {
    return httpClient.get<Categoria[]>(API_CONFIG.endpoints.categories)
  }

  async getById(id: string): Promise<Categoria> {
    return httpClient.get<Categoria>(`${API_CONFIG.endpoints.categories}/${id}`)
  }

  async create(data: CreateCategoriaDTO): Promise<Categoria> {
    return httpClient.post<Categoria>(API_CONFIG.endpoints.categories, data)
  }

  async update(id: string, data: UpdateCategoriaDTO): Promise<Categoria> {
    return httpClient.put<Categoria>(`${API_CONFIG.endpoints.categories}/${id}`, data)
  }

  async delete(id: string): Promise<void> {
    await httpClient.delete(`${API_CONFIG.endpoints.categories}/${id}`)
  }
}

export const categoryRepository = new HttpCategoryRepository()
