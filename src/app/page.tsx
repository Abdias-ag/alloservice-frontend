"use client";

import React from 'react';
import Link from 'next/link';
import { ShieldCheck, Star, Users, Wrench, ArrowRight, CheckCircle2, Sparkles, Clock3, MapPin, PhoneCall, BadgeCheck } from 'lucide-react';
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
                <button 
                  onClick={() => window.location.href = 'https://expo.dev/artifacts/eas/0D_TKzsQsS2d5aQ2kpIMLlOyjwFs_ai4ysPxt9qLVAk.apk'}
                  className="bg-pink-600 hover:bg-pink-700 text-white px-10 py-4 rounded-2xl font-bold text-lg shadow-xl shadow-pink-500/30 flex justify-center items-center gap-3 transition-all hover:scale-105 active:scale-95"
                >
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

        {/* --- FEATURE HIGHLIGHTS --- */}
        <section className="max-w-7xl mx-auto px-6 mt-32">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="rounded-[2rem] border border-gray-100 bg-white p-8 shadow-sm lg:p-10"
            >
                <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
                    <div>
                        <span className="inline-flex items-center gap-2 rounded-full bg-pink-50 px-4 py-1.5 text-xs font-black uppercase tracking-[0.2em] text-pink-600">
                            <Sparkles className="h-3.5 w-3.5" /> En ce moment
                        </span>
                        <h2 className="mt-6 text-3xl font-black text-gray-900 lg:text-5xl">
                            Une assistance de <span className="text-pink-600">proximité</span> maîtrisée.
                        </h2>
                    </div>
                    <button className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gray-900 px-6 py-3 text-sm font-black uppercase tracking-widest text-white transition hover:bg-black">
                        Voir les experts <ArrowRight className="h-4 w-4" />
                    </button>
                </div>

                <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
                    {[
                        { icon: Clock3, title: 'Réponse rapide', text: 'Des artisans disponibles en quelques minutes.' },
                        { icon: BadgeCheck, title: 'Professionnels vérifiés', text: 'Contrôles, ID, qualifications et avis réels.' },
                        { icon: MapPin, title: 'À proximité', text: 'Trouver les bons profils autour de chez vous.' },
                        { icon: PhoneCall, title: 'Suivi simple', text: 'Un accompagnement clair de la demande au service.' }
                    ].map(({ icon: Icon, title, text }) => (
                        <div key={title} className="rounded-[1.5rem] border border-gray-100 bg-gray-50 p-5 transition hover:-translate-y-1 hover:shadow-md">
                            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-white shadow-sm ring-1 ring-gray-100">
                                <Icon className="h-5 w-5 text-pink-600" />
                            </div>
                            <h3 className="mb-2 text-lg font-black text-gray-900">{title}</h3>
                            <p className="text-sm leading-relaxed text-gray-600">{text}</p>
                        </div>
                    ))}
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
                className="bg-white p-6 rounded-[2.5rem] shadow-sm border border-gray-100 flex flex-col hover:shadow-2xl transition-all h-full"
            >
               <div className="w-16 h-16 bg-pink-50 rounded-2xl flex items-center justify-center mb-6 shadow-sm">
                  <Users className="w-8 h-8 text-pink-600" />
               </div>
               <div className="pb-2">
                  <h3 className="text-2xl font-black text-gray-900 mb-4">Mise en relation rapide</h3>
                  <p className="text-gray-500 font-medium leading-relaxed">Trouvez un expert disponible en quelques minutes. Postez votre besoin, l'aide arrive sans détour.</p>
               </div>
            </motion.div>
            
            {/* CARD 2 */}
            <motion.div 
                whileHover={{ y: -10 }}
                className="bg-white p-6 rounded-[2.5rem] shadow-sm border border-gray-100 flex flex-col hover:shadow-2xl transition-all h-full"
            >
               <div className="w-16 h-16 bg-rose-50 rounded-2xl flex items-center justify-center mb-6 shadow-sm">
                  <ShieldCheck className="w-8 h-8 text-rose-600" />
               </div>
               <div className="pb-2">
                  <h3 className="text-2xl font-black text-gray-900 mb-4">Vérification rigoureuse</h3>
                  <p className="text-gray-500 font-medium leading-relaxed">ID, IFU, diplômes et statut vérifié. Vous recevez une confiance réelle avant chaque prestation.</p>
               </div>
            </motion.div>
            
            {/* CARD 3 */}
            <motion.div 
                whileHover={{ y: -10 }}
                className="bg-white p-6 rounded-[2.5rem] shadow-sm border border-gray-100 flex flex-col hover:shadow-2xl transition-all h-full"
            >
               <div className="w-16 h-16 bg-amber-50 rounded-2xl flex items-center justify-center mb-6 shadow-sm">
                  <Star className="w-8 h-8 text-amber-600" />
               </div>
               <div className="pb-2">
                  <h3 className="text-2xl font-black text-gray-900 mb-4">Élite & Transparence</h3>
                  <p className="text-gray-500 font-medium leading-relaxed">Des artisans qualifiés, des avis honnêtes et une tarification claire pour un choix serein.</p>
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
