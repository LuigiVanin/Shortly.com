import api from "../../services/api";
import { useAsync } from "./../useAsync";

export const useGetShortsFromUser = (startData?: any) => {
    const { action, error, isLoading, data } = useAsync(
        async (page: number = 1) => {
            return await api.get("/link", { params: { page } });
        },
        true
    );

    return {
        fetchShort: action,
        error,
        isLoading,
        shortsData: data?.data,
    };
};
