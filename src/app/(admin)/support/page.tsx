"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Send,
  User,
  Search,
  MessageSquare,
  Clock,
  CheckCheck,
  MoreVertical,
  HelpCircle,
  ArrowLeft,
} from "lucide-react";
import Link from "next/link";
import { API_URL } from '@/utils/constants';

type Conversation = {
  user: {
    id: number;
    name: string;
    photo?: string;
    role: string;
  };
  lastMessage: string;
  timestamp: string;
};

type Message = {
  id: number;
  senderId: number;
  receiverId: number;
  text: string;
  createdAt: string;
};

export default function SupportPage() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedUser, setSelectedUser] = useState<Conversation | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState("");
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const ADMIN_ID = 6;

  // Récupérer les conversations au chargement
  const fetchConversations = async () => {
    try {
      const res = await fetch(`${API_URL}/admin/support/conversations`);
      const data = await res.json();
      setConversations(data.conversations || []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  // Récupérer l'historique quand un utilisateur est sélectionné
  const fetchHistory = async (userId: number) => {
    try {
      const res = await fetch(`${API_URL}/chat/${ADMIN_ID}/${userId}`);
      const data = await res.json();
      setMessages(data.messages || []);
      // Scroll to bottom
      setTimeout(() => messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }), 100);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchConversations();
    const interval = setInterval(fetchConversations, 10000); // Poll every 10s
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (selectedUser) {
      fetchHistory(selectedUser.user.id);
      const interval = setInterval(() => fetchHistory(selectedUser.user.id), 3000); // Poll messages every 3s
      return () => clearInterval(interval);
    }
  }, [selectedUser]);

  const handleSendMessage = async () => {
    if (!inputText.trim() || !selectedUser) return;

    try {
      const res = await fetch(`${API_URL}/chat/send`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          senderId: ADMIN_ID,
          receiverId: selectedUser.user.id,
          text: inputText,
        }),
      });
      const data = await res.json();
      setMessages([...messages, data.data]);
      setInputText("");
      setTimeout(() => messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }), 50);
    } catch (e) {
      console.error(e);
    }
  };

  const filteredConversations = conversations.filter((c) =>
    c.user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex h-[calc(100vh-4rem)] bg-white overflow-hidden">
      {/* Barre Latérale : Liste des conversations */}
      <div className="w-80 md:w-96 border-r border-gray-100 flex flex-col bg-gray-50/30">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">Support</h1>
            <div className="w-10 h-10 rounded-xl bg-gray-900 flex items-center justify-center">
                <HelpCircle className="w-5 h-5 text-white" />
            </div>
          </div>
          
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Rechercher un utilisateur..."
              className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-pink-500/20 transition-all font-medium"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-4 pb-6 space-y-2">
          {loading ? (
            Array(5).fill(0).map((_, i) => (
              <div key={i} className="h-20 bg-white/50 animate-pulse rounded-2xl" />
            ))
          ) : filteredConversations.length === 0 ? (
            <div className="text-center py-10 px-6">
                <MessageSquare className="w-10 h-10 text-gray-200 mx-auto mb-3" />
                <p className="text-gray-400 text-sm font-medium">Aucune demande d'aide active.</p>
            </div>
          ) : (
            filteredConversations.map((conv) => (
              <button
                key={conv.user.id}
                onClick={() => setSelectedUser(conv)}
                className={`w-full text-left p-4 rounded-2xl transition-all border ${
                  selectedUser?.user.id === conv.user.id
                    ? "bg-white border-pink-100 shadow-sm ring-1 ring-pink-500/5"
                    : "bg-transparent border-transparent hover:bg-white hover:shadow-sm"
                }`}
              >
                <div className="flex gap-4">
                  <div className="relative">
                    <div className="w-12 h-12 rounded-xl bg-gray-200 flex items-center justify-center text-gray-500 font-bold overflow-hidden">
                      {conv.user.photo ? (
                        <img src={conv.user.photo} alt={conv.user.name} className="w-full h-full object-cover" />
                      ) : (
                        conv.user.name.charAt(0)
                      )}
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-green-500 border-2 border-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <p className="font-bold text-gray-900 truncate text-sm">{conv.user.name}</p>
                      <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">
                        {conv.user.role}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 truncate font-medium">{conv.lastMessage}</p>
                  </div>
                </div>
              </button>
            ))
          )}
        </div>
      </div>

      {/* Fenêtre de Chat */}
      <div className="flex-1 flex flex-col bg-white">
        {selectedUser ? (
          <>
            {/* Header Chat */}
            <div className="px-8 py-4 border-b border-gray-100 flex items-center justify-between bg-white/80 backdrop-blur-md sticky top-0 z-10">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center font-bold text-slate-500">
                    {selectedUser.user.name.charAt(0)}
                </div>
                <div>
                  <h2 className="font-extrabold text-gray-900 leading-none">{selectedUser.user.name}</h2>
                  <p className="text-[10px] text-green-500 font-bold uppercase tracking-widest mt-1.5 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                    En ligne
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                 <button className="p-2.5 hover:bg-gray-50 rounded-xl text-gray-400 transition-colors">
                    <MoreVertical className="w-5 h-5" />
                 </button>
              </div>
            </div>

            {/* Zone des messages */}
            <div className="flex-1 overflow-y-auto p-8 space-y-6">
              {messages.map((msg, i) => {
                const isMe = msg.senderId === ADMIN_ID;
                return (
                  <div key={msg.id} className={`flex ${isMe ? "justify-end" : "justify-start"}`}>
                    <div className={`max-w-[70%] ${isMe ? "items-end" : "items-start"} flex flex-col gap-1.5`}>
                        <div className={`px-5 py-3.5 rounded-2xl text-sm font-medium shadow-sm ${
                            isMe ? "bg-gray-900 text-white rounded-tr-none" : "bg-gray-100 text-gray-900 rounded-tl-none"
                        }`}>
                            {msg.text}
                        </div>
                        <span className="text-[10px] text-gray-400 font-bold px-1">
                            {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                    </div>
                  </div>
                );
              })}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Bar */}
            <div className="p-6 bg-white border-t border-gray-100">
              <div className="max-w-4xl mx-auto relative flex items-center gap-3">
                <input
                  type="text"
                  placeholder="Répondre à l'utilisateur..."
                  className="flex-1 bg-gray-50 border-none rounded-2xl px-6 py-4 text-sm font-medium focus:ring-2 focus:ring-pink-500/20 transition-all"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!inputText.trim()}
                  className="w-12 h-12 bg-gray-900 text-white rounded-2xl flex items-center justify-center hover:bg-gray-800 disabled:opacity-50 transition-all shrink-0 shadow-lg shadow-gray-900/10"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-center p-10 bg-gray-50/30">
            <div className="w-20 h-20 bg-white rounded-3xl shadow-xl flex items-center justify-center mb-6">
                <MessageSquare className="w-10 h-10 text-pink-500" />
            </div>
            <h2 className="text-xl font-extrabold text-gray-900 mb-2">Centre d'Assistance Client</h2>
            <p className="text-gray-400 max-w-sm font-medium">
              Veuillez sélectionner un utilisateur dans la liste pour commencer à l'aider.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
