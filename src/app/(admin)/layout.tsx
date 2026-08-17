"use client";

import "../globals.css";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Users,
  BarChart3,
  ShieldCheck,
  CreditCard,
  History,
  LayoutDashboard,
  Bell,
  Rss,
  FolderRoot,
  Sparkles,
  Search,
  Clock,
  CalendarCheck,
  LogOut,
  HelpCircle,
  FileCheck,
  TrendingUp,
  Layout,
  LayoutGrid,
  Image as ImageIcon,
  MessageSquare,
} from "lucide-react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const [adminName, setAdminName] = useState("Admin");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("userRole");
    const name = localStorage.getItem("userName");
    if (name) setAdminName(name);
    if (!token || role !== "admin") {
      router.push("/login");
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userRole");
    localStorage.removeItem("userName");
    router.push("/login");
  };

  return (
    <div className={`antialiased flex h-screen overflow-hidden bg-background text-foreground`}>
      {/* ─── Sidebar Premium — Blanc / Noir / Rose ─── */}
      <aside className="w-72 gradient-sidebar border-r border-gray-200 flex flex-col hidden lg:flex h-full bg-white z-10">
          {/* Logo & titre */}
          <div className="p-6 pb-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-gray-900 flex items-center justify-center shadow-sm">
                <Sparkles className="w-5 h-5 text-pink-500" />
              </div>
              <div>
                <span className="font-extrabold text-lg tracking-tight text-black block leading-tight">
                  AlloService
                </span>
                <span className="text-[10px] text-gray-400 font-medium uppercase tracking-widest">
                  Admin Panel
                </span>
              </div>
            </div>

            {/* Barre de recherche */}
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Rechercher..."
                className="w-full bg-white border border-gray-200 rounded-xl py-2.5 pl-10 pr-4 text-xs text-gray-600 placeholder:text-gray-400 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all"
              />
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex flex-col gap-1 flex-1 scrollbar-hide overflow-y-auto px-3">
            <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 px-3 mb-2 mt-2">
              Menu Principal
            </p>

            <Link
              href="/overview"
              className="flex items-center justify-between group p-3 rounded-xl hover:bg-pink-50 transition-all"
            >
              <div className="flex items-center gap-3">
                <LayoutDashboard className="w-[18px] h-[18px] text-primary" />
                <span className="text-sm font-semibold text-black group-hover:text-primary transition-colors">
                  Tableau de bord
                </span>
              </div>
            </Link>

            <Link
              href="/notifications"
              className="flex items-center justify-between group p-3 rounded-xl hover:bg-pink-50 transition-all"
            >
              <div className="flex items-center gap-3">
                <Bell className="w-[18px] h-[18px] text-gray-400 group-hover:text-primary transition-colors" />
                <span className="text-sm font-medium text-gray-500 group-hover:text-black transition-colors">
                  Notifications
                </span>
              </div>
              <span className="bg-primary text-white text-[10px] px-2.5 py-0.5 rounded-full font-bold">
                Nouveau
              </span>
            </Link>

            <Link
              href="#"
              className="flex items-center justify-between group p-3 rounded-xl hover:bg-pink-50 transition-all"
            >
              <div className="flex items-center gap-3">
                <Rss className="w-[18px] h-[18px] text-gray-400 group-hover:text-primary transition-colors" />
                <span className="text-sm font-medium text-gray-500 group-hover:text-black transition-colors">
                  Flux
                </span>
              </div>
              <span className="w-2 h-2 rounded-full bg-primary shadow-[0_0_8px_rgba(236,72,153,0.5)]"></span>
            </Link>

            <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 px-3 mb-2 mt-6">
              Gestion
            </p>

            <Link
              href="/artisans"
              className="flex items-center justify-between group p-3 rounded-xl hover:bg-pink-50 transition-all"
            >
              <div className="flex items-center gap-3">
                <ShieldCheck className="w-[18px] h-[18px] text-gray-400 group-hover:text-primary transition-colors" />
                <span className="text-sm font-medium text-gray-500 group-hover:text-black transition-colors">
                  Gestion des Artisans
                </span>
              </div>
            </Link>

            <Link
              href="/verifications"
              className="flex items-center justify-between group p-3 rounded-xl hover:bg-pink-50 transition-all"
            >
              <div className="flex items-center gap-3">
                <FileCheck className="w-[18px] h-[18px] text-gray-400 group-hover:text-primary transition-colors" />
                <span className="text-sm font-medium text-gray-500 group-hover:text-black transition-colors">
                  Vérifications (Pro)
                </span>
              </div>
              <span className="bg-pink-100 text-pink-600 text-[10px] px-2 py-0.5 rounded-full font-bold">
                Bénin
              </span>
            </Link>

            <Link
              href="/users"
              className="flex items-center justify-between group p-3 rounded-xl hover:bg-gray-50 transition-all"
            >
              <div className="flex items-center gap-3">
                <Users className="w-[18px] h-[18px] text-gray-400 group-hover:text-primary transition-colors" />
                <span className="text-sm font-medium text-gray-500 group-hover:text-black transition-colors">
                  Gestion des Clients
                </span>
              </div>
            </Link>

            <Link
              href="/bookings"
              className="flex items-center justify-between group p-3 rounded-xl hover:bg-gray-50 transition-all"
            >
              <div className="flex items-center gap-3">
                <CalendarCheck className="w-[18px] h-[18px] text-gray-400 group-hover:text-primary transition-colors" />
                <span className="text-sm font-medium text-gray-500 group-hover:text-black transition-colors">
                  Réservations
                </span>
              </div>
            </Link>

            <Link
              href="/categories"
              className="flex items-center justify-between group p-3 rounded-xl hover:bg-gray-50 transition-all"
            >
              <div className="flex items-center gap-3">
                <LayoutGrid className="w-[18px] h-[18px] text-gray-400 group-hover:text-primary transition-colors" />
                <span className="text-sm font-medium text-gray-500 group-hover:text-black transition-colors">
                  Catégories métiers
                </span>
              </div>
            </Link>

            <Link
              href="/banners"
              className="flex items-center justify-between group p-3 rounded-xl hover:bg-gray-50 transition-all"
            >
              <div className="flex items-center gap-3">
                <ImageIcon className="w-[18px] h-[18px] text-gray-400 group-hover:text-primary transition-colors" />
                <span className="text-sm font-medium text-gray-500 group-hover:text-black transition-colors">
                  Bannières & Pubs
                </span>
              </div>
            </Link>

            <Link
              href="/subscriptions"
              className="flex items-center justify-between group p-3 rounded-xl hover:bg-gray-50 transition-all"
            >
              <div className="flex items-center gap-3">
                <CreditCard className="w-[18px] h-[18px] text-gray-400 group-hover:text-primary transition-colors" />
                <span className="text-sm font-medium text-gray-500 group-hover:text-black transition-colors">
                  Abonnements
                </span>
              </div>
            </Link>

            <Link
              href="/reviews"
              className="flex items-center justify-between group p-3 rounded-xl hover:bg-gray-50 transition-all"
            >
              <div className="flex items-center gap-3">
                <MessageSquare className="w-[18px] h-[18px] text-gray-400 group-hover:text-primary transition-colors" />
                <span className="text-sm font-medium text-gray-500 group-hover:text-black transition-colors">
                  Avis & Modération
                </span>
              </div>
            </Link>

            <Link
              href="/admin/services/pending"
              className="flex items-center justify-between group p-3 rounded-xl hover:bg-gray-50 transition-all"
            >
              <div className="flex items-center gap-3">
                <Clock className="w-[18px] h-[18px] text-gray-400 group-hover:text-primary transition-colors" />
                <span className="text-sm font-medium text-gray-500 group-hover:text-black transition-colors">
                  Services en attente
                </span>
              </div>
            </Link>

            <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 px-3 mb-2 mt-6">
              Google Analytics
            </p>
            <Link
              href="/stats/traffic"
              className="flex items-center justify-between group p-3 rounded-xl hover:bg-pink-50 transition-all"
            >
              <div className="flex items-center gap-3">
                <TrendingUp className="w-[18px] h-[18px] text-gray-400 group-hover:text-primary transition-colors" />
                <span className="text-sm font-medium text-gray-500 group-hover:text-black transition-colors">
                  Trafic
                </span>
              </div>
            </Link>

            <Link
              href="/stats/pages"
              className="flex items-center justify-between group p-3 rounded-xl hover:bg-pink-50 transition-all"
            >
              <div className="flex items-center gap-3">
                <Layout className="w-[18px] h-[18px] text-gray-400 group-hover:text-primary transition-colors" />
                <span className="text-sm font-medium text-gray-500 group-hover:text-black transition-colors">
                  Pages & Actions
                </span>
              </div>
            </Link>

            <Link
              href="/stats/audience"
              className="flex items-center justify-between group p-3 rounded-xl hover:bg-pink-50 transition-all"
            >
              <div className="flex items-center gap-3">
                <Users className="w-[18px] h-[18px] text-gray-400 group-hover:text-primary transition-colors" />
                <span className="text-sm font-medium text-gray-500 group-hover:text-black transition-colors">
                  Audience
                </span>
              </div>
            </Link>

            <Link
              href="/stats"
              className="flex items-center justify-between group p-3 rounded-xl hover:bg-pink-50 transition-all"
            >
              <div className="flex items-center gap-3">
                <BarChart3 className="w-[18px] h-[18px] text-gray-400 group-hover:text-primary transition-colors" />
                <span className="text-sm font-medium text-gray-500 group-hover:text-black transition-colors">
                  Performance Globale
                </span>
              </div>
            </Link>

            <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 px-3 mb-2 mt-6">
              Analyse
            </p>

            <Link
              href="/logs"
              className="flex items-center justify-between group p-3 rounded-xl hover:bg-pink-50 transition-all"
            >
              <div className="flex items-center gap-3">
                <History className="w-[18px] h-[18px] text-gray-400 group-hover:text-primary transition-colors" />
                <span className="text-sm font-medium text-gray-500 group-hover:text-black transition-colors">
                  Actions & Logs
                </span>
              </div>
            </Link>

            <Link
              href="/support"
              className="flex items-center justify-between group p-3 rounded-xl hover:bg-pink-50 transition-all"
            >
              <div className="flex items-center gap-3">
                <HelpCircle className="w-[18px] h-[18px] text-gray-400 group-hover:text-primary transition-colors" />
                <span className="text-sm font-medium text-gray-500 group-hover:text-black transition-colors">
                  Assistance Client
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-primary shadow-[0_0_8px_rgba(236,72,153,0.5)] animate-pulse"></span>
              </div>
            </Link>

            <Link
              href="#"
              className="flex items-center justify-between group p-3 rounded-xl hover:bg-pink-50 transition-all"
            >
              <div className="flex items-center gap-3">
                <FolderRoot className="w-[18px] h-[18px] text-gray-400 group-hover:text-primary transition-colors" />
                <span className="text-sm font-medium text-gray-500 group-hover:text-black transition-colors">
                  Dossiers
                </span>
              </div>
              <span className="bg-pink-50 text-primary text-[10px] px-2.5 py-0.5 rounded-full font-bold">
                6
              </span>
            </Link>
          </nav>

          {/* Footer sidebar — profil admin + déconnexion */}
          <div className="p-4 border-t border-gray-100 space-y-2">
            <div className="flex items-center gap-3 p-2 rounded-xl">
              <div className="w-9 h-9 rounded-full bg-slate-900 flex items-center justify-center text-white font-bold text-xs ring-2 ring-gray-100 shrink-0">
                {adminName.charAt(0).toUpperCase()}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-black leading-none truncate">
                  {adminName}
                </p>
                <p className="text-[10px] text-gray-400 font-medium mt-0.5">
                  Super Administrateur
                </p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 p-2.5 rounded-xl text-red-500 hover:bg-red-50 transition-all group"
            >
              <LogOut className="w-4 h-4 shrink-0" />
              <span className="text-sm font-bold">Se déconnecter</span>
            </button>
          </div>
        </aside>

        {/* Espace central */}
        <main className="flex-1 overflow-y-auto w-full relative scrollbar-hide bg-gray-50/50">
          {children}
        </main>
    </div>
  );
}
