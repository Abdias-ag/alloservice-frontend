"use client";
import { API_URL } from '@/utils/constants';


import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {

  MessageSquare,
  Trash2,
  Star,
  RefreshCcw,
  ArrowLeft,
  User,
  ShieldAlert,
  Search,
  Calendar
} from "lucide-react";

type ReviewData = {
  id: number;
  rating: number;
  comment: string;
  createdAt: string;
  auteurAvis: { name: string; photo?: string };
  cibleAvis: { name: string; photo?: string };
};

export default function ReviewModerationPage() {
  const [reviews, setReviews] = useState<ReviewData[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchReviews = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/admin/reviews`);
      const data = await res.json();
      setReviews(data.reviews || []);
    } catch (error) {
      console.error("Erreur récup avis:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm("Voulez-vous vraiment supprimer cet avis ? Cette action est irréversible.")) return;
    
    try {
      const res = await fetch(`${API_URL}/admin/reviews/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setReviews(reviews.filter(r => r.id !== id));
      }
    } catch (error) {
      console.error("Erreur suppression:", error);
    }
  };

  const filteredReviews = reviews.filter(r => 
    r.comment.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.auteurAvis.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.cibleAvis.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-8 lg:p-10 max-w-7xl mx-auto">
      {/* Retour */}
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
            <MessageSquare className="text-white w-7 h-7" />
          </div>
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">
              Modération des Avis
            </h1>
            <p className="text-gray-500 text-sm mt-1 font-medium">
              Surveillez et modérez les commentaires laissés par les utilisateurs.
            </p>
          </div>
        </div>

        <button
          onClick={fetchReviews}
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
          placeholder="Rechercher un mot-clé ou un nom..."
          className="w-full pl-12 pr-4 py-3.5 bg-white border border-gray-200 rounded-2xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all shadow-sm font-medium"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Liste des avis */}
      <div className="grid gap-6">
        {loading ? (
          [1, 2, 3].map(i => (
            <div key={i} className="bg-gray-50 h-32 rounded-3xl animate-pulse" />
          ))
        ) : filteredReviews.length === 0 ? (
          <div className="p-20 border-2 border-dashed border-gray-200 rounded-3xl flex flex-col items-center justify-center text-gray-400 bg-white">
            <ShieldAlert className="w-16 h-16 text-gray-200 mb-4" />
            <p className="font-bold text-lg">Aucun avis à modérer</p>
          </div>
        ) : (
          filteredReviews.map((review, index) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col md:flex-row gap-6 items-start"
            >
              {/* Note et Auteur */}
              <div className="flex flex-col items-center gap-3 w-full md:w-32 shrink-0">
                <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-gray-400">
                  <User className="w-6 h-6" />
                </div>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map(s => (
                    <Star key={s} className={`w-3 h-3 ${s <= review.rating ? "text-amber-400 fill-amber-400" : "text-gray-200"}`} />
                  ))}
                </div>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{review.auteurAvis.name}</p>
              </div>

              {/* Contenu */}
              <div className="flex-1 space-y-3">
                <div className="flex items-center gap-2 text-[10px] font-bold text-primary uppercase tracking-widest bg-primary/5 px-3 py-1 rounded-full w-fit">
                  Destiné à : {review.cibleAvis.name}
                </div>
                <p className="text-gray-700 font-medium leading-relaxed italic text-sm">
                  "{review.comment}"
                </p>
                <div className="flex items-center gap-2 text-[10px] text-gray-400 font-bold uppercase tracking-wider">
                  <Calendar className="w-3 h-3" />
                  {new Date(review.createdAt).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
                </div>
              </div>

              {/* Actions */}
              <div className="md:self-center">
                <button
                  onClick={() => handleDelete(review.id)}
                  className="p-4 bg-red-50 text-red-500 rounded-2xl hover:bg-red-100 transition-all active:scale-95 group"
                  title="Supprimer l'avis"
                >
                  <Trash2 className="w-5 h-5 group-hover:shake" />
                </button>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}