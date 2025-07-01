import axios from "axios";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";


interface User {
  id: string;
  email: string;
  name: string;
  firstName: string;
  lastName: string;
  phone: string;
  role: string;
}

interface IAuthStore {
  isAuthenticated: boolean;
  hydrated: boolean;
  user: User | null;

  updateProfile: (data: any) => Promise<void>;
  setUser(user : User | null): void;
  setHydrated(): void;
  setAuthenticated(isAuthenticated: boolean): void;
}

export const useAuthStore = create<IAuthStore>()(
  persist(
    immer((set) => ({
      isAuthenticated: false,
      hydrated: false,
      user: null,

      updateProfile: async (data) => {
        try {
          const response = await axios.post("/api/auth/update-profile", data);
          if (response.data.success) {
            set({ user: response.data.user });
          } else {
            console.error("Failed to update profile:", response.data.error);
          }
        } catch (error) {
          console.error("Error updating profile:", error);
        }
      },

      setUser(user: User | null) {
        set({user})
      },

      setHydrated() {
        set({ hydrated: true });
      },

      setAuthenticated(isAuthenticated) { 
        set({ isAuthenticated });
      },
    
    })),
    {
      name: "auth",
      onRehydrateStorage() {
        return (state, error) => {
          if (!error) state?.setHydrated();
        }
      }
    }
  )
)