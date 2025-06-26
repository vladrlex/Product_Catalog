export interface Category {
  id: string;
  title: string;
  image: string;
  link: string;
  models: number;
  styles?: CardStyles;
}

export interface CardStyles {
  image?: {
    right?: string;
    bottom?: string;
    width?: string;
    height?: string;
    objectFit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';
  };
  card?: {
    backgroundColor?: string;
    opacity?: number;
  };
}

export interface CategoryProps {
  className?: string;
} 