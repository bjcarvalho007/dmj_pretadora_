import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  X, 
  Star, 
  Send, 
  Clock, 
  CheckCircle2, 
  ShieldAlert, 
  User as UserIcon, 
  Mail, 
  Phone,
  MessageSquare
} from 'lucide-react';
import { User, ReviewItem } from '../types';
import { saveReview } from '../lib/store';

interface SubmitReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: User | null;
  onRequestAuth: () => void;
  onReviewSubmitted: (review: ReviewItem) => void;
}

export const SubmitReviewModal: React.FC<SubmitReviewModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  onRequestAuth,
  onReviewSubmitted
}) => {
  const [stars, setStars] = useState(5);
  const [serviceTag, setServiceTag] = useState('Peinture');
  const [text, setText] = useState('');
  const [location, setLocation] = useState('Paris');

  // If user is not logged in, ask for contact details
  const [guestName, setGuestName] = useState('');
  const [guestEmail, setGuestEmail] = useState('');
  const [guestPhone, setGuestPhone] = useState('');

  const [submittedSuccess, setSubmittedSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    const authorName = currentUser ? currentUser.name : guestName.trim();
    const authorEmail = currentUser ? currentUser.email : guestEmail.trim();
    const authorPhone = currentUser ? currentUser.phone : guestPhone.trim();

    if (!authorName || !authorEmail || !authorPhone || !text.trim()) {
      setErrorMsg('Por favor, preencha todos os campos para contato do Administrador.');
      return;
    }

    const newReview: ReviewItem = {
      id: `rev-client-${Date.now()}`,
      text: text.trim(),
      author: authorName,
      authorEmail,
      authorPhone,
      location: location.trim() || 'Paris',
      stars,
      serviceTag,
      timeAgo: 'Agora mesmo',
      status: 'pending', // AWAITS ADMIN APPROVAL AS REQUESTED
      createdAt: new Date().toISOString()
    };

    saveReview(newReview);
    onReviewSubmitted(newReview);
    setSubmittedSuccess(true);
  };

  const handleResetAndClose = () => {
    setSubmittedSuccess(false);
    setText('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        className="w-full max-w-lg bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden text-slate-100"
      >
        <button
          onClick={handleResetAndClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-slate-800/80 text-slate-400 hover:text-white hover:bg-slate-700 transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        {!submittedSuccess ? (
          <div>
            <div className="mb-6 space-y-1">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-semibold mb-2">
                <Clock className="w-3.5 h-3.5" />
                <span>Requer Aprovação do Admin DMJ</span>
              </div>
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-emerald-400" />
                <span>Deixar Depoimento & Avaliação</span>
              </h3>
              <p className="text-xs text-slate-400">
                Seu feedback será analisado pelo administrador e publicado em seguida para todos os clientes.
              </p>
            </div>

            {errorMsg && (
              <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs">
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* If not logged in, enforce account creation/login */}
              {!currentUser ? (
                <div className="p-5 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-center space-y-3">
                  <div className="text-amber-300 font-bold text-sm">
                    Identificação Necessária
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Para enviar uma avaliação e depoimento que ficará salvo para todos os clientes verem (após aprovação do Admin), você precisa estar conectado na sua conta com e-mail e telefone.
                  </p>
                  <button
                    type="button"
                    onClick={onRequestAuth}
                    className="px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs shadow-md transition-all active:scale-95 inline-flex items-center gap-2"
                  >
                    <UserIcon className="w-4 h-4" />
                    <span>Entrar ou Criar Minha Conta</span>
                  </button>
                </div>
              ) : (
                <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-300 flex items-center justify-between">
                  <div>
                    <span className="font-semibold text-white">{currentUser.name}</span> ({currentUser.email})
                    <div className="text-[11px] text-slate-400">Tel: {currentUser.phone}</div>
                  </div>
                  <span className="px-2 py-1 rounded bg-emerald-500/20 text-[10px] font-bold uppercase">Cliente Conectado</span>
                </div>
              )}

              {/* Service Selection & Star Rating */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Serviço Realizado</label>
                  <select
                    value={serviceTag}
                    onChange={(e) => setServiceTag(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2.5 px-3 text-xs text-white focus:outline-none focus:border-emerald-500"
                  >
                    <option value="Peinture">Pintura & Rénovation</option>
                    <option value="Électricité">Électricité Générale</option>
                    <option value="Jardinage">Jardinage & Espaces Verts</option>
                    <option value="Nettoyage Vitres">Nettoyage de Vitres</option>
                    <option value="Outro Serviço">Outro Serviço</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Sua Nota</label>
                  <div className="flex items-center gap-1.5 py-1">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <button
                        type="button"
                        key={s}
                        onClick={() => setStars(s)}
                        className="p-1 text-amber-400 hover:scale-110 transition-transform"
                      >
                        <Star className={`w-6 h-6 ${s <= stars ? 'fill-amber-400' : 'text-slate-700'}`} />
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Text feedback */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Seu Depoimento / Avaliação</label>
                <textarea
                  rows={4}
                  required
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Conte como foi sua experiência com os serviços da DMJ Services..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-xl transition-all active:scale-95 flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>Enviar Avaliação para Moderação</span>
              </button>
            </form>
          </div>
        ) : (
          <div className="py-8 text-center space-y-4">
            <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto border border-emerald-500/30">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <h3 className="text-xl font-bold text-white">Depoimento Enviado com Sucesso!</h3>
            
            <p className="text-xs text-slate-300 leading-relaxed max-w-sm mx-auto">
              Seu depoimento ficou registrado em nosso sistema com status <strong className="text-amber-300">Pendente de Aprovação</strong>. Assim que o Administrador da DMJ validar, ele ficará disponível publicamente no site para todos!
            </p>

            <button
              onClick={handleResetAndClose}
              className="px-6 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs transition-all"
            >
              Entendido / Fechar
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
};
