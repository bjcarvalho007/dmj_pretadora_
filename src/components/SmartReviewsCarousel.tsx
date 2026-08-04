import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Star, 
  ShieldCheck, 
  ChevronLeft, 
  ChevronRight, 
  Pause, 
  Play, 
  Sparkles,
  MessageCircle,
  CheckCircle2,
  Clock,
  MessageSquarePlus,
  UserCheck,
  LogIn
} from 'lucide-react';
import { User } from '../types';

interface ReviewItem {
  id: string;
  text: string;
  author: string;
  location: string;
  stars: number;
  serviceTag: string;
  timeAgo: string;
}

interface SmartReviewsCarouselProps {
  lang: string;
  reviewsTitle: string;
  reviewsSub: string;
  generalWhatsappUrl: string;
  currentUser: User | null;
  onOpenSubmitReview: () => void;
  onOpenAuth: () => void;
}

// UI strings translated for all supported languages
const CAROUSEL_UI_TEXT: Record<string, {
  liveBadge: string;
  pauseBtn: string;
  playBtn: string;
  ctaWhatsapp: string;
  prev: string;
  next: string;
}> = {
  fr: {
    liveBadge: "Avis en Temps Réel • Rotation toutes les 3s",
    pauseBtn: "Pause Auto (3s)",
    playBtn: "Lancer Auto (3s)",
    ctaWhatsapp: "Déjà client ? Laissez votre avis via WhatsApp",
    prev: "Précédent",
    next: "Suivant",
  },
  pt: {
    liveBadge: "Avaliações em Tempo Real • Rotação a cada 3s",
    pauseBtn: "Pausar Auto (3s)",
    playBtn: "Iniciar Auto (3s)",
    ctaWhatsapp: "Já é nosso cliente? Deixe seu depoimento pelo WhatsApp",
    prev: "Anterior",
    next: "Próximo",
  },
  pt_PT: {
    liveBadge: "Avaliações em Tempo Real • Rotação a cada 3s",
    pauseBtn: "Pausar Auto (3s)",
    playBtn: "Iniciar Auto (3s)",
    ctaWhatsapp: "Já é nosso cliente? Deixe o seu testemunho pelo WhatsApp",
    prev: "Anterior",
    next: "Seguinte",
  },
  en: {
    liveBadge: "Real-Time Reviews • Auto-rotates every 3s",
    pauseBtn: "Pause Auto (3s)",
    playBtn: "Play Auto (3s)",
    ctaWhatsapp: "Already a customer? Leave your feedback on WhatsApp",
    prev: "Previous",
    next: "Next",
  },
  es: {
    liveBadge: "Opiniones en Tiempo Real • Rotación cada 3s",
    pauseBtn: "Pausar Auto (3s)",
    playBtn: "Iniciar Auto (3s)",
    ctaWhatsapp: "¿Ya eres cliente? Deja tu testimonio por WhatsApp",
    prev: "Anterior",
    next: "Siguiente",
  },
};

