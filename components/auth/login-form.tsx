"use client";

import type React from "react";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { APP_CONFIG } from "@/lib/config";
import { Lock, Mail } from "lucide-react";
import { useAuth } from "@/lib/hooks/use-auth";
import { useAppToast } from "@/components/ui/toastProvider";

export function LoginForm() {
  const router = useRouter();
  const { login, loading } = useAuth();
  const { pushToast } = useAppToast();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await login({ email, password });
      pushToast({
        type: "success",
        title: "Login exitoso",
        message: "Bienvenido de nuevo.",
      });
      router.push("/dashboard");
    } catch (e: any) {
      pushToast({
        type: "error",
        title: "Error al iniciar sesión",
        message: e?.message ?? "Inténtalo de nuevo.",
      });
    }
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="space-y-1 text-center">
        <div className="mx-auto w-12 h-12 bg-primary rounded-xl flex items-center justify-center mb-2">
          <Lock className="w-6 h-6 text-primary-foreground" />
        </div>
        <CardTitle className="text-2xl font-bold">{APP_CONFIG.name}</CardTitle>
        <CardDescription>
          Ingresa a tu cuenta para gestionar tus finanzas
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Correo electrónico</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="email"
                type="email"
                placeholder="Correo electrónico"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-9"
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Contraseña</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="password"
                type="password"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-9"
                required
              />
            </div>
          </div>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Ingresando..." : "Ingresar"}
          </Button>

          <div className="flex justify-between">
            <Button
              className="cursor-pointer"
              variant="link"
              onClick={() => router.push("/register")}
            >
              Registrarse
            </Button>
            <Button
              className="cursor-pointer"
              variant="link"
              onClick={() => router.push("/forgot-password")}
            >
              Olvidaste tu contraseña?
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
