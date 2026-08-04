export type UserRole = 'client' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  createdAt: string;
}

export type ReviewStatus = 'pending' | 'approved' | 'rejected';

export interface ReviewItem {
  id: string;
  text: string;
  author: string;
  authorEmail?: string;
  authorPhone?: string;
  location: string;
  stars: number;
  serviceTag: string;
  timeAgo: string;
  status: ReviewStatus;
  createdAt: string;
}

export interface ServiceItem {
  id: string;
  titleKey: string;
  descKey: string;
  iconName: string;
  defaultTitle: string;
  defaultDesc: string;
  active: boolean;
  priceEstimate?: string;
}
