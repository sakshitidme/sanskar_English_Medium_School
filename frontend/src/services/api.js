const API_BASE_URL = import.meta.env.PROD ? 'https://bksanskar.in/api' : (import.meta.env.VITE_API_URL || 'http://localhost:5001/api');

// Helper to get auth header
const getAuthHeaders = () => {
  const token = localStorage.getItem('adminToken');
  return {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` })
  };
};

// Generic fetch wrapper
const fetchApi = async (endpoint, options = {}) => {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      ...getAuthHeaders(),
      ...options.headers,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Something went wrong');
  }

  return data;
};

// --- API Service Methods ---
export const api = {
  // Auth
  login: (credentials) => fetchApi('/auth/login', {
    method: 'POST',
    body: JSON.stringify(credentials)
  }),
  
  // Admissions
  getAdmissions: () => fetchApi('/admissions'),
  createAdmission: (data) => fetchApi('/admissions', {
    method: 'POST',
    body: JSON.stringify(data)
  }),
  uploadAdmissionFiles: async (formData) => {
    // Custom fetch for multipart form data without default json headers
    const token = localStorage.getItem('adminToken');
    const response = await fetch(`${API_BASE_URL}/upload`, {
      method: 'POST',
      headers: {
        ...(token && { Authorization: `Bearer ${token}` })
      },
      body: formData
    });
    
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'File upload failed');
    return data;
  },
  updateAdmissionStatus: (id, status) => fetchApi(`/admissions/${id}`, {
    method: 'PUT',
    body: JSON.stringify({ status })
  }),

  // Reviews
  getReviews: () => fetchApi('/reviews'),
  createReview: (data) => fetchApi('/reviews', {
    method: 'POST',
    body: JSON.stringify(data)
  }),
  deleteReview: (id) => fetchApi(`/reviews/${id}`, {
    method: 'DELETE'
  }),
  likeReview: (id) => fetchApi(`/reviews/${id}/like`, {
    method: 'PUT'
  }),

  // Contacts
  getContacts: () => fetchApi('/contacts'),
  createContact: (data) => fetchApi('/contacts', {
    method: 'POST',
    body: JSON.stringify(data)
  }),
  updateContactStatus: (id, status) => fetchApi(`/contacts/${id}`, {
    method: 'PUT',
    body: JSON.stringify({ status })
  }),

  // Fees
  getFees: () => fetchApi('/fees'),
  createFee: (data) => fetchApi('/fees', {
    method: 'POST',
    body: JSON.stringify(data)
  }),
  updateFee: (id, data) => fetchApi(`/fees/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data)
  }),
  
  // Admin Profile
  getAdminProfile: () => fetchApi('/admin/profile'),
  
  // Site Views
  getTotalViews: () => fetchApi('/views'),
  incrementViewCount: () => fetchApi('/views', { method: 'POST' }),

  // OTP
  sendOTP: (phone, name) => fetchApi('/otp/send-otp', {
    method: 'POST',
    body: JSON.stringify({ phone, name })
  }),
  verifyOTP: (phone, otp) => fetchApi('/otp/verify-otp', {
    method: 'POST',
    body: JSON.stringify({ phone, otp })
  }),

  // Payments
  createPaymentOrder: (amount) => fetchApi('/payment/order', {
    method: 'POST',
    body: JSON.stringify({ amount })
  }),
  verifyPayment: (paymentData) => fetchApi('/payment/verify', {
    method: 'POST',
    body: JSON.stringify(paymentData)
  }),
  getPaymentDetails: (id) => fetchApi(`/payment/${id}`),
  searchPayments: (studentData) => fetchApi('/payment/search', {
    method: 'POST',
    body: JSON.stringify(studentData)
  }),
};
