"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  AreaChart, Area, BarChart, Bar, LineChart, Line,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend,
} from "recharts";
import {
  BarChart3, TrendingUp, Users, Wrench, ArrowLeft,
  CalendarCheck, Clock, CheckCircle,
} from "lucide-react";
import Link from "next/link";
import { API_URL } from '@/utils/constants';

type Stats = {
  totalUsers: number;
  totalArtisans: number;
  totalBookings: number;
  activeServices: number;
  pendingBookings: number;
  acceptedBookings: number;
};

type MonthEntry = { month: string; total: number; clients?: number; artisans?: number; accepted?: number; refused?: number; pending?: number };
type StatusEntry = { status: string; count: number };

const MONTHS_FR: Record<string, string> = {
  "01": "Jan", "02": "Fév", "03": "Mar", "04": "Avr",
  "05": "Mai", "06": "Jun", "07": "Jul", "08": "Aoû",
  "09": "Sep", "10": "Oct", "11": "Nov", "12": "Déc",
};

const STATUS_COLORS: Record<string, string> = {
  pending: "#f59e0b",
  accepted: "#10b981",
  refused: "#ef4444",
  completed: "#3b82f6",
  cancelled: "#9ca3af",
};

const STATUS_LABELS: Record<string, string> = {
  pending: "En attente",
  accepted: "Acceptées",
  refused: "Refusées",
  completed: "Terminées",
  cancelled: "Annulées",
};

function formatMonth(m: string) {
  const [, mm] = m.split("-");
  return MONTHS_FR[mm] ?? m;
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white border border-gray-100 shadow-xl rounded-xl px-4 py-3 text-sm">
      <p className="font-bold text-gray-700 mb-1">{label}</p>
      {payload.map((p: any, i: number) => (
        <p key={i} style={{ color: p.color }} className="font-semibold">
          {p.name}: <span className="font-extrabold">{p.value}</span>
        </p>
      ))}
    </div>
  );
};

