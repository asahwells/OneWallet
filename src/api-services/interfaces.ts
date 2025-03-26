export interface IPagination {

    currentPage: number;
    hasNext: boolean;
    hasPrevious: boolean;
    lastPage: number;
    next: number;
    pageSize: number;
    prevPage: number;
    total: number;
}


export interface IResp {
    message?: string;
    status?: string;
    statusCode?: number;
    pagination?: IPagination
}

export interface IDurationFilter {
    id: string;
    name: string;
    duration: number;
    durationType: string;
}