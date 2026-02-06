export interface SubCategory {
    id: string;
    title: string;
    image: string;
}

export interface Category {
    id: string;
    title: string;
    image?: string;
    subCategories?: SubCategory[];
}

export interface Product {
    id: number;
    title: string;
    image: string;
    category: string;
    subCategoryId?: string;
    price: number;
    rating?: number;
    description?: string;
    originalPrice?: number;
}
