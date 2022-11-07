import axios from 'axios'
import { persist } from 'zustand/middleware'
import create from 'zustand'
import { BASE_URL } from '../utils/index';

const authStore = (set: any) => ({
    userProfile: null,
    allUsers: [],
    addUser: (user: any) => set({ userProfile: user }),
    removeUser: () => set({ userProfile: null }),
    fetchAllUsers: async () => {
        const response = await axios.get(`${BASE_URL}/api/users`)
        set({ allUsers: response.data })

    }


})

const useAuthStore = create(
    persist(authStore, {
        name: 'auth',
    })
)
export default useAuthStore;