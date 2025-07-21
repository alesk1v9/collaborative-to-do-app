import { jwtDecode } from "jwt-decode";
import type { userProps } from "../types/user";

export const getUserFromToken = (token: string): userProps | null => {
    if (!token) return null;
    try {
        const decoded = jwtDecode(token) as userProps;
        return decoded;
    } catch (error) {
        console.error("Invalid token", error);
        return null;
    }
};

export const isAuthenticated = () => {
    const token = localStorage.getItem("token");
    if (!token) return false;
    const user = getUserFromToken(token);
    return user !== null;
};

export const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login"; // Redirect to login page
};

export const isLoggedIn = () => {
    const token = localStorage.getItem("token");
    if (!token) return false;
    const user = getUserFromToken(token);
    return user !== null;
}