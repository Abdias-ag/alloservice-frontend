"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  Cell,
} from "recharts";
import {
  FileText, MousePointer2, TrendingUp, 
  ArrowLeft, Layout, Activity
} from "lucide-react";
import Link from "next/link";
import { API_URL } from '@/utils/constants';

const COLORS = ["#3b82f6", "#5836e8", "#10b981", "#f59e0b", "#7b61ff", "#6366f1", "#f43f5e", "#06b6d4"];

export default function PagesStatsPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_URL}/admin/stats/pages`)
      .then(r => r.json())
      .then(res => setData(res))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="p-8 lg:p-10 min-h-screen bg-gray-50/30">
      <Link href="/stats" className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-gray-900 font-medium mb-8 transition-colors group">
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        Retour aux Statistiques
      </Link>

      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-10 border-b border-gray-100 pb-8 flex justify-between items-end">
        <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">Actions & Pages</h1>
            <p className="text-gray-500 text-sm mt-1 font-medium">Analyse des fonctionnalités les plus utilisées sur l'application.</p>
        </div>
        <div className="flex items-center gap-2 bg-emerald-50 text-emerald-700 px-4 py-2 rounded-xl border border-emerald-100 animate-pulse">
            <Activity className="w-4 h-4" />
            <span className="text-xs font-bold uppercase tracking-wider">Live Tracking Activé</span>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Table/List of actions */}
        <motion.div 
            initial={{ opacity: 0, x: -30 }} 
            animate={{ opacity: 1, x: 0 }} 
            className="lg:col-span-7 bg-white border border-gray-100 rounded-[2.5rem] p-8 shadow-sm overflow-hidden"
        >
            <h3 className="text-xl font-black text-gray-900 mb-6 flex items-center gap-3">
                <FileText className="w-6 h-6 text-primary" />
                Détail des Actions
            </h3>
            
            <div className="space-y-4">
                <div className="grid grid-cols-12 px-4 py-2 text-[10px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-50">
                    <div className="col-span-7">Action / Page</div>
                    <div className="col-span-3 text-right">Volume</div>
                    <div className="col-span-2 text-right">Portée</div>
                </div>
                {data?.topPages.map((page: any, i: number) => (
                    <motion.div 
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        key={i} 
                        className="grid grid-cols-12 items-center px-4 py-4 rounded-2xl hover:bg-gray-50 transition-all group"
                    >
                        <div className="col-span-7 flex items-center gap-4">
                            <span className="text-xs font-bold text-gray-300 w-4 group-hover:text-primary transition-colors">{i+1}</span>
                            <span className="text-sm font-bold text-gray-700">{page.name}</span>
                        </div>
                        <div className="col-span-3 text-right">
                            <span className="text-sm font-black text-gray-900">{page.value}</span>
                        </div>
                        <div className="col-span-2 text-right">
                            <span className="text-xs font-bold text-gray-400">{page.uniqueUsers} us.</span>
                        </div>
                    </motion.div>
                ))}
            </div>
        </motion.div>

        {/* Visual Bar Chart for Distribution */}
        <motion.div 
            initial={{ opacity: 0, x: 30 }} 
            animate={{ opacity: 1, x: 0 }} 
            className="lg:col-span-5 bg-white border border-gray-100 rounded-[2.5rem] p-8 shadow-sm flex flex-col"
        >
            <h3 className="text-xl font-black text-gray-900 mb-2">Répartition</h3>
            <p className="text-sm font-medium text-gray-400 mb-10">Popularité relative des actions</p>
            
            <div className="flex-1 min-h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart layout="vertical" data={data?.topPages} margin={{ left: 20, right: 20 }}>
                        <XAxis type="number" hide />
                        <YAxis 
                            dataKey="name" 
                            type="category" 
                            axisLine={false} 
                            tickLine={false} 
                            tick={false} // Custom labels inside or hidden
                            width={1}
                        />
                        <Tooltip cursor={{fill: '#f9fafb'}} contentStyle={{borderRadius: '16px', border: 'none'}} />
                        <Bar dataKey="value" radius={[0, 12, 12, 0]} barSize={35}>
                            {data?.topPages.map((entry: any, index: number) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} fillOpacity={0.8} />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>

            <div className="mt-10 p-6 bg-pink-50 rounded-3xl border border-pink-100">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm">
                        <TrendingUp className="w-6 h-6 text-pink-500" />
                    </div>
                    <div>
                        <p className="text-xs font-bold text-pink-400 uppercase tracking-widest leading-none">Insight</p>
                        <p className="text-sm font-bold text-gray-800 mt-1">
                            L'action <span className="text-pink-600">"{data?.topPages[0]?.name}"</span> est la plus performante ce mois-ci.
                        </p>
                    </div>
                </div>
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
