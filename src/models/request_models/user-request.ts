export interface UsersRequest {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
    password: string;
    technology: string[] | string;
    token: string;
    created_at?: Date; 
}