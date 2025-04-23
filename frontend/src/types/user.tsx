export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  dateJoined: Date;
  lastLogin: Date;
}

export interface UserState {
  user: User | null;
  isAuthenticated: boolean;
  setUser: (user: User) => void;
  clearUser: () => void;
}
