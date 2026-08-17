"use client";
import { API_URL } from '@/utils/constants';


import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {

  Plus,
  Trash2,
  Edit2,
  Search,
  RefreshCcw,
  ArrowLeft,
  LayoutGrid,
  Hammer,
  X,
  Save,
  CheckCircle2,
  Info
} from "lucide-react";

type CategoryData = {
  id: number;
  name: string;
  icon: string;
  createdAt: string;
};

export default function CategoryManagementPage() {
  const [categories, setCategories] = useState<CategoryData[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<CategoryData | null>(null);
  const [formData, setFormData] = useState({ name: "", icon: "" });
  const [submitting, setSubmitting] = useState(false);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/admin/categories`);
      const data = await res.json();
      setCategories(data.categories || []);
    } catch (error) {
      console.error("Erreur récup catégories:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleOpenModal = (category: CategoryData | null = null) => {
    if (category) {
      setEditingCategory(category);
      setFormData({ name: category.name, icon: category.icon || "" });
    } else {
      setEditingCategory(null);
      setFormData({ name: "", icon: "" });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingCategory(null);
    setFormData({ name: "", icon: "" });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const url = editingCategory 
        ? `${API_URL}/admin/categories/${editingCategory.id}`
        : `${API_URL}/admin/categories`;
      
      const res = await fetch(url, {
        method: editingCategory ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        fetchCategories();
        handleCloseModal();
      }
    } catch (error) {
      console.error("Erreur lors de l'enregistrement:", error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Êtes-vous sûr de vouloir supprimer cette catégorie ? Cela pourrait impacter les services existants.")) return;
    
    try {
      const res = await fetch(`${API_URL}/admin/categories/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setCategories(categories.filter(c => c.id !== id));
      }
    } catch (error) {
      console.error("Erreur suppression:", error);
    }
  };

  const filteredCategories = categories.filter(c => 
    c.name.toLowerCase().includes(searchQuery.toLowerCase())
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
            <LayoutGrid className="text-white w-7 h-7" />
          </div>
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">
              Gestion des Catégories
            </h1>
            <p className="text-gray-500 text-sm mt-1 font-medium">
              Gérez les métiers et services disponibles sur l'application mobile.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={fetchCategories}
            className="p-3 bg-white border border-gray-200 rounded-xl hover:border-gray-300 hover:bg-gray-50 transition-all shadow-sm active:scale-95"
            title="Rafraîchir"
          >
            <RefreshCcw className={`w-5 h-5 text-gray-600 ${loading ? "animate-spin text-primary" : ""}`} />
          </button>
          
          <button
            onClick={() => handleOpenModal()}
            className="flex items-center gap-2 bg-gray-900 text-white px-6 py-3 rounded-xl font-bold hover:bg-gray-800 transition-all shadow-md active:scale-95"
          >
            <Plus className="w-5 h-5" />
            Nouvelle Catégorie
          </button>
        </div>
      </div>

      {/* Barre de recherche */}
      <div className="relative mb-8 max-w-md">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Rechercher une catégorie..."
          className="w-full pl-12 pr-4 py-3.5 bg-white border border-gray-200 rounded-2xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all shadow-sm font-medium"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Liste des catégories */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="bg-gray-50 h-32 rounded-2xl animate-pulse border border-gray-100" />
          ))}
        </div>
      ) : filteredCategories.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="p-20 border-2 border-dashed border-gray-200 rounded-3xl flex flex-col items-center justify-center text-gray-400 bg-white"
        >
          <Hammer className="w-16 h-16 text-gray-200 mb-4" />
          <p className="font-bold text-lg text-gray-500">Aucune catégorie trouvée</p>
          <p className="text-sm mt-1">Commencez par en créer une nouvelle.</p>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCategories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="group bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-xl hover:border-primary/20 transition-all"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                    {/* On affiche un marteau par défaut si on ne peut pas mapper l'icône Ionicons */}
                    <Hammer className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-900 group-hover:text-primary transition-colors">
                      {category.name}
                    </h2>
                    <p className="text-gray-400 text-xs font-mono mt-1">
                      {category.icon || "Aucun icône"}
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button 
                    onClick={() => handleOpenModal(category)}
                    className="p-2 hover:bg-gray-100 rounded-lg text-gray-600 transition-colors"
                    title="Modifier"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => handleDelete(category.id)}
                    className="p-2 hover:bg-red-50 rounded-lg text-red-500 transition-colors"
                    title="Supprimer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              
              <div className="mt-6 pt-4 border-t border-gray-50 flex items-center justify-between text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                <span>ID: {category.id}</span>
                <span>Créé le: {new Date(category.createdAt).toLocaleDateString()}</span>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Modal d'ajout/édition */}
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
              className="relative bg-white rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden"
            >
              <div className="p-8">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-2xl font-black text-gray-900">
                    {editingCategory ? "Modifier la catégorie" : "Nouvelle catégorie"}
                  </h2>
                  <button
                    onClick={handleCloseModal}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <X className="w-6 h-6 text-gray-400" />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      Nom du métier / catégorie
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ex: Plomberie, Électricité..."
                      className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all font-medium"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      Icône Ionicons (pour l'application mobile)
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Ex: hammer-outline, flash-outline..."
                        className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all font-medium"
                        value={formData.icon}
                        onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                      />
                      <Info className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300 hover:text-primary transition-colors cursor-help" />
                    </div>
                    <p className="mt-2 text-[10px] text-gray-400 font-bold uppercase tracking-wider">
                      Utilisez les noms officiels du pack Ionicons v5/v6.
                    </p>
                  </div>

                  <div className="bg-primary/5 rounded-2xl p-5 border border-primary/10 flex items-start gap-4">
                    <CheckCircle2 className="w-5 h-5 text-primary mt-0.5" />
                    <p className="text-sm text-gray-600 font-medium">
                      Cette catégorie sera immédiatement visible par tous les utilisateurs de l'application mobile dès l'enregistrement.
                    </p>
                  </div>

                  <div className="flex gap-4 pt-4">
                    <button
                      type="button"
                      onClick={handleCloseModal}
                      className="flex-1 px-6 py-4 border border-gray-200 rounded-2xl font-bold text-gray-500 hover:bg-gray-50 transition-all active:scale-95"
                    >
                      Annuler
                    </button>
                    <button
                      type="submit"
                      disabled={submitting}
                      className="flex-[2] flex items-center justify-center gap-2 px-6 py-4 bg-gray-900 text-white rounded-2xl font-bold hover:bg-gray-800 transition-all shadow-lg active:scale-95 disabled:opacity-50"
                    >
                      {submitting ? (
                        <RefreshCcw className="w-5 h-5 animate-spin" />
                      ) : (
                        <>
                          <Save className="w-5 h-5" />
                          Enregistrer
                        </>
                      )}
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