export type JobApplicationListItem = {
    id: number;
    name: string;
    email: string;
    cv_original_name: string;
    created_at: string | null;
};

export type JobApplicationDetail = JobApplicationListItem & {
    motivation: string;
    download_url: string;
};

export type PaginationLink = {
    url: string | null;
    label: string;
    active: boolean;
};

export type Paginated<T> = {
    data: T[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    links: PaginationLink[];
};
