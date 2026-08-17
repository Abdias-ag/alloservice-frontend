"use client";
import { API_URL } from '@/utils/constants';


import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {

  Power,
  ShieldCheck,
  Mail,
  MapPin,
  Sparkles,
  RefreshCcw,
  ArrowLeft,
} from "lucide-react";

type ArtisanData = {
  id: number;
  name: string;
  email: string;
  isClient: boolean;
  isArtisan: boolean;
  isAdmin: boolean;
  city: string;
  commune: string;
  isActive: boolean;
  isVerified: boolean;
  photo?: string;
};

export default function ArtisanManagementPage() {
  const [artisans, setArtisans] = useState<ArtisanData[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'verified' | 'unverified'>('all');

  const fetchArtisans = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/admin/users`);
      const data = await res.json();
      // Filtrer pour ne garder que les artisans
      setArtisans(data.users.filter((u: any) => u.isArtisan === true));
    } catch (error) {
      console.error("Erreur récup artisans:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArtisans();
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
        setArtisans(
          artisans.map((a) =>
            a.id === id ? { ...a, isActive: !currentStatus } : a,
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
        className="flex justify-between items-center mb-10"
      >
        <div className="flex items-center gap-5">
          <div className="w-14 h-14 rounded-2xl pink-gradient pink-glow flex items-center justify-center">
            <ShieldCheck className="text-white w-7 h-7" />
          </div>
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-black">
              Gestion des Artisans
            </h1>
            <p className="text-gray-400 text-sm mt-1 font-medium">
              Activez ou désactivez les accès des professionnels.
            </p>
          </div>
        </div>

        <button
          onClick={fetchArtisans}
          className="p-3.5 bg-white border border-gray-100 rounded-xl hover:border-primary/30 hover:bg-pink-50 transition-all shadow-sm"
        >
          <RefreshCcw
            className={`w-5 h-5 text-gray-400 ${loading ? "animate-spin text-primary" : ""}`}
          />
        </button>
      </motion.div>

      {/* Filtres */}
      <div className="flex items-center gap-2 mb-8 bg-white p-1.5 rounded-2xl border border-gray-100 w-fit shadow-sm">
          {[
              { id: 'all', label: 'Tous', count: artisans.length },
              { id: 'verified', label: 'Certifiés Pro', count: artisans.filter(a => a.isVerified).length },
              { id: 'unverified', label: 'Non Certifiés', count: artisans.filter(a => !a.isVerified).length }
          ].map((tab) => (
              <button
                  key={tab.id}
                  onClick={() => setFilter(tab.id as any)}
                  className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all flex items-center gap-2 ${
                      filter === tab.id 
                      ? "bg-gray-900 text-white shadow-lg shadow-gray-900/10" 
                      : "text-gray-400 hover:text-black hover:bg-gray-50"
                  }`}
              >
                  {tab.label}
                  <span className={`text-[10px] px-1.5 py-0.5 rounded-md ${
                      filter === tab.id ? "bg-white/20 text-white" : "bg-gray-100 text-gray-400"
                  }`}>
                      {tab.count}
                  </span>
              </button>
          ))}
      </div>

      {/* Liste */}
      <div className="grid gap-5">
        {artisans.length === 0 && !loading ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="p-20 border-2 border-dashed border-gray-200 rounded-2xl flex flex-col items-center justify-center text-gray-400 gap-4"
          >
            <Sparkles className="w-12 h-12 opacity-20" />
            <p className="font-medium">
              Aucun artisan inscrit pour le moment.
            </p>
          </motion.div>
        ) : (
          artisans
            .filter(a => {
                if (filter === 'verified') return a.isVerified;
                if (filter === 'unverified') return !a.isVerified;
                return true;
            })
            .map((artisan, index) => (
            <motion.div
              key={artisan.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.08 * index }}
              className={`glass-card rounded-2xl p-7 flex flex-col md:flex-row justify-between items-center gap-6 border-l-4 transition-all ${
                artisan.isActive
                  ? "border-l-primary"
                  : "border-l-gray-300 opacity-70"
              }`}
            >
              <div className="flex-1 space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full pink-gradient flex items-center justify-center text-white font-bold text-sm">
                    {artisan.name.substring(0, 1)}
                  </div>
                  <h2 className="text-xl font-bold text-black">
                    {artisan.name}
                  </h2>
                  <div className="flex items-center gap-2">
                    <span
                        className={`text-[10px] px-3 py-1 rounded-full font-bold uppercase tracking-wider ${
                        artisan.isActive
                            ? "bg-green-50 text-green-600 border border-green-200"
                            : "bg-red-50 text-red-500 border border-red-200"
                        }`}
                    >
                        {artisan.isActive ? "Actif" : "Désactivé"}
                    </span>
                    {artisan.isVerified && (
                        <span className="bg-blue-50 text-blue-600 text-[10px] px-3 py-1 rounded-full font-extrabold uppercase tracking-widest border border-blue-100 flex items-center gap-1.5 shadow-sm">
                            <ShieldCheck className="w-3.5 h-3.5" />
                            Certifié Pro
                        </span>
                    )}
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-5 text-gray-500 text-sm font-medium">
                  <span className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-primary" /> {artisan.email}
                  </span>
                  <span className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-primary" /> {artisan.city}{artisan.commune ? `, ${artisan.commune}` : ""}
                  </span>
                  <span className="bg-gray-50 px-3 py-1 rounded-lg font-bold text-gray-500 text-xs border border-gray-100">
                    ID : {artisan.id}
                  </span>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => toggleStatus(artisan.id, artisan.isActive)}
                  className={`flex items-center gap-2.5 px-6 py-3 rounded-xl font-bold transition-all text-xs uppercase active:scale-95 ${
                    artisan.isActive
                      ? "bg-red-500 hover:bg-red-600 text-white shadow-lg shadow-red-500/20"
                      : "pink-gradient text-white pink-glow"
                  }`}
                >
                  <Power className="w-4 h-4" />
                  {artisan.isActive
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