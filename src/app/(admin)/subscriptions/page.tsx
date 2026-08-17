"use client";
import { API_URL } from '@/utils/constants';


import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {

  CreditCard,
  Search,
  RefreshCcw,
  ArrowLeft,
  Calendar,
  CheckCircle2,
  AlertCircle,
  Clock,
  Settings2,
  X,
  Save,
  ShieldCheck,
  User as UserIcon,
  Phone,
  Mail
} from "lucide-react";

type ArtisanSubscription = {
  id: number;
  name: string;
  email: string;
  phone: string;
  city: string;
  subscriptionStatus: 'none' | 'trial' | 'active' | 'expired';
  trialExpiresAt: string | null;
  subscriptionExpiresAt: string | null;
  isVerified: boolean;
};

export default function SubscriptionManagementPage() {
  const [artisans, setArtisans] = useState<ArtisanSubscription[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedArtisan, setSelectedArtisan] = useState<ArtisanSubscription | null>(null);
  const [formData, setFormData] = useState({ status: "active", expiresAt: "", reason: "" });
  const [submitting, setSubmitting] = useState(false);

  const fetchSubscriptions = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/admin/subscriptions`);
      const data = await res.json();
      setArtisans(data.artisans || []);
    } catch (error) {
      console.error("Erreur récup abonnements:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubscriptions();
  }, []);

  const handleOpenModal = (artisan: ArtisanSubscription) => {
    setSelectedArtisan(artisan);
    const dateStr = artisan.subscriptionExpiresAt 
      ? new Date(artisan.subscriptionExpiresAt).toISOString().split('T')[0]
      : new Date().toISOString().split('T')[0];
    
    setFormData({ 
      status: artisan.subscriptionStatus === 'none' ? 'active' : artisan.subscriptionStatus, 
      expiresAt: dateStr, 
      reason: "" 
    });
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedArtisan(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedArtisan) return;
    
    setSubmitting(true);
    try {
      const res = await fetch(`${API_URL}/admin/subscriptions/${selectedArtisan.id}/manual`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        fetchSubscriptions();
        handleCloseModal();
      }
    } catch (error) {
      console.error("Erreur mise à jour:", error);
    } finally {
      setSubmitting(false);
    }
  };

  const getStatusBadge = (status: string, expiresAt: string | null) => {
    const now = new Date();
    const isExpired = expiresAt && new Date(expiresAt) < now;

    if (status === 'active' && !isExpired) {
      return <span className="bg-green-50 text-green-600 border border-green-100 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5"><CheckCircle2 className="w-3 h-3" /> Actif</span>;
    }
    if (status === 'trial') {
      return <span className="bg-blue-50 text-blue-600 border border-blue-100 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5"><Clock className="w-3 h-3" /> Essai</span>;
    }
    if (status === 'expired' || isExpired) {
      return <span className="bg-red-50 text-red-500 border border-red-100 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5"><AlertCircle className="w-3 h-3" /> Expiré</span>;
    }
    return <span className="bg-gray-50 text-gray-400 border border-gray-200 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">Aucun</span>;
  };

  const filteredArtisans = artisans.filter(a => 
    a.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    a.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    a.phone.includes(searchQuery)
  );

  return (
    <div className="p-8 lg:p-10 max-w-7xl mx-auto">
      {/* Navigation */}
      <Link
        href="/overview"
        className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-primary font-medium mb-8 transition-colors group"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        Retour au Dashboard
      </Link>

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
        <div className="flex items-center gap-5">
          <div className="w-14 h-14 rounded-2xl bg-gray-900 flex items-center justify-center shadow-lg shadow-gray-200">
            <CreditCard className="text-white w-7 h-7" />
          </div>
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">
              Gestion des Abonnements
            </h1>
            <p className="text-gray-500 text-sm mt-1 font-medium">
              Suivez et gérez les accès premium des artisans sur la plateforme.
            </p>
          </div>
        </div>

        <button
          onClick={fetchSubscriptions}
          className="p-3 bg-white border border-gray-200 rounded-xl hover:border-gray-300 hover:bg-gray-50 transition-all shadow-sm active:scale-95"
        >
          <RefreshCcw className={`w-5 h-5 text-gray-600 ${loading ? "animate-spin text-primary" : ""}`} />
        </button>
      </div>

      {/* Barre de recherche */}
      <div className="relative mb-8 max-w-md">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Rechercher un artisan (nom, tel, email)..."
          className="w-full pl-12 pr-4 py-3.5 bg-white border border-gray-200 rounded-2xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all shadow-sm font-medium"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Table des abonnements */}
      <div className="bg-white border border-gray-200 rounded-3xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-widest text-gray-400">Artisan</th>
                <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-widest text-gray-400">Contact</th>
                <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-widest text-gray-400">Statut</th>
                <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-widest text-gray-400">Expiration</th>
                <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-widest text-gray-400">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? (
                [1, 2, 3, 4, 5].map((i) => (
                  <tr key={i} className="animate-pulse">
                    <td colSpan={5} className="px-8 py-6 h-20 bg-gray-50/30"></td>
                  </tr>
                ))
              ) : filteredArtisans.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-8 py-20 text-center text-gray-400 font-medium">
                    Aucun artisan trouvé.
                  </td>
                </tr>
              ) : (
                filteredArtisans.map((artisan) => (
                  <tr key={artisan.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center text-white font-bold text-xs">
                          {artisan.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-bold text-gray-900 flex items-center gap-1.5">
                            {artisan.name}
                            {artisan.isVerified && <ShieldCheck className="w-4 h-4 text-primary" />}
                          </p>
                          <p className="text-xs text-gray-400 font-medium">{artisan.city}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-5">
                      <div className="space-y-1">
                        <p className="text-xs text-gray-600 flex items-center gap-2"><Phone className="w-3 h-3" /> {artisan.phone}</p>
                        <p className="text-xs text-gray-400 flex items-center gap-2"><Mail className="w-3 h-3" /> {artisan.email}</p>
                      </div>
                    </td>
                    <td className="px-8 py-5">
                      {getStatusBadge(artisan.subscriptionStatus, artisan.subscriptionExpiresAt)}
                    </td>
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-2 text-sm font-bold text-gray-700">
                        <Calendar className="w-4 h-4 text-gray-300" />
                        {artisan.subscriptionExpiresAt 
                          ? new Date(artisan.subscriptionExpiresAt).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' })
                          : "Non défini"}
                      </div>
                    </td>
                    <td className="px-8 py-5">
                      <button
                        onClick={() => handleOpenModal(artisan)}
                        className="p-2.5 bg-white border border-gray-200 rounded-xl hover:border-primary hover:text-primary transition-all shadow-sm active:scale-95"
                      >
                        <Settings2 className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal de modification manuelle */}
      <AnimatePresence>
        {isModalOpen && selectedArtisan && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleCloseModal}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative bg-white rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden"
            >
              <div className="p-8">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h2 className="text-2xl font-black text-gray-900">Gérer l'abonnement</h2>
                    <p className="text-sm text-gray-500 font-medium">Artisan : {selectedArtisan.name}</p>
                  </div>
                  <button onClick={handleCloseModal} className="p-2 hover:bg-gray-100 rounded-full">
                    <X className="w-6 h-6 text-gray-400" />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Statut de l'abonnement</label>
                    <select
                      className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl outline-none focus:ring-2 focus:ring-primary/20 appearance-none font-bold"
                      value={formData.status}
                      onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    >
                      <option value="none">Aucun</option>
                      <option value="trial">Période d'essai</option>
                      <option value="active">Actif (Payé)</option>
                      <option value="expired">Expiré</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Nouvelle date d'expiration</label>
                    <input
                      type="date"
                      required
                      className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl outline-none focus:ring-2 focus:ring-primary/20 font-bold"
                      value={formData.expiresAt}
                      onChange={(e) => setFormData({ ...formData, expiresAt: e.target.value })}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Raison (Log interne)</label>
                    <textarea
                      placeholder="Ex: Paiement reçu hors-ligne, Extension commerciale..."
                      className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl outline-none focus:ring-2 focus:ring-primary/20 min-h-[100px] font-medium"
                      value={formData.reason}
                      onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                    />
                  </div>

                  <div className="bg-primary/5 rounded-2xl p-5 border border-primary/10 flex items-start gap-4">
                    <AlertCircle className="w-5 h-5 text-primary mt-0.5" />
                    <p className="text-sm text-gray-600 font-medium">
                      Cette modification sera effective immédiatement sur le compte de l'artisan. Un log sera enregistré pour l'audit.
                    </p>
                  </div>

                  <div className="flex gap-4 pt-4">
                    <button type="button" onClick={handleCloseModal} className="flex-1 px-6 py-4 border border-gray-200 rounded-2xl font-bold text-gray-500">Annuler</button>
                    <button type="submit" disabled={submitting} className="flex-[2] flex items-center justify-center gap-2 px-6 py-4 bg-gray-900 text-white rounded-2xl font-bold">
                      {submitting ? <RefreshCcw className="w-5 h-5 animate-spin" /> : <><Save className="w-5 h-5" />Enregistrer</>}
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}