"use client";
import { API_URL } from '@/utils/constants';


import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {

  Plus,
  Trash2,
  Edit2,
  RefreshCcw,
  ArrowLeft,
  Image as ImageIcon,
  X,
  Save,
  CheckCircle2,
  ExternalLink,
  Eye,
  EyeOff
} from "lucide-react";

type BannerData = {
  id: number;
  imageUrl: string;
  title: string | null;
  subtitle: string | null;
  isActive: boolean;
  order: number;
  createdAt: string;
};

export default function BannerManagementPage() {
  const [banners, setBanners] = useState<BannerData[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBanner, setEditingBanner] = useState<BannerData | null>(null);
  const [formData, setFormData] = useState({ imageUrl: "", title: "", subtitle: "", order: 0, isActive: true });
  const [submitting, setSubmitting] = useState(false);

  const fetchBanners = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/admin/banners`);
      const data = await res.json();
      setBanners(data.banners || []);
    } catch (error) {
      console.error("Erreur récup bannières:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBanners();
  }, []);

  const handleOpenModal = (banner: BannerData | null = null) => {
    if (banner) {
      setEditingBanner(banner);
      setFormData({ 
        imageUrl: banner.imageUrl, 
        title: banner.title || "", 
        subtitle: banner.subtitle || "", 
        order: banner.order,
        isActive: banner.isActive
      });
    } else {
      setEditingBanner(null);
      setFormData({ imageUrl: "", title: "", subtitle: "", order: 0, isActive: true });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingBanner(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const url = editingBanner 
        ? `${API_URL}/admin/banners/${editingBanner.id}`
        : `${API_URL}/admin/banners`;
      
      const res = await fetch(url, {
        method: editingBanner ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        fetchBanners();
        handleCloseModal();
      }
    } catch (error) {
      console.error("Erreur lors de l'enregistrement:", error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Êtes-vous sûr de vouloir supprimer cette bannière ?")) return;
    
    try {
      const res = await fetch(`${API_URL}/admin/banners/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setBanners(banners.filter(b => b.id !== id));
      }
    } catch (error) {
      console.error("Erreur suppression:", error);
    }
  };

  const toggleActive = async (banner: BannerData) => {
    try {
      const res = await fetch(`${API_URL}/admin/banners/${banner.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isActive: !banner.isActive }),
      });
      if (res.ok) {
        setBanners(banners.map(b => b.id === banner.id ? { ...b, isActive: !b.isActive } : b));
      }
    } catch (error) {
      console.error("Erreur toggle:", error);
    }
  };

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
            <ImageIcon className="text-white w-7 h-7" />
          </div>
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">
              Gestion des Bannières
            </h1>
            <p className="text-gray-500 text-sm mt-1 font-medium">
              Contrôlez les publicités et promotions qui s'affichent sur l'application mobile.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={fetchBanners}
            className="p-3 bg-white border border-gray-200 rounded-xl hover:border-gray-300 hover:bg-gray-50 transition-all shadow-sm active:scale-95"
          >
            <RefreshCcw className={`w-5 h-5 text-gray-600 ${loading ? "animate-spin text-primary" : ""}`} />
          </button>
          
          <button
            onClick={() => handleOpenModal()}
            className="flex items-center gap-2 bg-gray-900 text-white px-6 py-3 rounded-xl font-bold hover:bg-gray-800 transition-all shadow-md active:scale-95"
          >
            <Plus className="w-5 h-5" />
            Nouvelle Bannière
          </button>
        </div>
      </div>

      {/* Liste des bannières */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[1, 2].map((i) => (
            <div key={i} className="bg-gray-50 h-64 rounded-3xl animate-pulse border border-gray-100" />
          ))}
        </div>
      ) : banners.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="p-20 border-2 border-dashed border-gray-200 rounded-3xl flex flex-col items-center justify-center text-gray-400 bg-white"
        >
          <ImageIcon className="w-16 h-16 text-gray-200 mb-4" />
          <p className="font-bold text-lg text-gray-500">Aucune bannière active</p>
          <p className="text-sm mt-1">Les bannières s'affichent en haut de l'écran d'accueil de l'app.</p>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {banners.map((banner, index) => (
            <motion.div
              key={banner.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`group relative bg-white border rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all ${!banner.isActive ? "opacity-60 border-gray-200" : "border-gray-100"}`}
            >
              {/* Image Preview */}
              <div className="h-56 relative overflow-hidden bg-gray-900">
                <img 
                  src={banner.imageUrl} 
                  alt={banner.title || "Bannière"} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-8 flex flex-col justify-end">
                  <h3 className="text-xl font-bold text-white mb-1">{banner.title || "Sans titre"}</h3>
                  <p className="text-white/70 text-sm">{banner.subtitle || "Aucun sous-titre"}</p>
                </div>
                
                {/* Badges */}
                <div className="absolute top-6 left-6 flex gap-2">
                  <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${banner.isActive ? "bg-green-500 text-white" : "bg-gray-500 text-white"}`}>
                    {banner.isActive ? "Active" : "Inactive"}
                  </span>
                  <span className="bg-white/20 backdrop-blur-md text-white px-3 py-1 rounded-full text-[10px] font-bold">
                    Ordre: {banner.order}
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="p-6 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => toggleActive(banner)}
                    className={`p-3 rounded-xl transition-all ${banner.isActive ? "bg-gray-100 text-gray-600 hover:bg-gray-200" : "bg-primary text-white shadow-lg shadow-primary/20"}`}
                    title={banner.isActive ? "Désactiver" : "Activer"}
                  >
                    {banner.isActive ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                  <button
                    onClick={() => handleOpenModal(banner)}
                    className="p-3 bg-gray-100 text-gray-600 rounded-xl hover:bg-gray-200 transition-all"
                    title="Modifier"
                  >
                    <Edit2 className="w-5 h-5" />
                  </button>
                </div>

                <button
                  onClick={() => handleDelete(banner.id)}
                  className="p-3 bg-red-50 text-red-500 rounded-xl hover:bg-red-100 transition-all active:scale-95"
                  title="Supprimer"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
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
              className="relative bg-white rounded-3xl w-full max-w-2xl shadow-2xl overflow-hidden"
            >
              <div className="p-8">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-2xl font-black text-gray-900">
                    {editingBanner ? "Modifier la bannière" : "Nouvelle bannière"}
                  </h2>
                  <button onClick={handleCloseModal} className="p-2 hover:bg-gray-100 rounded-full">
                    <X className="w-6 h-6 text-gray-400" />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="md:col-span-2">
                      <label className="block text-sm font-bold text-gray-700 mb-2">URL de l'image</label>
                      <div className="flex gap-3">
                        <input
                          type="url"
                          required
                          className="flex-1 px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-primary/20 outline-none"
                          placeholder="https://..."
                          value={formData.imageUrl}
                          onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                        />
                        <a href={formData.imageUrl} target="_blank" className="p-4 bg-gray-100 rounded-2xl text-gray-400 hover:text-primary transition-colors">
                          <ExternalLink className="w-6 h-6" />
                        </a>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Titre (Optionnel)</label>
                      <input
                        type="text"
                        className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl outline-none"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Sous-titre (Optionnel)</label>
                      <input
                        type="text"
                        className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl outline-none"
                        value={formData.subtitle}
                        onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Ordre d'affichage</label>
                      <input
                        type="number"
                        className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl outline-none"
                        value={formData.order}
                        onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })}
                      />
                    </div>

                    <div className="flex items-center h-full pt-8">
                       <label className="flex items-center gap-3 cursor-pointer">
                         <input 
                           type="checkbox" 
                           className="w-6 h-6 rounded-lg border-gray-300 text-primary focus:ring-primary"
                           checked={formData.isActive}
                           onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                         />
                         <span className="font-bold text-gray-700">Activer immédiatement</span>
                       </label>
                    </div>
                  </div>

                  <div className="bg-primary/5 rounded-2xl p-5 border border-primary/10 flex items-start gap-4">
                    <CheckCircle2 className="w-5 h-5 text-primary mt-0.5" />
                    <p className="text-sm text-gray-600 font-medium">
                      Cette bannière sera diffusée sur le diaporama de l'écran d'accueil de l'application mobile.
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