export interface TranslationType {
  tagline: string;
  title: string;
  subtitle: string;
  providerLabel: string;
  heroDesc: string;
  guaranteeBadge: string;
  freeQuoteBadge: string;
  fastServiceBadge: string;
  qualityWorkBadge: string;
  ctaWhatsapp: string;
  chooseServicesBtn: string;
  contactTitle: string;
  phone: string;
  email: string;
  servicesTitle: string;
  servicesSub: string;
  aboutTitle: string;
  aboutDesc: string;
  commitmentTitle: string;
  commitmentDesc: string;
  statGuarantee: string;
  statAvailable: string;
  statProjects: string;
  statFreeQuote: string;
  benefits: string[];
  galleryTitle: string;
  gallerySub: string;
  galleryFilterAll: string;
  galleryClickEnlarge: string;
  reviewsTitle: string;
  reviewsSub: string;
  close: string;
  moreInfo: string;
  quoteForService: string;
  directWhatsapp: string;
  avgTime: string;
  serviceArea: string;
  footerDesc: string;
  footerRights: string;
  selectionModalTitle: string;
  selectServicesLabel: string;
  requestTypeLabel: string;
  reqTypeQuote: string;
  reqTypeVisit: string;
  reqTypeUrgent: string;
  clientNamePlaceholder: string;
  clientCityPlaceholder: string;
  clientPhonePlaceholder: string;
  notesPlaceholder: string;
  btnSendToWhatsapp: string;
  selectAtLeastOneAlert: string;
  waMsgHeader: string;
  waClientInfoLabel: string;
  waNameLabel: string;
  waCityLabel: string;
  waPhoneLabel: string;
  waCategoryLabel: string;
  waInterventionLabel: string;
  waSelectedServicesLabel: string;
  waNotesLabel: string;
  waNotProvided: string;
  nav: {
    home: string;
    services: string;
    whyUs: string;
    gallery: string;
    reviews: string;
    contactBtn: string;
  };
  reviewsList: { text: string; author: string; stars: number }[];
  services: {
    [key: string]: {
      title: string;
      desc: string;
      items: string[];
    };
  };
}

export const languagesList = [
  { code: 'fr', label: 'Français', flag: '🇫🇷' },
  { code: 'pt', label: 'Português (BR)', flag: '🇧🇷' },
  { code: 'pt_PT', label: 'Português (PT)', flag: '🇵🇹' },
  { code: 'en', label: 'English', flag: '🇬🇧' },
  { code: 'es', label: 'Español', flag: '🇪🇸' },
  { code: 'it', label: 'Italiano', flag: '🇮🇹' },
  { code: 'de', label: 'Deutsch', flag: '🇩🇪' },
];