export default function StatsPage() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [usersByMonth, setUsersByMonth] = useState<MonthEntry[]>([]);
  const [bookingsByMonth, setBookingsByMonth] = useState<MonthEntry[]>([]);
  const [servicesByMonth, setServicesByMonth] = useState<MonthEntry[]>([]);
  const [statusDist, setStatusDist] = useState<StatusEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch(`${API_URL}/admin/stats`).then(r => r.json()),
      fetch(`${API_URL}/admin/stats/detailed`).then(r => r.json()),
    ]).then(([statsData, detailed]) => {
      setStats(statsData.stats);
      setUsersByMonth(detailed.usersByMonth || []);
      setBookingsByMonth(detailed.bookingsByMonth || []);
      setServicesByMonth(detailed.servicesByMonth || []);
      setStatusDist(
        (detailed.bookingStatusDist || []).map((d: any) => ({
          status: d.status,
          count: Number(d.count),
        }))
      );
    }).finally(() => setLoading(false));
  }, []);

  const kpis = [
    { label: "Clients inscrits", value: stats?.totalUsers ?? "—", icon: <Users className="w-5 h-5 text-blue-600" />, bg: "bg-blue-50", color: "text-blue-600" },
    { label: "Artisans actifs", value: stats?.totalArtisans ?? "—", icon: <Wrench className="w-5 h-5 text-pink-600" />, bg: "bg-pink-50", color: "text-pink-600" },
    { label: "Total réservations", value: stats?.totalBookings ?? "—", icon: <CalendarCheck className="w-5 h-5 text-emerald-600" />, bg: "bg-emerald-50", color: "text-emerald-600" },
    { label: "En attente", value: stats?.pendingBookings ?? "—", icon: <Clock className="w-5 h-5 text-amber-600" />, bg: "bg-amber-50", color: "text-amber-600" },
    { label: "Acceptées", value: stats?.acceptedBookings ?? "—", icon: <CheckCircle className="w-5 h-5 text-green-600" />, bg: "bg-green-50", color: "text-green-600" },
    { label: "Services publiés", value: stats?.activeServices ?? "—", icon: <BarChart3 className="w-5 h-5 text-purple-600" />, bg: "bg-purple-50", color: "text-purple-600" },
  ];

  const usersChartData = usersByMonth.map(d => ({
    name: formatMonth(d.month),
    Clients: Number(d.clients ?? 0),
    Artisans: Number(d.artisans ?? 0),
  }));

  const bookingsChartData = bookingsByMonth.map(d => ({
    name: formatMonth(d.month),
    "En attente": Number(d.pending ?? 0),
    "Acceptées": Number(d.accepted ?? 0),
    "Refusées": Number(d.refused ?? 0),
  }));

  const servicesChartData = servicesByMonth.map(d => ({
    name: formatMonth(d.month),
    Services: Number(d.total ?? 0),
  }));

  return (
    <div className="p-8 lg:p-10 min-h-screen">
      {/* Retour */}
      <Link href="/overview" className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-gray-900 font-medium mb-8 transition-colors group">
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        Retour au Dashboard
      </Link>

      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-5 mb-10 border-b border-gray-100 pb-6">
        <div className="w-14 h-14 rounded-2xl bg-gray-900 flex items-center justify-center shadow-md">
          <TrendingUp className="text-white w-7 h-7" />
        </div>
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">Statistiques</h1>
          <p className="text-gray-500 text-sm mt-1 font-medium">Analyse temps réel de la croissance d&apos;AlloService.</p>
        </div>
      </motion.div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-10">
        {kpis.map((kpi, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.06 * i }}
            className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm flex flex-col gap-3 hover:shadow-md transition-all"
          >
            <div className={`w-10 h-10 ${kpi.bg} rounded-xl flex items-center justify-center`}>
              {kpi.icon}
            </div>
            <div>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{kpi.label}</p>
              <p className={`text-2xl font-extrabold mt-1 ${kpi.color}`}>{String(kpi.value)}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Charts grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">

        {/* Inscriptions */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
          <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">Nouvelles Inscriptions</p>
          <h3 className="text-lg font-extrabold text-gray-900 mb-6">Clients & Artisans / mois</h3>
          {usersChartData.length === 0 ? (
            <div className="h-52 flex items-center justify-center text-gray-300 text-sm font-medium">Pas encore de données</div>
          ) : (
            <ResponsiveContainer width="100%" height={220}>
              <AreaChart data={usersChartData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="gradClients" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="gradArtisans" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ec4899" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#ec4899" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                <XAxis dataKey="name" tick={{ fontSize: 11, fill: "#9ca3af", fontWeight: 600 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: "#9ca3af" }} axisLine={false} tickLine={false} allowDecimals={false} />
                <Tooltip content={<CustomTooltip />} />
                <Legend wrapperStyle={{ fontSize: 12, fontWeight: 700 }} />
                <Area type="monotone" dataKey="Clients" stroke="#3b82f6" strokeWidth={2.5} fill="url(#gradClients)" dot={{ r: 4, fill: "#3b82f6" }} activeDot={{ r: 6 }} />
                <Area type="monotone" dataKey="Artisans" stroke="#ec4899" strokeWidth={2.5} fill="url(#gradArtisans)" dot={{ r: 4, fill: "#ec4899" }} activeDot={{ r: 6 }} />
              </AreaChart>
            </ResponsiveContainer>
          )}
        </motion.div>

        {/* Réservations */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
          <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">Volume de Réservations</p>
          <h3 className="text-lg font-extrabold text-gray-900 mb-6">Statuts par mois</h3>
          {bookingsChartData.length === 0 ? (
            <div className="h-52 flex items-center justify-center text-gray-300 text-sm font-medium">Pas encore de données</div>
          ) : (
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={bookingsChartData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }} barSize={14} barCategoryGap="30%">
                <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" vertical={false} />
                <XAxis dataKey="name" tick={{ fontSize: 11, fill: "#9ca3af", fontWeight: 600 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: "#9ca3af" }} axisLine={false} tickLine={false} allowDecimals={false} />
                <Tooltip content={<CustomTooltip />} />
                <Legend wrapperStyle={{ fontSize: 12, fontWeight: 700 }} />
                <Bar dataKey="En attente" fill="#f59e0b" radius={[4, 4, 0, 0]} />
                <Bar dataKey="Acceptées" fill="#10b981" radius={[4, 4, 0, 0]} />
                <Bar dataKey="Refusées" fill="#ef4444" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          )}
        </motion.div>

        {/* Services */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
          <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">Croissance Services</p>
          <h3 className="text-lg font-extrabold text-gray-900 mb-6">Services publiés / mois</h3>
          {servicesChartData.length === 0 ? (
            <div className="h-52 flex items-center justify-center text-gray-300 text-sm font-medium">Pas encore de données</div>
          ) : (
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={servicesChartData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                <XAxis dataKey="name" tick={{ fontSize: 11, fill: "#9ca3af", fontWeight: 600 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: "#9ca3af" }} axisLine={false} tickLine={false} allowDecimals={false} />
                <Tooltip content={<CustomTooltip />} />
                <Line type="monotone" dataKey="Services" stroke="#8b5cf6" strokeWidth={3} dot={{ r: 5, fill: "#8b5cf6", strokeWidth: 2, stroke: "#fff" }} activeDot={{ r: 7 }} />
              </LineChart>
            </ResponsiveContainer>
          )}
        </motion.div>

        {/* Donut statuts */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
          <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">Répartition</p>
          <h3 className="text-lg font-extrabold text-gray-900 mb-6">Statuts des réservations</h3>
          {statusDist.length === 0 ? (
            <div className="h-52 flex items-center justify-center text-gray-300 text-sm font-medium">Pas encore de données</div>
          ) : (
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie
                  data={statusDist}
                  dataKey="count"
                  nameKey="status"
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={4}
                  strokeWidth={2}
                >
                  {statusDist.map((entry, index) => (
                    <Cell key={index} fill={STATUS_COLORS[entry.status] ?? "#9ca3af"} />
                  ))}
                </Pie>
                <Tooltip formatter={(val, name) => [val, STATUS_LABELS[name as string] ?? name]} />
                <Legend
                  formatter={(val) => STATUS_LABELS[val] ?? val}
                  wrapperStyle={{ fontSize: 12, fontWeight: 700 }}
                />
              </PieChart>
            </ResponsiveContainer>
          )}
        </motion.div>
      </div>

      {loading && (
        <div className="fixed inset-0 bg-white/60 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="flex flex-col items-center gap-3">
            <div className="w-10 h-10 border-4 border-gray-200 border-t-pink-600 rounded-full animate-spin" />
            <p className="text-sm font-bold text-gray-500">Chargement des données...</p>
          </div>
        </div>
      )}
    </div>
  );
}
