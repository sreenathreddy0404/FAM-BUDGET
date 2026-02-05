import axios from 'axios';

//we use axios for http requests. It is an alternative way of fetch() api.
const api = axios.create({
    baseURL: 'http://localhost:5000/api',
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
            window.location.href = '/auth';//Redirect to login page.
        }
        return Promise.reject(error);
    } 
)

export const registerUser = (userData) => api.post('/auth/register', userData);
export const loginUser = (userData) => api.post('/auth/login', userData);

//expenses routes
export const addExpense = (expenseData) => api.post('/expenses', expenseData);
export const getExpenses = () => api.get('/expenses');

//family members routes
export const addFamilyMember = (memberData) => api.post('/family-members', memberData);
export const getFamilyMembers = () => api.get('/family-members');
export const updateFamilyMember = (id, memberData) => api.put(`/family-members/${id}`, memberData); 
export const deleteFamilyMember = (id) => api.delete(`/family-members/${id}`);