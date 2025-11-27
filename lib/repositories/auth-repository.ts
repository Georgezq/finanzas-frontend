import type { UserLogin, UserRegister } from "../types";
import { httpClient } from "../infrastructure/http-client";
import { API_CONFIG } from "../config";

export interface AuthRepository {
  login: (data: UserLogin) => Promise<{ token: string }>;
  register: (data: UserRegister) => Promise<void>;
}

class HttpCategoryRepository implements AuthRepository {
  async login(data: UserLogin): Promise<{ token: string }> {
    return await httpClient.post(API_CONFIG.endpoints.auth.login, data);
  }

  async register(data: UserRegister): Promise<void> {
    await httpClient.post(API_CONFIG.endpoints.auth.register, data);
  }
}

export const authRepository = new HttpCategoryRepository();
