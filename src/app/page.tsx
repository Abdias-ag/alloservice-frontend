
"use client";

import React from "react";
import Link from "next/link";
import {
  Wrench,
  ShieldCheck,
  Star,
  Users,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Clock3,
  MapPin,
  PhoneCall,
  Menu,
  X,
  Search,
  ChevronRight,
  BadgeCheck,
  Smartphone,
  Zap,
  HeartHandshake,
} from "lucide-react";
import { motion } from "framer-motion";

const services = [
  {
    icon: Wrench,
    title: "Plomberie",
    description: "Installation, réparation et entretien de vos équipements.",
    color: "bg-blue-50 text-blue-600",
  },
  {
    icon: Zap,
    title: "Électricité",
    description: "Des électriciens qualifiés pour vos installations.",
    color: "bg-amber-50 text-amber-600",
  },
  {
    icon: Wrench,
    title: "Menuiserie",
    description: "Travaux de bois, fabrication et rénovation.",
    color: "bg-orange-50 text-orange-600",
  },
  {
    icon: Smartphone,
    title: "Informatique",
    description: "Assistance, dépannage et maintenance informatique.",
    color: "bg-violet-50 text-violet-600",
  },
];

const advantages = [
  {
    icon: Clock3,
    title: "Gain de temps",
    description:
      "Trouvez rapidement un professionnel sans multiplier les déplacements.",
  },
  {
    icon: ShieldCheck,
    title: "Profils vérifiés",
    description:
      "Des professionnels dont les informations et qualifications sont contrôlées.",
  },
  {
    icon: MapPin,
    title: "Proche de vous",
    description:
      "Identifiez des prestataires disponibles dans votre zone géographique.",
  },
  {
    icon: HeartHandshake,
    title: "Relation de confiance",
    description:
      "Un accompagnement simple pour faciliter vos demandes de services.",
  },
];

const steps = [
  {
    number: "01",
    title: "Exprimez votre besoin",
    description: "Décrivez le service dont vous avez besoin.",
  },
  {
    number: "02",
    title: "Trouvez un expert",
    description: "Découvrez les professionnels correspondant à votre demande.",
  },
  {
    number: "03",
    title: "Contactez et profitez",
    description: "Échangez avec le prestataire pour organiser l'intervention.",
  },
];

