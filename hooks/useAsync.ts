import { useEffect, useState } from "react";

export const useAsync = <T = any>(
    handler: (...args: any[]) => Promise<T>,
    asap: boolean = true
) => {
    const [loading, setLoading] = useState(asap);
    const [error, setError] = useState(null);
    const [data, setData] = useState<T | null>(null);

    const action = async (...args: any[]) => {
        setLoading(true);
        setError(null);
        try {
            const result = await handler(...args);
            setData(result);
            setLoading(false);
        } catch (err) {
            setError(error);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (asap) {
            action();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return {
        action,
        data,
        isLoading: loading,
        error,
    };
};
