import { jwtDecode } from "jwt-decode";

export const getUserFromToken = (token: string) => {
    if (!token) return null;
    try {
        const decoded = jwtDecode(token);
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