export const translations: Record<string, TranslationType> = {
  fr: {
    tagline: "Dieu est notre force | Travail, Honnêteté, Confiance",
    title: "DMJ PRESTATAIRE DE SERVICES",
    subtitle: "Bienvenue chez DMJ Prestataire de Services !",
    providerLabel: "Prestataire de Services",
    heroDesc: "Nous mettons notre savoir-faire d'excellence à votre service pour tous vos travaux. Choisissez vos services par catégorie et envoyez directement votre demande sur WhatsApp !",
    guaranteeBadge: "Excellence & Engagement Garanti",
    freeQuoteBadge: "Devis Instantané sur WhatsApp",
    fastServiceBadge: "Intervention 7j/7",
    qualityWorkBadge: "Finition Haut de Gamme",
    ctaWhatsapp: "Contacter via WhatsApp",
    chooseServicesBtn: "Choisir mes Services",
    contactTitle: "Nous Contacter Directement",
    phone: "+33 7 59 73 55 52",
    email: "batistadiego098@gmail.com",
    servicesTitle: "Espace Choix des Prestations",
    servicesSub: "Cliquez sur une catégorie pour sélectionner les travaux spécifiques et envoyer votre demande directement sur WhatsApp.",
    aboutTitle: "Pourquoi choisir DMJ ?",
    aboutDesc: "Nous réalisons vos travaux avec un rigoureux professionnalisme, une ponctualité exemplaire et une attention constante aux moindres détails.",
    commitmentTitle: "Engagement & Garantie Absolue",
    commitmentDesc: "Chaque chantier est mené avec une éthique irréprochable. Nous laissons vos espaces impeccables et organisés.",
    statGuarantee: "Satisfaction",
    statAvailable: "Service 7j/7",
    statProjects: "Projets Réalisés",
    statFreeQuote: "Devis 100% Gratuit",
    benefits: [
      "Travail de qualité supérieure",
      "Respect strict des délais annoncés",
      "Devis gratuit & réponse rapide par WhatsApp",
      "Garantie totale de satisfaction",
      "Intervention rapide 7j/7",
      "Artisans expérimentés & qualifiés"
    ],
    galleryTitle: "Galerie de nos Réalisations",
    gallerySub: "Découvrez nos récents travaux de jardinage, peinture, électricité et nettoyage.",
    galleryFilterAll: "Tous les Travaux",
    galleryClickEnlarge: "Cliquez pour agrandir",
    reviewsTitle: "Avis & Témoignages Clients",
    reviewsSub: "Note moyenne de 4.9/5 basée sur la satisfaction de nos clients",
    close: "Fermer",
    moreInfo: "Sélectionner les services",
    quoteForService: "Demander un devis",
    directWhatsapp: "WhatsApp Direct",
    avgTime: "Temps Moyen d'Exécution",
    serviceArea: "Zone d'Intervention",
    footerDesc: "Votre partenaire premium de confiance pour le jardinage, la peinture, l'électricité et le nettoyage de vitres en France.",
    footerRights: "Tous droits réservés.",
    selectionModalTitle: "Personnalisez votre demande pour :",
    selectServicesLabel: "Cochez les prestations souhaitées :",
    requestTypeLabel: "Type de demande :",
    reqTypeQuote: "Devis estimatif direct",
    reqTypeVisit: "Visite technique sur place",
    reqTypeUrgent: "Intervention d'urgence",
    clientNamePlaceholder: "Votre Nom complet",
    clientCityPlaceholder: "Votre Ville / Code Postal",
    clientPhonePlaceholder: "Votre numéro Téléphone / WhatsApp",
    notesPlaceholder: "Remarques complémentaires, dimensions, détails...",
    btnSendToWhatsapp: "Envoyer ma demande sur WhatsApp",
    selectAtLeastOneAlert: "Veuillez sélectionner au moins une prestation dans la liste !",
    waMsgHeader: "NOUVELLE DEMANDE DE SERVICE",
    waClientInfoLabel: "Informations Client :",
    waNameLabel: "Nom / Client :",
    waCityLabel: "Ville / CP :",
    waPhoneLabel: "Téléphone / WhatsApp :",
    waCategoryLabel: "Catégorie de Service :",
    waInterventionLabel: "Type d'Intervention :",
    waSelectedServicesLabel: "Services / Prestations Sélectionnées",
    waNotesLabel: "Notes & Précisions :",
    waNotProvided: "Non renseigné",
    nav: {
      home: "Accueil",
      services: "Services",
      whyUs: "Pourquoi Nous",
      gallery: "Galerie",
      reviews: "Avis",
      contactBtn: "Nous Contacter"
    },
    reviewsList: [
      { text: "Un travail de peinture d'une propreté exemplaire pour notre maison. Délais respectés et finitions parfaites !", author: "Jean-Marc P. • Paris", stars: 5 },
      { text: "Intervention d'urgence en électricité très rapide et efficace. Technicien ponctuel et très courtois. Je recommande à 100% !", author: "Sophie L. • Île-de-France", stars: 5 },
      { text: "Taille de haies et entretien du jardin impeccables. Mes vitres n'ont jamais été aussi nettes. Bravo DMJ !", author: "Carlos M. • Versailles", stars: 5 }
    ],
    services: {
      gardening: {
        title: "Jardinage & Espaces Verts",
        desc: "Sélectionnez les travaux de jardinage souhaités pour votre propriété.",
        items: [
          "Tonte de pelouse & gazon",
          "Taille de haies & arbustes",
          "Élagage & coupe d'arbres",
          "Désherbage & nettoyage de terrain",
          "Fertilisation & plantation",
          "Demande de Visite Technique sur Place"
        ]
      },
      painting: {
        title: "Peinture Intérieure & Extérieure",
        desc: "Sélectionnez vos besoins en rénovation et finition murale.",
        items: [
          "Peinture murale intérieure",
          "Peinture de plafond & boiseries",
          "Rénovation de façade extérieure",
          "Préparation & rebouchage de fissures",
          "Vernissage de portes & fenêtres",
          "Visite de métrage sur place"
        ]
      },
      electricity: {
        title: "Électricité Générale",
        desc: "Choisissez les interventions électriques requises.",
        items: [
          "Dépannage / Panne électrique d'urgence",
          "Installation de prises & interrupteurs",
          "Pose de luminaires & spots LED",
          "Mise aux normes du tableau électrique",
          "Installation d'un nouveau circuit",
          "Diagnostic & Visite Technique"
        ]
      },
      cleaning: {
        title: "Nettoyage de Vitres & Baies",
        desc: "Sélectionnez les vitrages à nettoyer.",
        items: [
          "Nettoyage de fenêtres traditionnelles",
          "Lavage de baies vitrées coulissantes",
          "Nettoyage de vitres en hauteur",
          "Lavage de vérandas & verrières",
          "Nettoyage de vitrines commerciales",
          "Demande d'évaluation sur place"
        ]
      }
    }
  },

  pt: {
    tagline: "Deus é a nossa força | Trabalho, Honestidade, Confiança",
    title: "DMJ PRESTADOR DE SERVIÇOS",
    subtitle: "Bem-vindo à DMJ Prestador de Serviços!",
    providerLabel: "Prestador de Serviços",
    heroDesc: "Oferecemos o melhor serviço para seus trabalhos. Escolha os serviços por categoria e envie sua solicitação diretamente pelo WhatsApp!",
    guaranteeBadge: "Excelência & Compromisso Garantido",
    freeQuoteBadge: "Orçamento Rápido pelo WhatsApp",
    fastServiceBadge: "Atendimento 7 dias/semana",
    qualityWorkBadge: "Acabamento de Luxo",
    ctaWhatsapp: "Contatar pelo WhatsApp",
    chooseServicesBtn: "Escolher meus Serviços",
    contactTitle: "Fale Conosco Diretamente",
    phone: "+33 7 59 73 55 52",
    email: "batistadiego098@gmail.com",
    servicesTitle: "Escolha de Serviços por Categoria",
    servicesSub: "Clique na categoria para selecionar os trabalhos específicos e enviar seu pedido diretamente pelo WhatsApp.",
    aboutTitle: "Por que escolher a DMJ?",
    aboutDesc: "Realizamos seus trabalhos com rigoroso profissionalismo, pontualidade exemplar e atenção minuciosa a cada detalhe.",
    commitmentTitle: "Compromisso & Garantia Total",
    commitmentDesc: "Cada projeto é conduzido com ética impecável. Deixamos seus ambientes impecáveis e limpos.",
    statGuarantee: "Satisfação",
    statAvailable: "Atendimento 7j/7",
    statProjects: "+150 Obras Entregues",
    statFreeQuote: "Orçamento 100% Grátis",
    benefits: [
      "Trabalho de qualidade superior",
      "Cumprimento rigoroso de prazos",
      "Orçamento gratuito & resposta rápida pelo WhatsApp",
      "Garantia total de satisfação",
      "Atendimento rápido 7 dias/semana",
      "Profissionais experientes & qualificados"
    ],
    galleryTitle: "Galeria de Trabalhos Entregues",
    gallerySub: "Confira nossos projetos recentes de jardinagem, pintura, eletricidade e limpeza.",
    galleryFilterAll: "Todos os Trabalhos",
    galleryClickEnlarge: "Clique para ampliar",
    reviewsTitle: "Avaliações & Depoimentos de Clientes",
    reviewsSub: "Média de 4.9/5 baseada na satisfação dos nossos clientes",
    close: "Fechar",
    moreInfo: "Selecionar os serviços",
    quoteForService: "Pedir orçamento",
    directWhatsapp: "WhatsApp Direto",
    avgTime: "Tempo Médio de Execução",
    serviceArea: "Área de Atendimento",
    footerDesc: "Seu parceiro de confiança para jardinagem, pintura, eletricidade e limpeza de vidros na França.",
    footerRights: "Todos os direitos reservados.",
    selectionModalTitle: "Personalize seu pedido para:",
    selectServicesLabel: "Marque os serviços desejados:",
    requestTypeLabel: "Tipo de atendimento:",
    reqTypeQuote: "Orçamento estimativo direto",
    reqTypeVisit: "Visita técnica no local",
    reqTypeUrgent: "Atendimento de urgência",
    clientNamePlaceholder: "Seu Nome Completo",
    clientCityPlaceholder: "Sua Cidade / Código Postal",
    clientPhonePlaceholder: "Seu Telefone / WhatsApp",
    notesPlaceholder: "Observações adicionais, medidas, detalhes...",
    btnSendToWhatsapp: "Enviar meu pedido para o WhatsApp",
    selectAtLeastOneAlert: "Por favor, selecione pelo menos um serviço da lista!",
    waMsgHeader: "NOVA SOLICITAÇÃO DE SERVIÇO",
    waClientInfoLabel: "Informações do Cliente:",
    waNameLabel: "Nome / Cliente:",
    waCityLabel: "Cidade / CP:",
    waPhoneLabel: "Telefone / WhatsApp:",
    waCategoryLabel: "Categoria de Serviço:",
    waInterventionLabel: "Tipo de Atendimento:",
    waSelectedServicesLabel: "Serviços Selecionados",
    waNotesLabel: "Observações & Detalhes:",
    waNotProvided: "Não informado",
    nav: {
      home: "Início",
      services: "Serviços",
      whyUs: "Por que Nós",
      gallery: "Galeria",
      reviews: "Avaliações",
      contactBtn: "Entrar em Contato"
    },
    reviewsList: [
      { text: "Trabalho de pintura extremamente caprichado para nossa casa. Prazos cumpridos e acabamento impecável!", author: "João M. • Paris", stars: 5 },
      { text: "Atendimento de emergência em eletricidade muito rápido e eficaz. Técnico muito atencioso e pontual. Recomendo 100%!", author: "Soraia L. • Île-de-France", stars: 5 },
      { text: "Poda de sebes e limpeza de jardim sensacionais! Os vidros da casa ficaram cristalinos. Parabéns DMJ!", author: "Carlos M. • Versailles", stars: 5 }
    ],
    services: {
      gardening: {
        title: "Jardinagem & Espaços Verdes",
        desc: "Selecione os trabalhos de jardinagem desejados para sua propriedade.",
        items: [
          "Corte e aparo de grama",
          "Poda de sebes e arbustos",
          "Poda de árvores e corte de galhos",
          "Limpeza e remoção de ervas daninhas",
          "Adubação e plantio de mudas",
          "Visita Técnica no Local"
        ]
      },
      painting: {
        title: "Pintura Interior & Exterior",
        desc: "Selecione suas necessidades em renovação e acabamento de paredes.",
        items: [
          "Pintura de paredes internas",
          "Pintura de teto e gesso",
          "Restauração de fachada externa",
          "Preparo e vedação de rachaduras",
          "Envernizamento de portas e janelas",
          "Visita para medição no local"
        ]
      },
      electricity: {
        title: "Eletricidade Geral",
        desc: "Escolha as intervenções elétricas necessárias.",
        items: [
          "Reparo de emergência / Curto-circuito",
          "Instalação de tomadas e interruptores",
          "Instalação de luminárias e iluminação LED",
          "Adequação e reforma de quadro elétrico",
          "Instalação de novos circuitos",
          "Diagnóstico e Visita Técnica"
        ]
      },
      cleaning: {
        title: "Limpeza de Vidros & Janelas",
        desc: "Selecione as vidraças para higienização profissional.",
        items: [
          "Limpeza de janelas residenciais",
          "Lavagem de portas de vidro e sacadas",
          "Limpeza de vidros em altura",
          "Limpeza de claraboias e varandas",
          "Limpeza de vitrines comerciais",
          "Avaliação prévia no local"
        ]
      }
    }
  },

  pt_PT: {
    tagline: "Deus é a nossa força | Trabalho, Honestidade, Confiança",
    title: "DMJ PRESTADOR DE SERVIÇOS",
    subtitle: "Bem-vindo à DMJ Prestador de Serviços!",
    providerLabel: "Prestador de Serviços",
    heroDesc: "Apresentamos a nossa experiência de excelência para todos os seus trabalhos. Escolha os serviços por categoria e envie o pedido diretamente pelo WhatsApp!",
    guaranteeBadge: "Excelência & Compromisso Garantido",
    freeQuoteBadge: "Orçamento Rápido via WhatsApp",
    fastServiceBadge: "Atendimento 7 dias/semana",
    qualityWorkBadge: "Acabamento de Alta Gama",
    ctaWhatsapp: "Contactar via WhatsApp",
    chooseServicesBtn: "Escolher os meus Serviços",
    contactTitle: "Contacte-nos Diretamente",
    phone: "+33 7 59 73 55 52",
    email: "batistadiego098@gmail.com",
    servicesTitle: "Seleção de Serviços por Categoria",
    servicesSub: "Clique numa categoria para escolher os trabalhos específicos e enviar o pedido diretamente via WhatsApp.",
    aboutTitle: "Porquê escolher a DMJ?",
    aboutDesc: "Executamos os seus trabalhos com rigoroso profissionalismo, pontualidade exemplar e rigor técnico.",
    commitmentTitle: "Compromisso & Garantia Absoluta",
    commitmentDesc: "Cada obra é conduzida com ética irrepreensível. Deixamos as suas instalações limpas e prontas a usar.",
    statGuarantee: "Satisfação",
    statAvailable: "Atendimento 7j/7",
    statProjects: "+150 Obras Concluídas",
    statFreeQuote: "Orçamento 100% Grátis",
    benefits: [
      "Trabalho de qualidade superior",
      "Rigoroso cumprimento de prazos",
      "Orçamento gratuito & resposta rápida via WhatsApp",
      "Garantia total de satisfação",
      "Intervenção rápida 7 dias/semana",
      "Técnicos qualificados & experientes"
    ],
    galleryTitle: "Galeria das Nossas Obras",
    gallerySub: "Descubra os nossos trabalhos recentes de jardinagem, pintura, eletricidade e limpeza.",
    galleryFilterAll: "Todos os Trabalhos",
    galleryClickEnlarge: "Clique para ampliar",
    reviewsTitle: "Testemunhos & Avaliações",
    reviewsSub: "Pontuação média de 4.9/5 baseada na satisfação dos clientes",
    close: "Fechar",
    moreInfo: "Selecionar os serviços",
    quoteForService: "Pedir orçamento",
    directWhatsapp: "WhatsApp Direto",
    avgTime: "Tempo Médio de Execução",
    serviceArea: "Área de Atendimento",
    footerDesc: "O seu parceiro de confiança para jardinagem, pintura, eletricidade e limpeza de vidros em França.",
    footerRights: "Todos os direitos reservados.",
    selectionModalTitle: "Personalize o seu pedido para:",
    selectServicesLabel: "Selecione os serviços pretendidos:",
    requestTypeLabel: "Tipo de pedido:",
    reqTypeQuote: "Orçamento estimativo direto",
    reqTypeVisit: "Visita técnica no local",
    reqTypeUrgent: "Intervenção de urgência",
    clientNamePlaceholder: "O seu Nome Completo",
    clientCityPlaceholder: "A sua Cidade / Código Postal",
    clientPhonePlaceholder: "O seu Contacto / WhatsApp",
    notesPlaceholder: "Observações adicionais, medidas, detalhes...",
    btnSendToWhatsapp: "Enviar pedido via WhatsApp",
    selectAtLeastOneAlert: "Por favor, selecione pelo menos um serviço da lista!",
    waMsgHeader: "PEDIDO DE SERVIÇO",
    waClientInfoLabel: "Informações do Cliente:",
    waNameLabel: "Nome / Cliente:",
    waCityLabel: "Cidade / CP:",
    waPhoneLabel: "Telefone / WhatsApp:",
    waCategoryLabel: "Categoria de Serviço:",
    waInterventionLabel: "Tipo de Intervenção:",
    waSelectedServicesLabel: "Serviços Selecionados",
    waNotesLabel: "Notas & Pormenores:",
    waNotProvided: "Não especificado",
    nav: {
      home: "Início",
      services: "Serviços",
      whyUs: "Porquê Nós",
      gallery: "Galeria",
      reviews: "Avaliações",
      contactBtn: "Contactar"
    },
    reviewsList: [
      { text: "Trabalho de pintura extremamente rigoroso. Prazos cumpridos e acabamento perfeito!", author: "João M. • Paris", stars: 5 },
      { text: "Atendimento elétrico urgente e muito eficiente. Técnico pontual e muito prestável.", author: "Soraia L. • Île-de-France", stars: 5 },
      { text: "Corte de sebes e limpeza de jardim impecável. Vidros super limpos!", author: "Carlos M. • Versailles", stars: 5 }
    ],
    services: {
      gardening: {
        title: "Jardinagem & Espaços Verdes",
        desc: "Selecione os trabalhos de jardinagem pretendidos.",
        items: [
          "Corte de relvados",
          "Poda de sebes e arbustos",
          "Abate e poda de árvores",
          "Limpeza e desmatação de terrenos",
          "Fertilização e plantação",
          "Pedido de Visita Técnica no Local"
        ]
      },
      painting: {
        title: "Pintura Interior & Exterior",
        desc: "Selecione as suas necessidades de renovação de pintura.",
        items: [
          "Pintura de paredes interiores",
          "Pintura de tetos e Madeiras",
          "Renovação de fachadas exteriores",
          "Reparação de fissuras e aparelhamento",
          "Envernizamento de portas e janelas",
          "Visita de medição no local"
        ]
      },
      electricity: {
        title: "Eletricidade Geral",
        desc: "Escolha as intervenções elétricas requeridas.",
        items: [
          "Avaria / Urgência elétrica",
          "Instalação de tomadas e interruptores",
          "Montagem de iluminação e focos LED",
          "Remodelação do quadro elétrico",
          "Instalação de novos circuitos",
          "Diagnóstico & Visita Técnica"
        ]
      },
      cleaning: {
        title: "Limpeza de Vidros & Janelas",
        desc: "Selecione as superfícies envidraçadas a limpar.",
        items: [
          "Limpeza de janelas residenciais",
          "Lavagem de portadas e portas de vidro",
          "Limpeza de vidros em altura",
          "Limpeza de marquises e claraboias",
          "Limpeza de montras comerciais",
          "Pedido de avaliação no local"
        ]
      }
    }
  },

  en: {
    tagline: "God is our strength | Hard Work, Honesty, Trust",
    title: "DMJ SERVICE PROVIDER",
    subtitle: "Welcome to DMJ Service Provider!",
    providerLabel: "Service Provider",
    heroDesc: "We offer top-level craftsmanship for all your property projects. Choose your services by category and send your request directly to WhatsApp!",
    guaranteeBadge: "Excellence & Guaranteed Commitment",
    freeQuoteBadge: "Fast WhatsApp Quote",
    fastServiceBadge: "7 Days/Week Service",
    qualityWorkBadge: "Premium Finish",
    ctaWhatsapp: "Contact via WhatsApp",
    chooseServicesBtn: "Choose My Services",
    contactTitle: "Contact Us Directly",
    phone: "+33 7 59 73 55 52",
    email: "batistadiego098@gmail.com",
    servicesTitle: "Services Selection Area",
    servicesSub: "Click a category to select specific tasks and send your request directly via WhatsApp.",
    aboutTitle: "Why Choose DMJ?",
    aboutDesc: "We carry out your work with strict professionalism, exemplary punctuality, and thorough technical care.",
    commitmentTitle: "Commitment & Absolute Guarantee",
    commitmentDesc: "Every job is executed with flawless ethics. We leave your property clean and perfectly ordered.",
    statGuarantee: "Satisfaction",
    statAvailable: "7/7 Service",
    statProjects: "+150 Completed Projects",
    statFreeQuote: "100% Free Quote",
    benefits: [
      "Superior quality workmanship",
      "Strict adherence to deadlines",
      "Free quote & fast response via WhatsApp",
      "100% satisfaction guarantee",
      "Fast intervention 7 days/week",
      "Experienced & qualified tradesmen"
    ],
    galleryTitle: "Our Work Gallery",
    gallerySub: "Explore our recent gardening, painting, electrical, and cleaning projects.",
    galleryFilterAll: "All Projects",
    galleryClickEnlarge: "Click to enlarge",
    reviewsTitle: "Client Reviews & Testimonials",
    reviewsSub: "Average rating of 4.9/5 based on customer satisfaction",
    close: "Close",
    moreInfo: "Select services",
    quoteForService: "Request quote",
    directWhatsapp: "Direct WhatsApp",
    avgTime: "Average Execution Time",
    serviceArea: "Service Area",
    footerDesc: "Your trusted premium partner for gardening, painting, electrical work, and window cleaning in France.",
    footerRights: "All rights reserved.",
    selectionModalTitle: "Customize your request for:",
    selectServicesLabel: "Check requested services:",
    requestTypeLabel: "Request type:",
    reqTypeQuote: "Direct estimated quote",
    reqTypeVisit: "On-site technical inspection",
    reqTypeUrgent: "Emergency intervention",
    clientNamePlaceholder: "Your Full Name",
    clientCityPlaceholder: "Your City / Zip Code",
    clientPhonePlaceholder: "Your Phone / WhatsApp",
    notesPlaceholder: "Additional details, dimensions, special instructions...",
    btnSendToWhatsapp: "Send Request to WhatsApp",
    selectAtLeastOneAlert: "Please select at least one service from the list!",
    waMsgHeader: "NEW SERVICE REQUEST",
    waClientInfoLabel: "Client Information:",
    waNameLabel: "Name / Client:",
    waCityLabel: "City / Zip Code:",
    waPhoneLabel: "Phone / WhatsApp:",
    waCategoryLabel: "Service Category:",
    waInterventionLabel: "Intervention Type:",
    waSelectedServicesLabel: "Selected Services",
    waNotesLabel: "Notes & Details:",
    waNotProvided: "Not provided",
    nav: {
      home: "Home",
      services: "Services",
      whyUs: "Why Us",
      gallery: "Gallery",
      reviews: "Reviews",
      contactBtn: "Contact Us"
    },
    reviewsList: [
      { text: "Extremely clean painting job for our house. Deadlines respected and perfect finish!", author: "Jean-Marc P. • Paris", stars: 5 },
      { text: "Very fast emergency electrical repair. Punctual and polite technician. Highly recommended!", author: "Sophie L. • Île-de-France", stars: 5 },
      { text: "Hedge trimming and garden maintenance were spotless. Windows look brand new!", author: "Carlos M. • Versailles", stars: 5 }
    ],
    services: {
      gardening: {
        title: "Gardening & Landscaping",
        desc: "Select the gardening services needed for your property.",
        items: [
          "Lawn mowing & turf care",
          "Hedge & shrub trimming",
          "Tree pruning & branch cutting",
          "Weeding & yard cleanup",
          "Fertilization & planting",
          "On-site Technical Inspection Request"
        ]
      },
      painting: {
        title: "Interior & Exterior Painting",
        desc: "Select your wall renovation and finishing needs.",
        items: [
          "Interior wall painting",
          "Ceiling & woodwork painting",
          "Exterior facade restoration",
          "Crack filling & surface prep",
          "Door & window varnishing",
          "On-site measurement visit"
        ]
      },
      electricity: {
        title: "General Electrical Services",
        desc: "Choose the electrical interventions required.",
        items: [
          "Emergency power outage repair",
          "Socket & switch installation",
          "LED lighting & spotlight fixture",
          "Electrical board panel upgrade",
          "New circuit wiring",
          "Diagnostic & Technical Inspection"
        ]
      },
      cleaning: {
        title: "Window & Glass Cleaning",
        desc: "Select glass surfaces for professional cleaning.",
        items: [
          "Residential window cleaning",
          "Sliding glass bay door washing",
          "High-reach window cleaning",
          "Conservatory & skylight washing",
          "Storefront & commercial glass",
          "On-site evaluation request"
        ]
      }
    }
  },

  es: {
    tagline: "Dios es nuestra fuerza | Trabajo, Honestidad, Confianza",
    title: "DMJ PROVEEDOR DE SERVICIOS",
    subtitle: "¡Bienvenido a DMJ Proveedor de Servicios!",
    providerLabel: "Proveedor de Servicios",
    heroDesc: "Ofrecemos mano de obra de excelencia para todos sus proyectos. ¡Elija sus servicios por categoría y envíe su solicitud directamente por WhatsApp!",
    guaranteeBadge: "Excelencia y Compromiso Garantizado",
    freeQuoteBadge: "Presupuesto Rápido en WhatsApp",
    fastServiceBadge: "Atención 7 Días/Semana",
    qualityWorkBadge: "Acabado de Lujo",
    ctaWhatsapp: "Contactar por WhatsApp",
    chooseServicesBtn: "Elegir mis Servicios",
    contactTitle: "Contáctenos Directamente",
    phone: "+33 7 59 73 55 52",
    email: "batistadiego098@gmail.com",
    servicesTitle: "Espacio de Selección de Servicios",
    servicesSub: "Haga clic en una categoría para seleccionar los trabajos específicos y enviar su solicitud directamente por WhatsApp.",
    aboutTitle: "¿Por qué elegir DMJ?",
    aboutDesc: "Realizamos sus trabajos con riguroso profesionalismo, puntualidad ejemplar y cuidado técnico impecable.",
    commitmentTitle: "Compromiso y Garantía Absoluta",
    commitmentDesc: "Cada proyecto se ejecuta con ética intachable. Dejamos sus espacios limpios e impecables.",
    statGuarantee: "Satisfacción",
    statAvailable: "Atención 7j/7",
    statProjects: "+150 Proyectos Entregados",
    statFreeQuote: "Presupuesto 100% Gratis",
    benefits: [
      "Trabajo de calidad superior",
      "Cumplimiento estricto de plazos",
      "Presupuesto gratuito y respuesta rápida por WhatsApp",
      "Garantía total de satisfacción",
      "Atención rápida 7 días/semana",
      "Profesionales experimentados y cualificados"
    ],
    galleryTitle: "Galería de Trabajos",
    gallerySub: "Descubra nuestros proyectos recientes de jardinería, pintura, electricidad y limpieza.",
    galleryFilterAll: "Todos los Trabajos",
    galleryClickEnlarge: "Haga clic para ampliar",
    reviewsTitle: "Opiniones y Testimonios",
    reviewsSub: "Calificación promedio de 4.9/5 basada en la satisfacción del cliente",
    close: "Cerrar",
    moreInfo: "Seleccionar servicios",
    quoteForService: "Pedir presupuesto",
    directWhatsapp: "WhatsApp Directo",
    avgTime: "Tiempo Medio de Ejecución",
    serviceArea: "Zona de Cobertura",
    footerDesc: "Su socio de confianza para jardinería, pintura, electricidad y limpieza de cristales en Francia.",
    footerRights: "Todos los derechos reservados.",
    selectionModalTitle: "Personalice su solicitud para:",
    selectServicesLabel: "Marque los servicios deseados:",
    requestTypeLabel: "Tipo de solicitud:",
    reqTypeQuote: "Presupuesto estimativo directo",
    reqTypeVisit: "Visita técnica en el sitio",
    reqTypeUrgent: "Atención de urgencia",
    clientNamePlaceholder: "Su Nombre Completo",
    clientCityPlaceholder: "Su Ciudad / Código Postal",
    clientPhonePlaceholder: "Su Teléfono / WhatsApp",
    notesPlaceholder: "Notas adicionales, medidas, detalles...",
    btnSendToWhatsapp: "Enviar solicitud a WhatsApp",
    selectAtLeastOneAlert: "¡Por favor seleccione al menos un servicio de la lista!",
    waMsgHeader: "NUEVA SOLICITUD DE SERVICIO",
    waClientInfoLabel: "Información del Cliente:",
    waNameLabel: "Nombre / Cliente:",
    waCityLabel: "Ciudad / C.P.:",
    waPhoneLabel: "Teléfono / WhatsApp:",
    waCategoryLabel: "Categoría de Servicio:",
    waInterventionLabel: "Tipo de Intervención:",
    waSelectedServicesLabel: "Servicios Seleccionados",
    waNotesLabel: "Notas & Detallado:",
    waNotProvided: "No especificado",
    nav: {
      home: "Inicio",
      services: "Servicios",
      whyUs: "Por qué Nosotros",
      gallery: "Galería",
      reviews: "Opiniones",
      contactBtn: "Contactar"
    },
    reviewsList: [
      { text: "Trabajo de pintura muy meticuloso en nuestra casa. ¡Plazos respetados y acabados perfectos!", author: "Jean-Marc P. • Paris", stars: 5 },
      { text: "Servicio de urgencia eléctrica muy rápido. Técnico puntual y amable. ¡Recomendado 100%!", author: "Sophie L. • Île-de-France", stars: 5 },
      { text: "Corte de setos y mantenimiento del jardín impecables. ¡Los cristales quedaron relucientes!", author: "Carlos M. • Versailles", stars: 5 }
    ],
    services: {
      gardening: {
        title: "Jardinería y Zonas Verdes",
        desc: "Seleccione los servicios de jardinería necesarios para su propiedad.",
        items: [
          "Corte y cuidado de césped",
          "Poda de setos y arbustos",
          "Poda de árboles y corte de ramas",
          "Limpieza de hierbas y terreno",
          "Abonado y plantación",
          "Solicitud de Visita Técnica en el Sitio"
        ]
      },
      painting: {
        title: "Pintura Interior y Exterior",
        desc: "Seleccione sus necesidades de renovación y pintura.",
        items: [
          "Pintura de paredes interiores",
          "Pintura de techos y madera",
          "Restauración de fachadas exteriores",
          "Reparación y sellado de grietas",
          "Barnizado de puertas y ventanas",
          "Visita de medición en el sitio"
        ]
      },
      electricity: {
        title: "Electricidad General",
        desc: "Elija las intervenciones eléctricas requeridas.",
        items: [
          "Reparación de urgencia / Averías",
          "Instalación de enchufes e interruptores",
          "Instalación de luces y focos LED",
          "Actualización de cuadro eléctrico",
          "Instalación de nuevos circuitos",
          "Diagnóstico y Visita Técnica"
        ]
      },
      cleaning: {
        title: "Limpieza de Cristales y Ventanas",
        desc: "Seleccione las superficies vidriadas a limpiar.",
        items: [
          "Limpieza de ventanas residenciales",
          "Lavado de ventanales y balcones",
          "Limpieza de cristales en altura",
          "Limpieza de claraboyas y terrazas",
          "Limpieza de escaparates comerciales",
          "Solicitud de evaluación en el sitio"
        ]
      }
    }
  },

  it: {
    tagline: "Dio è la nostra forza | Lavoro, Onestà, Fiducia",
    title: "DMJ FORNITORE DI SERVIZI",
    subtitle: "Benvenuti in DMJ Fornitore di Servizi!",
    providerLabel: "Fornitore di Servizi",
    heroDesc: "Offriamo un savoir-faire di eccellenza per tutti i vostri lavori. Scegliete i servizi per categoria e inviate la richiesta direttamente su WhatsApp!",
    guaranteeBadge: "Eccellenza & Impegno Garantito",
    freeQuoteBadge: "Preventivo Rapido su WhatsApp",
    fastServiceBadge: "Servizio 7 Giorni/Settimana",
    qualityWorkBadge: "Finitura di Lusso",
    ctaWhatsapp: "Contatta via WhatsApp",
    chooseServicesBtn: "Scegli i Miei Servizi",
    contactTitle: "Contattaci Direttamente",
    phone: "+33 7 59 73 55 52",
    email: "batistadiego098@gmail.com",
    servicesTitle: "Area Selezione Servizi",
    servicesSub: "Clicca su una categoria per selezionare i lavori specifici e inviare la richiesta direttamente su WhatsApp.",
    aboutTitle: "Perché scegliere DMJ?",
    aboutDesc: "Eseguiamo i vostri lavori con rigoroso professionalismo, puntualità ed elevato standard di finitura.",
    commitmentTitle: "Impegno & Garanzia Assoluta",
    commitmentDesc: "Ogni cantiere viene gestito con massima etica professionale. Lasciamo gli ambienti puliti e in perfetto ordine.",
    statGuarantee: "Soddisfazione",
    statAvailable: "Servizio 7/7",
    statProjects: "+150 Progetti Realizzati",
    statFreeQuote: "Preventivo 100% Gratuito",
    benefits: [
      "Lavoro di qualità superiore",
      "Rigoroso rispetto dei tempi",
      "Preventivo gratuito e risposta rapida via WhatsApp",
      "Garanzia totale di soddisfazione",
      "Intervento rapido 7 giorni/settimana",
      "Artigiani esperti e qualificati"
    ],
    galleryTitle: "Galleria delle Nostre Realizzazioni",
    gallerySub: "Scopri i nostri recenti lavori di giardinaggio, pittura, elettricità e pulizia.",
    galleryFilterAll: "Tutti i Lavori",
    galleryClickEnlarge: "Clicca per ingrandire",
    reviewsTitle: "Recensioni & Testimonianze",
    reviewsSub: "Valutazione media di 4.9/5 basata sulla soddisfazione dei clienti",
    close: "Chiudi",
    moreInfo: "Seleziona servizi",
    quoteForService: "Richiedi preventivo",
    directWhatsapp: "WhatsApp Diretto",
    avgTime: "Tempo Medio di Esecuzione",
    serviceArea: "Zona di Intervento",
    footerDesc: "Il vostro partner di fiducia per giardinaggio, pittura, elettricità e pulizia vetri in Francia.",
    footerRights: "Tutti i diritti riservati.",
    selectionModalTitle: "Personalizza la tua richiesta per:",
    selectServicesLabel: "Seleziona i servizi desiderati:",
    requestTypeLabel: "Tipo di richiesta:",
    reqTypeQuote: "Preventivo stimato diretto",
    reqTypeVisit: "Sopralluogo tecnico sul posto",
    reqTypeUrgent: "Intervento urgente",
    clientNamePlaceholder: "Nome e Cognome",
    clientCityPlaceholder: "Città / Codice Postale",
    clientPhonePlaceholder: "Telefono / WhatsApp",
    notesPlaceholder: "Dettagli aggiuntivi, dimensioni, note...",
    btnSendToWhatsapp: "Invia Richiesta su WhatsApp",
    selectAtLeastOneAlert: "Seleziona almeno un servizio dalla lista!",
    waMsgHeader: "NUOVA RICHIESTA DI SERVIZIO",
    waClientInfoLabel: "Informazioni Cliente:",
    waNameLabel: "Nome / Cliente:",
    waCityLabel: "Città / CAP:",
    waPhoneLabel: "Telefono / WhatsApp:",
    waCategoryLabel: "Categoria di Servizio:",
    waInterventionLabel: "Tipo di Intervento:",
    waSelectedServicesLabel: "Servizi Selezionati",
    waNotesLabel: "Note & Dettagli:",
    waNotProvided: "Non specificato",
    nav: {
      home: "Home",
      services: "Servizi",
      whyUs: "Perché Noi",
      gallery: "Galleria",
      reviews: "Recensioni",
      contactBtn: "Contattaci"
    },
    reviewsList: [
      { text: "Lavoro di pittura curato nei minimi dettagli. Tempi rispettati e finiture perfette!", author: "Jean-Marc P. • Paris", stars: 5 },
      { text: "Riparazione elettrica d'emergenza rapidissima. Tecnico puntuale e gentile. Consigliato al 100%!", author: "Sophie L. • Île-de-France", stars: 5 },
      { text: "Potatura siepi e pulizia giardino impeccabili. Vetri brillanti!", author: "Carlos M. • Versailles", stars: 5 }
    ],
    services: {
      gardening: {
        title: "Giardinaggio & Spazi Verdi",
        desc: "Seleziona i lavori di giardinaggio desiderati per la tua proprietà.",
        items: [
          "Taglio del prato e cura del manto verde",
          "Potatura siepi e cespugli",
          "Potatura alberi e rami",
          "Diserbo e pulizia terreno",
          "Concimazione e piantumazione",
          "Richiesta di Sopralluogo Tecnico sul Posto"
        ]
      },
      painting: {
        title: "Pittura Interna & Esterna",
        desc: "Seleziona le tue esigenze di tinteggiatura e rinnovo pareti.",
        items: [
          "Pittura pareti interne",
          "Pittura soffitti e legno",
          "Ristrutturazione facciate esterne",
          "Stuccatura e riparazione crepe",
          "Verniciatura porte e finestre",
          "Sopralluogo di misurazione"
        ]
      },
      electricity: {
        title: "Elettricità Generale",
        desc: "Scegli gli interventi elettrici richiesti.",
        items: [
          "Riparazione guasti / Urgenza elettrica",
          "Installazione prese e interruttori",
          "Montaggio punti luce e faretti LED",
          "Adeguamento quadro elettrico",
          "Installazione nuovi circuiti",
          "Diagnostica e Sopralluogo Tecnico"
        ]
      },
      cleaning: {
        title: "Pulizia Vetri & Vetrate",
        desc: "Seleziona le superfici vetrate da pulire.",
        items: [
          "Pulizia finestre residenziali",
          "Lavaggio vetrate scorrevoli",
          "Pulizia vetri in altezza",
          "Pulizia verande e lucernari",
          "Pulizia vetrine commerciali",
          "Valutazione sul posto"
        ]
      }
    }
  },

  de: {
    tagline: "Gott ist unsere Stärke | Arbeit, Ehrlichkeit, Vertrauen",
    title: "DMJ DIENSTLEISTER",
    subtitle: "Willkommen bei DMJ Dienstleister!",
    providerLabel: "Dienstleister",
    heroDesc: "Wir bieten erstklassige Handwerkskunst für all Ihre Projekte. Wählen Sie Ihre Dienstleistungen nach Kategorie und senden Sie Ihre Anfrage direkt per WhatsApp!",
    guaranteeBadge: "Exzellenz & Garantierter Einsatz",
    freeQuoteBadge: "Schnelles Angebot per WhatsApp",
    fastServiceBadge: "7 Tage/Woche Service",
    qualityWorkBadge: "Luxus-Auszahlung & Finish",
    ctaWhatsapp: "Kontakt per WhatsApp",
    chooseServicesBtn: "Dienste Auswählen",
    contactTitle: "Direkt Kontaktieren",
    phone: "+33 7 59 73 55 52",
    email: "batistadiego098@gmail.com",
    servicesTitle: "Dienstleistungsauswahl",
    servicesSub: "Klicken Sie auf eine Kategorie, um spezifische Arbeiten auszuwählen und Ihre Anfrage direkt per WhatsApp zu senden.",
    aboutTitle: "Warum DMJ Wählen?",
    aboutDesc: "Wir führen Ihre Arbeiten mit strenger Professionalität, vorbildlicher Pünktlichkeit und höchster Präzision aus.",
    commitmentTitle: "Engagement & Absolute Garantie",
    commitmentDesc: "Jedes Projekt wird mit einwandfreier Ethik durchgeführt. Wir hinterlassen Ihre Räume sauber und perfekt geordnet.",
    statGuarantee: "Zufriedenheit",
    statAvailable: "7/7 Service",
    statProjects: "+150 Abgeschlossene Projekte",
    statFreeQuote: "100% Kostenloses Angebot",
    benefits: [
      "Erstklassige Arbeitsqualität",
      "Strikte Einhaltung von Terminen",
      "Kostenloses Angebot & schnelle Antwort per WhatsApp",
      "Volle Zufriedenheitsgarantie",
      "Schneller Einsatz 7 Tage/Woche",
      "Erfahrene & qualifizierte Handwerker"
    ],
    galleryTitle: "Galerie Unserer Arbeiten",
    gallerySub: "Entdecken Sie unsere aktuellen Projekte in Gartenbau, Malerei, Elektrik und Reinigung.",
    galleryFilterAll: "Alle Arbeiten",
    galleryClickEnlarge: "Klicken zum Vergrößern",
    reviewsTitle: "Kundenbewertungen & Erfahrungen",
    reviewsSub: "Durchschnittliche Bewertung von 4.9/5 basierend auf Kundenzufriedenheit",
    close: "Schließen",
    moreInfo: "Dienste auswählen",
    quoteForService: "Angebot anfordern",
    directWhatsapp: "Direktes WhatsApp",
    avgTime: "Durchschnittliche Ausführungszeit",
    serviceArea: "Einsatzgebiet",
    footerDesc: "Ihr zuverlässiger Premium-Partner für Gartenarbeit, Malerei, Elektrik und Fensterreinigung in Frankreich.",
    footerRights: "Alle Rechte vorbehalten.",
    selectionModalTitle: "Anfrage anpassen für:",
    selectServicesLabel: "Gewünschte Leistungen auswählen:",
    requestTypeLabel: "Anfragetyp:",
    reqTypeQuote: "Direktes geschätztes Angebot",
    reqTypeVisit: "Technische Besichtigung vor Ort",
    reqTypeUrgent: "Notfalleinsatz",
    clientNamePlaceholder: "Ihr vollständiger Name",
    clientCityPlaceholder: "Ihre Stadt / PLZ",
    clientPhonePlaceholder: "Ihre Telefonnummer / WhatsApp",
    notesPlaceholder: "Zusätzliche Notizen, Maße, Details...",
    btnSendToWhatsapp: "Anfrage per WhatsApp senden",
    selectAtLeastOneAlert: "Bitte wählen Sie mindestens eine Leistung aus der Liste aus!",
    waMsgHeader: "NEUE DIENSTLEISTUNGSANFRAGE",
    waClientInfoLabel: "Kundeninformationen:",
    waNameLabel: "Name / Kunde:",
    waCityLabel: "Stadt / PLZ:",
    waPhoneLabel: "Telefon / WhatsApp:",
    waCategoryLabel: "Dienstleistungskategorie:",
    waInterventionLabel: "Einsatzart:",
    waSelectedServicesLabel: "Ausgewählte Dienstleistungen",
    waNotesLabel: "Anmerkungen & Details:",
    waNotProvided: "Nicht angegeben",
    nav: {
      home: "Startseite",
      services: "Leistungen",
      whyUs: "Warum Wir",
      gallery: "Galerie",
      reviews: "Bewertungen",
      contactBtn: "Kontaktieren"
    },
    reviewsList: [
      { text: "Malerarbeiten von hervorragender Sauberkeit. Termine eingehalten und perfektes Finish!", author: "Jean-Marc P. • Paris", stars: 5 },
      { text: "Sehr schnelle Notfallreparatur im Elektrobereich. Pünktlicher und höflicher Techniker. 100% empfehlenswert!", author: "Sophie L. • Île-de-France", stars: 5 },
      { text: "Heckenschnitt und Gartenpflege tadellos. Fenster erstrahlen in neuem Glanz!", author: "Carlos M. • Versailles", stars: 5 }
    ],
    services: {
      gardening: {
        title: "Gartenbau & Grünflächen",
        desc: "Wählen Sie die gewünschten Gartenarbeiten für Ihr Anwesen aus.",
        items: [
          "Rasenmähen & Rasenpflege",
          "Hecken- & Strauchschnitt",
          "Baumpflege & Astschnitt",
          "Unkrautentfernung & Grundstücksreinigung",
          "Düngung & Bepflanzung",
          "Anfrage einer Technischen Besichtigung vor Ort"
        ]
      },
      painting: {
        title: "Malerarbeiten Innen & Außen",
        desc: "Wählen Sie Ihre Wünsche zur Wandrenovierung und Gestaltung.",
        items: [
          "Innenwandanstrich",
          "Decken- & Holzwerkanstrich",
          "Fassadenrenovierung",
          "Vorbereitung & Rissverspachtelung",
          "Lackierung von Türen & Fenstern",
          "Aufmaß-Termin vor Ort"
        ]
      },
      electricity: {
        title: "Elektroinstallation & Reparatur",
        desc: "Wählen Sie die erforderlichen Elektroarbeiten.",
        items: [
          "Notfall-Reparatur / Stromausfall",
          "Installation von Steckdosen & Schaltern",
          "Montage von Leuchten & LED-Spots",
          "Erneuerung der Sicherungskasten-Normen",
          "Installation neuer Stromkreise",
          "Diagnose & Technische Besichtigung"
        ]
      },
      cleaning: {
        title: "Fenster- & Glasreinigung",
        desc: "Wählen Sie die zu reinigenden Glasflächen.",
        items: [
          "Reinigung von Wohnfenstern",
          "Wäsche von Schiebeglastüren",
          "Glasreinigung in großer Höhe",
          "Reinigung von Wintergärten & Dachfenstern",
          "Schaufensterreinigung",
          "Bewertung vor Ort"
        ]
      }
    }
  }
};

export function getTranslationsForLang(lang: string): TranslationType {
  return translations[lang] || translations.fr;
}
