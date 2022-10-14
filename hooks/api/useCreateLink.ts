import api from "../services/api";
import { useAsync } from "./useAsync";

export const useCreateLink = () => {
    const { action, data, isLoading, error } = useAsync(async (link) => {
        return await api.post("link", {
            link,
        });
    }, false);

    return {
        linkData: data ? data.data.result : null,
        createLink: action,
        isLoading,
        error,
    };
};
