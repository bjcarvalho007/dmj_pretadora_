import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';

import { 
  Phone, 
  Mail, 
  MapPin, 
  CheckCircle, 
  Star, 
  Globe, 
  Send, 
  ShieldCheck, 
  Clock, 
  Wrench, 
  Paintbrush, 
  Zap, 
  Sparkle, 
  Sparkles,
  Check, 
  ChevronRight, 
  X, 
  MessageSquare, 
  Menu, 
  Award,
  ArrowRight,
  ThumbsUp,
  Maximize2,
  Calendar,
  CheckSquare,
  Square,
  CheckCircle2,
  ChevronDown,
  ArrowUp
} from 'lucide-react';

import gardeningImg from './assets/images/dmj_gardening_work_1784762956112.jpg';
import paintingImg from './assets/images/dmj_painting_work_1784762965678.jpg';
import electricalImg from './assets/images/dmj_electrical_work_1784762974679.jpg';
import cleaningImg from './assets/images/dmj_cleaning_work_1784762983699.jpg';

import { getTranslationsForLang, languagesList } from './i18n';
import { SmartReviewsCarousel } from './components/SmartReviewsCarousel';
import { User, ServiceItem } from './types';
import { getCurrentUser, setCurrentUser, getStoredServices, syncFromFirestore } from './lib/store';
import { AuthModal } from './components/AuthModal';
import { SubmitReviewModal } from './components/SubmitReviewModal';
import { AdminDashboardModal } from './components/AdminDashboardModal';
import { User as UserIcon, LogOut, MessageSquarePlus } from 'lucide-react';

