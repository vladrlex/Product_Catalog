import { FullProduct } from '../../types/FullProduct';
import { ProductRequestQuery } from '../../types/ProductRequestQuery';
import { client } from '../client/fetchClient';
import { ProductsResponse } from '../../types/ProductsResponse';
import { ShortProduct } from '../../types/ShortProduct';

export const getProducts = ({
  limit,
  page,
  category,
  sortBy,
  color,
  capacity,
  ram,
}: ProductRequestQuery) => {
  const params = new URLSearchParams();

  if (limit !== undefined) params.append('limit', limit.toString());
  if (page !== undefined) params.append('page', page.toString());
  if (category) params.append('category', category);
  if (sortBy) params.append('sortBy', sortBy);
  if (color) params.append('color', color);
  if (capacity) params.append('capacity', capacity);
  if (ram) params.append('ram', ram);

  return client.get<ProductsResponse>(`/products?${params.toString()}`);
};

export const getHotPricedProducts = (limit = 8) => {
  return client.get<ShortProduct[]>(`/products/hot-prices?limit=${limit}`);
};

export const getPhoneById = (phoneId: string) => {
  return client.get<FullProduct>(`/phones/${phoneId}`);
};

export const getTabletById = (tabletId: string) => {
  return client.get<FullProduct>(`/tablets/${tabletId}`);
};

export const getAccessoryById = (accessoryId: string) => {
  return client.get<FullProduct>(`/accessories/${accessoryId}`);
};

export const getShortProduct = (itemId: string) => {
  return client.get<ShortProduct>(`/products/${itemId}`);
};
