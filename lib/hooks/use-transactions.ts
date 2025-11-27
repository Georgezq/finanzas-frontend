"use client"

import { useState, useEffect } from "react"
import type { Transaccion, CreateTransaccionDTO, UpdateTransaccionDTO } from "../types"
import { transactionRepository } from "../repositories/transaction-repository"

export function useTransactions() {
  const [transactions, setTransactions] = useState<Transaccion[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  const fetchTransactions = async () => {
    try {
      setLoading(true)
      const data = await transactionRepository.getAll()
      setTransactions(data)
      setError(null)
    } catch (err) {
      setError(err as Error)
    } finally {
      setLoading(false)
    }
  }

  const createTransaction = async (data: CreateTransaccionDTO) => {
    try {
      const newTransaction = await transactionRepository.create(data)
      setTransactions((prev) => [newTransaction, ...prev])
      return newTransaction
    } catch (err) {
      setError(err as Error)
      throw err
    }
  }

  const updateTransaction = async (id: string, data: UpdateTransaccionDTO) => {
    try {
      const updated = await transactionRepository.update(id, data)
      setTransactions((prev) => prev.map((t) => (t.id === id ? updated : t)))
      return updated
    } catch (err) {
      setError(err as Error)
      throw err
    }
  }

  const deleteTransaction = async (id: string) => {
    try {
      await transactionRepository.delete(id)
      setTransactions((prev) => prev.filter((t) => t.id !== id))
    } catch (err) {
      setError(err as Error)
      throw err
    }
  }

  useEffect(() => {
    fetchTransactions()
  }, [])

  return {
    transactions,
    loading,
    error,
    createTransaction,
    updateTransaction,
    deleteTransaction,
    refetch: fetchTransactions,
  }
}
