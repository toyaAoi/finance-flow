import { create } from "zustand";

type User = {
  name: string;
  username: string;
  accounts: string[];
};

interface UserState {
  user: User;
  setUser: (user: User) => void;
}

const useUserStore = create<UserState>()((set) => ({
  user: {} as User,
  setUser: (user: User) => set({ user }),
}));

export default useUserStore;
