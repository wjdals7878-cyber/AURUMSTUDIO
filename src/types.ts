export interface PortfolioItem {
  id: number;
  title: string;
  description: string;
  videoUrl: string;
  imageUrl: string;
  category: string;
}

export interface Inquiry {
  id: number;
  name: string;
  email: string;
  message: string;
  status: string;
  createdAt: string;
}