// Multi-language pool generator for infinite realistic reviews
const REVIEW_TEMPLATES: Record<string, {
  authors: { name: string; city: string }[];
  timeAgos: string[];
  services: Record<string, string[]>;
}> = {
  fr: {
    authors: [
      { name: "Jean-Marc P.", city: "Paris (75016)" },
      { name: "Sophie & Bernard L.", city: "Boulogne-Billancourt" },
      { name: "Carlos & Elena M.", city: "Versailles" },
      { name: "Sébastien D.", city: "Saint-Cloud" },
      { name: "Élodie R.", city: "Neuilly-sur-Seine" },
      { name: "Guillaume T.", city: "Rueil-Malmaison" },
      { name: "Valérie K.", city: "Levallois-Perret" },
      { name: "Antoine B.", city: "Courbevoie" },
      { name: "Nathalie V.", city: "Créteil" },
      { name: "Mathieu G.", city: "Montreuil" },
      { name: "Isabelle F.", city: "Issy-les-Moulineaux" },
      { name: "François-Xavier C.", city: "Sèvres" },
      { name: "Marie-Laure H.", city: "Antony" },
      { name: "David L.", city: "Vincennes" }
    ],
    timeAgos: ["Il y a 2 heures", "Hier", "Il y a 2 jours", "Il y a 3 jours", "Il y a 5 jours", "Cette semaine"],
    services: {
      "Peinture": [
        "Un travail de peinture d'une propreté exemplaire pour notre salon. Délais respectés à la minute et finitions d'artisan !",
        "Renovation complète de la façade de notre villa. Équipe courtoise, ponctuelle et tarif très honnête. Bravo DMJ !",
        "Peinture intérieure impeccable sans aucune trace. Les protections posées au sol étaient parfaites, chantier laissé très propre."
      ],
      "Électricité": [
        "Intervention d'urgence en électricité très rapide dimanche matin. Diagnostic clair et panne résolue en moins d'une heure !",
        "Mise aux normes du tableau électrique réalisée de main de maître. Conseils précieux et explications claires.",
        "Pose de plusieurs luminaires et spots LED encastrés. Travail minutieux et soigné. Je recommande DMJ les yeux fermés !"
      ],
      "Jardinage": [
        "Taille de nos haies et tonte du grand jardin impeccables. Évacuation complète des végétaux, nous sommes ravis !",
        "Élagage d'un grand arbre délicat près de la toiture exécuté en toute sécurité. Professionnalisme impressionnant.",
        "Entretien complet des espaces verts avant la vente de notre bien. Le jardin a retrouvé tout son éclat en une journée."
      ],
      "Nettoyage Vitres": [
        "Lavage de toutes les baies vitrées et verrière de notre maison. Mes vitres n'ont jamais été aussi translucides et nettes !",
        "Nettoyage des vitres en hauteur sans laisser de traces. Service efficace, rapide et courtois !",
        "Prestation de nettoyage de vitres au top. Ponctuels, discrets et résultat irréprochable."
      ]
    }
  },
  pt: {
    authors: [
      { name: "João Marcelo P.", city: "Paris (75016)" },
      { name: "Soraia & Bernardo L.", city: "Boulogne-Billancourt" },
      { name: "Carlos & Elena M.", city: "Versailles" },
      { name: "Sebastião D.", city: "Saint-Cloud" },
      { name: "Eliane R.", city: "Neuilly-sur-Seine" },
      { name: "Guilherme T.", city: "Rueil-Malmaison" },
      { name: "Valéria K.", city: "Levallois-Perret" },
      { name: "Antônio B.", city: "Courbevoie" },
      { name: "Natália V.", city: "Créteil" },
      { name: "Matheus G.", city: "Montreuil" },
      { name: "Isabela F.", city: "Issy-les-Moulineaux" },
      { name: "Fernando C.", city: "Sèvres" }
    ],
    timeAgos: ["Há 2 horas", "Ontem", "Há 2 dias", "Há 3 dias", "Esta semana"],
    services: {
      "Pintura": [
        "Serviço de pintura extremamente caprichado para nossa casa. Prazos cumpridos e acabamento de alto padrão!",
        "Restauração completa da fachada da nossa casa. Equipe muito educada, pontual e valor justo. Parabéns DMJ!",
        "Pintura interna sem nenhuma mancha no chão ou móveis. A proteção colocada foi perfeita e deixaram tudo limpo."
      ],
      "Eletricidade": [
        "Atendimento emergencial de eletricidade no domingo de manhã. Diagnóstico rápido e problema resolvido em menos de 1 hora!",
        "Reforma do quadro elétrico executada com maestria. Explicações transparentes e trabalho seguro.",
        "Instalação de refletores e spots LED na sala. Trabalho muito minucioso e caprichado. Recomendo de olhos fechados!"
      ],
      "Jardinagem": [
        "Poda das sebes e corte de grama perfeitos. Recolheram todos os galhos e sujeiras no final. Nota 10!",
        "Corte de galhos altos perto do telhado feito com total segurança. Profissionalismo impressionante da DMJ.",
        "Manutenção completa do jardim antes de entregarmos o imóvel. O ambiente ficou lindo e renovado."
      ],
      "Limpeza de Vidros": [
        "Limpeza de todas as janelas e portas de vidro da casa. Os vidros ficaram cristalinos e transparentes!",
        "Limpeza de vidros altos sem deixar nenhuma marca de água. Atendimento rápido, eficiente e educado.",
        "Excelente serviço de limpeza de vidraças. Pontuais, discretos e resultado impecável!"
      ]
    }
  },
  pt_PT: {
    authors: [
      { name: "João Marcelo P.", city: "Paris (75016)" },
      { name: "Soraia & Bernardo L.", city: "Boulogne-Billancourt" },
      { name: "Carlos & Elena M.", city: "Versailles" },
      { name: "Sebastião D.", city: "Saint-Cloud" },
      { name: "Helena R.", city: "Neuilly-sur-Seine" },
      { name: "Guilherme T.", city: "Rueil-Malmaison" }
    ],
    timeAgos: ["Há 2 horas", "Ontem", "Há 2 dias", "Esta semana"],
    services: {
      "Pintura": [
        "Trabalho de pintura extremamente rigoroso. Prazos cumpridos rigorosamente e acabamento perfeito!",
        "Pintura de fachadas e paredes interiores impecável. A equipa da DMJ é muito atenciosa e limpa."
      ],
      "Eletricidade": [
        "Avaria elétrica resolvida num instante ao domingo. Técnico muito pontual, simpático e competente.",
        "Remodelação completa do quadro elétrico. Trabalho seguro e com acabamento exemplar."
      ],
      "Jardinagem": [
        "Corte de sebes e relvado fantásticos. Recolha completa de resíduos no final da intervenção.",
        "Manutenção de jardim efetuada com todo o cuidado técnico. O espaço ficou verdadeiramente renovado."
      ],
      "Limpeza de Vidros": [
        "Lavagem de janelas e marquises sublime. Os vidros nunca estiveram tão limpos e transparentes!"
      ]
    }
  },
  en: {
    authors: [
      { name: "John & Margaret P.", city: "Paris 16th" },
      { name: "Sophie & Bernard L.", city: "Boulogne-Billancourt" },
      { name: "Charles M.", city: "Versailles" },
      { name: "Sebastian D.", city: "Saint-Cloud" },
      { name: "Emily R.", city: "Neuilly-sur-Seine" },
      { name: "William T.", city: "Rueil-Malmaison" }
    ],
    timeAgos: ["2 hours ago", "Yesterday", "2 days ago", "This week"],
    services: {
      "Painting": [
        "Extremely clean painting job for our house. Deadlines respected and flawless finish!",
        "Full exterior facade repaint. Courteous team, punctual, and very fair rates. Bravo DMJ!"
      ],
      "Electricity": [
        "Fast Sunday morning emergency electrical repair. Clear diagnosis and fixed in under an hour!",
        "Electrical panel upgrade completed masterfully. Great safety advice and clean installation."
      ],
      "Gardening": [
        "Hedge trimming and lawn mowing were spotless. Full green waste removal included!",
        "Tree pruning near our roof executed safely and efficiently. Impressive professionalism."
      ],
      "Window Cleaning": [
        "Washing of all large glass bays and skylights. Windows have never been so crystal clear!"
      ]
    }
  },
  es: {
    authors: [
      { name: "Juan Carlos P.", city: "París (75016)" },
      { name: "Sofía & Bernardo L.", city: "Boulogne-Billancourt" },
      { name: "Carlos & Elena M.", city: "Versalles" },
      { name: "Sebastián D.", city: "Saint-Cloud" }
    ],
    timeAgos: ["Hace 2 horas", "Ayer", "Hace 2 días", "Esta semana"],
    services: {
      "Pintura": [
        "Trabajo de pintura muy meticuloso en nuestra casa. ¡Plazos respetados y acabados perfectos!",
        "Pintura de fachada excelente. Equipo puntual, respetuoso y muy limpio. ¡Bravo DMJ!"
      ],
      "Electricidad": [
        "Servicio de urgencia eléctrica muy rápido. Técnico puntual y amable. ¡Recomendado 100%!",
        "Instalación de luces LED y actualización de cuadro eléctrico impecable."
      ],
      "Jardinería": [
        "Corte de setos y mantenimiento del jardín impecables. ¡Dejaron todo recogido y limpio!",
        "Poda de árboles altos realizada con total seguridad. Excelente servicio."
      ],
      "Limpieza de Cristales": [
        "Limpieza de ventanales y terrazas acristaladas. ¡Los cristales quedaron relucientes y sin marcas!"
      ]
    }
  }
};

