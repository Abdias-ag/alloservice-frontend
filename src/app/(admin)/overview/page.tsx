"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  BarChart3,
  TrendingUp,
  Users,
  Wrench,
  Bell,
  ArrowRight,
  History,
  ArrowUpRight,
  ShieldCheck,
  Layers,
  Calendar,
  CreditCard,
  Image as ImageIcon,
  MessageSquare,
} from "lucide-react";
import Link from "next/link";
import { subscribeToWebPush } from "@/utils/pushNotifications";
import { API_URL } from '@/utils/constants';

type Stats = {
  totalUsers: number;
  totalArtisans: number;
  totalBookings: number;
  activeServices: number;
};

type LogEntry = {
  id: number;
  action: string;
  details: string;
  createdAt: string;
  auteurAction?: { name: string; role: string };
};

export default function Home() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [recentLogs, setRecentLogs] = useState<LogEntry[]>([]);

  useEffect(() => {
    // Récupérer les statistiques réelles du backend
    fetch(`${API_URL}/admin/stats`)
      .then((r) => r.json())
      .then((d) => setStats(d.stats))
      .catch(() => {});

    // Déclencher la demande d'abonnement aux notifications Windows/Mac
    const savedToken = localStorage.getItem("token");
    const savedUserId = localStorage.getItem("userId");
    if (savedToken && savedUserId) {
      subscribeToWebPush(Number(savedUserId), `${API_URL}`, savedToken);
    }

    // Récupérer les derniers logs
    fetch(`${API_URL}/admin/logs`)
      .then((r) => r.json())
      .then((d) => setRecentLogs((d.logs || []).slice(0, 5)))
      .catch(() => {});
  }, []);

  const kpis = [
    {
      label: "Utilisateurs Totaux",
      value: stats?.totalUsers ?? "—",
      icon: <Users className="w-5 h-5 text-primary" />,
      link: "/users",
      trend: "+12%",
      bg: "bg-pink-50",
    },
    {
      label: "Artisans Actifs",
      value: stats?.totalArtisans ?? "—",
      icon: <Wrench className="w-5 h-5 text-primary" />,
      link: "/artisans",
      trend: "+5%",
      bg: "bg-pink-50",
    },
    {
      label: "Réservations",
      value: stats?.totalBookings ?? "—",
      icon: <BarChart3 className="w-5 h-5 text-primary" />,
      link: "/stats",
      trend: "+28%",
      bg: "bg-pink-50",
    },
    {
      label: "Services Publiés",
      value: stats?.activeServices ?? "—",
      icon: <Layers className="w-5 h-5 text-primary" />,
      link: "/stats",
      trend: "+8%",
      bg: "bg-pink-50",
    },
  ];

  const actionColors: Record<string, string> = {
    USER_REGISTERED: "bg-pink-50 text-primary",
    BOOKING_CREATED: "bg-pink-50 text-primary",
    BOOKING_STATUS_UPDATED: "bg-green-50 text-green-600",
    SERVICE_PUBLISHED: "bg-amber-50 text-amber-600",
  };

  return (
    <div className="p-8 lg:p-10 min-h-screen">
      {/* Header */}
      <header className="flex justify-between items-center mb-10">
        <div>
          <p className="text-gray-400 text-sm font-medium mb-1 flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            {new Date().toLocaleDateString("fr-FR", {
              weekday: "long",
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </p>
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 mb-2">
            Vue d'ensemble
          </h1>
          <div className="flex gap-4 text-xs font-semibold">
            <span className="text-primary border-b-2 border-primary pb-1 cursor-pointer">
              Vue Générale
            </span>
            <Link
              href="/logs"
              className="text-gray-400 hover:text-black transition-colors pb-1"
            >
              Historique
            </Link>
            <Link
              href="/stats"
              className="text-gray-400 hover:text-black transition-colors pb-1"
            >
              Statistiques
            </Link>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Link
            href="/logs"
            className="relative p-3 bg-white border border-gray-100 rounded-xl hover:border-primary/30 hover:bg-pink-50 transition-all"
          >
            <Bell className="w-5 h-5 text-gray-400" />
            {recentLogs.length > 0 && (
              <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full animate-pulse" />
            )}
          </Link>
          <div className="flex items-center gap-3 bg-white border border-gray-200 rounded-xl px-4 py-2.5 shadow-sm">
            <div className="w-9 h-9 rounded-full bg-slate-900 flex items-center justify-center font-bold text-white text-xs">
              AD
            </div>
            <div className="hidden sm:block">
              <p className="text-sm font-bold text-black leading-none">
                Admin AlloService
              </p>
              <p className="text-[10px] text-gray-400 font-medium mt-0.5">
                Super Administrateur
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        {kpis.map((kpi, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08 * i, duration: 0.4 }}
          >
            <Link
              href={kpi.link}
              className="glass-card p-6 rounded-2xl flex flex-col gap-4 group hover:translate-y-[-4px] transition-all relative overflow-hidden block"
            >
              {/* Ligne latérale indicatrice */}
              <div className="absolute top-0 left-0 w-1 h-full bg-pink-600 rounded-r-full opacity-0 group-hover:opacity-100 transition-opacity" />

              <div className="flex justify-between items-center">
                <div className={`p-3 ${kpi.bg} rounded-xl group-hover:scale-110 transition-transform`}>
                  {kpi.icon}
                </div>
                <span className="text-[10px] font-bold text-primary bg-pink-50 px-2.5 py-1 rounded-lg flex items-center gap-1">
                  <ArrowUpRight className="w-3 h-3" /> {kpi.trend}
                </span>
              </div>
              <div>
                <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest">
                  {kpi.label}
                </p>
                <p className="text-3xl font-extrabold text-black mt-1 group-hover:text-primary transition-colors">
                  {String(kpi.value)}
                </p>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-12 gap-5">
        {/* Bar Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="col-span-12 lg:col-span-5 glass-card p-6 rounded-2xl"
        >
          <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest mb-1">
            Activité mensuelle
          </p>
          <h3 className="text-lg font-extrabold text-black mb-6">
            Réservations / Services
          </h3>
          <div className="flex items-end gap-3 h-36 mb-4">
            {[40, 60, 30, 80, 100, 70, 90].map((h, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-2">
                <div
                  className="w-full bg-gray-200 group-hover:bg-pink-600 rounded-t-sm transition-all origin-bottom cursor-pointer relative"
                  style={{ height: `${h}%` }}
                />
                <span className="text-[10px] text-gray-400 font-bold uppercase">
                  {["J", "F", "M", "A", "M", "J", "J"][i]}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Recent Activity Feed */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
          className="col-span-12 lg:col-span-7 glass-card p-6 rounded-2xl flex flex-col"
        >
          <div className="flex justify-between items-center mb-4">
            <div>
              <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest mb-1">
                Dernières Actions
              </p>
              <h3 className="text-lg font-extrabold text-black">
                Activité Récente
              </h3>
            </div>
            <Link
              href="/logs"
              className="flex items-center gap-2 text-xs font-bold text-primary hover:text-pink-600 transition-colors"
            >
              Tout voir <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="flex flex-col gap-2 flex-1">
            {recentLogs.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-10 text-gray-400 gap-3 flex-1">
                <History className="w-10 h-10 opacity-20" />
                <p className="text-sm font-medium">
                  Aucune activité récente.
                </p>
              </div>
            ) : (
              recentLogs.map((log, i) => (
                <motion.div
                  key={log.id}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * i }}
                  className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 transition-colors group"
                >
                  <div
                    className={`text-[9px] font-bold px-2.5 py-1 rounded-lg whitespace-nowrap shrink-0 ${actionColors[log.action] ?? "bg-gray-100 text-gray-500"}`}
                  >
                    {log.action.replace(/_/g, " ")}
                  </div>
                  <p className="text-sm text-gray-500 font-medium flex-1 truncate">
                    {log.details}
                  </p>
                  <span className="text-[10px] text-gray-400 font-bold whitespace-nowrap">
                    {new Date(log.createdAt).toLocaleTimeString("fr-FR", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </motion.div>
              ))
            )}
          </div>
        </motion.div>

        {/* Quick Actions */}
        <div className="col-span-12 grid grid-cols-1 md:grid-cols-3 gap-5">
          <Link href="/artisans">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55 }}
              className="glass-card p-6 rounded-2xl flex items-center gap-5 group hover:translate-y-[-4px] transition-all cursor-pointer hover:border-primary/20"
            >
              <div className="w-14 h-14 bg-gray-900 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform shrink-0 shadow-md">
                <ShieldCheck className="w-7 h-7 text-white" />
              </div>
              <div>
                <h4 className="font-bold text-black text-sm">
                  Gestion Artisans
                </h4>
                <p className="text-gray-400 text-xs mt-1">
                  Activer / Désactiver
                </p>
              </div>
              <ArrowRight className="w-4 h-4 text-gray-300 ml-auto group-hover:text-primary transition-colors" />
            </motion.div>
          </Link>

          <Link href="/logs">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.65 }}
              className="glass-card p-6 rounded-2xl flex items-center gap-5 group hover:translate-y-[-4px] transition-all cursor-pointer hover:border-primary/20"
            >
              <div className="w-14 h-14 bg-pink-50 border border-pink-100 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform shrink-0">
                <History className="w-7 h-7 text-primary" />
              </div>
              <div>
                <h4 className="font-bold text-black text-sm">
                  Historique Complet
                </h4>
                <p className="text-gray-400 text-xs mt-1">
                  Toutes les actions
                </p>
              </div>
              <ArrowRight className="w-4 h-4 text-gray-300 ml-auto group-hover:text-primary transition-colors" />
            </motion.div>
          </Link>

          <Link href="/stats">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.75 }}
              className="glass-card p-6 rounded-2xl flex items-center gap-5 group hover:translate-y-[-4px] transition-all cursor-pointer hover:border-primary/20"
            >
              <div className="w-14 h-14 bg-pink-50 border border-pink-100 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform shrink-0">
                <TrendingUp className="w-7 h-7 text-primary" />
              </div>
              <div>
                <h4 className="font-bold text-black text-sm">Statistiques</h4>
                <p className="text-gray-400 text-xs mt-1">
                  Analyse de performance
                </p>
              </div>
              <ArrowRight className="w-4 h-4 text-gray-300 ml-auto group-hover:text-primary transition-colors" />
            </motion.div>
          </Link>

          <Link href="/subscriptions">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="glass-card p-6 rounded-2xl flex items-center gap-5 group hover:translate-y-[-4px] transition-all cursor-pointer hover:border-primary/20"
            >
              <div className="w-14 h-14 bg-blue-50 border border-blue-100 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform shrink-0">
                <CreditCard className="w-7 h-7 text-blue-600" />
              </div>
              <div>
                <h4 className="font-bold text-black text-sm">Abonnements</h4>
                <p className="text-gray-400 text-xs mt-1">
                  Paiements et accès
                </p>
              </div>
              <ArrowRight className="w-4 h-4 text-gray-300 ml-auto group-hover:text-primary transition-colors" />
            </motion.div>
          </Link>

          <Link href="/banners">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.85 }}
              className="glass-card p-6 rounded-2xl flex items-center gap-5 group hover:translate-y-[-4px] transition-all cursor-pointer hover:border-primary/20"
            >
              <div className="w-14 h-14 bg-amber-50 border border-amber-100 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform shrink-0">
                <ImageIcon className="w-7 h-7 text-amber-600" />
              </div>
              <div>
                <h4 className="font-bold text-black text-sm">Bannières</h4>
                <p className="text-gray-400 text-xs mt-1">
                  Publicités mobile
                </p>
              </div>
              <ArrowRight className="w-4 h-4 text-gray-300 ml-auto group-hover:text-primary transition-colors" />
            </motion.div>
          </Link>

          <Link href="/reviews">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="glass-card p-6 rounded-2xl flex items-center gap-5 group hover:translate-y-[-4px] transition-all cursor-pointer hover:border-primary/20"
            >
              <div className="w-14 h-14 bg-purple-50 border border-purple-100 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform shrink-0">
                <MessageSquare className="w-7 h-7 text-purple-600" />
              </div>
              <div>
                <h4 className="font-bold text-black text-sm">Modération Avis</h4>
                <p className="text-gray-400 text-xs mt-1">
                  Gérer les retours
                </p>
              </div>
              <ArrowRight className="w-4 h-4 text-gray-300 ml-auto group-hover:text-primary transition-colors" />
            </motion.div>
          </Link>
        </div>
      </div>
    </div>
  );
}
