import { useState, useEffect, type FormEvent } from 'react'
import { api } from '../utils/api';
import { useNavigate } from 'react-router-dom';
import { getUserFromToken } from "../utils/auth";

const Lists = () => {
    const navigate = useNavigate();

    const token = localStorage.getItem("token");
    if (!token) {
        navigate("/login");
        return null;
    }

    const [lists, setLists] = useState([]);
    const [loading, setLoading] = useState(true);

    const user = getUserFromToken(token) as { id: string, email: string } | null;

    const fetchLists = async () => {
        try {
            console.log("Fetching lists for user:", user);
            const response = await api.get(`/list-members/user/${user!.id}/lists`, {
                headers: {
                    "x-auth-token": token,
                },
            });
            console.log("Fetched lists:", response.data);
            setLists(response.data);
        } catch (error) {
            console.error("Error fetching lists:", error);
        } finally {
            setLoading(false);
        }
    };
    
    useEffect(() => {
        fetchLists();
    }, []);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        const listName = (e.target as HTMLFormElement).listName.value;
        if (!listName) return;

        try {
            await api.post("/lists", { name: listName, userId: user!.id }, {
                headers: {
                    "x-auth-token": token,
                },
            });
            (e.target as HTMLFormElement).reset();

            fetchLists();

        } catch (error) {
            console.error("Error creating list:", error);
        }
    }



    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold">Your Lists</h1>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <ul className="list-disc pl-5">
                    {lists.map((list: any) => (
                        <li key={list.id} className="mb-2">
                            <h2 className="text-lg font-semibold">{list.List.name}</h2>
                        </li>
                    ))}
                </ul>
            )}

            {!loading && lists.length === 0 && (
                <p className="text-gray-500">You are not a member of any lists.</p>
            )}

            <form className="mt-4" onSubmit={handleSubmit}>
                <input type="text" name="listName" placeholder="New List Name" className="border p-2 rounded w-full" required />
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded mt-2">Create List</button>
            </form>
        </div>
    )
}

export default Lists