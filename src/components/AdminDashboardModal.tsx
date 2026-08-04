import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  ShieldCheck, 
  Users, 
  Briefcase, 
  MessageSquare, 
  CheckCircle2, 
  XCircle, 
  Phone, 
  Mail, 
  Plus, 
  Trash2, 
  Edit, 
  Star, 
  Clock, 
  Sparkles,
  Search,
  ExternalLink,
  Layers,
  Save,
  BarChart3
} from 'lucide-react';
import { User, ReviewItem, ServiceItem } from '../types';
import { 
  getStoredReviews, 
  updateReviewStatus, 
  deleteReview, 
  getStoredUsers, 
  getStoredServices, 
  saveServices 
} from '../lib/store';

interface AdminDashboardModalProps {
  isOpen: boolean;
  onClose: () => void;
  onServicesUpdated: () => void;
}

export const AdminDashboardModal: React.FC<AdminDashboardModalProps> = ({
  isOpen,
  onClose,
  onServicesUpdated
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'reviews' | 'services' | 'clients'>('overview');
  
  const [reviews, setReviews] = useState<ReviewItem[]>([]);
  const [clients, setClients] = useState<User[]>([]);
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  // Editing state for service
  const [editingServiceId, setEditingServiceId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [editDesc, setEditDesc] = useState('');
  const [editPrice, setEditPrice] = useState('');
  const [editIcon, setEditIcon] = useState('Wrench');

  // New service state
  const [isAddingService, setIsAddingService] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newPrice, setNewPrice] = useState('Sur devis');
  const [newIcon, setNewIcon] = useState('Sparkles');

  const availableIcons = ['Sparkles', 'Wrench', 'Settings', 'Zap', 'ShieldCheck', 'Flame', 'Home', 'Droplet', 'Truck', 'Hammer'];

  const refreshData = () => {
    setReviews(getStoredReviews());
    setClients(getStoredUsers());
    setServices(getStoredServices());
  };

  useEffect(() => {
    if (isOpen) {
      refreshData();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const pendingReviews = reviews.filter(r => r.status === 'pending');
  const approvedReviews = reviews.filter(r => r.status === 'approved');

  const handleApprove = (id: string) => {
    updateReviewStatus(id, 'approved');
    refreshData();
    onServicesUpdated();
  };

  const handleReject = (id: string) => {
    updateReviewStatus(id, 'rejected');
    refreshData();
    onServicesUpdated();
  };

  const handleDeleteReview = (id: string) => {
    deleteReview(id);
    refreshData();
    onServicesUpdated();
  };

  const handleToggleServiceActive = (serviceId: string) => {
    const updated = services.map(s => s.id === serviceId ? { ...s, active: !s.active } : s);
    setServices(updated);
    saveServices(updated);
    onServicesUpdated();
  };

  const handleStartEditService = (service: ServiceItem) => {
    setEditingServiceId(service.id);
    setEditTitle(service.defaultTitle);
    setEditDesc(service.defaultDesc);
    setEditPrice(service.priceEstimate || 'Sur devis');
    setEditIcon(service.iconName || 'Wrench');
  };

  const handleSaveEditService = (serviceId: string) => {
    const updated = services.map(s => {
      if (s.id === serviceId) {
        return {
          ...s,
          defaultTitle: editTitle,
          defaultDesc: editDesc,
          priceEstimate: editPrice || 'Sur devis',
          iconName: editIcon || 'Wrench'
        };
      }
      return s;
    });
    setServices(updated);
    saveServices(updated);
    setEditingServiceId(null);
    onServicesUpdated();
  };

  const handleDeleteService = (serviceId: string) => {
    const updated = services.filter(s => s.id !== serviceId);
    setServices(updated);
    saveServices(updated);
    onServicesUpdated();
  };

  const handleAddService = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newDesc.trim()) return;

    const newSrv: ServiceItem = {
      id: `srv-${Date.now()}`,
      titleKey: `custom_${Date.now()}`,
      descKey: `custom_desc_${Date.now()}`,
      iconName: newIcon || 'Sparkles',
      defaultTitle: newTitle.trim(),
      defaultDesc: newDesc.trim(),
      active: true,
      priceEstimate: newPrice.trim() || 'Sur devis'
    };

    const updated = [...services, newSrv];
    setServices(updated);
    saveServices(updated);
    setNewTitle('');
    setNewDesc('');
    setNewPrice('Sur devis');
    setNewIcon('Sparkles');
    setIsAddingService(false);
    onServicesUpdated();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/85 backdrop-blur-xl">
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 20 }}
        className="w-full max-w-5xl h-[88vh] bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl relative flex flex-col overflow-hidden text-slate-100"
      >
        {/* Header Bar */}
        <div className="px-6 py-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-bold text-white">Painel do Administrador DMJ</h2>
                <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 text-[10px] font-bold uppercase tracking-wider">
                  Sessão Ativa
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Gestão completa de serviços, contatos de clientes e moderação de depoimentos
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="px-6 py-3 bg-slate-900/90 border-b border-slate-800 flex flex-wrap gap-2 shrink-0">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all ${
              activeTab === 'overview'
                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 shadow-inner'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            <span>Visão Geral</span>
          </button>

          <button
            onClick={() => setActiveTab('reviews')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all relative ${
              activeTab === 'reviews'
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30 shadow-inner'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            <span>Moderar Avaliações</span>
            {pendingReviews.length > 0 && (
              <span className="px-1.5 py-0.5 rounded-full bg-amber-400 text-slate-950 text-[10px] font-extrabold animate-pulse">
                {pendingReviews.length}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('services')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all ${
              activeTab === 'services'
                ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30 shadow-inner'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Briefcase className="w-4 h-4" />
            <span>Gerenciar Serviços</span>
          </button>

          <button
            onClick={() => setActiveTab('clients')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all ${
              activeTab === 'clients'
                ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30 shadow-inner'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Clientes & Contatos</span>
            <span className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 text-[10px] font-bold">
              {clients.length}
            </span>
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">

          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Stat Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                
                <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between text-slate-400 text-xs">
                    <span>Serviços Prestados</span>
                    <Briefcase className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div className="text-2xl font-black text-white">1,240+</div>
                  <div className="text-[11px] text-emerald-400 font-medium">100% de satisfação registrada</div>
                </div>

                <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between text-slate-400 text-xs">
                    <span>Clientes Cadastrados</span>
                    <Users className="w-4 h-4 text-purple-400" />
                  </div>
                  <div className="text-2xl font-black text-white">{clients.length}</div>
                  <div className="text-[11px] text-purple-400 font-medium">Contatos salvos com e-mail e telefone</div>
                </div>

                <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between text-slate-400 text-xs">
                    <span>Avaliações Pendentes</span>
                    <Clock className="w-4 h-4 text-amber-400" />
                  </div>
                  <div className="text-2xl font-black text-amber-300">{pendingReviews.length}</div>
                  <div className="text-[11px] text-amber-400 font-medium">
                    {pendingReviews.length > 0 ? 'Aguardando sua validação' : 'Todas avaliações moderadas'}
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between text-slate-400 text-xs">
                    <span>Avaliações Públicas</span>
                    <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                  </div>
                  <div className="text-2xl font-black text-white">{approvedReviews.length}</div>
                  <div className="text-[11px] text-slate-400 font-medium">Média 5.0 estrelas no site</div>
                </div>

              </div>

              {/* Quick Actions Panel */}
              <div className="p-6 rounded-3xl bg-slate-950 border border-slate-800 space-y-4">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span>Ações Rápidas do Administrador</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <button
                    onClick={() => setActiveTab('reviews')}
                    className="p-4 rounded-2xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-left transition-all space-y-1"
                  >
                    <div className="text-xs font-bold text-amber-300 flex items-center gap-1.5">
                      <Clock className="w-4 h-4" />
                      <span>Moderar ({pendingReviews.length} Pendentes)</span>
                    </div>
                    <p className="text-[11px] text-slate-400">Aprovar depoimentos enviados por clientes</p>
                  </button>

                  <button
                    onClick={() => setActiveTab('services')}
                    className="p-4 rounded-2xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-left transition-all space-y-1"
                  >
                    <div className="text-xs font-bold text-blue-400 flex items-center gap-1.5">
                      <Briefcase className="w-4 h-4" />
                      <span>Editar Serviços da Empresa</span>
                    </div>
                    <p className="text-[11px] text-slate-400">Alterar títulos, descrições e status ativo</p>
                  </button>

                  <button
                    onClick={() => setActiveTab('clients')}
                    className="p-4 rounded-2xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-left transition-all space-y-1"
                  >
                    <div className="text-xs font-bold text-purple-300 flex items-center gap-1.5">
                      <Users className="w-4 h-4" />
                      <span>Ver Lista de Clientes</span>
                    </div>
                    <p className="text-[11px] text-slate-400">Iniciar conversa no WhatsApp ou e-mail</p>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: REVIEW MODERATION */}
          {activeTab === 'reviews' && (
            <div className="space-y-6">
              
              {/* PENDING REVIEWS SECTION */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-amber-300 flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>Depoimentos Pendentes de Aprovação ({pendingReviews.length})</span>
                  </h3>
                  <span className="text-[11px] text-slate-400">
                    Somente após você clicar em "Aprovar" o depoimento aparecerá no site.
                  </span>
                </div>

                {pendingReviews.length === 0 ? (
                  <div className="p-8 text-center rounded-2xl bg-slate-950 border border-slate-800 text-slate-400 text-xs">
                    Nenhum depoimento pendente no momento. Novos depoimentos enviados por clientes aparecerão aqui!
                  </div>
                ) : (
                  <div className="space-y-3">
                    {pendingReviews.map((rev) => (
                      <div
                        key={rev.id}
                        className="p-5 rounded-2xl bg-slate-950 border border-amber-500/30 space-y-3 relative"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                          <div>
                            <div className="font-bold text-white text-sm flex items-center gap-2">
                              <span>{rev.author}</span>
                              <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 text-[10px] font-bold">
                                {rev.serviceTag}
                              </span>
                            </div>
                            <div className="text-xs text-slate-400 flex flex-wrap gap-3 mt-1">
                              {rev.authorEmail && <span>📧 {rev.authorEmail}</span>}
                              {rev.authorPhone && <span>📞 {rev.authorPhone}</span>}
                              <span>📍 {rev.location}</span>
                            </div>
                          </div>

                          <div className="flex gap-1 text-amber-400 shrink-0">
                            {[...Array(rev.stars)].map((_, i) => (
                              <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                            ))}
                          </div>
                        </div>

                        <p className="text-slate-200 text-xs italic leading-relaxed bg-slate-900/60 p-3 rounded-xl border border-slate-800/80">
                          "{rev.text}"
                        </p>

                        <div className="flex items-center justify-end gap-3 pt-1">
                          <button
                            onClick={() => handleDeleteReview(rev.id)}
                            className="px-3.5 py-1.5 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 text-xs font-semibold flex items-center gap-1.5 transition-all"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            <span>Rejeitar & Excluir</span>
                          </button>

                          <button
                            onClick={() => handleApprove(rev.id)}
                            className="px-4 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold flex items-center gap-1.5 transition-all shadow-lg active:scale-95"
                          >
                            <CheckCircle2 className="w-4 h-4" />
                            <span>Aprovar - Tornar Público no Site</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* APPROVED REVIEWS SECTION */}
              <div className="space-y-3 pt-4 border-t border-slate-800">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Depoimentos Já Publicados no Site ({approvedReviews.length})</span>
                </h3>

                <div className="space-y-2">
                  {approvedReviews.map((rev) => (
                    <div
                      key={rev.id}
                      className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 font-semibold text-white">
                          <span>{rev.author}</span>
                          <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                            {rev.serviceTag}
                          </span>
                        </div>
                        <p className="text-slate-300 italic text-xs">"{rev.text}"</p>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          onClick={() => handleReject(rev.id)}
                          className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-amber-300 text-[11px] font-medium"
                          title="Voltar para status pendente"
                        >
                          Ocultar do Site
                        </button>
                        <button
                          onClick={() => handleDeleteReview(rev.id)}
                          className="p-1.5 rounded-lg bg-slate-800 hover:bg-red-500/20 text-slate-400 hover:text-red-400"
                          title="Excluir"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* TAB 3: GERENCIAR SERVIÇOS */}
          {activeTab === 'services' && (
            <div className="space-y-6">
              
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-white">Serviços Exibidos na Plataforma</h3>
                  <p className="text-xs text-slate-400">
                    Sua edição reflete instantaneamente para visitantes e clientes do site.
                  </p>
                </div>

                <button
                  onClick={() => setIsAddingService(!isAddingService)}
                  className="px-3.5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow-md active:scale-95 transition-all"
                >
                  <Plus className="w-4 h-4" />
                  <span>Novo Serviço</span>
                </button>
              </div>

              {/* Add New Service Form */}
              {isAddingService && (
                <form onSubmit={handleAddService} className="p-5 rounded-2xl bg-slate-950 border border-emerald-500/40 space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold text-emerald-400 flex items-center gap-2">
                      <Plus className="w-4 h-4" />
                      <span>Adicionar Novo Serviço à Empresa</span>
                    </h4>
                    <span className="text-[10px] text-slate-500">Será ativado imediatamente</span>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-medium text-slate-300 mb-1">Título do Serviço</label>
                      <input
                        type="text"
                        required
                        value={newTitle}
                        onChange={(e) => setNewTitle(e.target.value)}
                        placeholder="Ex: Instalação de Ar Condicionado"
                        className="w-full bg-slate-900 border border-slate-800 rounded-xl py-2 px-3 text-xs text-white focus:outline-none focus:border-emerald-500"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-medium text-slate-300 mb-1">Estimativa de Valor / Orçamento</label>
                      <input
                        type="text"
                        value={newPrice}
                        onChange={(e) => setNewPrice(e.target.value)}
                        placeholder="Ex: Sur devis, À partir de 50€, etc."
                        className="w-full bg-slate-900 border border-slate-800 rounded-xl py-2 px-3 text-xs text-white focus:outline-none focus:border-emerald-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-medium text-slate-300 mb-1">Ícone Representativo</label>
                    <div className="flex flex-wrap gap-2">
                      {availableIcons.map((ic) => (
                        <button
                          key={ic}
                          type="button"
                          onClick={() => setNewIcon(ic)}
                          className={`px-2.5 py-1 rounded-lg border text-xs flex items-center gap-1.5 transition-all ${
                            newIcon === ic 
                              ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300 font-bold' 
                              : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                          }`}
                        >
                          <Sparkles className="w-3.5 h-3.5" />
                          <span>{ic}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-medium text-slate-300 mb-1">Descrição Detalhada do Serviço</label>
                    <textarea
                      rows={2}
                      required
                      value={newDesc}
                      onChange={(e) => setNewDesc(e.target.value)}
                      placeholder="Descreva o que está incluído neste serviço..."
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl py-2 px-3 text-xs text-white focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div className="flex justify-end gap-2 pt-1">
                    <button
                      type="button"
                      onClick={() => setIsAddingService(false)}
                      className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold hover:bg-slate-700 transition-all"
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-md transition-all active:scale-95"
                    >
                      Salvar Serviço
                    </button>
                  </div>
                </form>
              )}

              {/* Services List */}
              <div className="space-y-3">
                {services.map((srv) => (
                  <div
                    key={srv.id}
                    className={`p-4 rounded-2xl bg-slate-950 border ${srv.active ? 'border-slate-800' : 'border-slate-800/50 opacity-60'} space-y-3 transition-all`}
                  >
                    {editingServiceId === srv.id ? (
                      <div className="space-y-3">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <label className="block text-[11px] font-medium text-slate-400 mb-1">Título</label>
                            <input
                              type="text"
                              value={editTitle}
                              onChange={(e) => setEditTitle(e.target.value)}
                              className="w-full bg-slate-900 border border-slate-800 rounded-xl py-2 px-3 text-xs text-white focus:outline-none focus:border-blue-500"
                            />
                          </div>
                          <div>
                            <label className="block text-[11px] font-medium text-slate-400 mb-1">Preço / Orçamento</label>
                            <input
                              type="text"
                              value={editPrice}
                              onChange={(e) => setEditPrice(e.target.value)}
                              className="w-full bg-slate-900 border border-slate-800 rounded-xl py-2 px-3 text-xs text-white focus:outline-none focus:border-blue-500"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-[11px] font-medium text-slate-400 mb-1">Ícone</label>
                          <div className="flex flex-wrap gap-1.5">
                            {availableIcons.map((ic) => (
                              <button
                                key={ic}
                                type="button"
                                onClick={() => setEditIcon(ic)}
                                className={`px-2 py-0.5 rounded border text-[11px] ${
                                  editIcon === ic 
                                    ? 'bg-blue-500/20 border-blue-500 text-blue-300 font-bold' 
                                    : 'bg-slate-900 border-slate-800 text-slate-400'
                                }`}
                              >
                                {ic}
                              </button>
                            ))}
                          </div>
                        </div>

                        <div>
                          <label className="block text-[11px] font-medium text-slate-400 mb-1">Descrição</label>
                          <textarea
                            rows={2}
                            value={editDesc}
                            onChange={(e) => setEditDesc(e.target.value)}
                            className="w-full bg-slate-900 border border-slate-800 rounded-xl py-2 px-3 text-xs text-white focus:outline-none focus:border-blue-500"
                          />
                        </div>

                        <div className="flex justify-end gap-2 pt-1">
                          <button
                            type="button"
                            onClick={() => setEditingServiceId(null)}
                            className="px-3 py-1.5 rounded-xl bg-slate-800 text-xs font-semibold text-slate-300"
                          >
                            Cancelar
                          </button>
                          <button
                            type="button"
                            onClick={() => handleSaveEditService(srv.id)}
                            className="px-4 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center gap-1.5"
                          >
                            <Save className="w-3.5 h-3.5" />
                            <span>Salvar Alterações</span>
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div className="space-y-1 max-w-xl">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="font-bold text-white text-sm">{srv.defaultTitle}</span>
                            {srv.priceEstimate && (
                              <span className="px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/20 text-amber-300 text-[10px] font-bold">
                                💰 {srv.priceEstimate}
                              </span>
                            )}
                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${srv.active ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-red-500/20 text-red-400 border border-red-500/30'}`}>
                              {srv.active ? 'Ativo no Site' : 'Desativado'}
                            </span>
                          </div>
                          <p className="text-xs text-slate-300 leading-relaxed">{srv.defaultDesc}</p>
                        </div>

                        <div className="flex flex-wrap items-center gap-2 shrink-0">
                          <button
                            onClick={() => handleToggleServiceActive(srv.id)}
                            className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                              srv.active 
                                ? 'bg-slate-900 border-slate-800 text-amber-300 hover:bg-slate-800' 
                                : 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/20'
                            }`}
                          >
                            {srv.active ? 'Desativar' : 'Ativar no Site'}
                          </button>

                          <button
                            onClick={() => handleStartEditService(srv)}
                            className="p-2 rounded-xl bg-slate-900 border border-slate-800 hover:bg-slate-800 text-blue-400 transition-all"
                            title="Editar serviço"
                          >
                            <Edit className="w-4 h-4" />
                          </button>

                          <button
                            onClick={() => handleDeleteService(srv.id)}
                            className="p-2 rounded-xl bg-slate-900 border border-slate-800 hover:bg-red-500/20 text-slate-400 hover:text-red-400 transition-all"
                            title="Excluir serviço"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

            </div>
          )}

          {/* TAB 4: CLIENTS & CONTACTS */}
          {activeTab === 'clients' && (
            <div className="space-y-4">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h3 className="text-sm font-bold text-white">Lista de Clientes Cadastrados ({clients.length})</h3>
                  <p className="text-xs text-slate-400">
                    O administrador pode entrar em contato diretamente via WhatsApp ou e-mail.
                  </p>
                </div>

                <div className="relative w-full sm:w-64">
                  <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Buscar cliente..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2 pl-9 pr-3 text-xs text-white focus:outline-none focus:border-purple-500"
                  />
                </div>
              </div>

              {clients.length === 0 ? (
                <div className="p-8 text-center rounded-2xl bg-slate-950 border border-slate-800 text-slate-400 text-xs">
                  Nenhum cliente cadastrado ainda. Quando os clientes se registrarem ou deixarem avaliações, o contato aparecerá aqui!
                </div>
              ) : (
                <div className="space-y-2">
                  {clients
                    .filter(c => c.name.toLowerCase().includes(searchTerm.toLowerCase()) || c.email.toLowerCase().includes(searchTerm.toLowerCase()))
                    .map((client) => {
                      const cleanPhone = client.phone.replace(/[^0-9]/g, '');
                      const whatsappLink = `https://wa.me/${cleanPhone}`;
                      const mailtoLink = `mailto:${client.email}`;

                      return (
                        <div
                          key={client.id}
                          className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                        >
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-white text-sm">{client.name}</span>
                              <span className="px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 text-[10px] font-bold">
                                {client.role === 'admin' ? 'Administrador' : 'Cliente Registrado'}
                              </span>
                            </div>

                            <div className="text-xs text-slate-400 flex flex-wrap gap-4">
                              <span className="flex items-center gap-1">
                                <Mail className="w-3.5 h-3.5 text-slate-500" />
                                {client.email}
                              </span>
                              <span className="flex items-center gap-1">
                                <Phone className="w-3.5 h-3.5 text-slate-500" />
                                {client.phone}
                              </span>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 shrink-0">
                            <a
                              href={whatsappLink}
                              target="_blank"
                              rel="noreferrer"
                              className="px-3 py-1.5 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-semibold flex items-center gap-1.5 transition-all"
                            >
                              <Phone className="w-3.5 h-3.5" />
                              <span>WhatsApp</span>
                            </a>

                            <a
                              href={mailtoLink}
                              className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 text-xs font-semibold flex items-center gap-1.5 transition-all"
                            >
                              <Mail className="w-3.5 h-3.5" />
                              <span>Enviar E-mail</span>
                            </a>
                          </div>
                        </div>
                      );
                    })}
                </div>
              )}

            </div>
          )}

        </div>

      </motion.div>
    </div>
  );
};
