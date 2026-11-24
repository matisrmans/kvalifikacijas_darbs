export type AdminStats = {
    applications: number;
    users: number;
    admins: number;
    locations: number;
};

export type AdminLocation = {
    id: number;
    name: string;
    country: string;
    lat: number;
    lng: number;
    description: string;
};

export type AdminUserListItem = {
    id: number;
    name: string;
    email: string;
    is_admin: boolean;
    email_verified_at: string | null;
    created_at: string | null;
};

export type RecentApplication = {
    id: number;
    name: string;
    email: string;
    created_at: string | null;
};
