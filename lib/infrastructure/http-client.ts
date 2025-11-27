import { API_CONFIG } from "../config";

interface HttpClientConfig {
  headers?: Record<string, string>;
}

class HttpClient {
  private baseUrl: string;
  private defaultHeaders: Record<string, string>;

  constructor(baseUrl: string = API_CONFIG.baseUrl) {
    this.baseUrl = baseUrl;
    this.defaultHeaders = {
      "Content-Type": "application/json",
    };
  }

  private getAuthToken(): string | null {
    if (typeof window === "undefined") return null;
    return localStorage.getItem("authToken");
  }

  private getHeaders(config?: HttpClientConfig): HeadersInit {
    const token = this.getAuthToken();
    return {
      ...this.defaultHeaders,
      ...(token && { Authorization: `Bearer ${token}` }),
      ...config?.headers,
    };
  }

  async get<T>(endpoint: string, config?: HttpClientConfig): Promise<T> {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method: "GET",
      headers: this.getHeaders(config),
    });

    if (!response.ok) {
      throw response;
    }

    return response.json();
  }

  async post<T>(
    endpoint: string,
    data?: unknown,
    config?: HttpClientConfig
  ): Promise<T> {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method: "POST",
      headers: this.getHeaders(config),
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw response;
    }

    return response.json();
  }

  async put<T>(
    endpoint: string,
    data?: unknown,
    config?: HttpClientConfig
  ): Promise<T> {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method: "PUT",
      headers: this.getHeaders(config),
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw response;
    }

    return response.json();
  }

  async delete<T>(endpoint: string, config?: HttpClientConfig): Promise<T> {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method: "DELETE",
      headers: this.getHeaders(config),
    });

    if (!response.ok) {
      throw response;
    }

    return response.json();
  }
}

export const httpClient = new HttpClient();
