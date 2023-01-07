export const createApiUrl = (short: string) => {
    if (typeof window === "undefined") return short;

    return `${window.location.origin}/api/${short}`;
};
