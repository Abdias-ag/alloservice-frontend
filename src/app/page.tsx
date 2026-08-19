"use client";

import React from 'react';
import Link from 'next/link';
import { ShieldCheck, Star, Users, Wrench, ArrowRight, CheckCircle2, Sparkles, Clock3, MapPin, PhoneCall, BadgeCheck } from 'lucide-react';
import { motion } from 'framer-motion';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      {/* Navbar */}
      <nav className="fixed top-0 z-50 w-full bg-white px-4 py-3 shadow-sm sm:px-6 sm:py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#5836e8] shadow-lg shadow-violet-500/20 sm:h-10 sm:w-10">
              <Wrench className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-extrabold tracking-tight text-gray-900 sm:text-2xl">Allo<span className="text-[#5836e8]">Service</span></span>
          </div>
          <div className="flex gap-4">
            <Link 
              href="/login" 
              className="flex items-center gap-2 rounded-full bg-black px-4 py-2 text-xs font-bold text-white shadow-lg transition-all hover:bg-gray-800 hover:shadow-xl sm:px-6 sm:py-2.5 sm:text-sm"
            >
              Connexion Admin
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="flex-1 pt-20 pb-16 overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-14">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#e9e6ff] bg-[#f2f1ff] px-3 py-1.5 text-xs font-bold text-[#5836e8] shadow-sm sm:text-sm">
                <Sparkles className="h-4 w-4" /> La référence au Bénin
              </div>
              <h1 className="mb-5 max-w-xl text-4xl font-extrabold leading-[1.08] text-gray-900 sm:text-5xl lg:text-6xl xl:text-7xl">
                Le génie <span className="text-[#5836e8]">artisanal</span> à portée de main.
              </h1>
              <p className="mb-7 max-w-lg text-base font-medium leading-relaxed text-gray-600 sm:text-lg">
                AlloService connecte les foyers béninois avec les meilleurs experts certifiés pour tous vos besoins urgents ou quotidiens.
              </p>
              
              <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
                <button 
                  onClick={() => window.location.href = 'https://expo.dev/artifacts/eas/0D_TKzsQsS2d5aQ2kpIMLlOyjwFs_ai4ysPxt9qLVAk.apk'}
                  className="flex items-center justify-center gap-2 rounded-xl bg-[#5836e8] px-6 py-3 text-base font-bold text-white shadow-lg shadow-violet-500/20 transition-all hover:bg-[#4728cf] active:scale-95 sm:px-7"
                >
                  Télécharger l'App <ArrowRight className="w-5 h-5" />
                </button>
                <button className="flex items-center justify-center rounded-xl border border-gray-200 bg-white px-6 py-3 text-base font-bold text-gray-900 shadow-sm transition-all hover:bg-gray-50 sm:px-7">
                  Devenir Partenaire
                </button>
              </div>

              <div className="mt-8 flex items-center gap-4 sm:mt-10 sm:gap-6">
                <div className="flex -space-x-4">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="h-10 w-10 overflow-hidden rounded-full border-4 border-white bg-gray-200 shadow-sm sm:h-12 sm:w-12">
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
              <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-[#f2f1ff] p-3 shadow-xl sm:p-5 lg:rounded-[2.5rem] lg:p-7">
                 <img 
                    src="/artisan-woman.png" 
                    alt="Professionnelle au travail" 
                    className="h-full w-full rounded-[1.5rem] object-cover shadow-inner sm:rounded-[2rem]"
                 />
                 <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>
              
              {/* Floating Verified Badge */}
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute bottom-3 left-3 z-10 flex items-center gap-3 rounded-2xl border border-white bg-white/90 p-3 shadow-xl backdrop-blur-xl sm:-bottom-5 sm:-left-5 sm:gap-4 sm:rounded-3xl sm:p-5"
              >
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-500 shadow-lg shadow-green-500/20 sm:h-14 sm:w-14 sm:rounded-2xl">
                    <ShieldCheck className="h-6 w-6 text-white sm:h-8 sm:w-8" />
                 </div>
                 <div>
                   <p className="text-base font-extrabold text-gray-900 sm:text-lg">100% Vérifié</p>
                   <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">Artisans certifiés</p>
                 </div>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* --- FEATURE HIGHLIGHTS --- */}
        <section className="mx-auto mt-20 max-w-7xl px-4 sm:mt-28 sm:px-6">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="rounded-[1.5rem] border border-gray-100 bg-white p-5 shadow-sm sm:rounded-[2rem] sm:p-7 lg:p-9"
            >
                <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
                    <div>
                        <span className="inline-flex items-center gap-2 rounded-full bg-pink-50 px-4 py-1.5 text-xs font-black uppercase tracking-[0.2em] text-pink-600">
                            <Sparkles className="h-3.5 w-3.5" /> En ce moment
                        </span>
                        <h2 className="mt-4 max-w-2xl text-2xl font-black leading-tight text-gray-900 sm:text-3xl lg:text-4xl">
                            Une assistance de <span className="text-pink-600">proximité</span> maîtrisée.
                        </h2>
                    </div>
                    <button className="inline-flex items-center justify-center gap-2 rounded-xl bg-gray-900 px-5 py-3 text-xs font-black uppercase tracking-widest text-white transition hover:bg-black sm:text-sm">
                        Voir les experts <ArrowRight className="h-4 w-4" />
                    </button>
                </div>

                <div className="mt-7 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                    {[
                        { icon: Clock3, title: 'Réponse rapide', text: 'Des artisans disponibles en quelques minutes.' },
                        { icon: BadgeCheck, title: 'Professionnels vérifiés', text: 'Contrôles, ID, qualifications et avis réels.' },
                        { icon: MapPin, title: 'À proximité', text: 'Trouver les bons profils autour de chez vous.' },
                        { icon: PhoneCall, title: 'Suivi simple', text: 'Un accompagnement clair de la demande au service.' }
                    ].map(({ icon: Icon, title, text }) => (
                        <div key={title} className="rounded-2xl border border-gray-100 bg-gray-50 p-4 transition hover:-translate-y-1 hover:shadow-md">
                          <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-white shadow-sm ring-1 ring-gray-100">
                                <Icon className="h-5 w-5 text-pink-600" />
                            </div>
                            <h3 className="mb-1.5 text-base font-black text-gray-900">{title}</h3>
                            <p className="text-sm leading-relaxed text-gray-600">{text}</p>
                        </div>
                    ))}
                </div>
            </motion.div>
        </section>

        {/* Section Qu'est-ce que AlloService */}
        <div className="mx-auto mt-24 max-w-7xl px-4 sm:mt-32 sm:px-6">
          <div className="mb-12 text-center sm:mb-16">
            <h2 className="mb-4 text-3xl font-black text-gray-900 sm:text-4xl">Qu'est-ce que <span className="text-[#5836e8]">AlloService</span> ?</h2>
            <div className="mx-auto mb-6 h-1.5 w-16 rounded-full bg-[#5836e8]"></div>
            <p className="mx-auto max-w-2xl text-base font-medium leading-relaxed text-gray-500 sm:text-lg">
              Nous réinventons l'accès aux services au Bénin. Plus qu'une application, un gage de sérénité pour votre foyer.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-6">
            {/* CARD 1 */}
            <motion.div 
                whileHover={{ y: -10 }}
                className="flex h-full flex-col rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition-all hover:shadow-xl sm:rounded-[1.5rem]"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-pink-50 shadow-sm">
                <Users className="h-6 w-6 text-pink-600" />
               </div>
               <div className="pb-2">
                  <h3 className="mb-2 text-xl font-black text-gray-900">Mise en relation rapide</h3>
                  <p className="text-gray-500 font-medium leading-relaxed">Trouvez un expert disponible en quelques minutes. Postez votre besoin, l'aide arrive sans détour.</p>
               </div>
            </motion.div>
            
            {/* CARD 2 */}
            <motion.div 
                whileHover={{ y: -10 }}
                className="flex h-full flex-col rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition-all hover:shadow-xl sm:rounded-[1.5rem]"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-rose-50 shadow-sm">
                <ShieldCheck className="h-6 w-6 text-rose-600" />
               </div>
               <div className="pb-2">
                  <h3 className="mb-2 text-xl font-black text-gray-900">Vérification rigoureuse</h3>
                  <p className="text-gray-500 font-medium leading-relaxed">ID, IFU, diplômes et statut vérifié. Vous recevez une confiance réelle avant chaque prestation.</p>
               </div>
            </motion.div>
            
            {/* CARD 3 */}
            <motion.div 
                whileHover={{ y: -10 }}
                className="flex h-full flex-col rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition-all hover:shadow-xl sm:rounded-[1.5rem]"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-amber-50 shadow-sm">
                <Star className="h-6 w-6 text-amber-600" />
               </div>
               <div className="pb-2">
                  <h3 className="mb-2 text-xl font-black text-gray-900">Élite & Transparence</h3>
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
