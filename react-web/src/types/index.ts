export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl: string;
  designFile?: string;
}

export interface CartItem {
  productName: any;
  fileUploadedName: any;
  id: string; // Cart item ID from API
  productId: string;
  name: string; // productName from API
  imageUrl: string;
  price: number;
  quantity: number;
  designFile?: string;
}

export interface CustomerDetails {
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  city: string;
  zipCode: string;
}
