export interface ShoesData {
  _id: string;
  title: string;
  description: string;
  price: number;
  images: ProductImageData[];
  category: string;
  checked: boolean;
}

export interface ProductImageData {
  public_url: string;
  url: string;
}
