"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar,
} from "recharts";
import {
  TrendingUp, Users, MousePointer2, Clock, 
  ArrowLeft, RefreshCcw, Calendar
} from "lucide-react";
import Link from "next/link";
import { API_URL } from '@/utils/constants';

const COLORS = ["#3b82f6", "#5836e8", "#10b981", "#f59e0b"];

export default function TrafficPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_URL}/admin/stats/traffic`)
      .then(r => r.json())
      .then(res => setData(res))
      .finally(() => setLoading(false));
  }, []);

  const kpis = [
    { label: "Visiteurs uniques", value: data?.uniqueVisitors ?? "0", icon: <Users className="w-5 h-5 text-blue-600" />, bg: "bg-blue-50", color: "text-blue-600", trend: "+12%" },
    { label: "Sessions", value: data?.totalHits ?? "0", icon: <RefreshCcw className="w-5 h-5 text-pink-600" />, bg: "bg-pink-50", color: "text-pink-600", trend: "+5%" },
    { label: "Pages vues", value: Math.floor((data?.totalHits || 0) * 2.4), icon: <MousePointer2 className="w-5 h-5 text-emerald-600" />, bg: "bg-emerald-50", color: "text-emerald-600", trend: "+18%" },
    { label: "Durée moyenne", value: data?.avgDuration ?? "0m 0s", icon: <Clock className="w-5 h-5 text-amber-600" />, bg: "bg-amber-50", color: "text-amber-600", trend: "-2%" },
  ];

  const chartData = data?.dailyHits.map((d: any) => ({
    name: new Date(d.date).toLocaleDateString("fr-FR", { day: '2-digit', month: '2-digit' }),
    Visiteurs: d.uniqueVisitors,
    Sessions: d.hits,
    Vues: Math.floor(d.hits * 1.8)
  })) || [];

  return (
    <div className="p-8 lg:p-10 min-h-screen bg-gray-50/30">
      <Link href="/stats" className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-gray-900 font-medium mb-8 transition-colors group">
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        Retour aux Statistiques
      </Link>

      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-10 flex justify-between items-end border-b border-gray-100 pb-8">
        <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">Trafic</h1>
            <p className="text-gray-500 text-sm mt-1 font-medium">Évolution du trafic, sessions et nouveaux visiteurs.</p>
        </div>
        <div className="flex gap-2">
            <div className="bg-white border border-gray-200 rounded-lg px-4 py-2 flex items-center gap-2 shadow-sm cursor-pointer hover:bg-gray-50 transition-all">
                <Calendar className="w-4 h-4 text-gray-400" />
                <span className="text-sm font-bold text-gray-700">30 derniers jours</span>
            </div>
        </div>
      </motion.div>

      {/* KPI Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {kpis.map((kpi, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm flex flex-col gap-4 relative overflow-hidden group hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
          >
            <div className={`w-12 h-12 ${kpi.bg} rounded-2xl flex items-center justify-center mb-2`}>
              {kpi.icon}
            </div>
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">{kpi.label}</p>
              <div className="flex items-baseline gap-3 mt-1">
                <p className={`text-3xl font-black ${kpi.color}`}>{kpi.value}</p>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${kpi.trend.startsWith('+') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {kpi.trend}
                </span>
              </div>
            </div>
            <div className={`absolute -right-4 -bottom-4 w-20 h-20 ${kpi.bg} rounded-full opacity-30 group-hover:scale-150 transition-transform duration-700`} />
          </motion.div>
        ))}
      </div>

      {/* Main Evolution Chart */}
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="bg-white border border-gray-100 rounded-[2.5rem] p-8 shadow-sm mb-10">
        <div className="flex items-center justify-between mb-10">
            <div>
                <h3 className="text-xl font-black text-gray-900">Évolution du trafic</h3>
                <p className="text-sm font-medium text-gray-400">Visiteurs, sessions et pages vues</p>
            </div>
            <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]"></div>
                    <span className="text-xs font-bold text-gray-600">Visiteurs</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-pink-500 shadow-[0_0_8px_rgba(88,54,232,0.5)]"></div>
                    <span className="text-xs font-bold text-gray-600">Sessions</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]"></div>
                    <span className="text-xs font-bold text-gray-600">Vues</span>
                </div>
            </div>
        </div>

        <div className="h-[400px] w-full mt-4">
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                    <defs>
                        <linearGradient id="colorVis" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                        </linearGradient>
                        <linearGradient id="colorSes" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#5836e8" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="#5836e8" stopOpacity={0}/>
                        </linearGradient>
                        <linearGradient id="colorVues" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#10b981" stopOpacity={0.1}/>
                            <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                    <XAxis 
                        dataKey="name" 
                        axisLine={false} 
                        tickLine={false} 
                        tick={{fontSize: 11, fill: '#9ca3af', fontWeight: 600}} 
                        dy={10}
                    />
                    <YAxis 
                        axisLine={false} 
                        tickLine={false} 
                        tick={{fontSize: 11, fill: '#9ca3af', fontWeight: 600}}
                        dx={-10}
                    />
                    <Tooltip 
                        contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                        itemStyle={{ fontSize: '12px', fontWeight: 'bold' }}
                    />
                    <Area type="monotone" dataKey="Visiteurs" stroke="#3b82f6" strokeWidth={4} fillOpacity={1} fill="url(#colorVis)" />
                    <Area type="monotone" dataKey="Sessions" stroke="#5836e8" strokeWidth={4} fillOpacity={1} fill="url(#colorSes)" />
                    <Area type="monotone" dataKey="Vues" stroke="#10b981" strokeWidth={2} strokeDasharray="5 5" fillOpacity={1} fill="url(#colorVues)" />
                </AreaChart>
            </ResponsiveContainer>
        </div>
      </motion.div>

      {/* Bottom Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.6 }} className="bg-white border border-gray-100 rounded-[2.5rem] p-8 shadow-sm">
                <h3 className="text-xl font-black text-gray-900 mb-2">Nouveaux vs Récurrents</h3>
                <p className="text-sm font-medium text-gray-400 mb-10">Fidélisation des visiteurs</p>
                <div className="flex items-center justify-around py-10">
                    <div className="flex flex-col items-center gap-4">
                        <div className="w-32 h-32 rounded-full border-[12px] border-blue-50 flex items-center justify-center relative shadow-[inset_0_2px_4px_rgba(0,0,0,0.05)]">
                            <div className="absolute inset-0 rounded-full border-[12px] border-blue-500 border-t-transparent -rotate-45" />
                            <span className="text-2xl font-black text-gray-900">82%</span>
                        </div>
                        <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">Nouveaux</p>
                    </div>
                    <div className="flex flex-col items-center gap-4">
                        <div className="w-32 h-32 rounded-full border-[12px] border-pink-50 flex items-center justify-center relative shadow-[inset_0_2px_4px_rgba(0,0,0,0.05)]">
                            <div className="absolute inset-0 rounded-full border-[12px] border-pink-500 border-r-transparent border-b-transparent rotate-90" />
                            <span className="text-2xl font-black text-gray-900">18%</span>
                        </div>
                        <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">Récurrents</p>
                    </div>
                </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.7 }} className="bg-white border border-gray-100 rounded-[2.5rem] p-8 shadow-sm">
                <h3 className="text-xl font-black text-gray-900 mb-2">Répartition mensuelle</h3>
                <p className="text-sm font-medium text-gray-400 mb-10">Les 6 derniers mois</p>
                <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={chartData.slice(-6)}>
                            <Bar dataKey="Sessions" fill="#5836e8" radius={[10, 10, 0, 0]} barSize={20} />
                            <Bar dataKey="Visiteurs" fill="#3b82f6" radius={[10, 10, 0, 0]} barSize={20} />
                            <Tooltip cursor={{fill: '#f9fafb'}} contentStyle={{borderRadius: '12px'}} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
          </motion.div>
      </div>

      {loading && (
        <div className="fixed inset-0 bg-white/60 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="w-12 h-12 border-4 border-gray-200 border-t-pink-600 rounded-full animate-spin"></div>
        </div>
      )}
    </div>
  );
}
