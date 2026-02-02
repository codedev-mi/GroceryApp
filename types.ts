export interface Product {
    id: number;
    title: string;
    image: string;
    category: string;
    price: number;
}

export interface Category {
    id: string; // The dummyData uses string IDs for categories like 'Grocery'
    title: string;
    image?: string; // Optional if not all have images
}
