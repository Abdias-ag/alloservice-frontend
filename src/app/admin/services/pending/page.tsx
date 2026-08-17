"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  CheckCircle,
  XCircle,
  Clock,
  Hammer,
  FileCheck2,
  RefreshCcw,
  ArrowLeft,
} from "lucide-react";
import Link from "next/link";
import { API_URL } from '@/utils/constants';

type PendingService = {
  id: number;
  category: string;
  description: string;
  city: string;
  price: number;
  createdAt: string;
  prestataire: {
    name: string;
    phone: string;
    photo?: string;
  };
};

export default function PendingServicesPage() {
  const [services, setServices] = useState<PendingService[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchPendingServices = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `${API_URL}/admin/pending-services`,
      );
      const data = await res.json();
      setServices(data.services || []);
    } catch (error) {
      console.error("Erreur:", error);
    } finally {
      setLoading(false);
    }
  };

  const approveService = async (serviceId: number) => {
    try {
      await fetch(
        `${API_URL}/admin/services/${serviceId}/approve`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
        },
      );
      fetchPendingServices(); // Refresh
    } catch (error) {
      console.error("Erreur approbation:", error);
    }
  };

  const rejectService = async (serviceId: number) => {
    if (!confirm("Rejeter ce service ?")) return;
    try {
      await fetch(
        `${API_URL}/admin/services/${serviceId}/reject`,
        {
          method: "POST",
          body: JSON.stringify({ reason: "Non conforme aux standards" }),
        },
      );
      fetchPendingServices();
    } catch (error) {
      console.error("Erreur rejet:", error);
    }
  };

  useEffect(() => {
    fetchPendingServices();
  }, []);

  if (loading)
    return (
      <div className="p-20 flex items-center justify-center">
        <RefreshCcw className="w-8 h-8 animate-spin text-primary" />
      </div>
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
        className="flex items-center gap-5 mb-10"
      >
        <div className="w-14 h-14 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center">
          <Clock className="w-7 h-7 text-amber-500" />
        </div>
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-black">
            Services en attente
          </h1>
          <p className="text-gray-400 text-sm mt-1 font-medium">
            {services.length} service{services.length > 1 ? "s" : ""} à valider
          </p>
        </div>
      </motion.div>

      {/* Liste */}
      <div className="grid gap-5">
        {services.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            <FileCheck2 className="w-14 h-14 mx-auto opacity-20 mb-4" />
            <p className="text-lg font-medium">Aucun service en attente</p>
          </div>
        ) : (
          services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.06 * index }}
              className="glass-card p-7 rounded-2xl hover:border-primary/20 transition-all group"
            >
              <div className="flex items-start gap-6">
                {/* Icône */}
                <div className="w-16 h-16 bg-pink-50 border border-pink-100 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                  <Hammer className="w-8 h-8 text-primary" />
                </div>

                {/* Contenu */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-bold text-black truncate">
                      {service.category}
                    </h3>
                    <span className="px-3 py-1 bg-amber-50 text-amber-600 text-[10px] font-bold rounded-lg uppercase tracking-wider border border-amber-200">
                      En attente
                    </span>
                  </div>
                  <p className="text-gray-500 mb-4 leading-relaxed text-sm">
                    {service.description}
                  </p>
                  <div className="grid md:grid-cols-2 gap-3 text-sm mb-5">
                    <div className="flex items-center gap-2 text-gray-500">
                      <span className="font-bold text-black">
                        {service.price}€
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-400">
                      📍 {service.city}
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-400">
                    <span className="font-medium">
                      Par{" "}
                      <span className="text-black font-bold">
                        {service.prestataire.name}
                      </span>
                    </span>
                    <span className="text-xs">
                      📞 {service.prestataire.phone}
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col gap-3 ml-auto">
                  <button
                    onClick={() => approveService(service.id)}
                    className="px-5 py-3 bg-green-500 hover:bg-green-600 text-white font-bold rounded-xl shadow-lg shadow-green-500/20 transition-all flex items-center gap-2 text-xs uppercase active:scale-95"
                  >
                    <CheckCircle className="w-4 h-4" />
                    Approuver
                  </button>
                  <button
                    onClick={() => rejectService(service.id)}
                    className="px-5 py-3 bg-red-500 hover:bg-red-600 text-white font-bold rounded-xl shadow-lg shadow-red-500/20 transition-all flex items-center gap-2 text-xs uppercase active:scale-95"
                  >
                    <XCircle className="w-4 h-4" />
                    Rejeter
                  </button>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}
