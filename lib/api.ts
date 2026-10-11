import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getAssetUrl = (path: string | null | undefined) => {
  if (!path) return '/assets/img/placeholder.jpg';
  if (path.startsWith('http')) return path;
  if (path.startsWith('/assets') || path.startsWith('/images')) return path;
  if (path.startsWith('assets/')) return '/' + path;
  const baseUrl = (process.env.NEXT_PUBLIC_API_URL || 'https://kingdom-spices-herbs-backend-dashbo.vercel.app/api').replace('/api', '');
  return baseUrl + (path.startsWith('/') ? path : '/' + path);
};

export const apiService = {
  getProducts: async (params: any = {}) => {
    try {
      const res = await api.get('/products', { params });
      return res.data?.data || res.data || [];
    } catch (e) {
      console.error('apiService.getProducts error:', e);
      return [];
    }
  },
  getProductById: async (id: string | number) => {
    try {
      const res = await api.get(`/products/${id}`);
      return res.data?.data || res.data;
    } catch (e) {
      console.error('apiService.getProductById error:', e);
      // Fallback: fetch all and find
      try {
        const all = await apiService.getProducts();
        return all.find((p: any) => (p._id === id || p.id === id)) || null;
      } catch {
        return null;
      }
    }
  },
  getCategories: async (params: any = {}) => {
    try {
      const res = await api.get('/categories', { params });
      return res.data?.data || res.data || [];
    } catch (e) {
      console.error('apiService.getCategories error:', e);
      return [];
    }
  },
  getCertificates: async (params: any = {}) => {
    try {
      const res = await api.get('/certificates', { params });
      return res.data?.data || res.data || [];
    } catch (e) {
      console.error('apiService.getCertificates error:', e);
      return [];
    }
  },
  getTeamMembers: async (params: any = {}) => {
    try {
      const res = await api.get('/team', { params });
      return res.data?.data || res.data || [];
    } catch (e) {
      console.error('apiService.getTeamMembers error:', e);
      return [];
    }
  },
  getContactInfo: async (params: any = {}) => {
    try {
      const res = await api.get('/contact', { params });
      return res.data?.data || res.data || [];
    } catch (e) {
      console.error('apiService.getContactInfo error:', e);
      return [];
    }
  },
  sendMessage: async (data: { name: string; email: string; phone?: string; subject: string; message: string }) => {
    const res = await api.post('/messages', data);
    return res.data;
  },
};

export default api;
