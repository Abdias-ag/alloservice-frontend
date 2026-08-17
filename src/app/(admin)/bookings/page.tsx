"use client";
import { API_URL } from '@/utils/constants';


import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {

  CalendarCheck,
  ArrowLeft,
  RefreshCcw,
  CheckCircle,
  XCircle,
  Clock,
  User,
  Wrench,
  Filter,
  Sparkles,
} from "lucide-react";

type Booking = {
  id: number;
  status: "pending" | "accepted" | "refused" | "completed" | "cancelled";
  date: string;
  price: string;
  createdAt: string;
  client: { id: number; name: string; email: string; phone: string; photo?: string };
  artisan: { id: number; name: string; email: string; phone: string };
  serviceReserve: { id: number; title: string; category: string; price: string } | null;
};

const STATUS_CONFIG: Record<string, { label: string; color: string; bg: string; border: string }> = {
  pending:   { label: "En attente",  color: "text-amber-600",  bg: "bg-amber-50",  border: "border-amber-200" },
  accepted:  { label: "Acceptée",    color: "text-green-600",  bg: "bg-green-50",  border: "border-green-200" },
  refused:   { label: "Refusée",     color: "text-red-600",    bg: "bg-red-50",    border: "border-red-200"   },
  completed: { label: "Terminée",    color: "text-blue-600",   bg: "bg-blue-50",   border: "border-blue-200"  },
  cancelled: { label: "Annulée",     color: "text-gray-500",   bg: "bg-gray-50",   border: "border-gray-200"  },
};

const FILTERS = [
  { value: "", label: "Toutes" },
  { value: "pending", label: "En attente" },
  { value: "accepted", label: "Acceptées" },
  { value: "refused", label: "Refusées" },
  { value: "completed", label: "Terminées" },
];

