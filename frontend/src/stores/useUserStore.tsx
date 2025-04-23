import { create } from "zustand";
import { persist } from "zustand/middleware";
import { UserState } from "../types/user";

const useUserStore = create(
  persist<UserState>(
    (set) => ({
      user: null,
      isAuthenticated: false,
      setUser: (newUser) =>
        set({
          user: newUser,
          isAuthenticated: true,
        }),
      clearUser: () =>
        set({
          user: null,
          isAuthenticated: false,
        }),
    }),
    {
      name: "user-storage",
    }
  )
);

export default useUserStore;
