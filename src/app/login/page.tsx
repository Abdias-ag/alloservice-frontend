"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ShieldAlert, Sparkles, Loader2, Wrench } from "lucide-react";
import Link from "next/link";
import { API_URL } from '@/utils/constants';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("avatarnn2@gmail.com");
  const [password, setPassword] = useState("admin");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const res = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Identifiants invalides");
      }

      if (data.user.role !== "admin" && !data.user.isAdmin) {
        throw new Error("Accès refusé. Vous n'êtes pas administrateur.");
      }

      // Sauvegarde des infos de session
      localStorage.setItem("token", data.token);
      localStorage.setItem("userId", data.user.id.toString());
      localStorage.setItem("userRole", data.user.role);
      localStorage.setItem("userName", data.user.name);

      // Redirection vers le dashboard
      router.push("/overview");

    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center p-6 font-sans">
      <Link href="/" className="absolute top-8 left-8 flex items-center gap-2 group">
        <div className="w-8 h-8 rounded-lg bg-white border border-gray-200 flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
          <Wrench className="w-4 h-4 text-pink-600" />
        </div>
        <span className="font-bold text-gray-600 group-hover:text-black transition-colors">Retour</span>
      </Link>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white rounded-3xl shadow-xl shadow-pink-100/50 p-8 border border-gray-100"
      >
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-pink-500 to-rose-400 flex items-center justify-center shadow-lg shadow-pink-500/30">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
        </div>

        <h1 className="text-2xl font-extrabold text-center text-gray-900 mb-2">Espace Administrateur</h1>
        <p className="text-center text-gray-500 mb-8 text-sm font-medium">Connectez-vous pour gérer AlloService</p>

        {error && (
          <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-xl flex items-center gap-3 border border-red-100">
            <ShieldAlert className="w-5 h-5 shrink-0" />
            <p className="text-sm font-semibold">{error}</p>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Adresse E-mail</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-pink-500/20 focus:border-pink-500 transition-all font-medium"
              placeholder="admin@alloservice.com"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Mot de passe</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-pink-500/20 focus:border-pink-500 transition-all font-medium"
              placeholder="••••••••"
              required
            />
          </div>

          <button 
            type="submit" 
            disabled={isLoading}
            className="w-full bg-black hover:bg-gray-800 text-white rounded-xl py-4 font-bold text-lg shadow-lg flex justify-center items-center transition-all disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isLoading ? <Loader2 className="w-6 h-6 animate-spin" /> : "Se Connecter"}
          </button>
        </form>
      </motion.div>
    </div>
  );
}
