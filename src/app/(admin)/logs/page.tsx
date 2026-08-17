"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  History,
  Search,
  Clock,
  AlertCircle,
  CheckCircle2,
  Package,
  UserPlus,
  ToggleLeft,
  RefreshCcw,
  Sparkles,
  ArrowLeft,
} from "lucide-react";
import Link from "next/link";
import { API_URL } from '@/utils/constants';

type LogEntry = {
  id: number;
  action: string;
  details: string;
  userId: number;
  targetId: number | null;
  createdAt: string;
  auteurAction?: {
    name: string;
    role: string;
  };
};

export default function ActivityLogsPage() {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchLogs = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/admin/logs`);
      const data = await res.json();
      setLogs(data.logs);
    } catch (error) {
      console.error("Erreur récup logs:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  const getActionIcon = (action: string) => {
    switch (action) {
      case "USER_REGISTERED":
        return <UserPlus className="w-4 h-4 text-blue-500" />;
      case "BOOKING_CREATED":
        return <Package className="w-4 h-4 text-primary" />;
      case "BOOKING_STATUS_UPDATED":
        return <CheckCircle2 className="w-4 h-4 text-green-500" />;
      case "SERVICE_PUBLISHED":
        return <AlertCircle className="w-4 h-4 text-amber-500" />;
      case "ACCOUNT_TOGGLE":
        return <ToggleLeft className="w-4 h-4 text-purple-500" />;
      default:
        return <History className="w-4 h-4 text-gray-400" />;
    }
  };

  const getActionColor = (action: string) => {
    switch (action) {
      case "USER_REGISTERED":
        return "bg-blue-50 text-blue-600";
      case "BOOKING_CREATED":
        return "bg-pink-50 text-primary";
      case "BOOKING_STATUS_UPDATED":
        return "bg-green-50 text-green-600";
      case "SERVICE_PUBLISHED":
        return "bg-amber-50 text-amber-600";
      case "ACCOUNT_TOGGLE":
        return "bg-purple-50 text-purple-600";
      default:
        return "bg-gray-50 text-gray-500";
    }
  };

  const filteredLogs = logs.filter(
    (log) =>
      log.details.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.auteurAction?.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="p-8 lg:p-10">
      {/* Retour */}
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-primary font-medium mb-8 transition-colors group"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        Retour au Dashboard
      </Link>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10"
      >
        <div className="flex items-center gap-5">
          <div className="w-14 h-14 rounded-2xl pink-gradient pink-glow flex items-center justify-center">
            <History className="text-white w-7 h-7" />
          </div>
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-black">
              Historique des Actions
            </h1>
            <p className="text-gray-400 text-sm mt-1 font-medium">
              Audit complet de l&apos;activité sur AlloService.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={fetchLogs}
            className="p-3.5 bg-white border border-gray-100 rounded-xl hover:border-primary/30 hover:bg-pink-50 transition-all"
          >
            <RefreshCcw
              className={`w-5 h-5 text-gray-400 ${loading ? "animate-spin text-primary" : ""}`}
            />
          </button>

          <div className="relative glass-card rounded-xl overflow-hidden min-w-[280px]">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Rechercher une action..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-transparent border-none text-black py-3.5 pl-11 pr-4 w-full focus:outline-none text-sm font-medium placeholder:text-gray-400"
            />
          </div>
        </div>
      </motion.div>

      {/* Table */}
      <div className="glass-card rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50/80">
                <th className="px-6 py-5 text-[10px] font-bold uppercase text-gray-400 tracking-widest">
                  Activité
                </th>
                <th className="px-6 py-5 text-[10px] font-bold uppercase text-gray-400 tracking-widest">
                  Auteur
                </th>
                <th className="px-6 py-5 text-[10px] font-bold uppercase text-gray-400 tracking-widest">
                  Détails
                </th>
                <th className="px-6 py-5 text-[10px] font-bold uppercase text-gray-400 tracking-widest">
                  Date
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              <AnimatePresence>
                {filteredLogs.map((log, index) => (
                  <motion.tr
                    key={log.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.03 }}
                    className="hover:bg-pink-50/30 transition-colors group"
                  >
                    <td className="px-6 py-5 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg bg-gray-50 flex items-center justify-center group-hover:scale-110 transition-transform">
                          {getActionIcon(log.action)}
                        </div>
                        <span
                          className={`text-[9px] font-bold px-2.5 py-1 rounded-lg uppercase tracking-tight ${getActionColor(log.action)}`}
                        >
                          {log.action.replace(/_/g, " ")}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-black group-hover:text-primary transition-colors">
                          {log.auteurAction?.name || "Système"}
                        </span>
                        <span className="text-[10px] text-gray-400 uppercase font-bold tracking-tight">
                          {log.auteurAction?.role || "System"}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <p className="text-sm text-gray-500 font-medium max-w-xs truncate">
                        {log.details}
                      </p>
                    </td>
                    <td className="px-6 py-5 whitespace-nowrap">
                      <div className="flex items-center gap-2 text-gray-400 text-xs font-medium">
                        <Clock className="w-3.5 h-3.5 opacity-50" />
                        {new Date(log.createdAt).toLocaleString("fr-FR", {
                          day: "numeric",
                          month: "short",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>

          {filteredLogs.length === 0 && !loading && (
            <div className="p-20 flex flex-col items-center justify-center text-gray-400 gap-3">
              <Sparkles className="w-12 h-12 opacity-15" />
              <p className="font-medium">Aucun log d&apos;activité trouvé.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
