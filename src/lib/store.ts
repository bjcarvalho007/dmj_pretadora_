import { User, ReviewItem, ServiceItem } from '../types';
import { db } from './firebase';
import { collection, doc, setDoc, getDocs, deleteDoc } from 'firebase/firestore';

const USERS_KEY = 'dmj_users_data';
const REVIEWS_KEY = 'dmj_reviews_data';
const SERVICES_KEY = 'dmj_services_data';
const CURRENT_USER_KEY = 'dmj_current_user';

// Initial default services
const DEFAULT_SERVICES: ServiceItem[] = [
  {
    id: 'srv-1',
    titleKey: 'servPaintingTitle',
    descKey: 'servPaintingDesc',
    iconName: 'Paintbrush',
    defaultTitle: 'Peinture & Rénovation',
    defaultDesc: 'Peinture intérieure et extérieure, préparation soignée des surfaces, ravalement de façade.',
    active: true,
    priceEstimate: 'Sur devis'
  },
  {
    id: 'srv-2',
    titleKey: 'servElectricityTitle',
    descKey: 'servElectricityDesc',
    iconName: 'Zap',
    defaultTitle: 'Électricité Générale',
    defaultDesc: 'Dépannage d\'urgence 7j/7, mise aux normes des tableaux électriques, installation d\'éclairages LED.',
    active: true,
    priceEstimate: 'Sur devis'
  },
  {
    id: 'srv-3',
    titleKey: 'servGardeningTitle',
    descKey: 'servGardeningDesc',
    iconName: 'Trees',
    defaultTitle: 'Jardinage & Espaces Verts',
    defaultDesc: 'Taille de haies, élagage d\'arbres, tonte de pelouse, création et entretien complet de jardins.',
    active: true,
    priceEstimate: 'Sur devis'
  },
  {
    id: 'srv-4',
    titleKey: 'servCleaningTitle',
    descKey: 'servCleaningDesc',
    iconName: 'Sparkles',
    defaultTitle: 'Nettoyage de Vitres',
    defaultDesc: 'Lavage haute précision de vitres, baies vitrées, vérandas et verrières professionnelles ou résidentielles.',
    active: true,
    priceEstimate: 'Sur devis'
  }
];

// Initial seed reviews (pre-approved)
const SEED_REVIEWS: ReviewItem[] = [
  {
    id: 'rev-seed-1',
    text: 'Un travail de peinture d\'une propreté exemplaire pour notre salon. Délais respectés à la minute et finitions d\'artisan !',
    author: 'Jean-Marc P.',
    authorEmail: 'jeanmarc@example.com',
    authorPhone: '+33 6 12 34 56 78',
    location: 'Paris (75016)',
    stars: 5,
    serviceTag: 'Peinture',
    timeAgo: 'Il y a 2 jours',
    status: 'approved',
    createdAt: new Date().toISOString()
  },
  {
    id: 'rev-seed-2',
    text: 'Intervention d\'urgence en électricité très rapide dimanche matin. Diagnostic clair et panne résolue en moins d\'une heure !',
    author: 'Sophie L.',
    authorEmail: 'sophie.l@example.com',
    authorPhone: '+33 7 98 76 54 32',
    location: 'Boulogne-Billancourt',
    stars: 5,
    serviceTag: 'Électricité',
    timeAgo: 'Hier',
    status: 'approved',
    createdAt: new Date().toISOString()
  },
  {
    id: 'rev-seed-3',
    text: 'Taille de nos haies et tonte du grand jardin impeccables. Évacuation complète des végétaux, nous sommes ravis !',
    author: 'Carlos & Elena M.',
    authorEmail: 'carlos.m@example.com',
    authorPhone: '+33 6 55 44 33 22',
    location: 'Versailles',
    stars: 5,
    serviceTag: 'Jardinage',
    timeAgo: 'Il y a 3 jours',
    status: 'approved',
    createdAt: new Date().toISOString()
  }
];

