"use client";
import { API_URL } from '@/utils/constants';


import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {

  ShieldCheck,
  RefreshCcw,
  ArrowLeft,
  Eye,
  CheckCircle,
  XCircle,
  ExternalLink,
  FileText,
  User,
  AlertCircle
} from "lucide-react";

type VerificationData = {
  id: number;
  userId: number;
  ifu: string;
  idCardUrl: string;
  diplomaUrl: string;
  verificationStatus: "pending" | "verified" | "rejected";
  updatedAt: string;
  user?: {
    name: string;
    email: string;
    phone: string;
    photo?: string;
  };
};

export default function VerificationsPage() {
  const [verifications, setVerifications] = useState<VerificationData[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDoc, setSelectedDoc] = useState<{ url: string; title: string } | null>(null);

  const fetchVerifications = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/admin/verifications/pending`);
      const data = await res.json();
      setVerifications(data.verifications || []);
    } catch (error) {
      console.error("Erreur récup verifications:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVerifications();
  }, []);

  const handleAction = async (profileId: number, action: 'approve' | 'reject') => {
    if (!confirm(`Êtes-vous sûr de vouloir ${action === 'approve' ? 'approuver' : 'rejeter'} cette vérification ?`)) return;

    try {
      const res = await fetch(`${API_URL}/admin/verifications/${profileId}/${action}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reason: action === 'reject' ? "Documents non conformes" : "" })
      });

      if (res.ok) {
        setVerifications(verifications.filter(v => v.id !== profileId));
      }
    } catch (error) {
      console.error(`Erreur lors de l'action ${action}:`, error);
    }
  };

  return (
    <div className="p-8 lg:p-10 bg-gray-50/50 min-h-screen">
      {/* Retour */}
      <Link
        href="/overview"
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
          <div className="w-14 h-14 rounded-2xl bg-blue-600 shadow-lg shadow-blue-500/20 flex items-center justify-center">
            <ShieldCheck className="text-white w-7 h-7" />
          </div>
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-black flex items-center gap-3">
              Vérifications Pro <span className="bg-blue-100 text-blue-600 text-[10px] px-3 py-1 rounded-full uppercase tracking-widest">Bénin</span>
            </h1>
            <p className="text-gray-400 text-sm mt-1 font-medium">
              Validez l'identité et les diplômes des artisans (IFU, CNI, CQM).
            </p>
          </div>
        </div>

        <button
          onClick={fetchVerifications}
          className="p-3.5 bg-white border border-gray-100 rounded-xl hover:border-primary/30 hover:bg-pink-50 transition-all shadow-sm"
        >
          <RefreshCcw
            className={`w-5 h-5 text-gray-400 ${loading ? "animate-spin text-primary" : ""}`}
          />
        </button>
      </motion.div>

      {/* Liste */}
      <div className="grid gap-6">
        {verifications.length === 0 && !loading ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="p-24 border-2 border-dashed border-gray-200 rounded-3xl flex flex-col items-center justify-center text-gray-400 gap-4 bg-white/50"
          >
            <ShieldCheck className="w-16 h-16 opacity-10" />
            <p className="font-semibold text-lg text-gray-300">
              Aucune demande de vérification en attente.
            </p>
          </motion.div>
        ) : (
          verifications.map((v, index) => (
            <motion.div
              key={v.id}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.05 * index }}
              className="bg-white border border-gray-100 rounded-3xl p-6 lg:p-8 flex flex-col xl:flex-row gap-8 items-start xl:items-center shadow-sm hover:shadow-xl transition-all duration-300"
            >
              {/* Infos Artisan */}
              <div className="flex items-center gap-4 min-w-[280px]">
                <div className="w-16 h-16 rounded-2xl bg-gray-900 overflow-hidden shrink-0 flex items-center justify-center">
                  {v.user?.photo ? (
                    <img src={v.user.photo} className="w-full h-full object-cover" alt="Artisan" />
                  ) : (
                    <User className="text-white w-8 h-8" />
                  )}
                </div>
                <div className="min-w-0">
                  <h3 className="font-extrabold text-xl text-black truncate">{v.user?.name}</h3>
                  <p className="text-gray-400 text-sm font-medium truncate">{v.user?.email}</p>
                  <p className="text-blue-600 text-xs font-bold mt-1 uppercase tracking-tighter bg-blue-50 inline-block px-2 py-0.5 rounded">ID #{v.userId}</p>
                </div>
              </div>

              {/* IFU & Documents */}
              <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-6 w-full">
                <div className="space-y-2">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">N° IFU</p>
                    <div className="flex items-center gap-3 bg-gray-50 p-4 rounded-2xl border border-gray-100 shadow-inner">
                        <FileText className="w-5 h-5 text-gray-400" />
                        <span className="font-mono font-bold text-lg text-black">{v.ifu || "Non fourni"}</span>
                    </div>
                </div>

                <div className="space-y-2">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Pièce d'Identité (CNI / CIP)</p>
                    {v.idCardUrl ? (
                         <button 
                            onClick={() => setSelectedDoc({ url: v.idCardUrl, title: "Pièce d'Identité" })}
                            className="w-full h-14 bg-white border border-gray-200 rounded-2xl flex items-center justify-center gap-3 hover:border-blue-300 hover:bg-blue-50 transition-all font-bold text-gray-600 group"
                         >
                            <Eye className="w-5 h-5 group-hover:text-blue-600" />
                            Voir l'ID
                         </button>
                    ) : (
                        <div className="h-14 border-2 border-dashed border-gray-100 rounded-2xl flex items-center justify-center text-gray-300 italic text-xs">Absent</div>
                    )}
                </div>

                <div className="space-y-2">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Diplôme (CQM / CQP)</p>
                    {v.diplomaUrl ? (
                         <button 
                            onClick={() => setSelectedDoc({ url: v.diplomaUrl, title: "Diplôme / Certification" })}
                            className="w-full h-14 bg-white border border-gray-200 rounded-2xl flex items-center justify-center gap-3 hover:border-blue-300 hover:bg-blue-50 transition-all font-bold text-gray-600 group"
                         >
                            <Eye className="w-5 h-5 group-hover:text-blue-600" />
                            Voir Diplôme
                         </button>
                    ) : (
                        <div className="h-14 border-2 border-dashed border-gray-100 rounded-2xl flex items-center justify-center text-gray-300 italic text-xs">Absent</div>
                    )}
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3 w-full xl:w-auto xl:flex-col justify-end">
                <button
                  onClick={() => handleAction(v.id, 'approve')}
                  className="flex-1 xl:w-full flex items-center justify-center gap-3 px-6 py-4 bg-green-500 hover:bg-green-600 text-white rounded-2xl font-black text-sm uppercase transition-all shadow-lg shadow-green-500/20 active:scale-95"
                >
                  <CheckCircle className="w-5 h-5" />
                  Approuver
                </button>
                <button
                  onClick={() => handleAction(v.id, 'reject')}
                  className="flex-1 xl:w-full flex items-center justify-center gap-3 px-6 py-4 bg-white border-2 border-red-100 text-red-500 hover:bg-red-50 rounded-2xl font-bold text-sm uppercase transition-all active:scale-95"
                >
                  <XCircle className="w-5 h-5" />
                  Rejeter
                </button>
              </div>
            </motion.div>
          ))
        )}
      </div>

      {/* Modal de prévisualisation des documents */}
      <AnimatePresence>
        {selectedDoc && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-8 backdrop-blur-md"
            onClick={() => setSelectedDoc(null)}
          >
            <motion.div 
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                className="relative max-w-4xl w-full bg-white rounded-3xl overflow-hidden shadow-2xl"
                onClick={e => e.stopPropagation()}
            >
                <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                    <h2 className="font-extrabold text-2xl text-black">{selectedDoc.title}</h2>
                    <button 
                        onClick={() => setSelectedDoc(null)}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                    >
                        <XCircle className="w-8 h-8 text-gray-400 hover:text-black" />
                    </button>
                </div>
                <div className="p-4 bg-gray-100 flex justify-center overflow-auto max-h-[70vh]">
                    <img src={selectedDoc.url} className="max-w-full h-auto rounded-xl shadow-lg border border-white" alt="Full document" />
                </div>
                <div className="p-6 bg-white flex justify-end gap-3 text-sm font-medium">
                    <p className="mr-auto text-gray-400 flex items-center gap-2"><AlertCircle className="w-4 h-4" /> Vérifiez bien la netteté et le nom sur le document.</p>
                </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}