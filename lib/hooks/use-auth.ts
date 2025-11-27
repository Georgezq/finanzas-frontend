"use client";

import { useState } from "react";
import { authRepository } from "../repositories/auth-repository";
import { extractApiError } from "@/lib/utils/api-error";
import { UserRegister, UserLogin } from "@/lib/types/auth/userAuth";
import { Usuario } from "@/lib/types/user/user";

export function useAuth() {
  const [auth] = useState<Usuario[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const register = async (data: UserRegister) => {
    setLoading(true);
    try {
      await authRepository.register(data);
    } catch (err) {
      const message = await extractApiError(err);
      setError(new Error(message));
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const login = async (data: UserLogin) => {
    setLoading(true);
    try {
      const result = await authRepository.login(data);
      localStorage.setItem("authToken", result.token);
      cookieStore.set("authToken", result.token);
    } catch (err) {
      const message = await extractApiError(err);
      throw new Error(message);
    } finally {
      setLoading(false);
    }
  };

  return {
    auth,
    login,
    register,
    loading,
    error,
  };
}