export const SmartReviewsCarousel: React.FC<SmartReviewsCarouselProps> = ({
  lang,
  reviewsTitle,
  reviewsSub,
  generalWhatsappUrl,
  currentUser,
  onOpenSubmitReview,
  onOpenAuth
}) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [reviewsPool, setReviewsPool] = useState<ReviewItem[]>([]);
  const seenIndexSet = useRef<Set<string>>(new Set());

  // Current active UI text dictionary
  const uiText = CAROUSEL_UI_TEXT[lang] || CAROUSEL_UI_TEXT['fr'] || CAROUSEL_UI_TEXT['pt'];

  // Function to generate a new unique review item for target language
  const generateUniqueReview = useCallback((idPrefix: number, targetLang: string): ReviewItem => {
    const template = REVIEW_TEMPLATES[targetLang] || REVIEW_TEMPLATES['fr'] || REVIEW_TEMPLATES['pt'];
    const categories = Object.keys(template.services);
    const category = categories[Math.floor(Math.random() * categories.length)];
    const texts = template.services[category];
    const text = texts[Math.floor(Math.random() * texts.length)];
    const authorObj = template.authors[Math.floor(Math.random() * template.authors.length)];
    const timeAgo = template.timeAgos[Math.floor(Math.random() * template.timeAgos.length)];

    const signatureKey = `${targetLang}-${authorObj.name}-${category}-${text.slice(0, 15)}`;
    
    let attempts = 0;
    let finalAuthor = authorObj;
    let finalText = text;
    let finalCategory = category;

    while (seenIndexSet.current.has(signatureKey) && attempts < 20) {
      attempts++;
      const randCat = categories[Math.floor(Math.random() * categories.length)];
      const randTexts = template.services[randCat];
      finalText = randTexts[Math.floor(Math.random() * randTexts.length)];
      finalAuthor = template.authors[Math.floor(Math.random() * template.authors.length)];
      finalCategory = randCat;
    }

    seenIndexSet.current.add(signatureKey);
    if (seenIndexSet.current.size > 100) {
      seenIndexSet.current.clear();
    }

    return {
      id: `rev-${targetLang}-${idPrefix}-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
      text: finalText,
      author: finalAuthor.name,
      location: finalAuthor.city,
      stars: 5,
      serviceTag: finalCategory,
      timeAgo
    };
  }, []);

  // Initialize and regenerate pool immediately whenever `lang` changes
  useEffect(() => {
    seenIndexSet.current.clear();
    const initialPool: ReviewItem[] = [];
    for (let i = 0; i < 12; i++) {
      initialPool.push(generateUniqueReview(i, lang));
    }
    setReviewsPool(initialPool);
    setCurrentIndex(0);
  }, [lang, generateUniqueReview]);

  // Ensure new reviews are constantly appended in the correct language as user navigates
  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => {
      const nextIdx = prevIndex + 1;
      if (nextIdx >= reviewsPool.length - 3) {
        setReviewsPool((oldPool) => {
          const newItems: ReviewItem[] = [];
          for (let i = 0; i < 6; i++) {
            newItems.push(generateUniqueReview(oldPool.length + i, lang));
          }
          return [...oldPool, ...newItems];
        });
      }
      return nextIdx;
    });
  }, [reviewsPool.length, lang, generateUniqueReview]);

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? 0 : prevIndex - 1));
  };

  // Auto-advance every 3 SECONDS (3000ms)
  useEffect(() => {
    if (!isPlaying || reviewsPool.length === 0) return;

    const timer = setInterval(() => {
      nextSlide();
    }, 3000);

    return () => clearInterval(timer);
  }, [isPlaying, nextSlide, reviewsPool.length]);

  // Render 3 visible items starting at currentIndex
  const visibleReviews = reviewsPool.slice(currentIndex, currentIndex + 3);

  return (
    <section id="reviews" className="py-24 border-t border-slate-800 bg-slate-950 relative overflow-hidden">
      {/* Decorative ambient background glows */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-12 space-y-4"
        >
          {/* Live Indicator Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-xs font-semibold text-emerald-400 shadow-inner">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span>{uiText.liveBadge}</span>
          </div>

          <div className="flex justify-center items-center gap-1.5 text-amber-400 pt-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4.5 h-4.5 sm:w-5 sm:h-5 fill-amber-400 text-amber-400 drop-shadow-md" />
            ))}
          </div>

          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white">
            {reviewsTitle}
          </h2>
          <p className="text-slate-300 text-sm sm:text-base font-normal max-w-2xl mx-auto">
            {reviewsSub}
          </p>

          {/* Controls Bar */}
          <div className="flex items-center justify-center gap-4 pt-2">
            <button
              onClick={prevSlide}
              disabled={currentIndex === 0}
              aria-label={uiText.prev}
              className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 disabled:opacity-30 disabled:cursor-not-allowed transition-all active:scale-95 shadow-md"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-semibold text-amber-300 transition-all active:scale-95 shadow-md"
              title={isPlaying ? uiText.pauseBtn : uiText.playBtn}
            >
              {isPlaying ? (
                <>
                  <Pause className="w-4 h-4 text-amber-400" />
                  <span>{uiText.pauseBtn}</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 text-emerald-400" />
                  <span>{uiText.playBtn}</span>
                </>
              )}
            </button>

            <button
              onClick={nextSlide}
              aria-label={uiText.next}
              className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 transition-all active:scale-95 shadow-md"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </motion.div>

        {/* 3-Second Visual Progress Indicator Bar */}
        <div className="max-w-md mx-auto mb-8 bg-slate-900 h-1 rounded-full overflow-hidden border border-slate-800">
          {isPlaying && (
            <motion.div 
              key={`progress-${currentIndex}-${lang}`}
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 3, ease: "linear" }}
              className="h-full bg-gradient-to-r from-emerald-500 via-amber-400 to-emerald-400"
            />
          )}
        </div>

        {/* Dynamic Reviews Cards Container */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 min-h-[240px]">
          <AnimatePresence mode="popLayout">
            {visibleReviews.map((review, idx) => (
              <motion.div
                key={review.id}
                layout
                initial={{ opacity: 0, scale: 0.9, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: -30 }}
                transition={{ duration: 0.45, ease: "easeOut", delay: idx * 0.08 }}
                className="p-5 sm:p-7 rounded-3xl bg-slate-900/90 border border-slate-800/90 shadow-2xl backdrop-blur-xl flex flex-col justify-between hover:border-emerald-500/50 transition-all duration-300 group"
              >
                <div className="space-y-3 sm:space-y-4">
                  
                  {/* Top Info Bar */}
                  <div className="flex items-center justify-between">
                    <div className="flex gap-1 text-amber-400">
                      {[...Array(review.stars)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    
                    <span className="px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-[9px] sm:text-[10px] font-semibold text-emerald-300 uppercase tracking-wider flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3 text-emerald-400 shrink-0" />
                      {review.serviceTag}
                    </span>
                  </div>

                  {/* Review Quote Text */}
                  <p className="text-slate-100 text-xs sm:text-sm italic leading-relaxed font-normal group-hover:text-white transition-colors">
                    "{review.text}"
                  </p>
                </div>

                {/* Footer Info */}
                <div className="pt-3 sm:pt-4 mt-3 sm:mt-4 border-t border-slate-800/80 flex items-center justify-between text-xs">
                  <div>
                    <div className="font-semibold text-white group-hover:text-emerald-300 transition-colors">
                      {review.author}
                    </div>
                    <div className="text-[10px] sm:text-[11px] text-slate-400 font-normal flex items-center gap-1 mt-0.5">
                      <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0" />
                      <span>{review.location}</span>
                    </div>
                  </div>

                  <div className="text-[10px] text-slate-400 font-medium flex items-center gap-1">
                    <Clock className="w-3 h-3 text-amber-400 shrink-0" />
                    <span>{review.timeAgo}</span>
                  </div>
                </div>

              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* CTA Section: Add feedback / testimonial button */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-30px" }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-8 sm:mt-12 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 text-center"
        >
          {/* Main Feedback Button requiring Auth */}
          {currentUser ? (
            <button
              onClick={onOpenSubmitReview}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-3.5 sm:py-4 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs shadow-xl shadow-amber-500/10 transition-all hover:scale-105 active:scale-95 group"
            >
              <MessageSquarePlus className="w-4 h-4 text-slate-950 group-hover:rotate-12 transition-transform" />
              <span>Deixar Meu Depoimento & Avaliação</span>
              <Sparkles className="w-4 h-4 text-slate-950" />
            </button>
          ) : (
            <button
              onClick={onOpenAuth}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-3.5 sm:py-4 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs shadow-xl shadow-amber-500/10 transition-all hover:scale-105 active:scale-95 group"
            >
              <LogIn className="w-4 h-4 text-slate-950 group-hover:scale-110 transition-transform" />
              <span>Entrar na Conta para Deixar Depoimento</span>
              <Sparkles className="w-4 h-4 text-slate-950" />
            </button>
          )}

          <a
            href={generalWhatsappUrl}
            target="_blank"
            rel="noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-3.5 sm:py-4 rounded-2xl bg-slate-900 border border-slate-800 text-slate-200 hover:text-white hover:border-emerald-500 text-xs font-semibold shadow-xl transition-all hover:scale-105 active:scale-95 group"
          >
            <MessageCircle className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
            <span>{uiText.ctaWhatsapp}</span>
          </a>
        </motion.div>

      </div>
    </section>
  );
};