export default function App() {
  const [lang, setLang] = useState('fr');
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // User & Modals State
  const [currentUser, setUser] = useState<User | null>(() => getCurrentUser());
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [submitReviewModalOpen, setSubmitReviewModalOpen] = useState(false);
  const [adminModalOpen, setAdminModalOpen] = useState(false);
  const [reviewsRefreshKey, setReviewsRefreshKey] = useState(0);

  // Dynamic services loaded from store
  const [allServices, setAllServices] = useState<ServiceItem[]>([]);

  useEffect(() => {
    syncFromFirestore().then(() => {
      setAllServices(getStoredServices());
      setReviewsRefreshKey(k => k + 1);
    });
  }, []);

  useEffect(() => {
    setAllServices(getStoredServices());
  }, [reviewsRefreshKey, adminModalOpen]);

  const [selectedServiceCategory, setSelectedServiceModal] = useState<string | null>(null);
  
  // Client Sub-services Selection State
  const [selectedSubServices, setSelectedSubServices] = useState<string[]>([]);
  const [requestType, setRequestType] = useState('quote');
  const [clientModalData, setClientModalData] = useState({
    name: '',
    city: '',
    phone: '',
    notes: ''
  });

  const [galleryFilter, setGalleryFilter] = useState('all');
  const [activeImageLightbox, setActiveImageLightbox] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Active translation dictionary
  const t = getTranslationsForLang(lang);

  // Scroll listener to toggle "Back to Top" button
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 250) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Click outside listener for language dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setLangDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleSubService = (item: string) => {
    if (selectedSubServices.includes(item)) {
      setSelectedSubServices(selectedSubServices.filter(s => s !== item));
    } else {
      setSelectedSubServices([...selectedSubServices, item]);
    }
  };

  // Dispatch direct Client Order to DMJ WhatsApp
  const sendCategorySelectionToWhatsapp = () => {
    if (selectedSubServices.length === 0) {
      alert(t.selectAtLeastOneAlert);
      return;
    }

    const categoryObj = (t.services[selectedServiceCategory || 'gardening'] || {}) as { title?: string; desc?: string; items?: string[] };
    const categoryTitle = categoryObj.title || selectedServiceCategory;
    const reqTypeLabel = requestType === 'visit' 
      ? t.reqTypeVisit 
      : (requestType === 'urgent' ? t.reqTypeUrgent : t.reqTypeQuote);

    let message = `*${t.title}*\n`;
    message += `_${t.tagline}_\n\n`;
    message += `📋 *${t.waMsgHeader}*\n`;
    message += `───────────────────────\n`;
    message += `👤 *${t.waClientInfoLabel}*\n`;
    message += `• *${t.waNameLabel}* ${clientModalData.name || t.waNotProvided}\n`;
    message += `• *${t.waCityLabel}* ${clientModalData.city || t.waNotProvided}\n`;
    message += `• *${t.waPhoneLabel}* ${clientModalData.phone || t.waNotProvided}\n\n`;
    message += `🏷️ *${t.waCategoryLabel}*\n`;
    message += `▸ *${categoryTitle}*\n\n`;
    message += `📌 *${t.waInterventionLabel}*\n`;
    message += `▸ *${reqTypeLabel}*\n\n`;
    message += `🛠️ *${t.waSelectedServicesLabel} (${selectedSubServices.length}):*\n`;
    selectedSubServices.forEach((item, i) => {
      message += `  ${i + 1}. ✓ ${item}\n`;
    });

    if (clientModalData.notes && clientModalData.notes.trim()) {
      message += `\n📝 *${t.waNotesLabel}*\n${clientModalData.notes.trim()}\n`;
    }

    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/33759735552?text=${encoded}`, '_blank');
    setSelectedServiceModal(null);
    setSelectedSubServices([]);
    setClientModalData({ name: '', city: '', phone: '', notes: '' });
  };

  const galleryItems = [
    { type: 'gardening', image: gardeningImg, title: t.services.gardening?.title || 'Jardinage', tag: '5.0 ★' },
    { type: 'painting', image: paintingImg, title: t.services.painting?.title || 'Peinture', tag: '4.9 ★' },
    { type: 'electricity', image: electricalImg, title: t.services.electricity?.title || 'Électricité', tag: '5.0 ★' },
    { type: 'cleaning', image: cleaningImg, title: t.services.cleaning?.title || 'Nettoyage', tag: '4.9 ★' }
  ];

  const filteredGallery = galleryFilter === 'all' 
    ? galleryItems 
    : galleryItems.filter(item => item.type === galleryFilter);

  const activeLangObj = languagesList.find(l => l.code === lang) || languagesList[0];

  const generalWhatsappUrl = `https://wa.me/33759735552?text=${encodeURIComponent(`Bonjour DMJ ${t.providerLabel} ! Je souhaite avoir des informations sur vos prestations.`)}`;

  return (
    <div className="min-h-screen font-sans bg-slate-950 text-slate-100 overflow-x-hidden selection:bg-emerald-500 selection:text-white">
      
      {/* Main Navbar */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-slate-900/95 border-b border-slate-800/90 shadow-2xl">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-2">
          
          <a href="#home" className="flex items-center gap-2.5 sm:gap-3.5 group shrink-0">
            <div className="relative w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl p-0.5 bg-gradient-to-tr from-emerald-500 via-amber-400 to-emerald-600 shadow-lg group-hover:scale-105 transition-all duration-300 flex items-center justify-center">
              <img 
                src="/logo.jpg" 
                alt="DMJ Services Logo" 
                className="w-full h-full object-cover rounded-[10px] sm:rounded-[14px]"
                referrerPolicy="no-referrer"
              />
            </div>
            <div>
              <span className="font-extrabold text-base sm:text-xl tracking-wider bg-gradient-to-r from-emerald-400 via-amber-300 to-emerald-200 bg-clip-text text-transparent block leading-tight">
                DMJ
              </span>
              <span className="text-[9px] sm:text-[10px] font-bold tracking-widest text-amber-400 uppercase block">
                {t.providerLabel}
              </span>
            </div>
          </a>

          {/* Nav Links */}
          <nav className="hidden lg:flex items-center space-x-7 text-sm font-medium text-slate-200">
            {['home', 'services', 'whyUs', 'gallery', 'reviews'].map((itemKey) => (
              <a 
                key={itemKey} 
                href={`#${itemKey.toLowerCase()}`} 
                className="relative py-1 hover:text-emerald-400 transition-colors tracking-wide text-slate-200 hover:text-white"
              >
                {t.nav[itemKey as keyof typeof t.nav]}
              </a>
            ))}
          </nav>

          {/* Language Selector Dropdown & Controls */}
          <div className="flex items-center gap-1.5 sm:gap-3">
            
            <div className="relative" ref={dropdownRef}>
              <button 
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                className="h-9 sm:h-10 flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1.5 text-xs font-semibold rounded-xl border border-slate-700 bg-slate-800 text-white shadow-sm hover:border-emerald-500 transition-all active:scale-95"
              >
                <Globe className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-400 shrink-0" />
                <span className="text-sm sm:text-base">{activeLangObj.flag}</span>
                <span className="font-medium hidden sm:inline text-slate-200">{activeLangObj.label}</span>
                <ChevronDown className={`w-3 h-3 sm:w-3.5 sm:h-3.5 opacity-70 transition-transform duration-200 ${langDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {langDropdownOpen && (
                  <motion.div 
                    initial={{ opacity: 0, y: 8, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.95 }}
                    className="absolute right-0 mt-2 w-52 sm:w-56 py-2 bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl z-50 overflow-hidden"
                  >
                    <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400 border-b border-slate-800 mb-1">
                      Idiomas / Langues
                    </div>
                    {languagesList.map((item) => (
                      <button 
                        key={item.code} 
                        onClick={() => {
                          setLang(item.code);
                          setLangDropdownOpen(false);
                        }} 
                        className={`w-full px-4 py-2 text-left text-xs font-semibold flex items-center justify-between transition-colors ${
                          lang === item.code 
                            ? 'bg-emerald-500/20 text-emerald-300 border-l-4 border-emerald-500' 
                            : 'text-slate-200 hover:bg-slate-800 hover:text-white'
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          <span className="text-base">{item.flag}</span>
                          <span>{item.label}</span>
                        </span>
                        {lang === item.code && <Check className="w-4 h-4 text-emerald-400" />}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Auth / Account / Admin Button */}
            {currentUser ? (
              <div className="flex items-center gap-1 sm:gap-1.5">
                {currentUser.role === 'admin' ? (
                  <button
                    onClick={() => setAdminModalOpen(true)}
                    className="h-9 sm:h-10 flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3.5 py-1.5 sm:py-2 text-[11px] sm:text-xs font-bold rounded-xl border border-amber-400 bg-amber-400 text-slate-950 shadow-md hover:bg-amber-300 transition-all active:scale-95"
                  >
                    <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
                    <span>Painel Admin</span>
                  </button>
                ) : (
                  <div className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-xs text-slate-200 h-10">
                    <UserIcon className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span className="font-semibold">{currentUser.name.split(' ')[0]}</span>
                  </div>
                )}

                <button
                  onClick={() => {
                    setCurrentUser(null);
                    setUser(null);
                  }}
                  className="h-9 w-9 sm:h-10 sm:w-10 flex items-center justify-center rounded-xl border border-slate-800 bg-slate-900 text-slate-400 hover:text-red-400 hover:border-red-500/30 transition-all"
                  title="Sair da Conta"
                >
                  <LogOut className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => setAuthModalOpen(true)}
                className="h-9 sm:h-10 flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3.5 py-1.5 sm:py-2 text-[11px] sm:text-xs font-semibold rounded-xl border border-emerald-500/40 bg-emerald-500/10 text-emerald-300 hover:bg-emerald-500/20 transition-all active:scale-95 shrink-0"
              >
                <UserIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-400 shrink-0" />
                <span>Entrar</span>
              </button>
            )}

            <a 
              href={generalWhatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="hidden md:inline-flex items-center gap-2 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 text-white text-xs font-semibold px-4 py-2 rounded-xl shadow-lg transition-all transform hover:-translate-y-0.5 h-10 shrink-0"
            >
              <MessageSquare className="w-4 h-4 text-white" />
              <span>{t.nav.contactBtn}</span>
            </a>

            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="lg:hidden h-9 w-9 sm:h-10 sm:w-10 flex items-center justify-center rounded-xl border border-slate-700 bg-slate-800 text-white shrink-0">
              {mobileMenuOpen ? <X className="w-4 h-4 sm:w-5 sm:h-5 text-white" /> : <Menu className="w-4 h-4 sm:w-5 sm:h-5 text-white" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden border-t border-slate-800 bg-slate-900 px-6 py-6 space-y-4 shadow-xl"
            >
              {['home', 'services', 'whyUs', 'gallery', 'reviews'].map((itemKey) => (
                <a 
                  key={itemKey} 
                  href={`#${itemKey.toLowerCase()}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-base font-extrabold text-slate-100 hover:text-emerald-400 transition-colors py-1"
                >
                  {t.nav[itemKey as keyof typeof t.nav]}
                </a>
              ))}

              <a 
                href={generalWhatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-black py-3.5 rounded-xl shadow-lg mt-4"
              >
                <MessageSquare className="w-5 h-5" />
                <span>{t.nav.contactBtn}</span>
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* HERO SECTION */}
      <section id="home" className="relative pt-8 sm:pt-12 pb-16 sm:pb-20 md:py-28 overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: "-50px" }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="lg:col-span-7 space-y-5 sm:space-y-7 text-center lg:text-left"
            >
              <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-[11px] sm:text-sm font-semibold shadow-sm">
                <Award className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-400 shrink-0" />
                <span>{t.guaranteeBadge}</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.15]">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 via-amber-300 to-white">
                  {t.subtitle}
                </span>
              </h1>

              <p className="text-sm sm:text-lg text-slate-200 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
                {t.heroDesc}
              </p>

              {/* Feature Highlights Pills */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 sm:gap-3 pt-1">
                <span className="px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-xl bg-slate-900 border border-slate-700 text-[11px] sm:text-xs font-semibold flex items-center gap-1 sm:gap-1.5 text-slate-200">
                  <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-400 shrink-0" /> {t.freeQuoteBadge}
                </span>
                <span className="px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-xl bg-slate-900 border border-slate-700 text-[11px] sm:text-xs font-semibold flex items-center gap-1 sm:gap-1.5 text-slate-200">
                  <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-400 shrink-0" /> {t.fastServiceBadge}
                </span>
                <span className="px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-xl bg-slate-900 border border-slate-700 text-[11px] sm:text-xs font-semibold flex items-center gap-1 sm:gap-1.5 text-slate-200">
                  <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-400 shrink-0" /> {t.qualityWorkBadge}
                </span>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4 pt-2 sm:pt-3">
                <a 
                  href="#services" 
                  className="w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 bg-gradient-to-r from-emerald-600 via-emerald-500 to-amber-500 hover:from-emerald-500 hover:to-amber-600 text-white font-semibold text-xs sm:text-sm rounded-2xl shadow-xl flex items-center justify-center gap-2.5 sm:gap-3 transform hover:-translate-y-1 transition-all"
                >
                  <Wrench className="w-4 h-4 sm:w-5 sm:h-5 text-amber-200 shrink-0" />
                  <span>{t.chooseServicesBtn}</span>
                  <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </a>

                <a 
                  href={generalWhatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 bg-slate-900 text-white font-semibold text-xs sm:text-sm rounded-2xl border border-slate-700 shadow-lg flex items-center justify-center gap-2 sm:gap-2.5 hover:bg-slate-800 transition-all"
                >
                  <MessageSquare className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400 shrink-0" />
                  <span>{t.ctaWhatsapp}</span>
                </a>
              </div>
            </motion.div>

            {/* Emblem Card */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: false, margin: "-50px" }}
              transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
              className="lg:col-span-5 flex justify-center"
            >
              <div className="relative w-full max-w-sm sm:max-w-md p-5 sm:p-8 bg-slate-900/90 rounded-3xl border border-slate-800 shadow-2xl backdrop-blur-2xl text-center space-y-4 sm:space-y-6">
                
                <div className="relative mx-auto w-48 h-48 sm:w-64 sm:h-64 rounded-full p-2 bg-gradient-to-tr from-emerald-600 via-amber-400 to-red-600 shadow-2xl flex items-center justify-center">
                  <div className="w-full h-full bg-slate-950 rounded-full flex flex-col items-center justify-center p-3 sm:p-4 text-white relative overflow-hidden">
                    <h2 className="text-3xl sm:text-5xl font-bold text-white tracking-tight">
                      <span className="text-emerald-400">D</span>
                      <span className="text-red-500">M</span>
                      <span className="text-amber-400">J</span>
                    </h2>
                    <div className="text-[10px] sm:text-[11px] font-semibold bg-emerald-700/90 text-amber-200 px-3 sm:px-3.5 py-0.5 sm:py-1 rounded-full uppercase mt-1.5 sm:mt-2 tracking-wider">
                      {t.providerLabel}
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-800 space-y-1 sm:space-y-2">
                  <a href="tel:+33759735552" className="flex items-center justify-center gap-2 font-bold text-lg sm:text-xl text-emerald-400 hover:underline">
                    <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400" />
                    {t.phone}
                  </a>
                  <p className="text-[11px] sm:text-xs text-slate-300 font-medium">{t.email}</p>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* CATEGORY & SUB-SERVICES SELECTION */}
      <section id="services" className="py-24 border-t border-slate-800 bg-slate-900/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <motion.div 
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-50px" }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-16 space-y-4"
          >
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-emerald-400">
              {t.servicesTitle}
            </h2>
            <p className="text-slate-300 text-base sm:text-lg font-normal">
              {t.servicesSub}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            
            {/* CATEGORY 1: GARDENING */}
            <motion.div 
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: "-50px" }}
              transition={{ duration: 0.5, delay: 0.1 }}
              whileHover={{ y: -6 }}
              className="group rounded-3xl bg-slate-900 overflow-hidden border border-slate-800 shadow-xl hover:shadow-2xl hover:border-emerald-500 transition-all duration-300 flex flex-col justify-between"
            >
              <div className="relative h-48 overflow-hidden">
                <img src={gardeningImg} alt="Jardinage" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                <div className="absolute top-4 left-4 w-11 h-11 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-lg">
                  <Wrench className="w-6 h-6" />
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="text-xl font-bold mb-2 text-white">{t.services.gardening?.title}</h3>
                  <p className="text-slate-300 text-xs sm:text-sm mb-4 leading-relaxed font-normal">
                    {t.services.gardening?.desc}
                  </p>
                  <div className="space-y-2">
                    {t.services.gardening?.items.slice(0, 3).map((item: string, idx: number) => (
                      <div key={idx} className="flex items-center gap-2 text-xs font-medium text-slate-200">
                        <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                    <div className="text-[11px] font-semibold text-emerald-400 pt-1">+ e outros serviços...</div>
                  </div>
                </div>

                <button 
                  onClick={() => {
                    setSelectedServiceModal('gardening');
                    setSelectedSubServices([]);
                  }}
                  className="w-full py-3.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold transition-all flex items-center justify-center gap-2 shadow-lg mt-4"
                >
                  <span>{t.moreInfo}</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>

            {/* CATEGORY 2: PAINTING */}
            <motion.div 
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: "-50px" }}
              transition={{ duration: 0.5, delay: 0.2 }}
              whileHover={{ y: -6 }}
              className="group rounded-3xl bg-slate-900 overflow-hidden border border-slate-800 shadow-xl hover:shadow-2xl hover:border-red-500 transition-all duration-300 flex flex-col justify-between"
            >
              <div className="relative h-48 overflow-hidden">
                <img src={paintingImg} alt="Peinture" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                <div className="absolute top-4 left-4 w-11 h-11 rounded-xl bg-red-600 text-white flex items-center justify-center shadow-lg">
                  <Paintbrush className="w-6 h-6" />
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="text-xl font-bold mb-2 text-white">{t.services.painting?.title}</h3>
                  <p className="text-slate-300 text-xs sm:text-sm mb-4 leading-relaxed font-normal">
                    {t.services.painting?.desc}
                  </p>
                  <div className="space-y-2">
                    {t.services.painting?.items.slice(0, 3).map((item: string, idx: number) => (
                      <div key={idx} className="flex items-center gap-2 text-xs font-medium text-slate-200">
                        <Check className="w-4 h-4 text-red-400 shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                    <div className="text-[11px] font-semibold text-red-400 pt-1">+ e outros serviços...</div>
                  </div>
                </div>

                <button 
                  onClick={() => {
                    setSelectedServiceModal('painting');
                    setSelectedSubServices([]);
                  }}
                  className="w-full py-3.5 px-4 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-semibold transition-all flex items-center justify-center gap-2 shadow-lg mt-4"
                >
                  <span>{t.moreInfo}</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>

            {/* CATEGORY 3: ELECTRICITY */}
            <motion.div 
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: "-50px" }}
              transition={{ duration: 0.5, delay: 0.3 }}
              whileHover={{ y: -6 }}
              className="group rounded-3xl bg-slate-900 overflow-hidden border border-slate-800 shadow-xl hover:shadow-2xl hover:border-amber-500 transition-all duration-300 flex flex-col justify-between"
            >
              <div className="relative h-48 overflow-hidden">
                <img src={electricalImg} alt="Électricité" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                <div className="absolute top-4 left-4 w-11 h-11 rounded-xl bg-amber-500 text-white flex items-center justify-center shadow-lg">
                  <Zap className="w-6 h-6" />
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="text-xl font-bold mb-2 text-white">{t.services.electricity?.title}</h3>
                  <p className="text-slate-300 text-xs sm:text-sm mb-4 leading-relaxed font-normal">
                    {t.services.electricity?.desc}
                  </p>
                  <div className="space-y-2">
                    {t.services.electricity?.items.slice(0, 3).map((item: string, idx: number) => (
                      <div key={idx} className="flex items-center gap-2 text-xs font-medium text-slate-200">
                        <Check className="w-4 h-4 text-amber-400 shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                    <div className="text-[11px] font-semibold text-amber-400 pt-1">+ e outros serviços...</div>
                  </div>
                </div>

                <button 
                  onClick={() => {
                    setSelectedServiceModal('electricity');
                    setSelectedSubServices([]);
                  }}
                  className="w-full py-3.5 px-4 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-semibold transition-all flex items-center justify-center gap-2 shadow-lg mt-4"
                >
                  <span>{t.moreInfo}</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>

            {/* CATEGORY 4: CLEANING */}
            <motion.div 
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: "-50px" }}
              transition={{ duration: 0.5, delay: 0.4 }}
              whileHover={{ y: -6 }}
              className="group rounded-3xl bg-slate-900 overflow-hidden border border-slate-800 shadow-xl hover:shadow-2xl hover:border-blue-500 transition-all duration-300 flex flex-col justify-between"
            >
              <div className="relative h-48 overflow-hidden">
                <img src={cleaningImg} alt="Nettoyage" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                <div className="absolute top-4 left-4 w-11 h-11 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-lg">
                  <Sparkle className="w-6 h-6" />
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="text-xl font-bold mb-2 text-white">{t.services.cleaning?.title}</h3>
                  <p className="text-slate-300 text-xs sm:text-sm mb-4 leading-relaxed font-normal">
                    {t.services.cleaning?.desc}
                  </p>
                  <div className="space-y-2">
                    {t.services.cleaning?.items.slice(0, 3).map((item: string, idx: number) => (
                      <div key={idx} className="flex items-center gap-2 text-xs font-medium text-slate-200">
                        <Check className="w-4 h-4 text-blue-400 shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                    <div className="text-[11px] font-semibold text-blue-400 pt-1">+ e outros serviços...</div>
                  </div>
                </div>

                <button 
                  onClick={() => {
                    setSelectedServiceModal('cleaning');
                    setSelectedSubServices([]);
                  }}
                  className="w-full py-3.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold transition-all flex items-center justify-center gap-2 shadow-lg mt-4"
                >
                  <span>{t.moreInfo}</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>

          </div>

          {/* Custom Services Added by Admin */}
          {allServices.filter(s => s.active && !['srv-1', 'srv-2', 'srv-3', 'srv-4'].includes(s.id)).length > 0 && (
            <div className="mt-16 border-t border-slate-800/80 pt-12 space-y-8">
              <div className="text-center space-y-2">
                <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-wider">
                  Outras Soluções Personalizadas
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white">Serviços Especiais Sob Medida</h3>
                <p className="text-slate-400 text-xs sm:text-sm max-w-xl mx-auto">
                  Cadastrados diretamente pelo nosso administrador para atender às suas necessidades específicas.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {allServices
                  .filter(s => s.active && !['srv-1', 'srv-2', 'srv-3', 'srv-4'].includes(s.id))
                  .map((srv) => (
                    <motion.div
                      key={srv.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: false }}
                      className="p-6 rounded-3xl bg-slate-900 border border-slate-800 hover:border-emerald-500/50 transition-all flex flex-col justify-between space-y-4 shadow-xl group"
                    >
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 flex items-center justify-center">
                            <Sparkles className="w-5 h-5" />
                          </div>
                          {srv.priceEstimate && (
                            <span className="px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-bold">
                              {srv.priceEstimate}
                            </span>
                          )}
                        </div>

                        <div>
                          <h4 className="text-lg font-bold text-white group-hover:text-emerald-300 transition-colors">
                            {srv.defaultTitle}
                          </h4>
                          <p className="text-xs text-slate-300 mt-1.5 leading-relaxed">
                            {srv.defaultDesc}
                          </p>
                        </div>
                      </div>

                      <a
                        href={`https://wa.me/33759735552?text=${encodeURIComponent(`Bonjour DMJ Services ! Je suis intéressé(e) par votre prestation : ${srv.defaultTitle}`)}`}
                        target="_blank"
                        rel="noreferrer"
                        className="w-full py-3 px-4 rounded-xl bg-slate-800 hover:bg-emerald-600 text-slate-200 hover:text-white text-xs font-bold transition-all flex items-center justify-center gap-2 border border-slate-700 hover:border-emerald-500 shadow-md"
                      >
                        <MessageSquare className="w-4 h-4 text-emerald-400 group-hover:text-white" />
                        <span>Solicitar Este Serviço</span>
                      </a>
                    </motion.div>
                  ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* MODAL INTERATIVO DE SELEÇÃO DOS SUB-SERVIÇOS */}
      <AnimatePresence>
        {selectedServiceCategory && (
          <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-slate-900 rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-800 relative space-y-6 my-8 max-h-[90vh] overflow-y-auto text-slate-100"
            >
              <button 
                onClick={() => setSelectedServiceModal(null)}
                className="absolute top-5 right-5 p-2.5 text-slate-400 hover:text-white rounded-full bg-slate-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div>
                <div className="text-xs font-semibold uppercase text-emerald-400 tracking-wider">
                  {t.selectionModalTitle}
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-white mt-1">
                  {t.services[selectedServiceCategory]?.title}
                </h3>
              </div>

              {/* SELEÇÃO DOS SUB-SERVIÇOS REQUERIDOS */}
              <div className="space-y-3">
                <label className="block text-xs font-semibold uppercase text-amber-300 tracking-wider">
                  {t.selectServicesLabel}
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {t.services[selectedServiceCategory]?.items.map((subItem: string, idx: number) => {
                    const isChecked = selectedSubServices.includes(subItem);
                    return (
                      <div 
                        key={idx}
                        onClick={() => toggleSubService(subItem)}
                        className={`p-3.5 rounded-2xl border cursor-pointer flex items-center gap-3 transition-all select-none ${
                          isChecked 
                            ? 'bg-emerald-950/80 border-emerald-400 text-emerald-200 font-semibold shadow-md' 
                            : 'bg-slate-800/60 border-slate-700 hover:border-slate-500 text-slate-200 font-medium'
                        }`}
                      >
                        {isChecked ? (
                          <CheckSquare className="w-5 h-5 text-emerald-400 shrink-0" />
                        ) : (
                          <Square className="w-5 h-5 text-slate-400 shrink-0" />
                        )}
                        <span className="text-xs leading-tight">{subItem}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* TIPO DE ATENDIMENTO */}
              <div className="space-y-2 pt-2 border-t border-slate-800">
                <label className="block text-xs font-semibold uppercase text-slate-400 tracking-wider">
                  {t.requestTypeLabel}
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setRequestType('quote')}
                    className={`p-3 rounded-xl border text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
                      requestType === 'quote' 
                        ? 'bg-emerald-600 text-white border-emerald-500 shadow-md' 
                        : 'bg-slate-800 text-slate-300 border-slate-700'
                    }`}
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>{t.reqTypeQuote}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setRequestType('visit')}
                    className={`p-3 rounded-xl border text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
                      requestType === 'visit' 
                        ? 'bg-emerald-600 text-white border-emerald-500 shadow-md' 
                        : 'bg-slate-800 text-slate-300 border-slate-700'
                    }`}
                  >
                    <Calendar className="w-4 h-4" />
                    <span>{t.reqTypeVisit}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setRequestType('urgent')}
                    className={`p-3 rounded-xl border text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
                      requestType === 'urgent' 
                        ? 'bg-red-600 text-white border-red-500 shadow-md' 
                        : 'bg-slate-800 text-slate-300 border-slate-700'
                    }`}
                  >
                    <Clock className="w-4 h-4" />
                    <span>{t.reqTypeUrgent}</span>
                  </button>
                </div>
              </div>

              {/* DADOS DE CONTATO DO CLIENTE */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                <input 
                  type="text"
                  placeholder={t.clientNamePlaceholder}
                  value={clientModalData.name}
                  onChange={(e) => setClientModalData({ ...clientModalData, name: e.target.value })}
                  className="p-3.5 rounded-xl border border-slate-700 bg-slate-950 text-white placeholder-slate-400 text-xs font-medium outline-none focus:ring-2 focus:ring-emerald-500"
                />
                <input 
                  type="text"
                  placeholder={t.clientCityPlaceholder}
                  value={clientModalData.city}
                  onChange={(e) => setClientModalData({ ...clientModalData, city: e.target.value })}
                  className="p-3.5 rounded-xl border border-slate-700 bg-slate-950 text-white placeholder-slate-400 text-xs font-medium outline-none focus:ring-2 focus:ring-emerald-500"
                />
                <input 
                  type="tel"
                  placeholder={t.clientPhonePlaceholder}
                  value={clientModalData.phone}
                  onChange={(e) => setClientModalData({ ...clientModalData, phone: e.target.value })}
                  className="p-3.5 rounded-xl border border-slate-700 bg-slate-950 text-white placeholder-slate-400 text-xs font-medium outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <textarea 
                rows={2}
                placeholder={t.notesPlaceholder}
                value={clientModalData.notes}
                onChange={(e) => setClientModalData({ ...clientModalData, notes: e.target.value })}
                className="w-full p-3.5 rounded-xl border border-slate-700 bg-slate-950 text-white placeholder-slate-400 text-xs font-medium outline-none focus:ring-2 focus:ring-emerald-500"
              />

              {/* BOTAO FINAL DE ENVIO AO WHATSAPP */}
              <button 
                onClick={sendCategorySelectionToWhatsapp}
                className="w-full py-4 bg-gradient-to-r from-emerald-600 via-emerald-500 to-amber-500 hover:from-emerald-500 hover:to-amber-600 text-white font-semibold text-sm rounded-2xl shadow-xl flex items-center justify-center gap-3 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <MessageSquare className="w-5 h-5 text-amber-200" />
                <span>{t.btnSendToWhatsapp}</span>
              </button>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* WHY CHOOSE DMJ */}
      <section id="whyus" className="py-24 border-t border-slate-800 bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, margin: "-50px" }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-6 space-y-6"
            >
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-semibold border border-emerald-500/30">
                <ShieldCheck className="w-4 h-4" />
                <span>{t.commitmentTitle}</span>
              </div>

              <h2 className="text-3xl sm:text-5xl font-bold tracking-tight leading-tight text-white">
                {t.aboutTitle}
              </h2>

              <p className="text-slate-200 text-base leading-relaxed font-normal">
                {t.aboutDesc}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {t.benefits.map((benefit: string, idx: number) => (
                  <div key={idx} className="flex items-center gap-3 p-3.5 rounded-2xl bg-slate-900 border border-slate-800 shadow-sm text-slate-100">
                    <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />
                    <span className="text-xs font-medium text-slate-200">{benefit}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* DMJ Quality & Service Pillars Showcase (Replaces old big numbers) */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, margin: "-50px" }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="lg:col-span-6"
            >
              <div className="p-5 sm:p-7 rounded-3xl bg-slate-900/90 border border-slate-800/90 shadow-2xl backdrop-blur-xl space-y-5">
                
                {/* Header Badge */}
                <div className="flex items-center justify-between border-b border-slate-800/80 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
                      <ShieldCheck className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-xs sm:text-sm font-bold text-white tracking-wide uppercase">
                        {lang.startsWith('pt') ? 'Pilares do Serviço DMJ' : lang === 'fr' ? 'Piliers de Service DMJ' : 'DMJ Service Pillars'}
                      </h3>
                      <p className="text-[11px] text-slate-400">
                        {lang.startsWith('pt') ? 'Compromisso profissional e integridade em cada obra' : lang === 'fr' ? 'Engagement professionnel et intégrité sur chaque chantier' : 'Professional commitment & integrity in every project'}
                      </p>
                    </div>
                  </div>
                  <span className="hidden sm:inline-flex px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-[10px] font-bold tracking-wider">
                    ✓ DMJ VERIFIED
                  </span>
                </div>

                {/* 4 Pillars Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  
                  {/* Pillar 1 */}
                  <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800/80 hover:border-emerald-500/40 transition-all space-y-2 group">
                    <div className="flex items-center justify-between">
                      <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center">
                        <Award className="w-4 h-4" />
                      </div>
                      <span className="text-[9px] font-bold px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-300 group-hover:text-emerald-300 transition-colors">
                        {lang.startsWith('pt') ? 'Padrão Alto' : lang === 'fr' ? 'Haute Qualité' : 'High Standard'}
                      </span>
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-white group-hover:text-emerald-300 transition-colors">
                        {lang.startsWith('pt') ? 'Garantia de Qualidade' : lang === 'fr' ? 'Garantie de Qualité' : 'Quality Assurance'}
                      </h4>
                      <p className="text-[11px] text-slate-400 leading-relaxed mt-1">
                        {lang.startsWith('pt') 
                          ? 'Execução criteriosa com acabamento profissional e verificação em cada etapa.' 
                          : lang === 'fr' 
                          ? 'Exécution rigoureuse avec finitions soignées et contrôle qualité à chaque étape.' 
                          : 'Meticulous execution with professional finishing and quality checks.'}
                      </p>
                    </div>
                  </div>

                  {/* Pillar 2 */}
                  <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800/80 hover:border-emerald-500/40 transition-all space-y-2 group">
                    <div className="flex items-center justify-between">
                      <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center">
                        <Clock className="w-4 h-4" />
                      </div>
                      <span className="text-[9px] font-bold px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-300 group-hover:text-amber-300 transition-colors">
                        7j / 7
                      </span>
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-white group-hover:text-amber-300 transition-colors">
                        {lang.startsWith('pt') ? 'Atendimento Ágil' : lang === 'fr' ? 'Service Réactif' : 'Prompt Response'}
                      </h4>
                      <p className="text-[11px] text-slate-400 leading-relaxed mt-1">
                        {lang.startsWith('pt') 
                          ? 'Flexibilidade total de horários para agendamento residencial e comercial.' 
                          : lang === 'fr' 
                          ? 'Planning flexible pour résidences et locaux professionnels 7j/7.' 
                          : 'Full schedule flexibility for residential and commercial services.'}
                      </p>
                    </div>
                  </div>

                  {/* Pillar 3 */}
                  <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800/80 hover:border-emerald-500/40 transition-all space-y-2 group">
                    <div className="flex items-center justify-between">
                      <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center">
                        <CheckCircle2 className="w-4 h-4" />
                      </div>
                      <span className="text-[9px] font-bold px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-300 group-hover:text-blue-300 transition-colors">
                        {lang.startsWith('pt') ? 'Sem Custos' : lang === 'fr' ? 'Sans Engagement' : 'No Obligations'}
                      </span>
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-white group-hover:text-blue-300 transition-colors">
                        {lang.startsWith('pt') ? 'Orçamento Transparente' : lang === 'fr' ? 'Devis Transparent' : 'Clear Estimates'}
                      </h4>
                      <p className="text-[11px] text-slate-400 leading-relaxed mt-1">
                        {lang.startsWith('pt') 
                          ? 'Estimativa clara enviada via WhatsApp sem taxas ou custos ocultos.' 
                          : lang === 'fr' 
                          ? 'Estimation claire envoyée par WhatsApp sans aucuns frais cachés.' 
                          : 'Clear, itemized estimate sent directly via WhatsApp with zero hidden fees.'}
                      </p>
                    </div>
                  </div>

                  {/* Pillar 4 */}
                  <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800/80 hover:border-emerald-500/40 transition-all space-y-2 group">
                    <div className="flex items-center justify-between">
                      <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center">
                        <Sparkles className="w-4 h-4" />
                      </div>
                      <span className="text-[9px] font-bold px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-300 group-hover:text-emerald-300 transition-colors">
                        {lang.startsWith('pt') ? 'Pós-Obra' : lang === 'fr' ? 'Fin de Chantier' : 'Post-Work'}
                      </span>
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-white group-hover:text-emerald-300 transition-colors">
                        {lang.startsWith('pt') ? 'Limpeza Final Incluída' : lang === 'fr' ? 'Espace Impeccable' : 'Clean Finish'}
                      </h4>
                      <p className="text-[11px] text-slate-400 leading-relaxed mt-1">
                        {lang.startsWith('pt') 
                          ? 'Entrega do ambiente higienizado e arrumado ao término de cada intervenção.' 
                          : lang === 'fr' 
                          ? 'Restitution des lieux rangés et propres à la fin de nos travaux.' 
                          : 'Thorough cleaning and complete organization upon finishing every job.'}
                      </p>
                    </div>
                  </div>

                </div>

                {/* Footer Bar */}
                <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
                  <div className="flex items-center gap-1.5 text-emerald-400 font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>{lang.startsWith('pt') ? 'Atendimento Rápido e Personalizado' : lang === 'fr' ? 'Service Rapide et Personnalisé' : 'Fast and Personalized Service'}</span>
                  </div>
                  <span className="text-slate-500 text-[10px] font-semibold">DMJ PRESTATAIRE</span>
                </div>

              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* WORK GALLERY */}
      <section id="gallery" className="py-24 border-t border-slate-800 bg-slate-900/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <motion.div 
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-50px" }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-12 space-y-3"
          >
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white">{t.galleryTitle}</h2>
            <p className="text-slate-300 text-sm font-normal">{t.gallerySub}</p>

            {/* Gallery Filters */}
            <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
              <button 
                onClick={() => setGalleryFilter('all')}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                  galleryFilter === 'all' 
                    ? 'bg-emerald-600 text-white shadow-md' 
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                {t.galleryFilterAll}
              </button>
              <button 
                onClick={() => setGalleryFilter('gardening')}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                  galleryFilter === 'gardening' 
                    ? 'bg-emerald-600 text-white shadow-md' 
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                {t.services.gardening?.title}
              </button>
              <button 
                onClick={() => setGalleryFilter('painting')}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                  galleryFilter === 'painting' 
                    ? 'bg-red-600 text-white shadow-md' 
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                {t.services.painting?.title}
              </button>
              <button 
                onClick={() => setGalleryFilter('electricity')}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                  galleryFilter === 'electricity' 
                    ? 'bg-amber-600 text-white shadow-md' 
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                {t.services.electricity?.title}
              </button>
              <button 
                onClick={() => setGalleryFilter('cleaning')}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                  galleryFilter === 'cleaning' 
                    ? 'bg-blue-600 text-white shadow-md' 
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                {t.services.cleaning?.title}
              </button>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredGallery.map((item, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, margin: "-40px" }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                whileHover={{ scale: 1.02 }}
                onClick={() => setActiveImageLightbox(item.image)}
                className="group relative rounded-3xl overflow-hidden shadow-xl aspect-square bg-slate-900 cursor-pointer border border-slate-800"
              >
                <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-80 z-10" />
                <div className="absolute top-4 right-4 z-20 px-3 py-1 bg-black/70 backdrop-blur-md rounded-full text-[10px] font-semibold text-amber-300 border border-amber-500/30">
                  {item.tag}
                </div>
                <div className="absolute bottom-5 left-5 right-5 z-20 text-white flex justify-between items-end">
                  <div>
                    <div className="font-semibold text-sm text-white">{item.title}</div>
                    <div className="text-[11px] text-slate-300 font-normal flex items-center gap-1 mt-0.5">
                      <Maximize2 className="w-3 h-3 text-emerald-400" /> {t.galleryClickEnlarge}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {activeImageLightbox && (
          <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-lg flex items-center justify-center p-4">
            <div className="relative max-w-4xl w-full">
              <button 
                onClick={() => setActiveImageLightbox(null)}
                className="absolute -top-12 right-0 p-3 bg-white/20 hover:bg-white/40 text-white rounded-full transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
              <img src={activeImageLightbox} alt="DMJ Work" className="w-full h-auto max-h-[85vh] object-contain rounded-3xl border border-slate-700 shadow-2xl" />
            </div>
          </div>
        )}
      </AnimatePresence>

      {/* REVIEWS & TESTIMONIALS (DYNAMIC 3s AUTO ROTATION + INFINITE NON-REPEATING FEEDBACKS) */}
      <SmartReviewsCarousel 
        key={reviewsRefreshKey}
        lang={lang} 
        reviewsTitle={t.reviewsTitle} 
        reviewsSub={t.reviewsSub} 
        generalWhatsappUrl={generalWhatsappUrl} 
        currentUser={currentUser}
        onOpenSubmitReview={() => setSubmitReviewModalOpen(true)}
        onOpenAuth={() => setAuthModalOpen(true)}
      />

      {/* FOOTER */}
      <footer className="bg-slate-950 border-t border-slate-800 py-16 text-slate-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start">
            
            <div className="md:col-span-5 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl p-0.5 bg-gradient-to-tr from-emerald-500 via-amber-400 to-emerald-600 shadow-md flex items-center justify-center">
                  <img 
                    src="/logo.jpg" 
                    alt="DMJ Services Logo" 
                    className="w-full h-full object-cover rounded-[12px]"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <span className="font-extrabold text-lg bg-gradient-to-r from-emerald-400 via-amber-300 to-emerald-200 bg-clip-text text-transparent tracking-wider">
                  DMJ {t.providerLabel.toUpperCase()}
                </span>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed max-w-sm font-normal">
                {t.footerDesc}
              </p>

              <div className="text-[11px] font-serif italic text-amber-300">
                {t.tagline}
              </div>
            </div>

            <div className="md:col-span-3 space-y-3">
              <div className="text-xs font-semibold uppercase text-amber-300 tracking-wider">
                Navegação
              </div>
              <ul className="space-y-2 text-xs font-medium text-slate-200">
                {['home', 'services', 'whyUs', 'gallery', 'reviews'].map((itemKey) => (
                  <li key={itemKey}>
                    <a href={`#${itemKey.toLowerCase()}`} className="hover:text-emerald-400 transition-colors">
                      {t.nav[itemKey as keyof typeof t.nav]}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="md:col-span-4 space-y-3">
              <div className="text-xs font-semibold uppercase text-amber-300 tracking-wider">
                Contato Direto
              </div>
              <div className="space-y-2 text-xs font-medium text-slate-200">
                <a href="tel:+33759735552" className="flex items-center gap-2 hover:text-emerald-400 transition-colors">
                  <Phone className="w-4 h-4 text-emerald-400" />
                  <span>{t.phone}</span>
                </a>
                <a href="mailto:batistadiego098@gmail.com" className="flex items-center gap-2 hover:text-emerald-400 transition-colors">
                  <Mail className="w-4 h-4 text-amber-400" />
                  <span>{t.email}</span>
                </a>
                <a href={generalWhatsappUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 mt-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs shadow-md transition-all">
                  <MessageSquare className="w-4 h-4" />
                  <span>{t.ctaWhatsapp}</span>
                </a>
              </div>
            </div>

          </div>

          <div className="mt-12 pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-400 font-normal gap-4">
            <div>
              &copy; {new Date().getFullYear()} DMJ {t.providerLabel}. {t.footerRights}
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-emerald-400" />
              <span>Île-de-France & Região</span>
            </div>
          </div>
        </div>
      </footer>

      {/* FLOATING BACK TO TOP BUTTON (LEFT SIDE) */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.25 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            aria-label="Voltar ao início"
            title="Voltar ao início"
            className="fixed bottom-4 left-4 sm:bottom-6 sm:left-6 z-40 p-2.5 sm:p-3.5 rounded-2xl bg-slate-900/90 hover:bg-slate-800 text-amber-400 border border-slate-700/80 shadow-2xl backdrop-blur-md flex items-center justify-center transition-all hover:border-emerald-500/50 hover:text-emerald-400 hover:scale-105 active:scale-95 group"
          >
            <ArrowUp className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400 group-hover:text-emerald-400 group-hover:-translate-y-0.5 transition-all" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* FLOATING WHATSAPP BUTTON */}
      <a 
        href={generalWhatsappUrl}
        target="_blank"
        rel="noreferrer"
        title="WhatsApp DMJ"
        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 p-3 sm:p-4 rounded-full bg-emerald-500 hover:bg-emerald-400 text-white shadow-2xl transition-all transform hover:scale-110 flex items-center justify-center ring-4 ring-emerald-500/30 active:scale-95"
      >
        <MessageSquare className="w-5 h-5 sm:w-7 sm:h-7 text-white fill-current" />
      </a>

      {/* AUTHENTICATION MODAL (CLIENT & ADMIN) */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        onSuccess={(u) => {
          setUser(u);
          if (u.role === 'admin') {
            setAdminModalOpen(true);
          }
        }}
        lang={lang}
      />

      {/* SUBMIT FEEDBACK MODAL (CLIENT MODERATION QUEUE) */}
      <SubmitReviewModal
        isOpen={submitReviewModalOpen}
        onClose={() => setSubmitReviewModalOpen(false)}
        currentUser={currentUser}
        onRequestAuth={() => {
          setSubmitReviewModalOpen(false);
          setAuthModalOpen(true);
        }}
        onReviewSubmitted={() => {
          setReviewsRefreshKey(prev => prev + 1);
        }}
      />

      {/* ADMIN DASHBOARD MODAL */}
      <AdminDashboardModal
        isOpen={adminModalOpen}
        onClose={() => setAdminModalOpen(false)}
        onServicesUpdated={() => {
          setReviewsRefreshKey(prev => prev + 1);
        }}
      />

    </div>
  );
}
