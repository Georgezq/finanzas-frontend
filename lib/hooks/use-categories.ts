"use client";

import { useState, useEffect } from "react";
import type {
  Categoria,
  CreateCategoriaDTO,
  UpdateCategoriaDTO,
} from "../types";
import { categoryRepository } from "../repositories/category-repository";
import { extractApiError } from "@/lib/utils/api-error";

export function useCategories() {
  const [categories, setCategories] = useState<Categoria[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const data = await categoryRepository.getAll();
      setCategories(data);
      setError(null);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  const createCategory = async (data: CreateCategoriaDTO) => {
    try {
      const newCategory = await categoryRepository.create(data);
      setCategories((prev) => [...prev, newCategory]);
      return newCategory;
    } catch (err) {
      const message = await extractApiError(err);
      throw new Error(message);
    }
  };

  const updateCategory = async (id: string, data: UpdateCategoriaDTO) => {
    try {
      const updated = await categoryRepository.update(id, data);
      setCategories((prev) => prev.map((c) => (c.id === id ? updated : c)));
      return updated;
    } catch (err) {
      setError(err as Error);
      throw err;
    }
  };

  const deleteCategory = async (id: string) => {
    try {
      await categoryRepository.delete(id);
      setCategories((prev) => prev.filter((c) => c.id !== id));
    } catch (err) {
      setError(err as Error);
      throw err;
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return {
    categories,
    loading,
    error,
    createCategory,
    updateCategory,
    deleteCategory,
    refetch: fetchCategories,
  };
}
