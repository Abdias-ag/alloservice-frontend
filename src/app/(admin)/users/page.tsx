"use client";
import { API_URL } from '@/utils/constants';


import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {

  Power,
  Users,
  Mail,
  MapPin,
  Sparkles,
  RefreshCcw,
  ArrowLeft,
} from "lucide-react";

type ClientData = {
  id: number;
  name: string;
  email: string;
  isClient: boolean;
  isArtisan: boolean;
  isAdmin: boolean;
  city: string;
  commune: string;
  isActive: boolean;
  photo?: string;
};

export default function ClientManagementPage() {
  const [clients, setClients] = useState<ClientData[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchClients = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/admin/users`);
      const data = await res.json();
      // Filtrer pour ne garder que les clients
      setClients(data.users.filter((u: any) => u.isClient === true));
    } catch (error) {
      console.error("Erreur récup clients:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);

  const toggleStatus = async (id: number, currentStatus: boolean) => {
    try {
      const res = await fetch(
        `${API_URL}/admin/users/${id}/status`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ isActive: !currentStatus }),
        },
      );
      if (res.ok) {
        setClients(
          clients.map((c) =>
            c.id === id ? { ...c, isActive: !currentStatus } : c,
          ),
        );
      }
    } catch (error) {
      console.error("Erreur toggle:", error);
    }
  };

  return (
    <div className="p-8 lg:p-10">
      {/* Retour */}
      <Link
        href="/overview"
        className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-primary font-medium mb-8 transition-colors group"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        Retour au Dashboard
      </Link>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-between items-center mb-10"
      >
        <div className="flex items-center gap-5">
          <div className="w-14 h-14 rounded-2xl bg-gray-900 flex items-center justify-center shadow-md">
            <Users className="text-white w-7 h-7" />
          </div>
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">
              Gestion des Clients
            </h1>
            <p className="text-gray-500 text-sm mt-1 font-medium">
              Activez ou désactivez les comptes des particuliers.
            </p>
          </div>
        </div>

        <button
          onClick={fetchClients}
          className="p-3.5 bg-white border border-gray-200 rounded-xl hover:border-gray-300 hover:bg-gray-50 transition-all shadow-sm"
        >
          <RefreshCcw
            className={`w-5 h-5 text-gray-600 ${loading ? "animate-spin text-primary" : ""}`}
          />
        </button>
      </motion.div>

      {/* Liste */}
      <div className="grid gap-5">
        {clients.length === 0 && !loading ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="p-20 border-2 border-dashed border-gray-200 rounded-2xl flex flex-col items-center justify-center text-gray-400 gap-4 bg-white"
          >
            <Sparkles className="w-12 h-12 text-gray-300" />
            <p className="font-medium">
              Aucun client inscrit pour le moment.
            </p>
          </motion.div>
        ) : (
          clients.map((client, index) => (
            <motion.div
              key={client.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.08 * index }}
              className={`bg-white shadow-sm border border-gray-200 rounded-2xl p-7 flex flex-col md:flex-row justify-between items-center gap-6 border-l-4 transition-all hover:shadow-md ${
                client.isActive
                  ? "border-l-primary"
                  : "border-l-gray-300 opacity-70"
              }`}
            >
              <div className="flex-1 space-y-3 relative z-10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-white font-bold text-sm">
                    {client.name.substring(0, 1)}
                  </div>
                  <h2 className="text-xl font-bold text-gray-900">
                    {client.name}
                  </h2>
                  <span
                    className={`text-[10px] px-3 py-1 rounded-full font-bold uppercase tracking-wider ${
                      client.isActive
                        ? "bg-green-50 text-green-600 border border-green-200"
                        : "bg-red-50 text-red-500 border border-red-200"
                    }`}
                  >
                    {client.isActive ? "Actif" : "Désactivé"}
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-5 text-gray-500 text-sm font-medium">
                  <span className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-gray-400" /> {client.email}
                  </span>
                  <span className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-gray-400" /> {client.city}{client.commune ? `, ${client.commune}` : ""}
                  </span>
                  <span className="bg-gray-50 px-3 py-1 rounded-lg font-bold text-gray-400 text-xs border border-gray-200">
                    ID : {client.id}
                  </span>
                </div>
              </div>

              <div className="flex gap-3 relative z-10">
                <button
                  onClick={() => toggleStatus(client.id, client.isActive)}
                  className={`flex items-center gap-2.5 px-6 py-3 rounded-xl font-bold transition-all text-xs uppercase active:scale-95 border ${
                    client.isActive
                      ? "bg-red-50 hover:bg-red-100 text-red-600 border-red-100"
                      : "bg-gray-900 hover:bg-gray-800 text-white border-transparent"
                  }`}
                >
                  <Power className="w-4 h-4" />
                  {client.isActive
                    ? "Désactiver le compte"
                    : "Activer le compte"}
                </button>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}