// Helper to get stored users
export function getStoredUsers(): User[] {
  try {
    const data = localStorage.getItem(USERS_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

// Helper to save user
export function saveUser(user: User): void {
  const users = getStoredUsers();
  const existingIdx = users.findIndex(u => u.email === user.email);
  if (existingIdx >= 0) {
    users[existingIdx] = user;
  } else {
    users.push(user);
  }
  localStorage.setItem(USERS_KEY, JSON.stringify(users));

  // Sync to Firestore asynchronously
  try {
    setDoc(doc(db, 'users', user.email.replace(/[^a-zA-Z0-9]/g, '_')), user, { merge: true }).catch(() => {});
  } catch {
    // Ignore offline errors
  }
}

// Helper for current user
export function getCurrentUser(): User | null {
  try {
    const data = localStorage.getItem(CURRENT_USER_KEY);
    return data ? JSON.parse(data) : null;
  } catch {
    return null;
  }
}

export function setCurrentUser(user: User | null): void {
  if (user) {
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
  } else {
    localStorage.removeItem(CURRENT_USER_KEY);
  }
}

// Helper for reviews
export function getStoredReviews(): ReviewItem[] {
  try {
    const data = localStorage.getItem(REVIEWS_KEY);
    if (!data) {
      localStorage.setItem(REVIEWS_KEY, JSON.stringify(SEED_REVIEWS));
      return SEED_REVIEWS;
    }
    return JSON.parse(data);
  } catch {
    return SEED_REVIEWS;
  }
}

export function saveReview(review: ReviewItem): void {
  const reviews = getStoredReviews();
  reviews.unshift(review);
  localStorage.setItem(REVIEWS_KEY, JSON.stringify(reviews));

  // Sync to Firestore
  try {
    setDoc(doc(db, 'reviews', review.id), review, { merge: true }).catch(() => {});
  } catch {
    // Ignore offline errors
  }
}

export function updateReviewStatus(reviewId: string, status: 'approved' | 'rejected'): void {
  const reviews = getStoredReviews();
  const idx = reviews.findIndex(r => r.id === reviewId);
  if (idx >= 0) {
    reviews[idx].status = status;
    localStorage.setItem(REVIEWS_KEY, JSON.stringify(reviews));

    try {
      setDoc(doc(db, 'reviews', reviewId), { status }, { merge: true }).catch(() => {});
    } catch {
      // Ignore
    }
  }
}

export function deleteReview(reviewId: string): void {
  const reviews = getStoredReviews();
  const filtered = reviews.filter(r => r.id !== reviewId);
  localStorage.setItem(REVIEWS_KEY, JSON.stringify(filtered));

  try {
    deleteDoc(doc(db, 'reviews', reviewId)).catch(() => {});
  } catch {
    // Ignore
  }
}

// Helper for services
export function getStoredServices(): ServiceItem[] {
  try {
    const data = localStorage.getItem(SERVICES_KEY);
    if (!data) {
      localStorage.setItem(SERVICES_KEY, JSON.stringify(DEFAULT_SERVICES));
      return DEFAULT_SERVICES;
    }
    return JSON.parse(data);
  } catch {
    return DEFAULT_SERVICES;
  }
}

export function saveServices(services: ServiceItem[]): void {
  localStorage.setItem(SERVICES_KEY, JSON.stringify(services));

  // Sync to Firestore
  try {
    services.forEach(srv => {
      setDoc(doc(db, 'services', srv.id), srv, { merge: true }).catch(() => {});
    });
  } catch {
    // Ignore
  }
}

// Function to pull remote data from Firestore on app launch
export async function syncFromFirestore(): Promise<void> {
  try {
    // Fetch Remote Reviews
    const reviewsSnap = await getDocs(collection(db, 'reviews'));
    if (!reviewsSnap.empty) {
      const remoteReviews: ReviewItem[] = [];
      reviewsSnap.forEach(d => remoteReviews.push(d.data() as ReviewItem));
      if (remoteReviews.length > 0) {
        localStorage.setItem(REVIEWS_KEY, JSON.stringify(remoteReviews));
      }
    }

    // Fetch Remote Services
    const servicesSnap = await getDocs(collection(db, 'services'));
    if (!servicesSnap.empty) {
      const remoteServices: ServiceItem[] = [];
      servicesSnap.forEach(d => remoteServices.push(d.data() as ServiceItem));
      if (remoteServices.length > 0) {
        localStorage.setItem(SERVICES_KEY, JSON.stringify(remoteServices));
      }
    }
  } catch (err) {
    console.warn('Firestore sync optional warning:', err);
  }
}

