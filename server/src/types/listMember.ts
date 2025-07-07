export interface ListMemberProps {
    id?: number;
    listId: number;
    userId: number;
    role: "owner" | "member"; // Define roles for list members
};