export interface AuthContextProps {
  isAuth: boolean;
  user: { id: string; email: string } | null;
  login: (token: string) => void;
  logout: () => void;
}