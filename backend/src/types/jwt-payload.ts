export interface AuthJwtPayload {
    id: string;
    role: string;
    username?: string;
    email: string;
    iat?: number;
    exp?: number;
}