export default function LandingPage() {
  const [menuOpen, setMenuOpen] = React.useState(false);

  const downloadApp = () => {
    window.location.href =
      "https://expo.dev/artifacts/eas/0D_TKzsQsS2d5aQ2kpIMLlOyjwFs_ai4ysPxt9qLVAk.apk";
  };

  return (
    <main className="min-h-screen overflow-hidden bg-white text-slate-900">

      {/* NAVIGATION */}
      <header className="fixed top-0 z-50 w-full border-b border-slate-100 bg-white/90 backdrop-blur-xl">
        <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 lg:px-8">

          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-violet-700 shadow-lg shadow-violet-200">
              <Wrench className="h-6 w-6 text-white" />
            </div>
            <div>
              <span className="text-xl font-black tracking-tight">
                Allo<span className="text-violet-700">Service</span>
              </span>
              <p className="text-[10px] font-semibold uppercase tracking-[2px] text-slate-400">
                Vos experts à proximité
              </p>
            </div>
          </Link>

          <div className="hidden items-center gap-9 lg:flex">
            <a href="#accueil" className="text-sm font-semibold text-slate-600 transition hover:text-violet-700">Accueil</a>
            <a href="#services" className="text-sm font-semibold text-slate-600 transition hover:text-violet-700">Services</a>
            <a href="#avantages" className="text-sm font-semibold text-slate-600 transition hover:text-violet-700">Pourquoi nous</a>
            <a href="#fonctionnement" className="text-sm font-semibold text-slate-600 transition hover:text-violet-700">Comment ça marche</a>
          </div>

          <div className="hidden items-center gap-3 lg:flex">
            <Link
              href="/login"
              className="rounded-xl px-5 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-50"
            >
              Espace administrateur
            </Link>
            <button
              onClick={downloadApp}
              className="flex items-center gap-2 rounded-xl bg-violet-700 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-violet-200 transition hover:bg-violet-800"
            >
              Télécharger l'application
              <ArrowRight size={17} />
            </button>
          </div>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="rounded-xl bg-slate-100 p-2.5 lg:hidden"
            aria-label="Ouvrir le menu"
          >
            {menuOpen ? <X /> : <Menu />}
          </button>
        </nav>

        {menuOpen && (
          <div className="border-t border-slate-100 bg-white p-5 shadow-xl lg:hidden">
            <div className="flex flex-col gap-5">
              {[
                ["Accueil", "#accueil"],
                ["Services", "#services"],
                ["Pourquoi nous", "#avantages"],
                ["Fonctionnement", "#fonctionnement"],
              ].map(([label, href]) => (
                <a
                  key={label}
                  href={href}
                  onClick={() => setMenuOpen(false)}
                  className="font-semibold text-slate-700"
                >
                  {label}
                </a>
              ))}
              <Link href="/login" className="font-bold text-violet-700">
                Espace administrateur
              </Link>
              <button
                onClick={downloadApp}
                className="rounded-xl bg-violet-700 py-3 font-bold text-white"
              >
                Télécharger l'application
              </button>
            </div>
          </div>
        )}
      </header>

      {/* HERO */}
      <section
        id="accueil"
        className="relative bg-[#faf9ff] pb-20 pt-32 lg:pb-28 lg:pt-40"
      >
        <div className="pointer-events-none absolute -left-40 top-20 h-96 w-96 rounded-full bg-violet-200/30 blur-[100px]" />
        <div className="pointer-events-none absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-indigo-200/30 blur-[100px]" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-16 px-5 lg:grid-cols-2 lg:px-8">

          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-violet-100 bg-white px-4 py-2 shadow-sm">
              <span className="flex h-2 w-2 rounded-full bg-green-500" />
              <span className="text-xs font-bold tracking-wide text-violet-800">
                LA SOLUTION AUX SERVICES DE PROXIMITÉ AU BÉNIN
              </span>
            </div>

            <h1 className="max-w-2xl text-5xl font-black leading-[1.12] tracking-tight text-slate-950 sm:text-6xl lg:text-[68px]">
              Le bon professionnel,
              <span className="block text-violet-700">
                au bon moment.
              </span>
            </h1>

            <p className="mt-7 max-w-xl text-lg leading-8 text-slate-600">
              Plomberie, électricité, réparation et bien plus.
              AlloService vous connecte facilement aux professionnels
              dont vous avez besoin, partout où ils sont disponibles.
            </p>

            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
              <button
                onClick={downloadApp}
                className="flex items-center justify-center gap-3 rounded-2xl bg-violet-700 px-7 py-4 font-bold text-white shadow-xl shadow-violet-200 transition hover:-translate-y-1 hover:bg-violet-800"
              >
                Télécharger l'application
                <ArrowRight size={19} />
              </button>

              <a
                href="#services"
                className="flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-7 py-4 font-bold text-slate-800 transition hover:border-violet-300 hover:text-violet-700"
              >
                Découvrir les services
                <ChevronRight size={19} />
              </a>
            </div>

            <div className="mt-10 flex flex-wrap gap-6 border-t border-slate-200 pt-8">
              <div className="flex items-center gap-2">
                <ShieldCheck className="text-violet-700" size={21} />
                <span className="text-sm font-semibold text-slate-600">
                  Professionnels vérifiés
                </span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="text-violet-700" size={21} />
                <span className="text-sm font-semibold text-slate-600">
                  Simple et pratique
                </span>
              </div>
            </div>
          </motion.div>

          {/* HERO IMAGE */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative mx-auto w-full max-w-lg"
          >
            <div className="relative overflow-hidden rounded-[2rem] bg-violet-100 p-2 shadow-2xl shadow-violet-200/60">
              <img
                src="/artisan-woman.png"
                alt="Professionnelle au travail"
                className="h-[480px] w-full rounded-[1.6rem] object-cover sm:h-[580px]"
              />
              <div className="absolute inset-2 rounded-[1.6rem] bg-gradient-to-t from-slate-950/40 via-transparent to-transparent" />
            </div>

            {/* FLOATING CARD 1 */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute -left-5 top-16 hidden items-center gap-3 rounded-2xl border border-white bg-white p-4 shadow-xl sm:flex"
            >
              <div className="rounded-xl bg-green-50 p-3">
                <BadgeCheck className="text-green-600" size={27} />
              </div>
              <div>
                <p className="font-extrabold">Profil vérifié</p>
                <p className="text-xs text-slate-500">Confiance et sécurité</p>
              </div>
            </motion.div>

            {/* FLOATING CARD 2 */}
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute -bottom-6 -right-3 flex items-center gap-3 rounded-2xl border border-slate-100 bg-white p-4 shadow-xl sm:-right-8 sm:p-5"
            >
              <div className="rounded-xl bg-violet-100 p-3">
                <Search className="text-violet-700" size={25} />
              </div>
              <div>
                <p className="font-extrabold text-slate-900">Votre besoin</p>
                <p className="text-xs text-slate-500">Votre expert à proximité</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="py-24">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">

          <div className="mb-14 flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <span className="text-xs font-black uppercase tracking-[3px] text-violet-700">
                NOS DOMAINES D'INTERVENTION
              </span>
              <h2 className="mt-4 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
                Des solutions pour
                <span className="text-violet-700"> chaque besoin.</span>
              </h2>
              <p className="mt-4 max-w-xl leading-7 text-slate-500">
                Accédez à différents corps de métiers et trouvez
                le professionnel adapté à votre situation.
              </p>
            </div>

            <a
              href="#fonctionnement"
              className="inline-flex items-center gap-2 font-bold text-violet-700 hover:gap-4"
            >
              Comment ça marche <ArrowRight size={18} />
            </a>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((service, index) => {
              const Icon = service.icon;

              return (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -7 }}
                  className="group rounded-3xl border border-slate-100 bg-white p-7 shadow-sm transition hover:border-violet-100 hover:shadow-xl"
                >
                  <div className={`mb-7 flex h-14 w-14 items-center justify-center rounded-2xl ${service.color}`}>
                    <Icon size={27} />
                  </div>

                  <h3 className="text-xl font-extrabold text-slate-900">
                    {service.title}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-slate-500">
                    {service.description}
                  </p>

                  <div className="mt-6 flex items-center gap-2 text-sm font-bold text-violet-700 transition group-hover:gap-4">
                    En savoir plus <ArrowRight size={16} />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ADVANTAGES */}
      <section id="avantages" className="bg-[#faf9ff] py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-16 px-5 lg:grid-cols-2 lg:px-8">

          <div>
            <span className="text-xs font-black uppercase tracking-[3px] text-violet-700">
              POURQUOI ALLOSERVICE ?
            </span>

            <h2 className="mt-5 text-3xl font-black leading-tight tracking-tight text-slate-950 sm:text-5xl">
              Une nouvelle façon de trouver
              <span className="text-violet-700"> le bon artisan.</span>
            </h2>

            <p className="mt-6 max-w-lg leading-8 text-slate-500">
              Nous simplifions la recherche de prestataires en mettant
              la proximité, la transparence et la confiance au cœur
              de chaque mise en relation.
            </p>

            <div className="mt-8 flex items-center gap-4 rounded-2xl border border-violet-100 bg-white p-5">
              <div className="rounded-xl bg-violet-100 p-3">
                <Sparkles className="text-violet-700" size={25} />
              </div>
              <div>
                <p className="font-extrabold text-slate-900">
                  Tout devient plus simple.
                </p>
                <p className="mt-1 text-sm text-slate-500">
                  Vos services, vos professionnels, votre tranquillité.
                </p>
              </div>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {advantages.map((item, index) => {
              const Icon = item.icon;

              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm"
                >
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-violet-50 text-violet-700">
                    <Icon size={24} />
                  </div>
                  <h3 className="font-extrabold text-slate-900">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-slate-500">
                    {item.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="fonctionnement" className="py-24">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">

          <div className="mx-auto mb-16 max-w-2xl text-center">
            <span className="text-xs font-black uppercase tracking-[3px] text-violet-700">
              SIMPLE ET RAPIDE
            </span>
            <h2 className="mt-4 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
              Comment fonctionne AlloService ?
            </h2>
            <p className="mt-4 leading-7 text-slate-500">
              Trois étapes pour faciliter votre accès aux professionnels.
            </p>
          </div>

          <div className="grid gap-10 md:grid-cols-3">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                className="relative text-center"
              >
                <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-violet-700 text-2xl font-black text-white shadow-xl shadow-violet-200">
                  {step.number}
                </div>

                <h3 className="text-xl font-extrabold text-slate-900">
                  {step.title}
                </h3>
                <p className="mx-auto mt-3 max-w-xs text-sm leading-7 text-slate-500">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-5 pb-24 lg:px-8">
        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2.5rem] bg-violet-800 px-7 py-16 text-center text-white shadow-2xl shadow-violet-200 sm:px-16">
          <div className="absolute -right-20 -top-32 h-80 w-80 rounded-full border-[45px] border-white/5" />
          <div className="absolute -bottom-32 -left-20 h-80 w-80 rounded-full border-[45px] border-white/5" />

          <div className="relative">
            <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15">
              <Smartphone size={28} />
            </div>

            <h2 className="mx-auto max-w-2xl text-3xl font-black leading-tight sm:text-5xl">
              Vos besoins méritent les meilleurs professionnels.
            </h2>

            <p className="mx-auto mt-6 max-w-xl leading-8 text-violet-100">
              Découvrez AlloService et simplifiez votre quotidien
              grâce à une nouvelle expérience de services de proximité.
            </p>

            <button
              onClick={downloadApp}
              className="mt-9 inline-flex items-center gap-3 rounded-2xl bg-white px-8 py-4 font-extrabold text-violet-800 shadow-xl transition hover:-translate-y-1 hover:bg-violet-50"
            >
              Télécharger l'application
              <ArrowRight size={19} />
            </button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#111126] text-white">
        <div className="mx-auto max-w-7xl px-5 py-16 lg:px-8">

          <div className="grid gap-12 md:grid-cols-2">

            <div>
              <Link href="/" className="inline-flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-700">
                  <Wrench size={23} />
                </div>
                <span className="text-2xl font-black">
                  Allo<span className="text-violet-400">Service</span>
                </span>
              </Link>

              <p className="mt-5 max-w-sm text-sm leading-7 text-slate-400">
                La plateforme qui facilite la mise en relation entre
                particuliers et professionnels des services au Bénin.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-8">
              <div>
                <h4 className="mb-5 font-extrabold">Navigation</h4>
                <div className="flex flex-col gap-4 text-sm text-slate-400">
                  <a href="#accueil" className="hover:text-white">Accueil</a>
                  <a href="#services" className="hover:text-white">Services</a>
                  <a href="#avantages" className="hover:text-white">Pourquoi nous</a>
                  <a href="#fonctionnement" className="hover:text-white">Fonctionnement</a>
                </div>
              </div>

              <div>
                <h4 className="mb-5 font-extrabold">Espace utilisateur</h4>
                <div className="flex flex-col gap-4 text-sm text-slate-400">
                  <Link href="/login" className="hover:text-white">Administration</Link>
                  <a href="#services" className="hover:text-white">Nos services</a>
                  <button onClick={downloadApp} className="text-left hover:text-white">
                    Application mobile
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-14 flex flex-col justify-between gap-4 border-t border-white/10 pt-7 text-xs text-slate-500 sm:flex-row">
            <p>
              © {new Date().getFullYear()} AlloService. Tous droits réservés.
            </p>
            <p>Conçu pour simplifier les services de proximité au Bénin.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
