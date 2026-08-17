"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bell,
  CheckCircle2,
  Package,
  UserPlus,
  AlertCircle,
  Clock,
  Sparkles,
  ArrowLeft,
  CheckCheck
} from "lucide-react";
import Link from "next/link";
import { API_URL } from '@/utils/constants';

type NotificationEntry = {
  id: number;
  action: string;
  details: string;
  userId: number;
  createdAt: string;
  auteurAction?: {
    name: string;
    role: string;
  };
};

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<NotificationEntry[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchLogs = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/admin/logs`);
      const data = await res.json();
      setNotifications(data.logs);
    } catch (error) {
      console.error("Erreur récup notifications:", error);
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
        return <UserPlus className="w-5 h-5 text-blue-500" />;
      case "BOOKING_CREATED":
        return <Package className="w-5 h-5 text-pink-600" />;
      case "BOOKING_STATUS_UPDATED":
        return <CheckCircle2 className="w-5 h-5 text-green-500" />;
      case "SERVICE_PUBLISHED":
        return <AlertCircle className="w-5 h-5 text-amber-500" />;
      default:
        return <Bell className="w-5 h-5 text-gray-500" />;
    }
  };

  return (
    <div className="p-8 lg:p-10 max-w-4xl mx-auto">
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
        className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10 border-b border-gray-100 pb-6"
      >
        <div className="flex items-center gap-5">
          <div className="w-14 h-14 rounded-2xl bg-gray-900 flex items-center justify-center shadow-lg">
            <Bell className="text-white w-7 h-7" />
          </div>
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">
              Centre de Notifications
            </h1>
            <p className="text-gray-500 text-sm mt-1 font-medium">
              Toutes les alertes et événements récents de la plateforme.
            </p>
          </div>
        </div>

        <button className="flex items-center gap-2 px-4 py-2 bg-gray-50 hover:bg-gray-100 text-gray-600 font-bold rounded-xl transition-colors text-sm border border-gray-200 shadow-sm">
           <CheckCheck className="w-4 h-4" />
           Tout marquer comme lu
        </button>
      </motion.div>

      {/* Notifications List */}
      <div className="space-y-4">
        <AnimatePresence>
          {notifications.map((notif, index) => (
            <motion.div
              key={notif.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-white border border-gray-200 rounded-2xl p-5 flex items-start gap-5 shadow-sm hover:shadow-md transition-shadow cursor-pointer relative overflow-hidden"
            >
              <div className="absolute left-0 top-0 w-1 h-full bg-pink-500" />
              
              <div className="w-12 h-12 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center shrink-0">
                {getActionIcon(notif.action)}
              </div>
              
              <div className="flex-1">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-1">
                  <h3 className="text-gray-900 font-bold">
                    {notif.action === "USER_REGISTERED" && "Nouvelle Inscription"}
                    {notif.action === "BOOKING_CREATED" && "Nouvelle Réservation"}
                    {notif.action === "SERVICE_PUBLISHED" && "Nouveau Service"}
                    {!["USER_REGISTERED","BOOKING_CREATED","SERVICE_PUBLISHED"].includes(notif.action) && notif.action.replace(/_/g, " ")}
                  </h3>
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-gray-400">
                    <Clock className="w-3.5 h-3.5" />
                    {new Date(notif.createdAt).toLocaleString("fr-FR", {
                      day: "numeric",
                      month: "short",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </div>
                </div>
                
                <p className="text-gray-600 text-sm mb-2">{notif.details}</p>
                
                {notif.auteurAction && (
                  <span className="inline-block px-2.5 py-1 bg-gray-100 text-gray-600 text-xs font-bold rounded-md">
                    Par: {notif.auteurAction.name}
                  </span>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {notifications.length === 0 && !loading && (
          <div className="py-20 flex flex-col items-center justify-center text-gray-300 gap-4">
            <Sparkles className="w-16 h-16 opacity-30" />
            <p className="font-semibold text-gray-400 text-lg">Vous êtes à jour !</p>
          </div>
        )}
      </div>
    </div>
  );
}
