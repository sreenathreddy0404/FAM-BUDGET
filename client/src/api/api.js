import axios from 'axios';

//we use axios for http requests. It is an alternative way of fetch() api.
const api = axios.create({
    baseURL: 'https://fam-budget-backend.onrender.com/api',
});

//request interceptor is attach JWT token to every request headers
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

//response interrceptor to handle token expiration
api.interceptors.response.use((response)=>response,
    (error)=>{
        if(error.response?.status === 401){
            localStorage.removeItem('user');
            localStorage.removeItem('token');
            if (window.location.pathname !== '/auth') {
                window.location.replace('/auth');
            }

        }
        return Promise.reject(error);
    } 
)

//authentication routes
export const registerUser = (userData) => api.post('/auth/register', userData);
export const loginUser = (userData) => api.post('/auth/login', userData);

//expenses routes
export const addExpense = (newExpense) => api.post('/expenses', newExpense);
export const getExpenses = () => api.get('/expenses');
export const updateExpense = (id,newExpenseData) => api.put(`/expenses/${id}`,newExpenseData);
export const deleteExpense = (id) => api.delete(`/expenses/${id}`); 
export const getExpensesByYear = (year) => api.get(`/expenses/year/${year}`);
export const getExpensesByYearAndMonth = (year,month) => api.get(`/expenses/year-month/${year}/${month}`);

//family members routes
export const addFamilyMember = (memberData) => api.post('/family-members', memberData);
export const getFamilyMembers = () => api.get('/family-members');
export const updateFamilyMember = (id, memberData) => api.put(`/family-members/${id}`, memberData); 
export const deleteFamilyMember = (id) => api.delete(`/family-members/${id}`);

//dashboard routes
export const getDashboardData = ()=>api.get('/dashboard/statsdata');

//ocr data extract routes
export const extractData = (formData) => {
  return api.post('/ocr/extract', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};