export default function BookingsManagementPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("");
  const [moderatingId, setModeratingId] = useState<number | null>(null);

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const url = filter
        ? `${API_URL}/admin/bookings?status=${filter}`
        : `${API_URL}/admin/bookings`;
      const res = await fetch(url);
      const data = await res.json();
      setBookings(data.bookings || []);
    } catch (e) {
      console.error("Erreur récup réservations:", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchBookings(); }, [filter]);

  const moderate = async (id: number, status: "accepted" | "refused") => {
    setModeratingId(id);
    try {
      const res = await fetch(`${API_URL}/admin/bookings/${id}/status`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (res.ok) {
        setBookings((prev) =>
          prev.map((b) => (b.id === id ? { ...b, status } : b))
        );
      }
    } catch (e) {
      console.error("Erreur modération:", e);
    } finally {
      setModeratingId(null);
    }
  };

  return (
    <div className="p-8 lg:p-10">
      {/* Retour */}
      <Link
        href="/overview"
        className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-gray-900 font-medium mb-8 transition-colors group"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        Retour au Dashboard
      </Link>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 border-b border-gray-100 pb-6"
      >
        <div className="flex items-center gap-5">
          <div className="w-14 h-14 rounded-2xl bg-gray-900 flex items-center justify-center shadow-md">
            <CalendarCheck className="text-white w-7 h-7" />
          </div>
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">
              Réservations
            </h1>
            <p className="text-gray-500 text-sm mt-1 font-medium">
              Modérez toutes les demandes de la plateforme.
            </p>
          </div>
        </div>

        <button
          onClick={fetchBookings}
          className="p-3.5 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-all shadow-sm"
        >
          <RefreshCcw className={`w-5 h-5 text-gray-500 ${loading ? "animate-spin" : ""}`} />
        </button>
      </motion.div>

      {/* Filtres */}
      <div className="flex items-center gap-2 mb-7 flex-wrap">
        <Filter className="w-4 h-4 text-gray-400" />
        {FILTERS.map((f) => (
          <button
            key={f.value}
            onClick={() => setFilter(f.value)}
            className={`px-4 py-2 rounded-full text-xs font-bold border transition-all ${
              filter === f.value
                ? "bg-gray-900 text-white border-gray-900"
                : "bg-white text-gray-500 border-gray-200 hover:border-gray-400"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Liste */}
      <div className="grid gap-4">
        <AnimatePresence>
          {bookings.length === 0 && !loading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="p-20 border-2 border-dashed border-gray-200 rounded-2xl flex flex-col items-center justify-center text-gray-400 gap-4 bg-white"
            >
              <Sparkles className="w-12 h-12 text-gray-300" />
              <p className="font-semibold text-gray-400">Aucune réservation trouvée.</p>
            </motion.div>
          )}

          {bookings.map((booking, idx) => {
            const statusCfg = STATUS_CONFIG[booking.status] ?? STATUS_CONFIG.cancelled;
            const isPending = booking.status === "pending";

            return (
              <motion.div
                key={booking.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.04 }}
                className={`bg-white border border-l-4 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all ${
                  isPending ? "border-l-amber-400" : booking.status === "accepted" ? "border-l-green-500" : "border-l-gray-200"
                }`}
              >
                <div className="flex flex-col md:flex-row justify-between gap-5">
                  {/* Infos */}
                  <div className="flex-1 space-y-4">
                    {/* En-tête */}
                    <div className="flex items-center gap-3 flex-wrap">
                      <span className="bg-gray-100 text-gray-600 text-xs font-bold px-3 py-1 rounded-full">
                        #{booking.id}
                      </span>
                      <span className={`text-xs font-bold px-3 py-1 rounded-full border ${statusCfg.bg} ${statusCfg.color} ${statusCfg.border}`}>
                        {statusCfg.label}
                      </span>
                      <span className="flex items-center gap-1.5 text-xs text-gray-400 font-medium">
                        <Clock className="w-3.5 h-3.5" />
                        {new Date(booking.createdAt).toLocaleString("fr-FR", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>

                    {/* Service */}
                    {booking.serviceReserve && (
                      <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-100">
                        <Wrench className="w-4 h-4 text-pink-600 shrink-0" />
                        <div>
                          <p className="font-bold text-gray-900 text-sm">{booking.serviceReserve.title}</p>
                          <p className="text-xs text-gray-400">{booking.serviceReserve.category} — {booking.price || booking.serviceReserve.price || "Prix non défini"}</p>
                        </div>
                      </div>
                    )}

                    {/* Participants */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-xl border border-blue-100">
                        <div className="w-9 h-9 rounded-full bg-blue-700 flex items-center justify-center text-white font-bold text-xs shrink-0">
                          {booking.client?.name?.charAt(0) ?? "C"}
                        </div>
                        <div>
                          <p className="text-[10px] font-bold text-blue-500 uppercase tracking-wider">Client</p>
                          <p className="font-bold text-gray-900 text-sm">{booking.client?.name}</p>
                          <p className="text-xs text-gray-400">{booking.client?.phone || booking.client?.email}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-3 bg-pink-50 rounded-xl border border-pink-100">
                        <div className="w-9 h-9 rounded-full bg-pink-600 flex items-center justify-center text-white font-bold text-xs shrink-0">
                          {booking.artisan?.name?.charAt(0) ?? "A"}
                        </div>
                        <div>
                          <p className="text-[10px] font-bold text-pink-500 uppercase tracking-wider">Artisan</p>
                          <p className="font-bold text-gray-900 text-sm">{booking.artisan?.name}</p>
                          <p className="text-xs text-gray-400">{booking.artisan?.phone || booking.artisan?.email}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  {isPending && (
                    <div className="flex md:flex-col gap-3 self-start md:self-center shrink-0">
                      <button
                        onClick={() => moderate(booking.id, "accepted")}
                        disabled={moderatingId === booking.id}
                        className="flex items-center gap-2 px-5 py-3 bg-gray-900 hover:bg-gray-800 text-white font-bold text-xs rounded-xl transition-all active:scale-95 disabled:opacity-50"
                      >
                        <CheckCircle className="w-4 h-4" />
                        Accepter
                      </button>
                      <button
                        onClick={() => moderate(booking.id, "refused")}
                        disabled={moderatingId === booking.id}
                        className="flex items-center gap-2 px-5 py-3 bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 font-bold text-xs rounded-xl transition-all active:scale-95 disabled:opacity-50"
                      >
                        <XCircle className="w-4 h-4" />
                        Refuser
                      </button>
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}