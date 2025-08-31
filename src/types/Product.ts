export interface ProductImage {
    desktop: string;
    tablet: string;
    mobile: string;
  }
  
  export interface GalleryImage extends ProductImage {}
  
  export interface IncludedItem {
    quantity: number;
    item: string;
  }
  
  export interface Product {
    id: string;
    slug: string;
    name: string;
    new: boolean;
    price: number;
    description: string;
    quantity: number;
    features: string;
    category: string;
    cartImage: string | null;
    imageUrl: string;
    image: ProductImage;
    categoryImage: ProductImage;
    gallery: GalleryImage[];
    includedItems: IncludedItem[];
  }
  
  // Response is an array of products
  export type ProductsByCategoryResponse = {
    products: Product[];
  }
  