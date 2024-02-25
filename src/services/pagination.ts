const DEFAULT_PAGE_LIMIT = 0;
const DEFAULT_PAGE_NUMBER = 1;

interface Query {
    page?: number;
    size?: number;
}

export const getPagination = (Page:number, size:number) => {
    const page = Math.abs(Page) || DEFAULT_PAGE_NUMBER;
    const limit = Math.abs(size) || DEFAULT_PAGE_LIMIT;

    const skip = (page - 1) * limit;

    return {
        skip,
        limit,
    };
}