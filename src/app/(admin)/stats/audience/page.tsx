"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend, RadialBarChart, RadialBar,
} from "recharts";
import {
  Users, Globe, Compass, Cpu, 
  ArrowLeft, Monitor, Smartphone, Tablet
} from "lucide-react";
import Link from "next/link";
import { API_URL } from '@/utils/constants';

const COLORS = ["#3b82f6", "#5836e8", "#10b981", "#f59e0b", "#7b61ff", "#6366f1"];

export default function AudiencePage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_URL}/admin/stats/audience`)
      .then(r => r.json())
      .then(res => setData(res))
      .finally(() => setLoading(false));
  }, []);

  const radialData = data?.devices.map((d: any, i: number) => ({
    name: d.name,
    uv: d.value,
    fill: COLORS[i % COLORS.length]
  })) || [];

  return (
    <div className="p-8 lg:p-10 min-h-screen bg-gray-50/30">
      <Link href="/stats" className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-gray-900 font-medium mb-8 transition-colors group">
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        Retour aux Statistiques
      </Link>

      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-10 border-b border-gray-100 pb-8">
        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">Audience</h1>
        <p className="text-gray-500 text-sm mt-1 font-medium">Qui visite ton site — pays, appareils, langues.</p>
      </motion.div>

      {/* Top Grid: Appareils & Pays */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8">
        
        {/* Appareils (Radial Chart) */}
        <motion.div 
            initial={{ opacity: 0, scale: 0.95 }} 
            animate={{ opacity: 1, scale: 1 }} 
            className="lg:col-span-5 bg-white border border-gray-100 rounded-[2.5rem] p-8 shadow-sm flex flex-col"
        >
            <h3 className="text-xl font-black text-gray-900 mb-2">Appareils</h3>
            <p className="text-sm font-medium text-gray-400 mb-6">Répartition desktop / mobile / tablette</p>
            
            <div className="flex-1 min-h-[300px] flex items-center justify-center relative">
                <ResponsiveContainer width="100%" height="100%">
                    <RadialBarChart cx="50%" cy="50%" innerRadius="30%" outerRadius="100%" barSize={15} data={radialData}>
                        <RadialBar
                            background
                            dataKey="uv"
                            cornerRadius={10}
                        />
                        <Tooltip 
                            contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                        />
                    </RadialBarChart>
                </ResponsiveContainer>
                <div className="absolute flex flex-col items-center">
                    <span className="text-3xl font-black text-gray-900">{radialData.reduce((acc: any, curr: any) => acc + curr.uv, 0)}</span>
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Utilisateurs</span>
                </div>
            </div>

            <div className="grid grid-cols-3 gap-4 mt-6">
                {data?.devices.map((d: any, i: number) => (
                    <div key={i} className="flex flex-col items-center p-3 rounded-2xl bg-gray-50/50">
                        {d.name === 'desktop' ? <Monitor className="w-4 h-4 text-blue-500 mb-1" /> : d.name === 'mobile' ? <Smartphone className="w-4 h-4 text-pink-500 mb-1" /> : <Tablet className="w-4 h-4 text-emerald-500 mb-1" />}
                        <span className="text-[10px] font-bold text-gray-500 uppercase">{d.name}</span>
                        <span className="text-sm font-black text-gray-900">{d.value}</span>
                    </div>
                ))}
            </div>
        </motion.div>

        {/* Pays (Horizontal Bar Chart) */}
        <motion.div 
            initial={{ opacity: 0, x: 30 }} 
            animate={{ opacity: 1, x: 0 }} 
            className="lg:col-span-7 bg-white border border-gray-100 rounded-[2.5rem] p-8 shadow-sm"
        >
            <h3 className="text-xl font-black text-gray-900 mb-2">Pays — répartition des visiteurs</h3>
            <p className="text-sm font-medium text-gray-400 mb-8">Top 15 pays</p>
            
            <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart layout="vertical" data={data?.countries} margin={{ left: 40, right: 40 }}>
                        <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f3f4f6" />
                        <XAxis type="number" hide />
                        <YAxis 
                            dataKey="name" 
                            type="category" 
                            axisLine={false} 
                            tickLine={false} 
                            tick={{fontSize: 12, fontWeight: 700, fill: '#374151'}}
                            width={100}
                        />
                        <Tooltip 
                            cursor={{fill: '#f9fafb'}}
                            contentStyle={{ borderRadius: '12px', border: 'none' }}
                        />
                        <Bar dataKey="value" fill="#3b82f6" radius={[0, 10, 10, 0]} barSize={20} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </motion.div>
      </div>

      {/* Bottom Grid: Navigateurs, OS, Langues */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-10">
          
          {/* Navigateurs */}
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-white border border-gray-100 rounded-[2.5rem] p-8 shadow-sm">
                <h3 className="text-lg font-black text-gray-900 mb-1">Navigateurs</h3>
                <p className="text-xs font-medium text-gray-400 mb-8">Top 6</p>
                <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={data?.browsers.slice(0, 6)}>
                            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: 700}} dy={10} />
                            <Tooltip cursor={{fill: '#f9fafb'}} contentStyle={{borderRadius: '12px'}} />
                            <Bar dataKey="value" fill="#3b82f6" radius={[8, 8, 0, 0]} barSize={35} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
          </motion.div>

          {/* OS (Donut) */}
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bg-white border border-gray-100 rounded-[2.5rem] p-8 shadow-sm">
                <h3 className="text-lg font-black text-gray-900 mb-1">Systèmes d'exploitation</h3>
                <p className="text-xs font-medium text-gray-400 mb-8">Répartition OS</p>
                <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={data?.os}
                                cx="50%"
                                cy="50%"
                                innerRadius={60}
                                outerRadius={80}
                                paddingAngle={5}
                                dataKey="value"
                                cornerRadius={6}
                            >
                                {data?.os.map((entry: any, index: number) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip contentStyle={{borderRadius: '12px'}} />
                            <Legend iconType="circle" wrapperStyle={{paddingTop: 20, fontSize: '10px', fontWeight: 'bold'}} />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
          </motion.div>

          {/* Langues */}
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="bg-white border border-gray-100 rounded-[2.5rem] p-8 shadow-sm">
                <h3 className="text-lg font-black text-gray-900 mb-1">Langues</h3>
                <p className="text-xs font-medium text-gray-400 mb-8">Langues du navigateur</p>
                <div className="space-y-6 mt-4">
                    {[
                        { name: 'Français', pc: 68, color: 'bg-blue-500' },
                        { name: 'Anglais', pc: 24, color: 'bg-pink-500' },
                        { name: 'Autre', pc: 8, color: 'bg-emerald-500' }
                    ].map((lang, i) => (
                        <div key={i}>
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-xs font-bold text-gray-700">{lang.name}</span>
                                <span className="text-xs font-black text-gray-900">{lang.pc}%</span>
                            </div>
                            <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                                <motion.div 
                                    initial={{ width: 0 }} 
                                    animate={{ width: `${lang.pc}%` }} 
                                    className={`h-full ${lang.color} rounded-full`} 
                                />
                            </div>
                        </div>
                    ))}
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
