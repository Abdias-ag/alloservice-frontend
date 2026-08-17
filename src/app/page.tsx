"use client";

import React from 'react';
import Link from 'next/link';
import { ShieldCheck, Star, Users, Wrench, ArrowRight, CheckCircle2, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      {/* Navbar */}
      <nav className="w-full bg-white shadow-sm py-4 px-6 fixed top-0 z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-pink-500 to-rose-400 flex items-center justify-center shadow-lg shadow-pink-500/30">
              <Wrench className="w-5 h-5 text-white" />
            </div>
            <span className="text-2xl font-extrabold tracking-tight text-gray-900">Allo<span className="text-pink-600">Service</span></span>
          </div>
          <div className="flex gap-4">
            <Link 
              href="/login" 
              className="bg-black hover:bg-gray-800 text-white px-6 py-2.5 rounded-full font-bold text-sm transition-all shadow-lg hover:shadow-xl flex items-center gap-2"
            >
              Connexion Admin
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="flex-1 pt-20 pb-16 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-2 bg-pink-50 text-pink-600 px-4 py-1.5 rounded-full text-sm font-bold mb-6 border border-pink-100 shadow-sm">
                <Sparkles className="w-4 h-4" /> La référence au Bénin
              </div>
              <h1 className="text-5xl lg:text-7xl font-extrabold text-gray-900 leading-[1.05] mb-6">
                Le génie <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-rose-400">artisanal</span> à portée de main.
              </h1>
              <p className="text-lg text-gray-600 mb-8 max-w-lg leading-relaxed font-medium">
                AlloService connecte les foyers béninois avec les meilleurs experts certifiés pour tous vos besoins urgents ou quotidiens.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-5">
                <button className="bg-pink-600 hover:bg-pink-700 text-white px-10 py-4 rounded-2xl font-bold text-lg shadow-xl shadow-pink-500/30 flex justify-center items-center gap-3 transition-all hover:scale-105 active:scale-95">
                  Télécharger l'App <ArrowRight className="w-5 h-5" />
                </button>
                <button className="bg-white hover:bg-gray-50 text-gray-900 border-2 border-gray-100 px-10 py-4 rounded-2xl font-bold text-lg transition-all flex justify-center items-center shadow-sm">
                  Devenir Partenaire
                </button>
              </div>

              <div className="mt-12 flex items-center gap-6">
                <div className="flex -space-x-4">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-12 h-12 rounded-full border-4 border-white bg-gray-200 overflow-hidden shadow-sm">
                        <img src={`https://i.pravatar.cc/150?u=${i}`} alt="user" />
                    </div>
                  ))}
                </div>
                <div>
                  <div className="flex text-amber-400">
                    <Star className="w-5 h-5 fill-current" /><Star className="w-5 h-5 fill-current" /><Star className="w-5 h-5 fill-current" /><Star className="w-5 h-5 fill-current" /><Star className="w-5 h-5 fill-current" />
                  </div>
                  <p className="text-sm font-bold text-gray-600 mt-1">+10 000 utilisateurs satisfaits</p>
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="aspect-square lg:aspect-[4/5] bg-gradient-to-tr from-pink-100 to-rose-50 rounded-[3rem] overflow-hidden shadow-2xl relative p-4 lg:p-8">
                 <img 
                    src="/artisan-woman.png" 
                    alt="Professionnelle au travail" 
                    className="w-full h-full object-cover rounded-[2rem] shadow-inner"
                 />
                 <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>
              
              {/* Floating Verified Badge */}
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-6 -left-6 bg-white/80 backdrop-blur-xl p-5 rounded-3xl shadow-2xl border border-white flex items-center gap-4 z-10"
              >
                 <div className="w-14 h-14 bg-green-500 rounded-2xl flex items-center justify-center shadow-lg shadow-green-500/20">
                    <ShieldCheck className="w-8 h-8 text-white" />
                 </div>
                 <div>
                   <p className="font-extrabold text-gray-900 text-lg">100% Vérifié</p>
                   <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">Artisans certifiés</p>
                 </div>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* --- SPOTLIGHT BANNER (PANNEAU DE PUBLICITÉ) --- */}
        <section className="max-w-7xl mx-auto px-6 mt-32">
            <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="relative h-[450px] rounded-[3rem] overflow-hidden shadow-2xl group cursor-pointer"
            >
                <img 
                    src="/banner.png" 
                    alt="AlloService Banner" 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent flex items-center px-12 lg:px-20">
                    <div className="max-w-xl">
                        <span className="bg-pink-600 text-white px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-[0.2em] mb-6 inline-block shadow-lg">En ce moment</span>
                        <h2 className="text-4xl lg:text-6xl font-black text-white leading-tight mb-6">
                            L'excellence à votre <span className="text-pink-400">porte</span>.
                        </h2>
                        <p className="text-white/80 text-lg lg:text-xl font-medium mb-10 leading-relaxed italic border-l-4 border-pink-500 pl-6">
                            "Une plomberie impeccable, une électricité sûre. Nos partenaires sont les meilleurs de Cotonou."
                        </p>
                        <button className="bg-white text-black px-10 py-4 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-pink-50 transition-all shadow-xl shadow-white/5">
                            Voir les experts
                        </button>
                    </div>
                </div>
            </motion.div>
        </section>

        {/* Section Qu'est-ce que AlloService */}
        <div className="max-w-7xl mx-auto px-6 mt-40">
          <div className="text-center mb-24">
            <h2 className="text-5xl font-black text-gray-900 mb-6 italic">Qu'est-ce que <span className="text-pink-600 tracking-tighter">AlloService</span> ?</h2>
            <div className="w-24 h-2 bg-pink-600 mx-auto rounded-full mb-8"></div>
            <p className="text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed font-medium">
              Nous réinventons l'accès aux services au Bénin. Plus qu'une application, un gage de sérénité pour votre foyer.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* CARD 1 */}
            <motion.div 
                whileHover={{ y: -10 }}
                className="bg-white p-2 rounded-[2.5rem] shadow-sm border border-gray-100 flex flex-col hover:shadow-2xl transition-all h-full"
            >
               <div className="h-56 rounded-[2rem] overflow-hidden mb-6">
                  <img src="/mise_en_relation_flash.png" alt="Mise en relation" className="w-full h-full object-cover" />
               </div>
               <div className="px-6 pb-8">
                  <div className="w-14 h-14 bg-pink-50 rounded-2xl flex items-center justify-center mb-6 shadow-sm">
                    <Users className="w-7 h-7 text-pink-600" />
                  </div>
                  <h3 className="text-2xl font-black text-gray-900 mb-4">Mise en relation flash</h3>
                  <p className="text-gray-500 font-medium leading-relaxed">Trouvez un expert disponible en quelques minutes. Postez votre besoin, l'aide arrive.</p>
               </div>
            </motion.div>
            
            {/* CARD 2 */}
            <motion.div 
                whileHover={{ y: -10 }}
                className="bg-white p-2 rounded-[2.5rem] shadow-sm border border-gray-100 flex flex-col hover:shadow-2xl transition-all h-full"
            >
               <div className="h-56 rounded-[2rem] overflow-hidden mb-6">
                  <img src="/securite_absolue.png" alt="Sécurité" className="w-full h-full object-cover" />
               </div>
               <div className="px-6 pb-8">
                  <div className="w-14 h-14 bg-rose-50 rounded-2xl flex items-center justify-center mb-6 shadow-sm">
                    <ShieldCheck className="w-7 h-7 text-rose-600" />
                  </div>
                  <h3 className="text-2xl font-black text-gray-900 mb-4">Sécurité absolue</h3>
                  <p className="text-gray-500 font-medium leading-relaxed">ID, IFU, Diplômes. Nous vérifions tout pour que vous puissiez accueillir les pros en toute confiance.</p>
               </div>
            </motion.div>
            
            {/* CARD 3 */}
            <motion.div 
                whileHover={{ y: -10 }}
                className="bg-white p-2 rounded-[2.5rem] shadow-sm border border-gray-100 flex flex-col hover:shadow-2xl transition-all h-full"
            >
               <div className="h-56 rounded-[2rem] overflow-hidden mb-6">
                  <img src="/elite_transparence.png" alt="Transparence" className="w-full h-full object-cover" />
               </div>
               <div className="px-6 pb-8">
                  <div className="w-14 h-14 bg-amber-50 rounded-2xl flex items-center justify-center mb-6 shadow-sm">
                    <Star className="w-7 h-7 text-amber-600" />
                  </div>
                  <h3 className="text-2xl font-black text-gray-900 mb-4">Élite & Transparence</h3>
                  <p className="text-gray-500 font-medium leading-relaxed">Choisissez les meilleurs grâce aux avis réels et une tarification claire et sans surprise.</p>
               </div>
            </motion.div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 mt-10">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-pink-600 flex items-center justify-center">
                <Wrench className="w-4 h-4 text-white" />
              </div>
              <span className="text-xl font-bold">AlloService</span>
            </div>
            <p className="text-gray-400 text-sm">© {(new Date().getFullYear())} AlloService. La révolution des services de proximité en Afrique.</p>
          </div>
          <div className="flex gap-6 md:justify-end">
            <Link href="#" className="font-semibold text-gray-400 hover:text-white transition-colors">Mentions Légales</Link>
            <Link href="#" className="font-semibold text-gray-400 hover:text-white transition-colors">Contact</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
